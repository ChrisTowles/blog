import { readConfig } from './config.ts';
import { createEngine } from './engine.ts';
import { createAviationServer } from './server.ts';

const config = readConfig(process.env);

const started = Date.now();

const engine = await createEngine(config);

const server = createAviationServer(engine);

server.listen(config.port, '0.0.0.0', () => {
  console.log(`aviation container ready on :${config.port} in ${Date.now() - started}ms`);
});

process.on('SIGTERM', () => {
  server.close(() => process.exit(0));
});
