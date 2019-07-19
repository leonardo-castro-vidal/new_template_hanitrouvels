<?php

// ricardo.castro.vidal
// $to = "informaticanet2000@gmail.com";
// $to = "ricardo.castro.vidal@gmail.com";
// $subject = "Hani trouvels Tour";
// $message = "Texto desde el formulario de contacto.";
// $headers = "From: contacto@hanitrouveltour.com";

/*Variables que llegan desde el formulario contacto.html*/
$name = $_POST["name"];
$email = $_POST["email"];
$subject = $_POST["subject"];
$como_llego_nosotros = $_POST["como_llego_nosotros"];
$message = $_POST["message"];


	// admin@hanitraveltour.cl
	$to = "informaticanet2000@gmail.com";
	//$subject = "Hani trouvels Tour";
	$message = $como_llego_nosotros."\r\n" .$message;
	$headers = "From: ".$email . "\r\n" .
	"CC: informaticanet2000@gmail.com,leonardo.castro.vidall@gmail.com" . "\r\n".
	"Bcc: ricardo.castro.vidal@gmail.com" . "\r\n";

	$send_email = mail($to,$subject,$message,$headers);


	if ($send_email!=false) {
		# code...
		// $value =  array('msg' => 'true','values'=>$name."|".$email."|".$subject."|".$como_llego_nostros."|".$message);
		$value =  array('msg' => 'true');
			echo json_encode($value);
	}
	elseif ($send_email==false) {
		# code...
		// $value =  array('msg' => 'false','values'=>$name."|".$email."|".$subject."|".$como_llego_nostros."|".$message);
		$value =  array('msg' => 'false');
		echo json_encode($value);
	}

?>