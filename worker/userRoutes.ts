import { Hono } from "hono";
import { getAgentByName } from 'agents';
import { ChatAgent } from './agent';
import { API_RESPONSES } from './config';
import { Env, getAppController, registerSession, unregisterSession } from "./core-utils";
import { generateMockVisuals } from "./visual-generator";
export function coreRoutes(app: Hono<{ Bindings: Env }>) {
    // This route is now repurposed for project data
    app.all('/api/projects/:projectId', async (c) => {
        try {
            const projectId = c.req.param('projectId');
            const agent = await getAgentByName<Env, ChatAgent>(c.env.CHAT_AGENT, projectId);
            const url = new URL(c.req.url);
            url.pathname = ''; // The agent itself doesn't need sub-paths anymore
            return agent.fetch(new Request(url.toString(), {
                method: c.req.method,
                headers: c.req.header(),
                body: c.req.method === 'GET' || c.req.method === 'DELETE' ? undefined : c.req.raw.body
            }));
        } catch (error) {
            console.error('Agent routing error:', error);
            return c.json({
                success: false,
                error: API_RESPONSES.AGENT_ROUTING_FAILED
            }, { status: 500 });
        }
    });
}
export function userRoutes(app: Hono<{ Bindings: Env }>) {
    app.get('/api/projects', async (c) => {
        try {
            const controller = getAppController(c.env);
            const projects = await controller.listSessions();
            return c.json({ success: true, data: projects });
        } catch (error) {
            console.error('Failed to list projects:', error);
            return c.json({ success: false, error: 'Failed to retrieve projects' }, { status: 500 });
        }
    });
    app.post('/api/projects', async (c) => {
        try {
            const body = await c.req.json().catch(() => ({}));
            const { title } = body;
            const projectId = crypto.randomUUID();
            const projectTitle = title || `New Project ${new Date().toLocaleTimeString()}`;
            await registerSession(c.env, projectId, projectTitle);
            // We need to initialize the project agent with the title
            const agent = await getAgentByName<Env, ChatAgent>(c.env.CHAT_AGENT, projectId);
            const initialData = { title: projectTitle };
            await agent.fetch(new Request('http://localhost/init', {
                method: 'PUT',
                body: JSON.stringify(initialData)
            }));
            const controller = getAppController(c.env);
            const newProjectSummary = await controller.getSession(projectId);
            return c.json({ success: true, data: newProjectSummary });
        } catch (error) {
            console.error('Failed to create project:', error);
            return c.json({ success: false, error: 'Failed to create project' }, { status: 500 });
        }
    });
    app.delete('/api/projects/:projectId', async (c) => {
        try {
            const projectId = c.req.param('projectId');
            const deleted = await unregisterSession(c.env, projectId);
            if (!deleted) {
                return c.json({ success: false, error: 'Project not found' }, { status: 404 });
            }
            return c.json({ success: true, data: { deleted: true } });
        } catch (error) {
            console.error('Failed to delete project:', error);
            return c.json({ success: false, error: 'Failed to delete project' }, { status: 500 });
        }
    });
    app.post('/api/generate-visuals', async (c) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            const visuals = generateMockVisuals();
            return c.json({ success: true, data: visuals });
        } catch (error) {
            console.error('Failed to generate visuals:', error);
            return c.json({ success: false, error: 'Failed to generate visuals' }, { status: 500 });
        }
    });
}