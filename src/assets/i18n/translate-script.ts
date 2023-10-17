const translate = require('translate-google');
const fs = require('fs');
const path = require('path');

interface Translations {
  [key: string]: string;
}

async function translateFiles() {
  const baseFilePath = path.join(__dirname, 'en.json');
  const targetLanguages = ['hi', 'nl', 'es'];

  if (!fs.existsSync(baseFilePath)) {
    console.error(`Error: File 'en.json' not found at path ${baseFilePath}`);
    return;
  }

  for (const language of targetLanguages) {
    const targetFilePath = path.join(__dirname, `${language}.json`);

    try {
      console.log(`Translating to ${language}...`);

      const content = fs.readFileSync(baseFilePath, 'utf-8');
      const jsonContent: Translations = JSON.parse(content);

      const translatedValues: Translations = {};
      for (const key in jsonContent) {
        if (jsonContent.hasOwnProperty(key)) {
          const translated = await translate(jsonContent[key], { to: language });
          translatedValues[key] = translated;
        }
      }

      const translatedJson = JSON.stringify(translatedValues, null, 2);

      console.log(`Translation for ${language}:`);
      console.log(translatedJson);

      // Example: Save to file
      fs.writeFileSync(targetFilePath, translatedJson);
      console.log(`Translation saved to ${targetFilePath}`);
    } catch (error) {
      console.error(`Error translating file for ${language}:`, error);
    }
  }
}

translateFiles();
