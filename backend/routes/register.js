
//const { subscribe } = require('diagnostics_channel');
const express = require('express');
const router = express.Router();

const fs = require('fs');
const path = require('path');


router.post('/', (req, res) => {
    const { fname, lname, email, password, category } = req.body;
    if (!fname || !lname || !email || !password || !category ) {
        return res.status(400).json({ status: "โปรดใส่ข้อมูลให้ครบ" });
    }
    const user = { userAt: new Date(), fname, lname, email, password, category};

    const filePath = path.join(__dirname, '..', 'data', 'user.json');


    let users = [];

    if (fs.existsSync(filePath)) {
        const filedata = fs.readFileSync(filePath, 'utf-8').trim();
        if (filedata) {
            users = JSON.parse(filedata);
            const existingUser = users.find(u => u.email === email);
            if (existingUser) {
                return res.status(409).json({ status: "This email has already been used." });
            }
        }
    } else {
        fs.writeFileSync(filePath, '[]');
    }

    if (fs.existsSync(filePath)) {
        //file is there
        const filedata = fs.readFileSync(filePath, 'utf-8');
        users = JSON.parse(filedata);
        users.push(user);
        fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
        //res.status(200).json({ status: "Message Recieved" });
        return res.status(400).json({ status: "Register successfully" });
    } else {
        //no file
        users.push(user);
        fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
        //res.status(200).json({ status: "Message Recieved" });
        return res.status(400).json({ status: "Register successfully" });
    }
});

module.exports = router;
