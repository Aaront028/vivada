# VivadaUi
Welcome to this repository! It's configured with a foundational template and a functional API connected to a GraphQL test dataset. The implementation includes comprehensive CRUD (Create, Read, Update, Delete) functionality with placeholder details. The codebase incorporates a basic model and ngxs setup, featuring simulated claim data, payload, and states. The app.component.html file includes a simple call to list claims. Please note that this setup currently lacks any styling, but the essential files such as app.module.ts, graphql.module.ts, and the environment folder are all configured and ready to go.

# Local Setup
Once you have cloned the repository, navigate to the project folder.

```bash 
cd vivada-ui
```

Install all dependencies, including --force.

```bash
npm install --force
```

# Environment variables setup
1. **The Environments Folder:**
- Inside the `src` folder of your project, there is folder named `environments`.
  - For each branch or environment, there should be corresponding `environment.ts` file.
    - `environment.prod.ts` for the main branch (production).
    - `environment.staging.ts` for the staging branch.
    - `environment.local.ts` for other development branches.

2. **Folder Structure:**
  - Your folder structure should look like this:

  <pre>
    /app
    /model
    /services
    /shared
    /state
    /assets
    /environments
      - environment.prod.ts
      - environment.staging.ts
      - environment.local.ts
  </pre>

3. **Configure Environment Files:**
- Create `environment.ts` file and configure the settings. This file will only be available to you on your local branch and will not be pushed to Gitlab. It will save you from re-entering credentials in order for the application to work. The file should look something like this

  ```bash
  export const environment = {
  production: false,
  apiUrl: 'enter_your_api_url_here',  //you can get these information from UI-dev discord channel
  hasuraAdminSecret: 'enter_your_api_key_here', //you can get these information from UI-dev discord channel
  realm: 'vivada',
  clientId: 'vivada-local'
  };
  ```

Alternatively you can create a `.env` file in the root folder of the project. Credentials are in discord channel.
  
  ```bash
NG_APP_API_URL='enter_your_api_url_here'
NG_APP_HASURA_ADMIN_SECRET='enter_your_api_key_here'
  ```

Then enter

```bash
ng serve
```

4. **Automatic Switching:**
By following these steps, you'll have a well-organized environments folder with dedicated environment files for each branch.

# Angular Environment Setup

Switching branches can cause environment files to disappear, leading to setup hassles and potential accidental commits. To address this, a script has been crafted for your convenience. It automatically relocates your environment folders to match the active branch, ensuring safety from unintentional commits, thanks to entries in the gitignore file.

# Set Up the Automatic Switching
1. **Copy the Hook Script:** Copy the post-checkout hook script into your project. The script is located at .githooks/post-checkout in the root of your project.
<pre>
cp .githooks/post-checkout .git/hooks/post-checkout
</pre>

2. **Make the Script Executable:** Ensure that the script is executable by running the following command:
<pre>
chmod +x .git/hooks/post-checkout
</pre>

3. **Set Up Environment Files:** Make sure you have environment files for each branch (e.g., environment.prod.ts, environment.staging.ts, environment.dev.ts). The hook script will automatically switch the environment.ts file when changing branches.

# Usage
- When you switch to the main branch, it will use environment.prod.ts.
- When you switch to the staging branch, it will use environment.staging.ts.
- For other branches, it will use environment.dev.ts.

Now, whenever you switch branches, the environment file will be automatically updated.

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
NG_APP_HASURA_ADMIN_SECRET: 'enter_your_api_key_here'
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

