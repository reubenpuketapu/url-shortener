import { environment } from './environment/environment.js';
import server from './http/server.js';
import { setupDbConnection } from './infrastructure/db.js';

const port = environment.port;

server.listen(port, async () => {
  setupDbConnection();
  console.log(`server started at http://localhost:${port}`);
});


export default server;