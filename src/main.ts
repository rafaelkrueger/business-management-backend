import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import * as https from 'https';
import * as fs from 'fs';
import * as http from 'http';

const port = process.env.PORT || 3005;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(bodyParser.json({ limit: '100000mb' }));
  app.use(bodyParser.urlencoded({ limit: '100000mb', extended: true }));

  const config = new DocumentBuilder()
    .setTitle('Business Management')
    .setDescription('Application to manage your enterprise')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Load your SSL certificate and key
  const sslOptions = {
    key: fs.readFileSync('/etc/letsencrypt/live/roktune.duckdns.org/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/roktune.duckdns.org/fullchain.pem'),
  };

  // Create an HTTPS server
  const httpsServer = https.createServer(sslOptions, app.getHttpAdapter().getInstance());

  // Start the HTTPS server
  httpsServer.listen(port, () => {
    console.log(`HTTPS Server running on port ${port}`);
  });

  // Redirect HTTP to HTTPS
  http.createServer((req, res) => {
    res.writeHead(301, { Location: `https://${req.headers.host}${req.url}` });
    res.end();
  }).listen(80, () => {
    console.log('HTTP Server running on port 80 and redirecting to HTTPS');
  });
}
bootstrap();
