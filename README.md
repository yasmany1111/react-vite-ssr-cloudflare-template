# React Vite SSR Cloudflare starter template

## Description

This project leverages the power of Cloudflare technologies including Cloudflare pages, Cloudflare workers, KV and R2 buckets. Developed with the modern tools of vite and React, the project serves SSR and assets and also implements an API which connects to KV and R2 buckets.

## Getting Started

These instructions guide you on how to get the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, you will need to have the following tools installed on your machine:

- Node.js (Installation guide: [link](https://nodejs.org/en/download/))
- npm (comes with Node.js)
- Vite (Installation guide: `$ npm install -g create-vite`)
- React (Installation guide: `$ npm install -g create-react-app`)
- Wrangler CLI (Installation guide: `$ npm install -g @cloudflare/wrangler`)

### Installation

1. Clone the repo:

```bash
$ git clone https://github.com/your_username_/Project-Name.git
```

2. Install NPM packages:

```bash
$ npm install
```

## Development

1. Run the following command to start the development server:

```bash
$ npm run dev
```

### Building

1. After you've completed your development, build for production:

```bash
$ npm run build
```

## Deployment

Before deploying, configure `wrangler.toml` file with your Cloudflare information. Be sure to replace `account_id` with your Cloudflare account ID, `kv-namespace-id` with your KV Namespace ID and `r2-bucket` with your R2 bucket.

To deploy:

```bash
$ npm run deploy
```

## Built With

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling
- [Cloudflare Pages](https://pages.cloudflare.com/) - A JAMstack platform for frontend developers from Cloudflare
- [Cloudflare Workers](https://workers.cloudflare.com/) - Serverless platform from Cloudflare

## Contributing

We value your contributions. Please read `CONTRIBUTING.md` for details on our code of conduct, and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the `LICENSE.md` file for details.

## Questions?

If you have any questions, please file an issue in the GitHub Issue Tracker. We will address it as soon as possible.
