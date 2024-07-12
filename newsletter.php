<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = htmlspecialchars($_POST['email']);
    
    // Replace this with actual subscription logic
    // Example: Save to a database, or send an email to add to a mailing list

    $to = 'infor@race.edu.np'; // Replace with your email address
    $subject = 'New Newsletter Subscription';
    $message = "A new user has subscribed to the newsletter with the email: $email";
    $headers = "From: $email" . "\r\n" .
               "Reply-To: $email" . "\r\n" .
               "X-Mailer: PHP/" . phpversion();

    if (mail($to, $subject, $message, $headers)) {
        echo 'success';
    } else {
        echo 'error';
    }
}
?>
