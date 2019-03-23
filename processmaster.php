<?php
$errors         = array();  	// array to hold validation errors
$data 			= array(); 		// array to pass back data
// validate the variables ======================================================
// if any of these variables don't exist, add an error to $errors array
function test_input($data)
{
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}
    
    // Get Form Data
    $name = test_input($_POST['name']);
    $email = test_input($_POST['email']);
    // $subject = test_input($_POST['subject']);
    $comment = test_input($_POST['comment']);

    if (empty($_POST['name']))
        $errors['name'] = 'Please enter your name.';
    if (empty($_POST['email']))
        $errors['email'] = 'Email is required.';
//    if (!empty($_POST['email']) & filter_var($email, FILTER_VALIDATE_EMAIL) === false){
//            // Failed
//        $errors['email'] = 'Please use a valid email'; }
    // if (empty($_POST['subject']))
    //     $errors['subject'] = 'Please select a subject.';
    if (empty($_POST['comment']))
        $errors['comment'] = 'Message is required.';
    // Check Required Fields
    if (!empty($errors)) {
        // if there are items in our errors array, return those errors
        $data['success'] = false;
        $data['errors']  = $errors;

    } else {
        // Passed. Send email
            $toEmail = 'alanpramuk@alanpramuk.com';
            $subject = 'Contact Request From '.$name;
            $body = '<h2>Contact Request</h2>
					<h4>Name</h4><p>'.$name.'</p>
					<h4>Email</h4><p>'.$email.'</p>
					<h4>Message</h4><p>'.$comment.'</p>
					<h4>Message</h4><p>'.$subject.'</p>
				';

            // Email Headers
            $headers = "MIME-Version: 1.0" ."\r\n";
            $headers .="Content-Type:text/html;charset=UTF-8" . "\r\n";

            // Additional Headers
            $headers .= "From: " .$name. "<".$email.">". "\r\n";

            if(mail($toEmail, $subject, $body, $headers)){
                // Email Sent
                $data['success'] = true;
                $data['message'] = 'Thank you ' .$_POST['name']. '! I will get back to you shortly :)' ;

            } else {
                // Failed
                $data['success'] = false;
                $data['message'] = 'Sorry ' .$_POST['name']. '. The email did not send for some reason. Please try again.' ;
            }
        }

echo json_encode($data);



