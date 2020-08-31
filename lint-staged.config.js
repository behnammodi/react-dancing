module.exports = {
  '**/*.{js,jsx,ts,tsx}': (filenames) => [
    ...filenames.map((filename) => `prettier --write '${filename}'`),
    ...filenames.map((filename) => `eslint '${filename}' --fix`),
    ...filenames.map((filename) => `git add '${filename}'`),
  ],
  '**/*.{md}': (filenames) => [
    ...filenames.map((filename) => `prettier --write '${filename}'`),
    ...filenames.map((filename) => `git add '${filename}'`),
  ],
};
