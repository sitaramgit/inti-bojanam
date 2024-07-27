import express from 'express';
import { Request, Response, NextFunction } from 'express';
import connection from '../config/db.config';
import { generateRandomPassword, generateToken } from '../common/commonFunctions';
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

auth.post('/register', async (req: Request, res: Response) => {
    const { email, firstName, lastName, mobile } = req.body;
    // Check if the email already exists
    connection.query('SELECT * FROM users WHERE email = ?', [email], (err, results: any) => {
        if (err) {
            console.error('Error checking email: ', err);
            res.status(500).json({
                success: false,
                message: 'Error processing request',
                error: err.message
            });
            return;
        }

        if (results.length > 0) {
            res.status(400).json({
                success: false,
                message: 'Email already exists'
            });
            return;
        }
        connection.query('INSERT INTO users SET ?', { ...req.body, password: generateRandomPassword(5) }, (err, result) => {
            if (err) {
                console.error('Error creating record: ', err);
                res.status(500).json({
                    success: false,
                    message: 'Error processing request',
                    error: err.message
                });
                return;
            }

            res.json({
                success: true,
                data: result
            });
        });
    });

})

  auth.get('/', (req: any, res: any) => {
    
    res.send('hey google')
  })

  auth.post('/login', async (req: any, res: any) => {
    const {email, password} = req.body;
    
     connection.query('SELECT * FROM users WHERE email = ? and password = ?', [email, password], (err, result: any) => {
        console.log(result)
        if(result?.length){
            const userData = result[0];
            res.status(200).json({ token: generateToken(userData.id, userData.email)});
        }else{
             res.status(401).json({ error: 'Authentication failed' });
        }
        
     });

    
    
  })

const oAuth2Client = new OAuth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    'postmessage',
);

auth.post('/socialLogin', async (req: Request, res: Response) => {
    try {
        const { tokens } = await oAuth2Client.getToken(req.body.code);
        const googleToken: any = jwt.decode(tokens.id_token);

        connection.query('SELECT * FROM users WHERE email = ?', [googleToken.email], (err, result: any) => {
            if (err) {
                console.error('Error checking user: ', err);
                res.status(500).json({
                    success: false,
                    message: 'Error checking user',
                    error: err.message
                });
                return;
            }

            if (result.length > 0) {
                connection.query('UPDATE users SET token = ? WHERE id = ?', [tokens.id_token, result[0].id], (updateErr: any) => {
                    if (updateErr) {
                        console.error('Error updating user token: ', updateErr);
                        res.status(500).json({
                            success: false,
                            message: 'Error updating user token',
                            error: updateErr.message
                        });
                        return;
                    }
                    const userData = result[0];
                    res.status(200).json({ token: generateToken(userData.id, userData.email)});
                });
            } else {
                const payload = {
                    firstName: googleToken.given_name,
                    lastName: googleToken.family_name,
                    email: googleToken.email,
                    socialName: googleToken.name,
                    socialPicture: googleToken.picture,
                    token: tokens.id_token,
                    isSocialUser: true,
                    password: generateRandomPassword(5)
                };

                connection.query('INSERT INTO users SET ?', payload, (insertErr: any, insertResult: any) => {
                    if (insertErr) {
                        console.error('Error creating user: ', insertErr);
                        res.status(500).json({
                            success: false,
                            message: 'Error creating user',
                            error: insertErr.message
                        });
                    }
                    res.status(200).json({ token: generateToken(insertResult.insertId, googleToken.email)});
                });
            }
        });
    } catch (error: any) {
        console.error('Google authentication issue: ', error);
        res.status(400).json({
            success: false,
            message: 'Google authentication issue',
            error: error.message
        });
    }
});

  export default auth;