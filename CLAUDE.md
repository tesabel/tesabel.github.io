# CLAUDE.md - Guidelines for AI Assistants

## Project Commands
- Build: `npm run build` (customize based on your project)
- Lint: `npm run lint` (customize based on your project)
- Test: `npm run test` (customize based on your project)
- Single test: `npm run test -- -t "test name"` (customize based on your project)

## Code Style Guidelines
- **Formatting**: Use ESLint/Prettier for consistent formatting
- **Imports**: Group imports (1: external, 2: internal, 3: relative), alphabetical order
- **Types**: Use TypeScript with explicit typing, avoid `any`
- **Naming**: camelCase for variables/functions, PascalCase for classes/components
- **Components**: One component per file, use functional components with hooks
- **Error Handling**: Use try/catch for async operations, proper error propagation
- **Comments**: Document complex logic, avoid unnecessary comments
- **Testing**: Write unit tests for all business logic, use descriptive test names

Update this file as your project evolves with specific commands and requirements.