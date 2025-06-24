const express = require('express');
const router = express.Router();

const fs = require('fs');
const path = require('path');

router.post("/", (req, res) => {
    const { email, password } = req.body;
    const filePath = path.join(__dirname, "..", "data", "user.json");
    const fileData = fs.readFileSync(filePath, "utf-8").trim();

    if (!email || !password) {
        return res.status(400).json({ status: "fail" });
    }

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ status: "No user" });
    }

    const users = JSON.parse(fileData);
    const user = users.find(u => u.email === email);
    if (!user) {
        return res.status(401).json({ status: "Incorrected Username" });
    }

    if (user.password !== password) {
        return res.status(401).json({ status: "Incorrected Password." });
    }

    return res.status(200).json({ status: "Login successfully." });

});

module.exports = router;