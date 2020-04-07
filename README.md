# Cloudflare Worker TypeScript Router

This repository is TypeScript translation of the more common JS example hosted on the Cloudflare worker website. You can view the original implementation [here](https://github.com/cloudflare/worker-template-router).

However, **there are few more additions that are worth noting** to do improve the developer experience and make it more "express-esque".

- A `App` class to intake instances of the `Router` Class
- Type Generics can be supplied to route declarations to further validate the output of their handlers
- Architecture breaks features up into more `.service`, `.router` and `.worker` files
- Utilizes a generic error utility and formatting mechanism that is sent back through the API when an error is encountered

This repository is a **template** and can be cloned and then subsequently updated

## Getting Started

### Install the dependencies

```bash
yarn
```

### Start the development environment

There are two `package.json` scripts that can be run to start _a_ development version of your worker

#### `yarn start`

Builds the development webpack bundle and then opens up the Cloudflare worker sandbox environment where you can test your requests live.

#### `yarn dev`

Runs the development webpack bundle in watch mode. Code changes will be updated and bundled but you won't be able to test them using the worker sandbox

## Deploying your worker

This worker can be deployed using 1 of the two methodologies.

1. [**Wrangler**](./docs/deployment-wrangler.md)
2. [Serverless Framework](./docs/deployment-serverless.md)

Click on the options to view the documentation around deployment

## Architecture

Documentation coming soon!
