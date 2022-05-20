import { AddUrl, ListUrls } from '../controllers/UrlController';
import { Route } from './types';

export const routes: Route[] = [
  {
    method: 'post',
    path: '/urls',
    middleware: [],
    handler: AddUrl,
  },
  {
    method: 'get',
    path: '/urls',
    middleware: [],
    handler: ListUrls,
  }
];