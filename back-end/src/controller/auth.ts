import express from 'express';
import { Request, Response, NextFunction } from 'express';
import connection from '../config/db.config';
import { generateRandomPassword } from '../common/commonFunctions';
import { OAuth2Client, TokenPayload } from 'google-auth-library';
const jwt = require('jsonwebtoken');

const auth = express.Router();
// const client = new OAuth2Client(process.env.CLIENT_ID);

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
    const {email, password} = req.body;
    
     connection.query('SELECT * FROM users WHERE email = ? and password = ?', [email, password], (err, result: any) => {
        // console.log(result)
        if(result?.length){
            const userDeta = result[0];
            const token = jwt.sign({ id: userDeta.id, email: userDeta.email }, 'your-secret-key', {
                expiresIn: '8h',
                });
                res.status(200).json({ token });
        }else{
            return res.status(401).json({ error: 'Authentication failed' });
        }
        
        res.send(result)
     });

    
    
  })


// Middleware to verify the Google access token
// const verifyToken = async (req: any, res: Response, next: NextFunction) => {
//     const authHeader = req.headers['authorization'];
  
//     if (!authHeader) {
//       return res.status(401).json({ error: 'Unauthorized' });
//     }
  
//     const token = authHeader.split(' ')[1];
//     const ticket = await client.verifyIdToken({
//         idToken: token,
//         audience: CLIENT_ID,
//       });
//       console.log(ticket, 4444444444)
//       const payload: TokenPayload | undefined = ticket.getPayload();
//       console.log(payload,333333)
  
//     try {
    
  
//       if (!payload) {
//         return res.status(401).json({ error: 'Unauthorized' });
//       }
  
//       // Check if the user exists in the database
//       const rows: any = await connection.query('SELECT * FROM users WHERE email = ?', [payload.email]);
  
//       if ((rows as any[]).length === 0) {
//         return res.status(401).json({ error: 'User not found' });
//       }
  
//       req.user = (rows as any[])[0];
//       next();
//     } catch (error) {
//       console.error(error);
//       res.status(401).json({ error: 'Unauthorized' });
//     }
//   };
//   const verifyToken2 = async (req: any, res: Response, next: NextFunction) => {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader.split(' ')[1];
//     console.log(authHeader, 1111111);
//     console.log(token, 222222)
    
//     const ticket = await client.verifyIdToken({
//         idToken: token,
//         audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
//         // Or, if multiple clients access the backend:
//         //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
//     });
//     console.log(ticket, 333333)
//     const payload = await ticket.getPayload();
//     console.log(payload, 444444444)
//     return payload;
//   }

//   const CLIENT_ID = XXX
// const CLIENT_SECRET = XXX

// initialize oathclient
const oAuth2Client = new OAuth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    'postmessage',
);

  auth.post('/socialLogin', async (req: any, res: any) => {
    const { tokens } = await oAuth2Client.getToken(req.body.code);
    const googleToken = jwt.decode(tokens.id_token)
    connection.query('SELECT * FROM users WHERE email', [googleToken.email], (err, result: any) => {
        // console.log(result)
        if(result?.length){
            res.json(tokens);
        }else{
            const payload = {
                firstName: googleToken.given_name,
                lastName: googleToken.family_name,
                email: googleToken.email,
                socialName: googleToken.name,
                socialPicture: googleToken.picture,
                token: tokens.id_token,
                isSocialUser: true
            }
            connection.query('INSERT INTO users SET ?', { ...payload, password: generateRandomPassword(5) }, (err, result) => {
                console.log(result)
                if (err) {
                    console.error('Error creating record: ', err);
                    res.status(500).send('Error creating record');
                    return;
                }

                res.json(tokens);
            });
        }})
    console.log(tokens, googleToken);
  
  res.json(tokens);
  })

  export default auth;