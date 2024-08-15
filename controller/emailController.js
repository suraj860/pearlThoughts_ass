
let sgMail = require('@sendgrid/mail');
let sendEmail = require('../utils/emailservice')


exports.emailNotification = async (req , res)=>{
    let {to , subject , text} = req.body
    await sendEmail(to , subject , text)
    .then((result)=>{
        if(result){
            return(
                res.status(200).send({status:true , data: "Mail sent successfully"})
            )
        }
        else{
            return(
                res.status(400).send({status:false , error : "Error occurred while sending email"})
            )
        }
    })
    .catch((err)=>{
        console.log(err)
        return(
            res.status(400).send({status:false , error : "Something went wrong"})
        )
    })

}