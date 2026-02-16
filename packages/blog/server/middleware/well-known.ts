export default defineEventHandler((event) => {
  if (event.path === '/.well-known/appspecific/com.tesla.3p.public-key.pem') {
    setResponseHeader(event, 'content-type', 'text/plain');
    return '-----BEGIN PUBLIC KEY-----\nMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE5O4nJrNYKjBHol5Xc1393QaEBU12\ni9F8c/TFlHZiraEu+6xksjmRs+EHnBc/QBQwQxkxVZ8QYhbtnJeN0jgRtw==\n-----END PUBLIC KEY-----\n';
  }
});
