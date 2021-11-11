const express = require('express')
const router = express.Router()
const nodemailer = require('nodemailer')

const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.USER_NAME,
        pass: process.env.PASSWORD
    }
})

router.post('/send-mail', async (req, res) => {
    try {
        const options = {
            from: process.env.USER_NAME,
            to: process.env.USER_NAME,
            subject: 'This is final email sending practice',
            text: 'Hello IBM Technologies, i have selected as full stack developer in your company'
        }
        await transport.sendMail(options)
        res.status(200).json({ message: 'Mail Sent' })
    } catch (error) {
        res.status(500).json({ message: 'something went wrong' })
    }
})

module.exports = router