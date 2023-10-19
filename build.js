const fs = require("fs");
const path = "dist/vivada-ui/main.js"; // Adjust 'your-app-name' to the actual name of your Angular app

fs.readFile(path, "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const result = data
    .replace(/REPLACE_WITH_API_URL/g, process.env.API_URL)
    .replace(
      /REPLACE_WITH_HASURA_ADMIN_SECRET/g,
      process.env.HASURA_ADMIN_SECRET
    );

  fs.writeFile(path, result, "utf8", (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Environment variables replaced successfully.");
    }
  });
});
