const server = require("node-http-server");

server.deploy({
  port: 80,
  https: {
    privateKey: `./private.key`,
    certificate: `./certificate.crt`,
    port: 443,
    only: true
  }
});
