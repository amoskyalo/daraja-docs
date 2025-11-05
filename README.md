# Daraja API Documentation Platform

A comprehensive, modern documentation platform for the Daraja API (M-Pesa Integration API). This project provides interactive documentation, GraphQL API exploration, and AI-powered assistance for developers integrating with the Daraja API.

## 🏗️ Architecture

This is a **Turborepo monorepo** project consisting of two main applications:

- **`daraja-docs-platform`**: Next.js 15 documentation website with AI assistance
- **`daraja-graphql-server`**: Apollo GraphQL server for API queries

### Tech Stack

#### Frontend (daraja-docs-platform)
- **Framework**: Next.js 15.4 with React 19
- **UI Library**: Material-UI (MUI) v7
- **Styling**: Emotion CSS-in-JS
- **Content**: MDX (Markdown + JSX) with syntax highlighting
- **State Management**: TanStack Query (React Query)
- **GraphQL Client**: Apollo Client
- **AI Features**: Anthropic SDK (Claude AI)
- **Search**: Algolia
- **Forms**: Formik + Yup validation
- **Icons**: Lucide React, MUI Icons
- **Code Generation**: Postman Code Generators

#### Backend (daraja-graphql-server)
- **Framework**: Express 5
- **GraphQL Server**: Apollo Server 5
- **Language**: TypeScript
- **Development**: ts-node-dev for hot reloading
- **API**: RESTful datasource integration

#### DevOps & Tooling
- **Monorepo**: Turborepo
- **Package Manager**: pnpm 9.0.0
- **Linting**: ESLint
- **Git Hooks**: Husky
- **Deployment**: Netlify (frontend)
- **Code Formatting**: Prettier

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v20.x or higher
- **pnpm**: v9.0.0 or higher
  ```bash
  npm install -g pnpm@9.0.0
  ```

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/amoskyalo/daraja-docs.git
   cd daraja-docs
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```
   
   This will install dependencies for all workspaces in the monorepo.

3. **Environment Setup** (if needed)
   
   Create environment files for each application:
   
   - **Frontend** (`apps/daraja-docs-platform/.env.local`):
     ```env
     NEXT_PUBLIC_GRAPHQL_ENDPOINT=http://localhost:4000/graphql
     NEXT_PUBLIC_ALGOLIA_APP_ID=your_algolia_app_id
     NEXT_PUBLIC_ALGOLIA_API_KEY=your_algolia_api_key
     ANTHROPIC_API_KEY=your_anthropic_api_key
     ```
   
   - **Backend** (`apps/daraja-graphql-server/.env`):
     ```env
     PORT=4000
     DARAJA_API_BASE_URL=https://api.safaricom.co.ke
     # Add other Daraja API credentials
     ```

## 💻 Development

### Run all applications in development mode

```bash
pnpm dev
```

This starts:
- Next.js app on `http://localhost:3000` (with Turbopack)
- GraphQL server on `http://localhost:4000`

### Run individual applications

**Frontend only:**
```bash
pnpm --filter daraja-docs-platform dev
```

**Backend only:**
```bash
pnpm --filter daraja-graphql-server dev
```

### Build for production

```bash
pnpm build
```

### Run production build

**Frontend:**
```bash
cd apps/daraja-docs-platform
pnpm start
```

**Backend:**
```bash
cd apps/daraja-graphql-server
pnpm start:apollo-server
```

### Linting

```bash
pnpm lint
```

## 📁 Project Structure

```
daraja-docs/
├── apps/
│   ├── daraja-docs-platform/     # Next.js documentation website
│   │   ├── src/
│   │   ├── public/
│   │   ├── .next/                # Build output
│   │   └── package.json
│   └── daraja-graphql-server/    # Apollo GraphQL server
│       ├── src/
│       ├── dist/                 # Compiled TypeScript
│       └── package.json
├── packages/                     # Shared packages (if any)
├── node_modules/
├── .husky/                       # Git hooks
├── turbo.json                    # Turborepo configuration
├── pnpm-workspace.yaml           # Workspace configuration
├── pnpm-lock.yaml
├── netlify.toml                  # Netlify deployment config
├── .prettierrc                   # Prettier configuration
└── package.json                  # Root package.json
```

## 📜 Available Scripts

### Root Level (Turborepo)

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start all apps in development mode |
| `pnpm build` | Build all apps for production |
| `pnpm lint` | Run linting across all apps |

### Frontend App (daraja-docs-platform)

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start Next.js dev server with Turbopack |
| `pnpm build` | Create production build |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm prepare` | Setup Husky git hooks |

### Backend App (daraja-graphql-server)

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start server with hot reload |
| `pnpm build` | Compile TypeScript |
| `pnpm start:apollo-server` | Start production server |

## 🌐 Deployment

### Netlify (Frontend)

The frontend is configured for automatic deployment to Netlify:

- **Build Command**: `npx turbo run build --filter=daraja-docs-platform`
- **Publish Directory**: `apps/daraja-docs-platform/.next`

The configuration is in `netlify.toml`.

### GraphQL Server

Deploy the GraphQL server to your preferred Node.js hosting platform:

1. Build the TypeScript:
   ```bash
   cd apps/daraja-graphql-server
   pnpm build
   ```

2. Start the server:
   ```bash
   pnpm start:apollo-server
   ```

## 🔑 Key Features

- **📚 Interactive Documentation**: MDX-powered documentation with code examples
- **🤖 AI Assistant**: Claude AI integration for developer assistance
- **🔍 Advanced Search**: Algolia-powered search functionality
- **📊 GraphQL Playground**: Explore Daraja API through GraphQL
- **💼 Code Generation**: Generate code snippets in multiple languages
- **📱 Responsive Design**: Mobile-friendly Material-UI interface
- **🎨 Syntax Highlighting**: Beautiful code highlighting with Prism
- **🔐 Type-safe**: Full TypeScript support
- **⚡ Performance**: Next.js 15 with Turbopack and React 19

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

**Note**: Pre-commit hooks are configured with Husky to ensure code quality.

## 📝 License

hapa sijui.

## 🆘 Support

For issues, questions, or contributions, please open an issue in the repository.

---

**Built with ❤️ for the Daraja API developer community**
