import { initTelemetry } from '../utils/telemetry';

export default defineNitroPlugin(async () => {
  await initTelemetry();
});
