const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const User = require("./models/User");
const bcrypt = require("bcryptjs");
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
console.log("JWT_SECRET:", process.env.JWT_SECRET);
console.log("MONGO_URI:", process.env.MONGO_URI);

connectDB(process.env.MONGO_URI);

app.use('/api/auth', require('./routes/auth'));
app.use('/api/tasks', require('./routes/tasks'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
