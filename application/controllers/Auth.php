<?php

/**
 * This file is part of the a2i\ashokti Mukti package
 *
 * (c) ATI Limited. <info@atilimited.net>
 *
 * PHP version 5 (5.6.25)
 *
 * @package     a2i\ashokti Mukti
 * @author      ATI Limited PHP Dev Team
 * @copyright   2017 atilimited.net
 */
/**
 * Class Auth
 *
 * Auth is the extended class of EXT_Controller.
 *
 * This class implements all methods related to Authentication
 * Auth Control for User of ashokti Mukti System.
 *
 * @package     ashokti Mukti\Controllers
 * @author      Nurullah <nurul@atilimited.net>
 * @copyright   2017 atilimited.net
 * @version     GIT: $Id$ In development. 1.0.0
 */
defined('BASEPATH') OR exit('No direct script access allowed');

class Auth extends CI_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model('auth_model');
        $this->load->helper('security');
        $this->load->helper('form');
    }

    public function index() 
    {
        if ($this->session->userdata('logged_in')) {
            $userSessonData = $this->session->userdata('logged_in');
            redirect('dashboard/index', 'refresh');
        }
        $this->load->library('form_validation');
        $this->form_validation->set_rules('txtUserName', 'Username', 'trim|required');
        $this->form_validation->set_rules('txtPassword', 'Password', 'trim|required|callback_check_database');
        if ($this->form_validation->run() == TRUE) {
            $userSessonData = $this->session->userdata('logged_in');
            redirect('dashboard/index', 'refresh');
        }
        $data['metaTitle'] = 'Signin';
        $data['pageTitle'] = 'Please sign in';
        $data['content_view_page'] = 'auth/signin';
        $this->template_auth->display($data);
    }

    function check_database($password) 
    {
        $username = $this->input->post('txtUserName');
        $result = $this->auth_model->login($username, md5($password));
        if ($result) {
            $sess_array = array(
                'USERNAME' => $result->USERNAME,
                'FLD_USER_ID' => $result->FLD_USER_ID,
                'ORG_ID' => $result->ORG_ID,
                'USERGRP_ID' => $result->USERGRP_ID,
                'USERLVL_ID' => $result->USERLVL_ID
            );
            $this->session->set_userdata('logged_in', $sess_array);
            return TRUE;
        } else {
            $this->form_validation->set_message('check_database', '<div class="alert alert-danger">Sorry! We didn\'t recognise your username or password. Please try again.<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>');
            return false;
        }
    }
