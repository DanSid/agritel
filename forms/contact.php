<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $receiving_email_address = 'dansidsaya@gmail.com'; // Your email

    $name = htmlspecialchars($_POST['name']);
    $email = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);
    $subject = htmlspecialchars($_POST['subject']);
    $message = htmlspecialchars($_POST['message']);

    if (!$email) {
        echo json_encode(["status" => "error", "message" => "Invalid email address."]);
        exit;
    }

    // Send email to your receiving address
    $to = $receiving_email_address;
    $headers = "From: $name <$email>\r\n";
    $body = "You received a message from:\n\nName: $name\nEmail: $email\nSubject: $subject\n\nMessage:\n$message";

    $mailToSelf = mail($to, $subject, $body, $headers);

    // Send a copy to the user
    $user_subject = "Copy of your message: $subject";
    $user_body = "Dear $name,\n\nThank you for reaching out! Here's a copy of your message:\n\n$message\n\nBest regards,\nYour Team";
    $headers_to_user = "From: $receiving_email_address\r\n";

    $mailToUser = mail($email, $user_subject, $user_body, $headers_to_user);

    if ($mailToSelf && $mailToUser) {
        echo json_encode(["status" => "success", "message" => "Your message has been sent."]);
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to send the email. Please try again later."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request."]);
}
