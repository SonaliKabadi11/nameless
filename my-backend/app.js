const express = require('express');
const cors = require('cors');

require('dotenv').config();
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');


const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});