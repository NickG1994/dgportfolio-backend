import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import {Blog} from './model/model.js';
import mongoose from 'mongoose';
dotenv.config()

const url = process.env.url
mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true})
.then((response) => console.log('complete'))
.catch((err) => res.status(500).send(`Atlas connection Error: ${err}`))


export function emailController( req, res ) {
    try {

        if(!req.body) {
            throw new error('error, data failed to load!!!')
        }

        const {firstName, lastName, subject, comment} = req.body
        const jsonFirstName = JSON.stringify(firstName)
        const jsonLastName = JSON.stringify(lastName)
        const jsonSubject = JSON.stringify(subject)
        const jsonComment = JSON.stringify(comment)

        console.log(jsonFirstName)
        console.log(jsonLastName)
        console.log(jsonSubject)
        console.log(jsonComment)

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user:'d.gaona1994@gmail.com',
                pass : process.env.APP_PASSWORD
            },

        })

        if( !jsonFirstName && !jsonLastName && !subject) {
            if(!jsonFirstName) {
                throw new error('first name; first name required!!!')
            }
            if(!jsonLastName) {
                throw new error('last name; last name required!!!')
            }
            if( !subject ) {
                throw new error('subject; subject required!!!')
            }
        }

        const mailerOptions = {
            from: 'd.gaona1994@gmail.com',
            to: 'd.gaona1994@gmail.com',
            subject: jsonSubject,
            text: `Hello, you received a message from ${jsonFirstName} ${jsonLastName}: ${jsonComment}`
        }

        transporter.sendMail(mailerOptions, (error, info) => {
            if(error) {
                console.log(error)
                res.status(500).send('failed to send email')
            }
            else {
                console.log('email successfully sent!')
                res.status(200).send('emailed send successfully!!!')
            }
        })

        console.log('end of message')
        res.send(jsonFirstName)

    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function getBlog( req, res ) {
    try {
        const id = req.query.id
        if(!id)
            {
                return res.status(500).send('error, id not found')    
            }
        
        const blog = await Blog.findById(id)
        console.log(id)
        if(!blog) {
            res.status(500).send('could not find blog!!!')
        }
        res.status(200).json(blog)
        
    } catch (error) {
        res.status(500).send(error)
        console.log(error)
    }

}

