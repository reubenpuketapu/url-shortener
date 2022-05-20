import cors from 'cors';
import express from 'express';

import { routes } from './routes';

const server = express();

const options: cors.CorsOptions = {
  origin: ['http://localhost:3000']
};

server.use(cors(options));

server.use(express.json());

server.use(function (req, res, next) {
    res.type('application/json');
    next();
});

routes.forEach((route) => {
    const { method, path, middleware, handler } = route;
    server[method](path, ...middleware, handler);
});

export default server;