import express from 'express';
import { Request, Response, NextFunction } from 'express';
import connection from '../config/db.config';
const auth = express.Router();

auth.use((req: Request, res: Response, next: NextFunction) => {
    console.log('Time: ', Date.now())
    next()
  });

  auth.post('/', (req: Request, res: Response) => {
    res.send(req.body)
  })
  auth.post('/register', (req: Request, res: Response) => {
    const {email, firstName, lastName, mobile} = req.body;
    connection.query('INSERT INTO users SET ?', { ...req.body }, (err, result) => {
        if (err) {
            console.error('Error creating record: ', err);
            res.status(500).send('Error creating record');
            return;
        }

        res.send(result);
    });
  })
  auth.get('/', (req: any, res: any) => {
    res.send('hey google')
  })

  auth.post('/login', (req: any, res: any) => {
    res.send(req)
  })

  export default auth;