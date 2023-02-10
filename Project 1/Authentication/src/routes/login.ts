import { Request, Response } from 'express';
import { RowDataPacket } from 'mysql2';
import jwt from 'jsonwebtoken';
import { connection } from '../db-connection';
require('dotenv').config()

export const login = (req: Request, res: Response) => {
    try {
      const { email, password } = req.body as {
        email: string;
        password: string;
      };
  
      connection.query(
        'SELECT * FROM users WHERE email = ? AND password = ?',
        [email, password],
        (error, results: RowDataPacket[]) => {
          if (error) {
            return res.status(500).send({ error });
          }
          if (!results.length) {
            return res.status(400).send({ message: 'Invalid credentials' });
          }
          console.log(process.env.JWT_SECRET);
          const token = jwt.sign(
            { id: results[0].id, email: results[0].email },
            process.env.JWT_SECRET as string,
            {
              expiresIn: process.env.JWT_EXPIRES_IN
            }
          );
          connection.query(
            'INSERT INTO `user-token` (`token`, `user-id`) VALUES (?, ?)',
            [token, results[0].id])
          return res.send({ message: 'Login successful', user: results[0], token });
        }
      );
    }
    catch (error) {
      return res.status(500).send({ message: 'Something is wrong' });
    }
  };
  