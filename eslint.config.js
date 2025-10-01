// eslint.config.js (ESM / flat config)
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginImport from "eslint-plugin-import";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  { ignores: ["dist", "node_modules"] },

  js.configs.recommended,

  // TypeScript + type-check (assure que ESLint trouve tsconfig)
  ...tseslint.configs.recommendedTypeChecked.map((cfg) => ({
    ...cfg,
    languageOptions: {
      ...cfg.languageOptions,
      parserOptions: {
        ...cfg.languageOptions?.parserOptions,
        project: ["./tsconfig.json", "./tsconfig.build.json"],
        tsconfigRootDir: new URL(".", import.meta.url).pathname // équivalent __dirname en ESM
      }
    }
  })),

  {
    plugins: { import: eslintPluginImport },

    // ⚠️ Indispensable pour que `import/no-unresolved` comprenne `paths` de TS
    settings: {
      "import/resolver": {
        typescript: {
          // fait pointer explicitement sur tes tsconfig
          project: ["./tsconfig.json", "./tsconfig.build.json"],
          alwaysTryTypes: true
        },
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx", ".mjs", ".cjs"]
        }
      }
    },

    rules: {
      // optionnel : ordre d'import
      "import/order": [
        "warn",
        { "newlines-between": "always", "alphabetize": { "order": "asc", "caseInsensitive": true } }
      ],

      // si tu veux être strict : active l’erreur
      "import/no-unresolved": "error"
      // (évite de le mettre à "off" ; on préfère résoudre correctement)
    }
  },

  // désactive les conflits avec Prettier
  eslintConfigPrettier
];
