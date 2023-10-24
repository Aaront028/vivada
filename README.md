# VivadaUi
Welcome to this repository! It's configured with a foundational template and a functional API connected to a GraphQL test dataset. The implementation includes comprehensive CRUD (Create, Read, Update, Delete) functionality with placeholder details. The codebase incorporates a basic model and ngxs setup, featuring simulated contact data, payload, and states. The app.component.html file includes a simple call to list contact names. Please note that this setup currently lacks any styling, but the essential files such as app.module.ts, graphql.module.ts, and the environment folder are all configured and ready to go.

# Local Setup
Once you have cloned the repository, navigate to the project folder.

```bash
cd vivada-ui

Install all dependencies, including --force.

bash
npm install --force

After installing dependencies, you'll need to install and run Keycloak on Docker. If Docker is not installed, download it from [here ](https://www.keycloak.org/downloads) and follow the instructions for your Operating System.

To run the Keycloak server, execute the following command in the terminal. Make sure your Docker application is running!

bash docker run -p 8080:8080 -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak:22.0.4 start-dev

Wait for the Keycloak server to start successfully. Once running, access the administration console at http://localhost:8080/, log in with admin for both username and password.

This will give you access to the master realm setup. Now click on the master dropdown menu and click on `Create Realm`. 

1. For our deployment realm, we are using the name `vivada`

`Realm name: **vivada**`

Click Create, then navigate to Users and add a user named myuser with the desired details.

Set the password in the Credentials tab, turning off Temporary.

2. Setup Clients:

Click on Clients on the left side menu and select Create client.
markdown
Client ID: vivada-local
Valid redirect URIs: http://localhost:4200/*
Web origins: http://localhost:4200
Click Save.

3. For Netlify deployment Clients repeat step 2 with Client ID as `vivada-online` and your chosen URI's and Web origins. It should look something like this.
markdown
Client ID: vivada-online
Valid redirect URIs: https://timely-salamander-2a0240.netlify.app/*
Web origins: https://timely-salamander-2a0240.netlify.app
Click Save.

These step is crucial for both local and deployment environments!

You should now be setup for local environment with Keycloak installed. 

bash ng serve

Then your application should be up and running with Keycloak. 



# Set Up Environment Files

# Environment variables setup
1. **Create the Environments Folder:**
- Inside the `app` folder of your project, create a new folder named `environments`.

2. **Generate Environment Files:**
  - For each branch or environment, create a corresponding `environment.ts` file.
    - `environment.prod.ts` for the main branch (production).
    - `environment.staging.ts` for the staging branch.
    - `environment.dev.ts` for other development branches.

3. **Folder Structure:**
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
      - environment.dev.ts
  </pre>

4. **Configure Environment Files:**
- Open each `environment.ts` file and configure the settings specific to its branch.

5. **Automatic Switching:**
By following these steps, you'll have a well-organized environments folder with dedicated environment files for each branch.

# Angular Environment Setup

In Angular, switching branches can cause environment files to disappear, leading to setup hassles and potential accidental commits. To address this, a script has been crafted for your convenience. It automatically relocates your environment folders to match the active branch, ensuring safety from unintentional commits, thanks to entries in the gitignore file.

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

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.


## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

