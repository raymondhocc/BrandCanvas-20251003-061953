# BrandCanvas AI

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/raymondhocc/BrandCanvas-20251003-061953)

An AI-powered platform to automate the creation of localized, brand-aligned e-commerce banners and visuals.

BrandCanvas AI is a sophisticated, AI-driven platform designed to revolutionize visual content creation for e-commerce. It empowers brands to automatically generate stunning, localized banners and Product Detail Page (PDP) visuals that are perfectly aligned with their brand identity. The application features a main 'Visual Generation Suite' where users input product details, select a target market, and define brand guidelines. The AI then generates a series of visual concepts. A key feature is the 'human-in-the-loop' editor, allowing designers to tweak, refine, and approve the AI-generated assets, ensuring flawless final output.

## ✨ Key Features

*   **AI-Powered Visual Generation**: Automatically create banners and PDP visuals from product details and brand guidelines.
*   **Deep Localization**: Generate assets tailored to specific markets, including Traditional Chinese, English, Thai, Vietnamese, and Malay.
*   **Brand Alignment**: Ensure all generated content perfectly matches your brand's visual identity, including colors and logos.
*   **Human-in-the-Loop Editor**: A simple, integrated editor for designers to refine and approve AI-generated visuals.
*   **Feedback Loop**: The platform is designed to learn from user edits to improve future generations (future phase).
*   **Engaging UI**: A whimsical and illustrative user interface that makes the creative process enjoyable.

## 🚀 Technology Stack

*   **Frontend**: React, Vite, Tailwind CSS, shadcn/ui, Framer Motion, React Hook Form
*   **Backend**: Cloudflare Workers, Hono
*   **State Management**: Cloudflare Agents (Durable Objects)
*   **Language**: TypeScript
*   **Runtime**: Bun

## 🏁 Getting Started

Follow these instructions to get the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   [Bun](https://bun.sh/) installed on your machine.
*   A [Cloudflare account](https://dash.cloudflare.com/sign-up).
*   `git` for cloning the repository.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/brandcanvas_ai.git
    cd brandcanvas_ai
    ```

2.  **Install dependencies:**
    ```bash
    bun install
    ```

### Environment Variables

The project uses Cloudflare Workers for its backend. You'll need to set up environment variables for local development.

1.  Create a `.dev.vars` file in the root of the project:
    ```bash
    touch .dev.vars
    ```

2.  Add the following environment variables to your `.dev.vars` file. These are required for the AI capabilities.
    ```ini
    CF_AI_BASE_URL="https://gateway.ai.cloudflare.com/v1/YOUR_ACCOUNT_ID/YOUR_GATEWAY_ID/openai"
    CF_AI_API_KEY="your-cloudflare-api-key"
    ```
    *   Replace `YOUR_ACCOUNT_ID` and `YOUR_GATEWAY_ID` with your actual Cloudflare details.
    *   You can find more information on setting up the AI Gateway [here](https://developers.cloudflare.com/ai-gateway/).

> **Note**: The AI capabilities will not function in the deployed preview without securely setting these variables in your Cloudflare dashboard.

## 💻 Development

To start the local development server, which includes the Vite frontend and the local Wrangler server for the backend worker, run:

```bash
bun dev
```

This will start the application, typically on `http://localhost:3000`. The frontend will hot-reload on changes, and the worker will restart automatically.

## 🚀 Deployment

This project is designed for seamless deployment to the Cloudflare network.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/raymondhocc/BrandCanvas-20251003-061953)

### Manual Deployment

1.  **Login to Cloudflare:**
    If you haven't already, authenticate Wrangler with your Cloudflare account.
    ```bash
    bunx wrangler login
    ```

2.  **Build and Deploy:**
    Run the deploy script, which will build the Vite application and deploy it along with the worker to your Cloudflare account.
    ```bash
    bun run deploy
    ```

3.  **Configure Secrets:**
    After deployment, you must configure the necessary secrets in your Worker's settings in the Cloudflare dashboard.
    *   Navigate to **Workers & Pages** -> your `brandcanvas_ai` application -> **Settings** -> **Variables**.
    *   Add the `CF_AI_BASE_URL` and `CF_AI_API_KEY` as secret variables.

## 📂 Project Structure

The codebase is organized into two main parts: the frontend application and the backend worker.

*   `src/`: Contains the React frontend application.
    *   `components/`: Reusable UI components, including shadcn/ui components.
    *   `pages/`: Top-level page components for different routes.
    *   `lib/`: Utility functions, TypeScript types, and client-side API logic.
    *   `hooks/`: Custom React hooks.
*   `worker/`: Contains the Cloudflare Worker backend code.
    *   `index.ts`: The entry point for the worker.
    *   `userRoutes.ts`: Hono route definitions for the application's API.
    *   `agent.ts`: The core `ChatAgent` Durable Object class.
    *   `app-controller.ts`: The `AppController` Durable Object for managing sessions.

## 🤝 Contributing

Contributions are welcome! Please feel free to open an issue or submit a pull request.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.