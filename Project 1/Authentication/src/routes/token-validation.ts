import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
require('dotenv').config()

export const validateToken = (req: Request, res: Response) => {
    try {
      const { token } = req.body as {
        token: string;
      };
      jwt.verify(token, process.env.JWT_SECRET as string);
      return res.send({ message: 'Success' });
    } catch (error) {
      return res.status(400).send({ message: 'Failed' });
    }
  }