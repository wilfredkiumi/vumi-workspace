# Vumi Monorepo

This is a monorepo containing two applications:

## Apps

- **vumi-gigs**: A platform for finding and posting freelance opportunities.
- **vumi-showcase**: A platform for discovering and showcasing creative portfolios.

## Packages

- **ui**: Shared UI components used by both applications.

## Getting Started

### Install dependencies

```bash
npm install
```

### Development

To run all apps (will start the first app by default):

```bash
npm run dev
```

To run a specific app:

```bash
# Using the filter parameter
npm run dev -- --filter=vumi-gigs

# Or using direct commands
npm run dev:gigs
npm run dev:showcase
```

### Build

To build all apps:

```bash
npm run build
```

To build a specific app:

```bash
npm run build -- --filter=vumi-gigs
```

### Lint

To lint all apps:

```bash
npm run lint
```

To lint a specific app:

```bash
npm run lint -- --filter=vumi-gigs
```