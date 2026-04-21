import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import playwrightPlugin from "eslint-plugin-playwright";

export default [
 {
    // Глобальні ігнори (діють на весь проект від кореня)
    ignores: [
      "**/node_modules/**",
      "tests/playwright-report/**", // шлях від кореня до звітів
      "tests/test-results/**",      // шлях від кореня до результатів
      "tests/dist/**",
      "**/.env"
    ]
  },
  {
    files: ["tests/**/*.ts"],
    plugins: {
      "@typescript-eslint": tsPlugin,
      "playwright": playwrightPlugin,
    },
    languageOptions: {
      parser: tsParser,
    },
    rules: {
      // Базові правила
      "no-console": "error",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      
      // Правила для Playwright (QA-специфіка)
      "playwright/no-skipped-test": "warn",       // Попередить, якщо забула .skip()
      "playwright/no-focused-test": "error",      // Не дасть закомітити .only() (щоб не прогнати один тест на CI)
      "playwright/missing-playwright-await": "error", // КРИТИЧНО: підсвітить забуті await перед expect/page
      "playwright/prefer-lowercase-title": "warn", // Для однаковості назв тестів
    }
  },
];