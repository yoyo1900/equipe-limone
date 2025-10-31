import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  // Project-specific rule overrides
  {
    rules: {
      // Allow explicit use of `any` across the project. Change to 'warn' if you prefer warnings.
      '@typescript-eslint/no-explicit-any': 'off',
      // Next.js generates some files that intentionally use `{}` for empty maps/types.
      // Disable the rule so generated types like `ParamMap` are not flagged.
      '@typescript-eslint/no-empty-object-type': 'off',
      // Next.js generated validator files use `@ts-ignore` and helper variables like
      // `handler` or `__Unused`. These are safe to ignore in generated code.
      '@typescript-eslint/ban-ts-comment': 'off',
      // Relax unused-vars slightly: keep warnings but ignore generated helpers prefixed with __
      // and the `handler` variable used only for type-checking in validator files.
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          args: 'after-used',
          varsIgnorePattern: '^(?:__|handler$)',
          argsIgnorePattern: '^_',
        },
      ],
    },
  },
]);

export default eslintConfig;
