// vitest.setup.ts (create in project root or src/)
import { expect, afterEach } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers'; // ← correct import
import { cleanup } from '@testing-library/react';

// Extend Vitest expect with jest-dom matchers
expect.extend(matchers);

// Cleanup after each test (unmount React components)
afterEach(() => {
  cleanup();
});