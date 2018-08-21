const server = require("node-http-server");

server.deploy({
  port: 8000,
  https: {
    privateKey: `./private.key`,
    certificate: `./certificate.crt`,
    port: 4433,
    only: true
  }
});
