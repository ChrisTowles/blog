export default defineEventHandler((event) => {
  setResponseHeader(event, 'content-type', 'application/x-pem-file');
  return `-----BEGIN PUBLIC KEY-----\nMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE5O4nJrNYKjBHol5Xc1393QaEBU12\ni9F8c/TFlHZiraEu+6xksjmRs+EHnBc/QBQwQxkxVZ8QYhbtnJeN0jgRtw==\n-----END PUBLIC KEY-----\n`;
});
