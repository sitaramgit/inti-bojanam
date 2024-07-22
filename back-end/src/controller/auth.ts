import express from 'express';
import { Request, Response, NextFunction } from 'express';
import connection from '../config/db.config';
import { CLIENT_ID, CLIENT_SECRET, generateRandomPassword } from '../common/commonFunctions';
import { OAuth2Client, TokenPayload } from 'google-auth-library';
const auth = express.Router();
const client = new OAuth2Client(CLIENT_ID);

auth.use((req: Request, res: Response, next: NextFunction) => {
    console.log('Time: ', Date.now())
    next()
  });

  auth.post('/', (req: Request, res: Response) => {
    res.send(req.body)
  })
  auth.post('/register', (req: Request, res: Response) => {
    const {email, firstName, lastName, mobile} = req.body;
    connection.query('INSERT INTO users SET ?', { ...req.body, password: generateRandomPassword(5) }, (err, result) => {
        console.log(result)
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


// Middleware to verify the Google access token
const verifyToken = async (req: any, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
  
    if (!authHeader) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  
    const token = authHeader.split(' ')[1];
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID,
      });
      console.log(ticket, 4444444444)
      const payload: TokenPayload | undefined = ticket.getPayload();
      console.log(payload,333333)
  
    try {
    
  
      if (!payload) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
  
      // Check if the user exists in the database
      const rows: any = await connection.query('SELECT * FROM users WHERE email = ?', [payload.email]);
  
      if ((rows as any[]).length === 0) {
        return res.status(401).json({ error: 'User not found' });
      }
  
      req.user = (rows as any[])[0];
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ error: 'Unauthorized' });
    }
  };
  const verifyToken2 = async (req: any, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];
    console.log(authHeader, 1111111);
    console.log(token, 222222)
    
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    console.log(ticket, 333333)
    const payload = await ticket.getPayload();
    console.log(payload, 444444444)
    return payload;
  }

//   const CLIENT_ID = XXX
// const CLIENT_SECRET = XXX

// initialize oathclient
const oAuth2Client = new OAuth2Client(
    CLIENT_ID,
    CLIENT_SECRET,
    'postmessage',
);

  auth.post('/socialLogin', async (req: any, res: any) => {
    console.log(req.body, 2222);

    const { tokens } = await oAuth2Client.getToken(req.body.code);
    console.log(tokens);
  
  res.json(tokens);
   
    // res.send(req)
  })

  export default auth;