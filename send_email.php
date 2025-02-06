<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST["name"]);
    $email = htmlspecialchars($_POST["email"]);
    $message = htmlspecialchars($_POST["message"]);

    $to = "tastvdev@gmail.com"; // Recipient email
    $subject = "New Contact Form Submission";
    $headers = "From: $email" . "\r\n" . "Reply-To: $email" . "\r\n";

    $body = "You have received a new message from your website:\n\n";
    $body .= "Name: $name\n";
    $body .= "Email: $email\n";
    $body .= "Message:\n$message\n";

    if (mail($to, $subject, $body, $headers)) {
        echo "<script>alert('Message sent successfully!'); window.location.href='thank-you.html';</script>";
    } else {
        echo "<script>alert('Failed to send message. Please try again.');</script>";
    }
}
?>
