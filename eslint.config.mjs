// @ts-check
import tseslint from "typescript-eslint";
import eslintPluginImport from "eslint-plugin-import";
import eslint from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import globals from "globals";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: [
      "**/dist",
      "eslint.config.mjs",
      "__mocks__/**",
      "setup-vitest.ts",
    ],
  },
  eslintConfigPrettier,
  {
    languageOptions: {
      parserOptions: {
        project: true,
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      import: eslintPluginImport,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "import/consistent-type-specifier-style": ["error", "prefer-top-level"],
      "import/order": [
        "error",
        {
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
      "max-len": ["warn", { code: 100 }],
    },
    settings: {
      "import/resolver": {
        typescript: true,
        node: true,
      },
    },
  },
);
