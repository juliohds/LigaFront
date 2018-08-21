const server=require('node-http-server');
 
const config=new server.Config;
config.errors['404']    = 'These are not the files you are looking for...';
config.contentType.mp4  = 'video/mp4';
config.port             = 8005;
config.verbose          = true;
config.root             = '~/myApp/'
config.https.privateKey = `./private.key`;
config.https.certificate= `./certificate.crt`;
config.https.port       = 4433;
config.https.only       = true;

server.deploy(config);