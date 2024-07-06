const db  = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    console.log(req.body)
    const {email, password, name} = req.body;
    console.log(password, email);
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const [result] = await db.query('INSERT INTO users (email, password, name) VALUES (?,?,?)', [email, hashedPassword, name] );
        res.status(201).json({message: `User registered successfully!`});

    }catch(error){
        res.status(500).json({error: error.message});
    }

};

exports.login = async (req, res) =>{
    console.log(req.body)
    const {email, password} = req.body;
    try{
        const query = `SELECT * FROM users WHERE users.email = "${email}";`;
        console.log(query)
        const [rows] = await db.query(`SELECT * FROM users WHERE users.email = "${email}";`);
        // console.log(rows)
        if(rows.length === 0) return res.status(400).json({message: 'User not found'});

        const user = rows[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({message: 'Invalid Password'});

        const token = jwt.sign({user_id: user.user_id}, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.json({token});
    }catch(error){
        res.status(500).json({error: error.message})
    }
};

exports.verify = async(req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
}