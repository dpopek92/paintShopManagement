const smtpTransport = require("../../../config/nodemailer");

// *
const sendEmail = async (email, subject, msg) => {
  let message = {
    from: "", // sender address
    replyTo: "",
    to: email, // list of receivers
    subject: `Nazwa firmy - ${subject}`, // Subject line
    html: `${msg}
      <br/><br/><br/>
      
      <small style="color:#FF2D00;opacity:0.6">Wiadomość wygenerowana automarycznie.</small><br/>
      ` // html body
  };
  // await smtpTransport.sendMail(message, (err, info) => {
  //   if (err) {
  //     return console.log(err);
  //   }
  //   console.log("Verify message sent: " + info.response);
  // });
  return;
};

{
  /* <span style="color:#b3b3b3;font-size:16">Pozdrawiam serdecznie<br/>
      Kamil Kępa<br/><br/>
      
      <a href="https://www.mebleblow.pl" style="text-decoration :none; color:#b3b3b3; font-size:14">https://www.mebleblow.pl</a></a><br/> 
      <a href="https://www.zamowfronty.pl" style="text-decoration :none; color:#b3b3b3; font-size:14">https://www.zamowfronty.pl</a><br/> <br/>
      <strong>e-mail:</strong> biuro@mebleblow.pl<br/>
      <strong>TEL:</strong> 22 722 10 17<br/>   
      <strong>TEL:</strong> 505 412 112<br/>    
      <strong>TEL:</strong> 796 080 459<br/>
      
      <hr/>
      <strong>Produkcja:</strong> 05-850 Ożarów Mazowiecki Duchnice, ul. Ożarowska 83 budynek G<br/>
      <strong>Dane do faktur:</strong><br/>
      BLOW Kamil Kępa<br/>
      05-820 Piastów, ul. Piłsudskiego 56/42<br/>
      NIP: 534 225 05 99, REGON: 144019841<br/>
      Numer konta MBank: 12 1140 2004 0000 3302 7853 1038<br/></span> */
}

module.exports = sendEmail;