/*
    public function print_information($id) {
        $data['pageTitle'] = 'Print Information';
        $data['info'] = $this->db->select(array('TYPE', 'S_INFO_DESC'))->get_where('site_info', array('S_INFO_ID' => $id))->row();
        include('src/mpdf/mpdf.php');
        $mpdf = new mPDF();
        $mpdf->mirrorMargins = 1;
        $mpdf->SetWatermarkImage('dist/img/logo_dgdp.png');
        $mpdf->showWatermarkImage = true;
        $report = $this->load->view('auth/print_information', $data, TRUE);
        $mpdf->WriteHTML($report);
        $mpdf->Output();
        exit;
    }
*/
    function logout() {
        $this->session->unset_userdata('logged_in');
        redirect('auth/index', 'refresh');
    }

    //Added By Gaji Asif

    public function forgetPasswordView() {
        $data['content_view_page'] = 'auth/forgetPasswordView';
        $this->template_auth->display($data);
    }

    public function forgetPassword() {
        $this->load->helper('string');
        $username_email = $this->input->post('username_email');
        $number = $result = $this->auth_model->getUsersData($username_email);
        if (!empty($number)) {
            echo '<div style="color:green;">We sent a Reset Link To your Email Address.</div>';
            $user_id = $number->FLD_USER_ID;
            $username = $number->USERNAME;
            $useremail = $number->EMAIL;

            $random_id = random_string('alnum', 25);
            $data = array(
                'FLD_USER_ID' => $user_id,
                'REQUESTED_CODE' => $random_id
            );
            $this->utilities->insertData($data, 'sa_forget_pass_request');
            $msgBody = "<html><head></html><body>Dear $username,<br><br>
        Hi!<br/>
       You're one step away from regaining access to your DGDP account. 
        Just click below to reset your password:<br/>
        <a style='margin-top:10px; color:white;' href='" . site_url() . "auth/generatePassword/$random_id'><button class='btn btn-primary' style='margin-left:24%; background-color:#556a2f; padding:5px;'>Reset Password</button></a> <br/>
      
        <br/>Thanks<br>
        DGDP<br/><br/>        
        </body></html>";

            if ($useremail == $username_email or $username == $username_email) {
                require 'gmail_app/class.phpmailer.php';
                $mail = new PHPMailer;
                $mail->IsSMTP();
                $mail->Host = "cloud2.eicra.com";
                $mail->Port = "465";
                $mail->SMTPAuth = true;
                $mail->Username = "dgdp@atilimited.net";
                $mail->Password = "dgdp@1234";
                $mail->SMTPSecure = 'ssl';
                $mail->From = "dgdp@atilimited.net";
                $mail->FromName = "DGDP Office";
                $mail->AddAddress($useremail);
                $mail->AddReplyTo('dgdp@atilimited.net');
                $mail->WordWrap = 1000;
                $mail->IsHTML(TRUE);
                $mail->Subject = "DGDP : Password Reset Request";
                $mail->Body = $msgBody;
                if ($mail->Send()) {
                    //echo '<p style="color:red; margin-left: 38%;">Mail send  successfully please check your mail. </p>';
                    $this->session->set_flashdata('flashMessage', 'Mail send successfully please check mail.');
                    redirect('auth/email_send_messages', 'refresh');
                }
            } else {
                echo '<p style="color:red;">Please enter valid Username / Email.</p>';
            }
        } else {
            echo '<div style="color:red;">Sorry, Your Address are not registered.</div>';
        }
    }

    public function generatePassword() {

        $random_code = $this->uri->segment(3, '');
        if ($random_code == '') {
            $this->session->set_flashdata('Error', 'Sorry ! You are Trying Invalid Way to Reset Password.');
            redirect('auth/index', 'refresh');
        }
        $data['requestinfo'] = $this->utilities->findByAttribute('sa_forget_pass_request', array('REQUESTED_CODE' => $random_code));
        if (empty($data['requestinfo'])) {
            $this->session->set_flashdata('Error', 'Sorry ! You are Trying Invalid Way to Reset Password.');
            redirect('auth/index', 'refresh');
        } else {
            if ($data['requestinfo']->IS_USED != 0) {

                $data['content_view_page'] = 'auth/errorMessage';
                $this->template_auth->display($data);
            } else {

                $data['content_view_page'] = 'auth/generateNewPasswordPage';
                $this->template_auth->display($data);
            }
        }
    }

    public function generateNewPasswordPage() {
        $data['content_view_page'] = 'auth/forgotUsername';
        $this->template_auth->display($data);
    }

    public function generateNewPassword() {
        $random_id = $this->input->post('randomCode');
        $requestInfo = $this->utilities->findByAttribute('sa_forget_pass_request', array('REQUESTED_CODE' => $random_id));
        if ($requestInfo !== 1) {
            $new_pass = array(
                'USERPW' => md5($this->input->post('password1'))
            );
            $is_used = array(
                'IS_USED' => 1,
                'UPD_DT' => date("Y-m-d:H-i-s")
            );
            $this->utilities->updateData('sa_users', $new_pass, array('FLD_USER_ID' => $requestInfo->FLD_USER_ID));
            $this->utilities->updateData('sa_forget_pass_request', $is_used, array('FLD_USER_ID' => $requestInfo->FLD_USER_ID));
            redirect('auth/resetPasswordMessages', 'refresh');
        }
    }

    public function resetPasswordMessages() {
        $data['content_view_page'] = 'auth/resetPasswordMessages';
        $this->template_auth->display($data);
    }

    public function forgrtUsername() {
        $this->load->helper('string');
        $email = $this->input->post('email');
        $number = $data['result'] = $this->utilities->findByAttribute('sa_users', array('EMAIL' => $email));
        //return $number;
        if (!empty($number)) {
            echo '<div style="color:green;">We sent Your Username To your Email Address.</div>';
            $user_id = $number->FLD_USER_ID;
            $username = $number->USERNAME;
            $useremail = $number->EMAIL;


            $msgBody = "<html><head></html><body>Dear $username,<br> <br>
      
            Your UserName is : $username <br> <br/>
            Thanks<br>
           DGDP<br/><br/>        
             </body></html>";

            if ($useremail == $email) {
                require 'gmail_app/class.phpmailer.php';
                $mail = new PHPMailer;
                $mail->IsSMTP();
                $mail->Host = "cloud2.eicra.com";
                $mail->Port = "465";
                $mail->SMTPAuth = true;
                $mail->Username = "dgdp@atilimited.net";
                $mail->Password = "dgdp@1234";
                $mail->SMTPSecure = 'ssl';
                $mail->From = "dgdp@atilimited.net";
                $mail->FromName = "DGDP";
                $mail->AddAddress($useremail);
                //$mail->AddReplyTo($emp_info->EMPLOYEE);
                $mail->IsHTML(TRUE);
                $mail->Subject = "DGDP : Password Reset Request";
                $mail->Body = $msgBody;
                if ($mail->Send()) {
                    //echo '<p style="color:red; margin-left: 38%;">Mail send  successfully please check your mail. </p>';
                    $this->session->set_flashdata('flashMessage', 'Mail send successfully please check mail.');
                    redirect('auth/email_send_messages', 'refresh');
                }
            } else {
                echo '<p style="color:red;">Please enter valid Email.</p>';
            }
        } else {
            echo '<div style="color:red;">Sorry, Your Address are not registered.</div>';
        }
    }

}
