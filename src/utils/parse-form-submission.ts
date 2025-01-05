
interface getEmailTemplateProps{
name:string;
phone:string;
email:string;
subject:string;
text:string;
}

export const getEmailTemplate=({name,phone,email,subject,text}:getEmailTemplateProps)=>{
    return`
    <html>
  <head>
    <title>Contact Form Submission</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f9f9f9;
        color: #333;
      }
      .container {
        max-width: 600px;
        margin: 20px auto;
        padding: 20px;
        background-color: #ffffff;
        border: 1px solid #ddd;
        border-radius: 8px;
      }
      .header {
        text-align: center;
        margin-bottom: 20px;
      }
      .header h1 {
        margin: 0;
        font-size: 24px;
        color: #333;
      }
      .content {
        line-height: 1.6;
      }
      .content p {
        margin: 10px 0;
      }
      .footer {
        margin-top: 20px;
        text-align: center;
        font-size: 12px;
        color: #999;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>New Contact Form Submission</h1>
      </div>
      <div class="content">
        <p><strong>Naa,:</strong> ${name}</p>
        <p><strong>Telefoon:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Onderwerp:</strong> ${subject}</p>
        <p><strong>Bericht:</strong></p>
        <p>${text}</p>
      </div>
      <div class="footer">
        <p>This message was submitted via the contact form on your website.</p>
      </div>
    </div>
  </body>
</html>
    `
}