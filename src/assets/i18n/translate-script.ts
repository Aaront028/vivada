// const { translateFile } = require('auto-i18n');
// const path = require('path');
// const fs = require('fs');
// // require('dotenv').config();
// // const apiKey = process.env.GOOGLE_CLOUD_API_KEY;


// async function translateFiles() {
//   const baseFilePath = path.join(__dirname, 'en.json');
//   const targetLanguages = ['fr', 'nl', 'es'];

//   if (!fs.existsSync(baseFilePath)) {
//     console.error(`Error: File 'en.json' not found at path ${baseFilePath}`);
//     return;
//   }

//   for (const language of targetLanguages) {
//     const targetFilePath = path.join(__dirname, `${language}.json`);

//     try {
//       const translated = await translateFile(baseFilePath, language);

//       console.log(`Translation for ${language}:`);
//       console.log(translated);

//       // Example: Save to file
//       fs.writeFileSync(targetFilePath, JSON.stringify(translated, null, 2));
//       console.log(`Translation saved to ${targetFilePath}`);
//     } catch (error) {
//       console.error(`Error translating file for ${language}:`, error);
//     }
//   }
// }
// const translate = require('google-translate-api');
// const fs = require('fs');
// const path = require('path');

// async function translateFiles() {
//   const baseFilePath = path.join(__dirname, 'en.json');
//   const targetLanguages = ['fr', 'nl', 'es'];

//   for (const language of targetLanguages) {
//     try {
//       console.log(`Translating to ${language}...`);

//       const { text } = await translate(fs.readFileSync(baseFilePath, 'utf8'), { to: language });

//       console.log(`Translation for ${language}:`);
//       console.log(text);

//       // Example: Save to file (You may need to use a file-writing library here)
//       fs.writeFileSync(path.join(__dirname, `${language}.json`), JSON.stringify({ translated: text }, null, 2));
//     } catch (error: any) {
//       console.error(`Failed to translate to ${language}: ${error.message}`);
//       console.error('Error details:', error);
    
//       // Check if the error object has a response property before accessing its properties
//       if (error.response) {
//         console.error('Request:', error.response.request); // Log the request details
//         console.error('Response:', error.response.data);   // Log the response details
//       }
//     }
    
    
//   }
// }

// translateFiles();


// translateFiles();

// const translate = require('translate-google');
// const fs = require('fs');
// const path = require('path');

// async function translateFiles() {
//   const baseFilePath = path.join(__dirname, 'en.json');
//   const targetLanguages = ['fr', 'nl', 'es'];

//   for (const language of targetLanguages) {
//     try {
//       console.log(`Translating to ${language}...`);

//       const translated = await translate(baseFilePath, { to: language });

//       console.log(`Translation for ${language}:`);
//       console.log(translated);
//       console.log("Raw output:", translated);

//       // Example: Save to file (You may need to use a file-writing library here)
//       fs.writeFileSync(path.join(__dirname, `${language}.json`), JSON.stringify(translated, null, 2));
//     } catch (error:any) {
//       console.error(`Failed to translate to ${language}: ${error.message}`);
//       console.error('Error details:', error);
//     }
//   }
// }

// translateFiles();

const translate = require('translate');
const fs = require('fs');
const path = require('path');

async function translateFiles() {
  const baseFilePath = path.join(__dirname, 'en.json');
  const targetLanguages = ['fr', 'nl', 'es'];

  for (const language of targetLanguages) {
    try {
      console.log(`Translating to ${language}...`);

      const translated = await translate(baseFilePath, { to: language });

      console.log(`Translation for ${language}:`);
      console.log(translated);

      // Example: Save to file (You may need to use a file-writing library here)
      fs.writeFileSync(path.join(__dirname, `${language}.json`), JSON.stringify(translated, null, 2));
    } catch (error:any) {
      console.error(`Failed to translate to ${language}: ${error.message}`);
      console.error('Error details:', error);
    }
  }
}

translateFiles();
