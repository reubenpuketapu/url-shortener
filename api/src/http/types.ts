import { RequestHandler as Middleware, Request, Response} from 'express';

type Method =
  | 'get'
  | 'head'
  | 'post'
  | 'put'
  | 'delete'
  | 'connect'
  | 'options'
  | 'trace'
  | 'patch';

export const HttpResponseCode = {
    Success: 200,
    BadRequest: 400,
    NotFound: 404
}

export type Handler = (req: Request, res: Response) => Promise<any>;

export type Route = {
  method: Method;
  path: string;
  middleware: Middleware[];
  handler: Handler;
};