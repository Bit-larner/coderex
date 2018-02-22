<?php

class Contact_mail_model extends CI_Model {

  function __construct() {
    parent::__construct();
    $this->load->library('email');
  }


    /**
     * send mail.
     *
     * @author MD. KHAYRUL HASAN
     * @param string $message
     * @param array $context
     * @return null
     */

    public function send_mail($cusName,$message,$cusEmail,$email){
      $data = array(
        'cusName' => $cusName,
        'message' => $message,
        'cusEmail'=>$cusEmail,
        'email'=>$email,


      );
//var_dump($email);exit;
      require 'gmail_app/class.phpmailer.php';
      $mail             = new PHPMailer;
      $mail->IsSMTP();
      $mail->Host       = "mail.atilimited.net";
      $mail->Port       = "465";
        //$mail->SMTPDebug  = 2;
      $mail->SMTPAuth   = true;
      $mail->Username   = "dev@atilimited.net";
      $mail->Password   = "@ti321$#";
      $mail->SMTPSecure = 'ssl';
      $mail->From       = "hr@drug-international.com";
      /*  $mail->Host       = "mail.atilimited.net";
        $mail->Port       = "465";
        //$mail->SMTPDebug  = 2;
        $mail->SMTPAuth   = true;
        $mail->Username   = "dev@atilimited.net";
        $mail->Password   = "@ti321$#";
        $mail->SMTPSecure = 'ssl';
        $mail->From       = "dev@atilimited.net"; */
        $mail->FromName   = "Drug Web Site";
        $mail->AddAddress($email);
        $mail->AddReplyTo('hr@drug-international.com');
        $mail->WordWrap   = 1000;
        $mail->IsHTML(TRUE);
        $mail->Subject    = 'Drug Web Site '.$cusName;
        $mail->Body       = $this->load->view('mail/create_employee_mail', $data, TRUE);

        $send             = $mail->Send();


      }


    /**
     * mail body.
     *
     * @author MD. KHAYRUL HASAN
     * @param string $message
     * @param array $context
     * @return null
     */

    public function mailTemplate(){
      return $body = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
      <meta http-equiv="Content-Type" content="text/html; charset=' . strtolower(config_item('charset')) . '" />
      <title>' . html_escape('sss') . '</title>
      <style type="text/css">
      body {
        font-family: Arial, Verdana, Helvetica, sans-serif;
        font-size: 16px;
      }
      </style>
      </head>
      <body>
      ' . "sssss ddd sss" . '
      </body>
      </html>';
    }



  }
