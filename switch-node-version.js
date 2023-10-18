const { execSync } = require("child_process");

const switchToNodeVersion = (version) => {
  try {
    execSync(`nvm install ${version}`);
    execSync(`nvm use ${version}`);
  } catch (error) {
    console.error(
      `Error switching to Node.js version ${version}:`,
      error.message
    );
    process.exit(1);
  }
};

// Switch to Node.js version 14 for the first part of the build
switchToNodeVersion("14");
