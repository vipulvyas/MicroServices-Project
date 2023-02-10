import express from 'express';
import bodyParser from 'body-parser';
import { register, login, validateToken } from './routes/index';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/auth/register', register);
app.post('/api/auth/login', login);
app.post('/api/auth/validatetoken', validateToken)

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});