import http from 'http';
import app from './src/app.js';

const port = 3000;
const server = http.createServer(app);

server.listen(port, () => {
     // eslint-disable-next-line no-console
     console.log(`Example app listening on port ${port}!`);
});
