# Deploying using Wrangler

Edit the `wrangler.toml` file to update how the worker gets deployed. There are 2 scripts that are configured in the `package.json` to help you deploy your worker.

```bash
# development
yarn publish:dev

# production
yarn publish:prod

# development and production together
yarn publish
```

When running the publish commands, 2 webpack bundles are created and output in the `/dist` directory. They are named `worker.dev.js` and `worker.prod.js` for development and production respectively.

When editing the `wrangler.toml` file, ensure to follow the documentation located here to ensure that you're configuring it correctly. There are some nuances, especially with environments that you'll want to read up on.
