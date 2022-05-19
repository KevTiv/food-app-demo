import * as express from 'express';
import { findAllUsers } from './app/db';

const app = express();

// TODO: authorization /authntification
// TODO: include jwt in express
// TODO: MOMO api
/*
    TODO: sign in with Firebase
    Upon success register relevant user info into Database
    Explore possibility of having jwt refresh token set with 1 week expiry time
*/
// TODO: Change password in prisma Db to auth provider?

app.use(express.json());

app.get('/api', async (_req, res) => {
  const usersList = await findAllUsers()
  const key = require('crypto').randomBytes(256).toString('hex');
  res.send({usersList, key});
});

const port = process.env.port || 3333
const server = app.listen(port, () => {
  console.log('Listening at http://localhost:' + port + '/api')
});

server.on('error', console.error);
