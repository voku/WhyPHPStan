import assert from 'node:assert/strict';
import test from 'node:test';
import { build } from 'vite';

test('configured React plugin builds the real TSX app without writing files', async () => {
  const result = await build({
    configFile: 'vite.config.ts',
    logLevel: 'silent',
    build: { write: false },
  });

  const outputs = Array.isArray(result) ? result : [result];
  const generated = outputs.flatMap((item) => item.output ?? []);
  const js = generated.filter((item) => item.type === 'chunk' && item.fileName.endsWith('.js'));
  const html = generated.filter((item) => item.type === 'asset' && item.fileName === 'index.html');

  assert.ok(js.length > 0, 'React/TSX bundle must be generated');
  assert.equal(html.length, 1, 'App HTML entry must be generated');
  assert.ok(js.some((item) => item.code.length > 100), 'JSX must compile into executable JavaScript');
});
