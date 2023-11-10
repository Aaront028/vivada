# VivadaUi
Welcome to this repository! This repo contains the Angular-based UI for Vivada app, a platform designed for adding claims and evidence backing toward agree or disagree. The UI is configured with an API connected to a GraphQL test dataset, offering a seamless experience with comprehensive CRUD functionality. The codebase is implemented using Angular and ngxs for state management, featuring simulated claims data, payload, and states. The `app.component.html` file includes a simple call to list claims. This README file provides all the information you need to set up and explore the project.


# Local Setup


Before proceeding, make sure you have the Angular CLI installed globally. If you haven't done so already, you can install it by running:
```bash
npm install -g @angular/cli
```

**Versions**

- Node v18.18.0
- NPM v9.8.1
- Angular CLI 16.2.6

1. Open a terminal.
2. Run the following command to download and install NVM:
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```
3. Close and reopen your terminal, or run the following command to apply the changes:
```bash
source ~/.bashrc
```
If you're using Zsh, replace `~/.bashrc` with `~/.zshrc.`
4. Verify that NVM is installed by running:
```bash
nvm --version
```
5. Now, you can use NVM to install different versions of Node.js. So in our case it's Node v18.18.0 run the following command:
```bash
nvm install 18.18.0
```
6. Verify that Node.js version 18.18.0 is now active by running:
```bash
node --version
```

Once you have cloned the repository, navigate to the project folder.
```bash
cd vivada-ui
```

Install all dependencies, including --force.
```bash
npm install --force
```

# Environment variables setup

Create a `.env` file in the root folder of the project and add the following credentials from the Discord channel:

  ```bash
NG_APP_API_URL='enter_your_api_url_here'
  ```

After setting up your environment variables, run the following command to start the development server:

```bash
ng serve
```

# Netlify Deployment Environment Variables and Setup

To deploy your Angular application to Netlify, a few configurations are necessary. By default, Angular does not recognize `process.env`, and Netlify uses `.env` environment variables instead of environment.ts. To bridge this gap, we've integrated a library called `@ngx-env/builder`. This library enables us to utilise Netlify's environment variables during the build process. We've already configured this dependency in our application to search for `process.env`.

To set up Netlify variables, follow these steps in the Netlify UI:

1. **Build Settings:**
   - Build command: `npm run build`
   - Publish directory: `dist/vivada-ui`
   - Dependency management: `18.x`

2. **Environment Variables:**
   - Prefix all variables with `NG_APP`.
   - Enter the following settings and variables:

You can import these variables into netlify's .env
```markdown
NG_APP_API_URL: 'enter_your_api_url_here'
NODE_VERSION: 18
NPM_FLAGS: --force
```

Our api url and api key is in the UI-dev channel on discord.

# Language translation script (Optional)

The language script allows you to generate translations for various languages by creating JSON files that contain the necessary variables for HTML tag modifications. Follow the steps below to run the script:

1. Open the translate-script.ts file located in src/assets/i18n/.

2. Locate the targetLanguages array on line 11 and add the initials of the languages you want to generate translations for. For example:

```bash
  const targetLanguages = ['ja', 'nl', 'es'];
```
3. Save the changes.
4. Open your terminal and navigate to the project directory.
5. Run the following command to execute the script:

```bash
npx ts-node src/assets/i18n/translate-script.ts
```

After execution, you will find automatically generated JSON files (e.g., jp.json, nl.json, es.json) in the src/assets/i18n folder.
These JSON files contain translations for the specified languages, and you can use them to modify HTML tags according to the variables. Customise the script based on your project's needs.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/vivada-ui` directory.