// src/app.ts
import express, { json, urlencoded, Response as ExResponse, Request as ExRequest } from 'express';
import swaggerUi from 'swagger-ui-express';

import { RegisterRoutes } from './Services/router/routes';
var cors = require('cors');

export const app = express();

// Use body parser to read sent json payloads
app.use(
  urlencoded({
    extended: true,
  }),
);

app.use('/src/uploads', express.static(__dirname + '/uploads'));
console.log(__dirname + 'uploads');

app.use(cors());
app.options('*', cors());
app.use('/docs', swaggerUi.serve, async (req: ExRequest, res: ExResponse) => {
  return res.send(swaggerUi.generateHTML(await require('./Services/swagger/swagger.json')));
});

app.use(json());

RegisterRoutes(app);
