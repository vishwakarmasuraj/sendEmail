const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
const port = process.env.PORT;
const nodemailer = require('nodemailer')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(process.env.DATABASE_CONNECTION).then(() => {
    console.log('Successfully connected to Database')
});

const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.USER_NAME,
        pass: process.env.PASSWORD
    }
})

app.post('/send-mail', async (req, res) => {
    try {
        const options = {
            from: process.env.USER_NAME,
            to: process.env.PASSWORD,
            subject: 'This is final email sending practice',
            text: 'Hello IBM Technologies, i have selected as full stack developer in your company'
        }
        await transport.sendMail(options)
        res.status(200).json({ message: 'Mail Sent' })
    } catch (error) {
        res.status(500).json({ message: 'something went wrong' })
    }
})

const person = {
    name: 'dev',
    company: function (team) {
        setTimeout(() => {
            console.log(team)
        }, 5000)
    }
}
console.log(person.company('hey guys'))

app.listen(port, () => console.log(`Server is listening at ${ port }`));