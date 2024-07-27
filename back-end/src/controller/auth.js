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
const jwt = require('jsonwebtoken');
const auth = express_1.default.Router();
// const client = new OAuth2Client(process.env.CLIENT_ID);
auth.use((req, res, next) => {
    console.log('Time: ', Date.now());
    next();
});
auth.post('/', (req, res) => {
    res.send(req.body);
});
auth.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, firstName, lastName, mobile } = req.body;
    // Check if the email already exists
    db_config_1.default.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
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
        db_config_1.default.query('INSERT INTO users SET ?', Object.assign(Object.assign({}, req.body), { password: (0, commonFunctions_1.generateRandomPassword)(5) }), (err, result) => {
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
}));
auth.get('/', (req, res) => {
    res.send('hey google');
});
auth.post('/login', (req, res) => {
    const { email, password } = req.body;
    db_config_1.default.query('SELECT * FROM users WHERE email = ? and password = ?', [email, password], (err, result) => {
        // console.log(result)
        if (result === null || result === void 0 ? void 0 : result.length) {
            const userDeta = result[0];
            const token = jwt.sign({ id: userDeta.id, email: userDeta.email }, 'your-secret-key', {
                expiresIn: '8h',
            });
            res.status(200).json({ token });
        }
        else {
            return res.status(401).json({ error: 'Authentication failed' });
        }
        res.send(result);
    });
});
const oAuth2Client = new google_auth_library_1.OAuth2Client(process.env.CLIENT_ID, process.env.CLIENT_SECRET, 'postmessage');
auth.post('/socialLogin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tokens } = yield oAuth2Client.getToken(req.body.code);
        const googleToken = jwt.decode(tokens.id_token);
        db_config_1.default.query('SELECT * FROM users WHERE email = ?', [googleToken.email], (err, result) => {
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
                db_config_1.default.query('UPDATE users SET token = ? WHERE id = ?', [tokens.id_token, result[0].id], (updateErr) => {
                    if (updateErr) {
                        console.error('Error updating user token: ', updateErr);
                        res.status(500).json({
                            success: false,
                            message: 'Error updating user token',
                            error: updateErr.message
                        });
                        return;
                    }
                    res.json({
                        success: true,
                        tokens
                    });
                });
            }
            else {
                const payload = {
                    firstName: googleToken.given_name,
                    lastName: googleToken.family_name,
                    email: googleToken.email,
                    socialName: googleToken.name,
                    socialPicture: googleToken.picture,
                    token: tokens.id_token,
                    isSocialUser: true,
                    password: (0, commonFunctions_1.generateRandomPassword)(5)
                };
                db_config_1.default.query('INSERT INTO users SET ?', payload, (insertErr, insertResult) => {
                    if (insertErr) {
                        console.error('Error creating user: ', insertErr);
                        res.status(500).json({
                            success: false,
                            message: 'Error creating user',
                            error: insertErr.message
                        });
                        return;
                    }
                    res.json({
                        success: true,
                        tokens
                    });
                });
            }
        });
    }
    catch (error) {
        console.error('Google authentication issue: ', error);
        res.status(400).json({
            success: false,
            message: 'Google authentication issue',
            error: error.message
        });
    }
}));
exports.default = auth;
