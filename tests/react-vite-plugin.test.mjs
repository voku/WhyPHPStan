import assert from 'node:assert/strict';
import test from 'node:test';
import { createServer } from 'vite';

test('configured Vite React plugin transforms the real TSX entrypoint', async () => {
  const server = await createServer({
    configFile: 'vite.config.ts',
    logLevel: 'silent',
    server: { middlewareMode: true },
  });

  try {
    const result = await server.transformRequest('/index.tsx');
    assert.ok(result, 'Expected Vite to transform index.tsx');
    assert.match(result.code, /react\/jsx-(?:dev-)?runtime/, 'Expected JSX runtime transformation');
  } finally {
    await server.close();
  }
});
