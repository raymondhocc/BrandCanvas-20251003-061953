import { Agent } from 'agents';
import type { Env } from './core-utils';
import type { Project as ProjectState } from '../src/lib/types';
import { API_RESPONSES } from './config';
const DEFAULT_FORM_DATA = {
  productName: 'Cloudflare C3',
  description: 'A high-performance, secure, and scalable cloud computing platform for modern applications.',
  targetLocale: 'en-US',
  logoUrl: '',
  brandColors: ['#4338ca', '#db2777'],
};
export class ChatAgent extends Agent<Env, ProjectState> {
  initialState: ProjectState = {
    id: '',
    title: 'New Project',
    formData: DEFAULT_FORM_DATA,
    visuals: [],
  };
  async onStart(): Promise<void> {
    if (!this.state.id) {
      this.setState({ ...this.state, id: this.name });
    }
    console.log(`ProjectAgent ${this.name} initialized.`);
  }
  async onRequest(request: Request): Promise<Response> {
    try {
      const method = request.method;
      if (method === 'GET') {
        return this.handleGetProject();
      }
      if (method === 'PUT') {
        const projectData: ProjectState = await request.json();
        return this.handleUpdateProject(projectData);
      }
      return Response.json({
        success: false,
        error: API_RESPONSES.NOT_FOUND
      }, { status: 404 });
    } catch (error) {
      console.error('Request handling error:', error);
      return Response.json({
        success: false,
        error: API_RESPONSES.INTERNAL_ERROR
      }, { status: 500 });
    }
  }
  private handleGetProject(): Response {
    return Response.json({
      success: true,
      data: this.state
    });
  }
  private handleUpdateProject(projectData: ProjectState): Response {
    this.setState({ ...this.state, ...projectData, id: this.name });
    return Response.json({
      success: true,
      data: this.state
    });
  }
}