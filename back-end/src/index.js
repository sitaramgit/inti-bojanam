"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_config_1 = __importDefault(require("./config/db.config"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const auth_1 = __importDefault(require("./controller/auth"));
const app = (0, express_1.default)();
const cors = require('cors');
app.use(cors());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
dotenv_1.default.config();
app.use('/auth', auth_1.default);
app.get('/', (req, res) => {
    // res.json({ message: 'Welcome to my Node.js project with Express.js and MySQL' });
    db_config_1.default.query('SELECT * FROM posts;', function (error, results, fields) {
        if (error)
            console.log('there was an error', error);
        // connected, query complete, no errors
        console.log('the results object is:', results);
    });
    db_config_1.default.query('SELECT * FROM posts', (err, results) => {
        if (err) {
            res.status(500).send({ message: err.message });
            return;
        }
        res.send(results);
    });
});
app.listen(3000, () => {
    console.log('The application is listeninsg fon port 3000!');
});
