<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $correo = $_POST["correo"];
    
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'fabriciopradoyt5@gmail.com';
    $mail->Password = 'xhbe mabb oazn liev';
    $mail->SMTPSecure = 'tls';
    $mail->Port = 587;
    $mail->setFrom('tu_correo@gmail.com', 'Fitfat');
    $mail->addAddress($correo);
    $mail->isHTML(true);
    $mail->CharSet = 'UTF-8';
    $mail->Subject = 'Suscripción a Fitfat';
    $mail->Body = '
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
        }
        .container {
          width: 600px;
          margin: 0 auto;
        }
        .header {
          background-color: rgba(136, 61, 138, 255);
          color: white;
          padding: 10px;
          text-align: center;
        }
        .content {
          margin: 20px 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Fitfat</h1>
        </div>
        <div class="content">
          <p>Gracias por suscribirte a Fitfat. Haz clic en el siguiente enlace para completar tu registro:</p>
          <a href="https://fitfat.free.nf/registro.html">Registrarse</a>
        </div>
      </div>
    </body>
    </html>';
    
    if(!$mail->send()) {
        echo 'Error al enviar el correo.';
        echo 'Error: ' . $mail->ErrorInfo;
    } else {
        header("Location: https://fitfat.free.nf/correo_enviado.html");
    }
}
?>
