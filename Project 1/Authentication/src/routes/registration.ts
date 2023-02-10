import { Request, Response } from 'express';
import { RowDataPacket } from 'mysql2';
import { connection } from '../db-connection';
require('dotenv').config()

export const register = (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body as {
      username: string;
      email: string;
      password: string;
    };

    connection.query(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, password],
      (error, results: RowDataPacket[]) => {
        if (error) {
          return res.status(500).send({ error });
        }
        return res.send({ message: 'User registered successfully' });
      }
    );
  } catch (error) {
    return res.status(500).send({ message: 'Something is wrong' });
  }
};