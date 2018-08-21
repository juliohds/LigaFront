const server = require("node-http-server");

server.deploy({
  port: 80,
  domain:'juliohenrique.me',
  https: {
    ca: `./ca_bundle.crt`,
    privateKey: `./private.key`,
    certificate: `./certificate.crt`,
    port: 443,
    only: true
  }
});
