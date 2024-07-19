"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_config_1 = __importDefault(require("../config/db.config"));
const auth = express_1.default.Router();
auth.use((req, res, next) => {
    console.log('Time: ', Date.now());
    next();
});
auth.post('/', (req, res) => {
    res.send(req.body);
});
auth.post('/register', (req, res) => {
    const { email, firstName, lastName, mobile } = req.body;
    db_config_1.default.query('INSERT INTO users SET ?', Object.assign({}, req.body), (err, result) => {
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
exports.default = auth;
