const nodemailer = require("nodemailer");

const mail = async(email,title,body)=>{
    try{
        let transport = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS
            }
        })
        let info = await transport.sendMail({
                from:"StudyCenter",
                to:`${email}`,
                subject:`${title}`,
                html:`${body}`
        })
        return info;

    } catch(e) {
        console.log("Error in mailing :- ",e);
        return res.status(400).json({
            success:false,
            message:e.message
        })
    }
}

module.exports = mail;