import * as express from 'express';
import { Message } from '@food-app/api-interfaces';
import { findAllUsers } from './app/user.prisma';

const app = express();

const greeting: Message = { message: 'Welcome to api! Kevin here' };

app.get('/api', async (_req, res) => {
  const usersList = await findAllUsers()
  res.send(usersList);
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log('Listening at http://localhost:' + port + '/api');
});
server.on('error', console.error);
