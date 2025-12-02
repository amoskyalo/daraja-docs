# Daraja API Documentation Platform

A comprehensive documentation platform for Safaricom's Daraja API (M-Pesa Integration). This project provides interactive documentation, API playground, and AI-powered developer assistance.

## Overview

The platform consists of three main applications managed as a [Turborepo](https://turbo.build/repo/docs) monorepo:

- **daraja-docs-platform** — Next.js documentation website with AI assistant and interactive features
- **daraja-graphql-server** — [Apollo Server](https://www.apollographql.com/docs/apollo-server/) providing unified API access
- **mpesa-sdk-node** — TypeScript SDK for M-Pesa API integration

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- pnpm 9.0.0

Install pnpm if you don't have it:

```bash
npm install -g pnpm@9.0.0
```

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/amoskyalo/daraja-docs.git
cd daraja-docs
pnpm install
```

### Development

Start all applications:

```bash
pnpm dev
```

The frontend runs at `http://localhost:3000` and the GraphQL server at `http://localhost:4000`.

To run individual applications:

```bash
# Frontend only
pnpm --filter daraja-docs-platform dev

# Backend only
pnpm --filter daraja-graphql-server dev

# SDK
pnpm --filter mpesa-sdk-node dev
```

## Configuration

### Frontend Environment Variables

Create `apps/daraja-docs-platform/.env.local`:

```env
NEXT_PUBLIC_GRAPHQL_ENDPOINT=http://localhost:4000/graphql
ANTHROPIC_API_KEY=<your-anthropic-api-key>
SUPERMEMORY_API_KEY=<your-supermemory-api-key>
NEXT_PUBLIC_ALGOLIA_APP_ID=<your-algolia-app-id>
NEXT_PUBLIC_ALGOLIA_API_KEY=<your-algolia-search-key>
```

**Where to get API keys:**
- **Anthropic API Key** — Create an account at [console.anthropic.com](https://console.anthropic.com) and generate an API key
- **Supermemory API Key** — Sign up at [supermemory.ai](https://supermemory.ai) to get an API key for documentation indexing
- **Algolia Keys** — Sign up at [algolia.com](https://www.algolia.com), create an application, and get your App ID and Search-Only API Key from the dashboard

### Backend Environment Variables

Create `apps/daraja-graphql-server/.env`:

```env
PORT=4000
BASE_URL=<backend-base-url>
GITHUB_BASE_URL=https://api.github.com
GITHUB_API_KEY=<your-github-personal-access-token>
HASHNODE_APIS_BASE_URL=https://gql.hashnode.com
DEVTO_APIS_BASE_URL=https://dev.to/api
```

**Where to get API keys:**
- **GitHub Token** — Generate a personal access token at [github.com/settings/tokens](https://github.com/settings/tokens) with `repo` and `read:org` scopes
- **Hashnode/Dev.to URLs** — These are public API endpoints and work without authentication for read operations

The application will run without these variables, but certain features will be unavailable.

## Project Structure

```
apps/
├── daraja-docs-platform/    # Next.js frontend application
│   ├── src/
│   │   ├── app/             # App Router pages and layouts
│   │   ├── features/        # Feature modules
│   │   ├── shared/          # Shared components and utilities
│   │   └── config/          # Configuration files
│   └── package.json
├── daraja-graphql-server/   # Apollo Server backend
│   ├── src/
│   │   ├── typeDefs/        # GraphQL type definitions
│   │   ├── resolvers/       # GraphQL resolvers
│   │   └── datasources.ts   # Data source implementations
│   └── package.json
└── mpesa-sdk-node/          # TypeScript SDK
    ├── src/
    └── package.json
```

## Technology Stack

### Frontend
- Next.js 15 with React 19
- Material-UI (MUI) v7
- [Apollo Client](https://www.apollographql.com/docs/react/)
- [TanStack Query](https://tanstack.com/query/latest)
- MDX for documentation
- Anthropic SDK for AI features
- [Algolia](https://www.algolia.com/doc/) for search

### Backend
- Express 5
- [Apollo Server](https://www.apollographql.com/docs/apollo-server/) 5
- TypeScript
- RESTful data sources

### Infrastructure
- [Turborepo](https://turbo.build/repo/docs) for monorepo management
- pnpm workspaces
- Netlify deployment (frontend)

## Features

### AI Documentation Assistant

The platform integrates Claude AI to provide context-aware assistance for the Daraja API. Documentation content is indexed using [Supermemory](https://supermemory.ai), enabling the assistant to retrieve relevant context when answering questions. The system processes MDX files, extracts content, and builds a searchable knowledge base that Claude references during conversations.

When a user asks a question, the system:
1. Queries the indexed documentation for relevant sections
2. Passes the context to Claude via the Anthropic SDK
3. Returns responses that reference specific documentation

This enables accurate answers to integration questions like callback handling, authentication flows, and API error troubleshooting.

Implementation: `apps/daraja-docs-platform/src/app/api/ask-docs/route.ts` and `apps/daraja-docs-platform/src/app/api/index-docs/route.ts`

### Interactive API Playground

The playground provides a browser-based interface for testing Daraja API endpoints. It connects to the GraphQL server, which proxies requests to the actual API while handling authentication. Users can select endpoints, configure parameters through form inputs, and view formatted responses including status codes and response bodies.

The playground uses the same [GraphQL](https://graphql.org/learn/) layer that powers the documentation site, ensuring consistent API behavior across features. Request history and response caching are handled through Apollo Client.

Location: `apps/daraja-docs-platform/src/features/playground/`

### Code Generation

Code snippets are generated using Postman's code generator library. The system converts API endpoint configurations into executable code for multiple languages and frameworks:
- Node.js (Axios, Fetch, Request)
- Python (Requests, http.client)
- cURL
- PHP, Ruby, Java, and others

The generator takes endpoint definitions including headers, authentication, and request bodies, then produces production-ready code with proper error handling and configuration.

Implementation: `apps/daraja-docs-platform/src/app/api/request-snippet-generator/route.ts`

### MDX Documentation

Documentation uses MDX (Markdown + JSX), processed server-side with `next-mdx-remote`. This enables:

- React component embedding in markdown content
- Dynamic content generation
- Consistent styling through custom component mappings
- Syntax highlighting via rehype-prism-plus
- Automatic table of contents generation from heading structure

Frontmatter metadata is extracted with gray-matter and used for page configuration, navigation structure, and SEO. Custom components override default HTML elements to provide features like code copying, themed styling, and interactive examples.

Custom components: `src/features/markdown/components/MDXComponents.tsx`

## Commands

### Monorepo Commands

```bash
pnpm dev          # Start all applications
pnpm build        # Build all applications
pnpm lint         # Lint all applications
```

### Frontend Commands

```bash
cd apps/daraja-docs-platform
pnpm dev                # Start development server
pnpm build              # Build for production
pnpm start              # Start production server
pnpm type-check         # Run TypeScript type checking
pnpm build:analyze      # Analyze bundle size
```

### Backend Commands

```bash
cd apps/daraja-graphql-server
pnpm dev                    # Start development server
pnpm build                  # Compile TypeScript
pnpm start:apollo-server    # Start production server
```

## Deployment

### Frontend

The frontend automatically deploys to Netlify when changes are merged to the `dev` branch. The deployment configuration is already set up in `netlify.toml`.

For new deployments, connect your repository to Netlify with these settings:

- Build command: `npx turbo run build --filter=daraja-docs-platform`
- Publish directory: `apps/daraja-docs-platform/.next`
- Production branch: `dev`

### Backend

The GraphQL server can be deployed to any Node.js hosting platform:

```bash
cd apps/daraja-graphql-server
pnpm build
pnpm start:apollo-server
```

Configure environment variables on your hosting platform.

## Architecture

### Monorepo Structure

The project uses [Turborepo](https://turbo.build/repo/docs) with pnpm workspaces to manage multiple applications. Turborepo handles build orchestration and caching, while pnpm workspaces manage dependencies and linking between packages. This structure enables:

- Shared TypeScript types between frontend and backend
- Coordinated builds with dependency awareness
- Selective task execution using filters
- Build caching to speed up CI/CD pipelines

The workspace configuration is defined in `pnpm-workspace.yaml`, and build tasks are configured in `turbo.json`.

### GraphQL Layer

The [GraphQL](https://graphql.org/learn/) server acts as a unified gateway, aggregating data from multiple sources:

- **Daraja API** — Proxies requests to Safaricom's M-Pesa API
- **GitHub API** — Fetches repository statistics and release information
- **Hashnode/Dev.to** — Aggregates blog posts about M-Pesa integration

Each data source is implemented using Apollo's RESTDataSource pattern, providing consistent error handling, caching, and request deduplication. The server runs on Express with Apollo Server middleware, handling authentication via request headers that are passed through to the context.

This architecture centralizes API logic, enabling the frontend to fetch related data in single GraphQL queries while the server handles rate limiting, authentication, and response transformation.

Implementation: `apps/daraja-graphql-server/src/datasources.ts`

### Context Providers

The frontend uses a nested provider architecture for state management. Providers are layered in `src/app/_components/_layout.tsx` in the following order:

1. **AppThemeProvider** — MUI theme configuration and dark/light mode
2. **ApolloClientProvider** — GraphQL client with cache configuration
3. **AuthContextProvider** — User authentication state and session management
4. **AppAIProvider** — AI assistant state and conversation history
5. **VersionManagerContextProvider** — API version selection and routing

Provider order matters because inner providers may depend on outer ones (e.g., Apollo depends on theme for loading states). Each provider exports custom hooks (`useAuth()`, `useAI()`, etc.) that should be used instead of accessing contexts directly. This pattern ensures proper type safety and prevents context access outside the provider tree.

## Contributing

Contributions are welcome. Please follow the standard GitHub flow:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

Pre-commit hooks will run automatically via Husky. Ensure your code passes linting and type checking before submitting.

Run type checking:
```bash
pnpm type-check
```

## Troubleshooting

### Module Not Found Errors

Restart the development server after installing new packages. Turbopack typically detects changes automatically, but manual restarts may occasionally be necessary.

### Port Conflicts

If the GraphQL server fails to start, verify that port 4000 is available:

```bash
# macOS/Linux
lsof -i :4000

# Windows
netstat -ano | findstr :4000
```

### Build Memory Issues

Increase Node.js heap size if builds fail with memory errors:

```bash
NODE_OPTIONS=--max_old_space_size=4096 pnpm build
```

### Cache Issues

Clear Turborepo cache and rebuild if you encounter unexpected issues:

```bash
rm -rf apps/*/dist apps/*/.next apps/*/node_modules
pnpm install
pnpm build
```

## License

MIT
