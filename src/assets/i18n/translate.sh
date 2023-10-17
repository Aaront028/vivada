#!/bin/bash

# Function to perform translation and save to file
translate_and_save() {

  
  base_file="$1"
  language="$2"

  echo "Translating to $language..."

  # Use translate-shell to perform the translation
  translation=$(trans -brief -b -s en -t "$language" "$(cat "$base_file")")

  # Save the translation to a file
  echo "$translation" > "$language.json"

  echo "Translation for $language saved to $language.json"
}

# Replace 'en.json' with the actual path to your base file
base_file="en.json"

# List of target languages
target_languages=("fr" "hi" "es")

# Loop through each target language and perform translation
for lang in "${target_languages[@]}"; do
  translate_and_save "$base_file" "$lang"
done
