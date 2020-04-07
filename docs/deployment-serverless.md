# Deploying using the Serverless Framework

## Before you continue, there are some limitations...

There seems to be a gap between the features that `wrangler` offers and what the serverless plugin is capable of. The main gotchas are below

### Limitation #1: Additional / Custom Routes

Cloudflare allows you to deploy your worker at additional routes. So for instance, your worker is deployed to `something.workers.dev` but you want it to be deployed to a custom domain of `https://api.something.com`.

There currently is no way to define an additional route for a worker in the Serverless plugin. If you're cool with just using your `workers.dev` domain, feel free to continue on.

A GitHub issue has been raised by yours truly to track this. https://github.com/cloudflare/serverless-cloudflare-workers/issues/50

## Deploying

### Add environment variables

You're going to need a few environment variables to start as the the serverless framework requires a few in order to make a connection to the Cloudflare workers service.

Create an `.env` file at the root of the directory and add the below values to it

```bash
export CLOUDFLARE_ACCOUNT_ID=<cloudflare_account_id>
export CLOUDFLARE_ZONE_ID=<cloudflare_zone_id>
export CLOUDFLARE_AUTH_KEY=<cloudflare_api_key>
export CLOUDFLARE_AUTH_EMAIL=<email_you_sign_in_to_cloudflare_with>
```

### Considering webpack

Webpack is critical to bundling up your worker. Since the serverless plugin doesn't include any functionality to push to dev, you should always use the production webpack config or run your webpack config in production mode when deploying using the serverless framework.

Define the webpack config in your service so every worker (in this case it's only 1) will be bundled using the production instance of your webpack config

```yaml
service:
  name: api
  # give it a path to your webpack config
  webpackConfig: webpack/webpack.config.prod
  config:
    accountId: ${env:CLOUDFLARE_ACCOUNT_ID}
    zoneId: ${env:CLOUDFLARE_ZONE_ID}
```

### Use `yarn` to interface the Serverless Framework

Since installing `npm` package globally is considered an anti-pattern these days, `serverless` has been install as a development dependency in this repo and scripts have been created inside of the `package.json` to use it.

Below are the `yarn` scripts to run in order to interface the Serverless CLI.

#### `deploy`

Deploys the worker to your cloudflare account

```bash
yarn serverless:deploy
```

#### `remove`

Removes the worker from your cloudflare account

```bash
yarn serverless:remove
```

## Limitations

- dev environments aren't supported yet
