"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_config_1 = __importDefault(require("../config/db.config"));
const commonFunctions_1 = require("../common/commonFunctions");
const google_auth_library_1 = require("google-auth-library");
const auth = express_1.default.Router();
// const client = new OAuth2Client(process.env.CLIENT_ID);
auth.use((req, res, next) => {
    console.log('Time: ', Date.now());
    next();
});
auth.post('/', (req, res) => {
    res.send(req.body);
});
auth.post('/register', (req, res) => {
    const { email, firstName, lastName, mobile } = req.body;
    db_config_1.default.query('INSERT INTO users SET ?', Object.assign(Object.assign({}, req.body), { password: (0, commonFunctions_1.generateRandomPassword)(5) }), (err, result) => {
        console.log(result);
        if (err) {
            console.error('Error creating record: ', err);
            res.status(500).send('Error creating record');
            return;
        }
        res.send(result);
    });
});
auth.get('/', (req, res) => {
    res.send('hey google');
});
auth.post('/login', (req, res) => {
    res.send(req);
});
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
const oAuth2Client = new google_auth_library_1.OAuth2Client(process.env.CLIENT_ID, process.env.CLIENT_SECRET, 'postmessage');
auth.post('/socialLogin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tokens } = yield oAuth2Client.getToken(req.body.code);
    console.log(tokens);
    res.json(tokens);
}));
exports.default = auth;
