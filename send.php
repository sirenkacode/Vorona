<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = strip_tags(trim($_POST["nombre"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $mensaje = trim($_POST["mensaje"]);

    if (!empty($nombre) && !empty($email) && !empty($mensaje)) {
        $to = "categri15@gmail.com";
        $subject = "Nuevo mensaje de $nombre";
        $headers = "From: $nombre <$email>\r\nReply-To: $email\r\n";
        $body = "Nombre: $nombre\nEmail: $email\n\nMensaje:\n$mensaje";

        if (mail($to, $subject, $body, $headers)) {
            echo "Mensaje enviado correctamente.";
        } else {
            echo "Hubo un error al enviar el mensaje.";
        }
    } else {
        echo "Por favor completa todos los campos.";
    }
}
?>
