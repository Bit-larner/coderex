<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class UserSetup extends EXT_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model('utilities');
        // $this->load->model('setupModel');
    }

    /*
     * @methodName index()
     * @access public
     * @param  none
     * @return  // user data 
     */

    public function index() {
        $data['metaTitle'] = 'Setup Module';
        $data['breadcrumbs'] = array(
            'Setup' => 'setup/index',
            'Setup' => '#'
        );

        $data['pageTitle'] = 'All Users';
        //$data['result'] = $this->utilities->findAllFromView('sa_lookup_grp');
        $userSessonData = $this->session->userdata('logged_in');
        $session_org_id = $userSessonData['SES_ORG_ID'];
        if ($session_org_id == 1) {
            $data['orgList'] = $this->utilities->findAllFromView('sa_organizations');
        } else {
            $data['orgList'] = $this->utilities->findByAttribute('sa_organizations', array('ORG_ID' => $session_org_id));
        }
        $data['content_view_page'] = 'setup/userSetup/userList';
        $this->template->display($data);
    }

    /*
     * @methodName addUserSetup()
     * @access public
     * @param  none
     * @return  // none
     */

    public function addUserSetup() {
        if ($_POST) {
            $user_type = $this->input->post('user_type');
            if ($user_type == 1) {
                $employee_id = $this->input->post('employee');
                $supplier_id = '';
            } else {
                $supplier_id = $this->input->post('supplier');
                $employee_id = '';
            }
            $password = $this->input->post('createPass');
            $userName = $this->input->post('createUsername');
            $empID = $this->input->post('emp_name');
            $getEmail = $this->utilities->findByAttribute('sa_emp', array('EMP_ID' => $empID));
            $getName = $this->utilities->findByAttribute('sa_emp', array('EMP_ID' => $empID));
            $gEmail = 'itaminul@gmail.com';
            $fullName = $getEmail->FULL_NAME;
            // echo '<pre>';print_r($fullName);exit;
            $user_data = array(
                'ORG_ID' => $this->input->post('organzations'),
                'EMP_ID' => $this->input->post('emp_name'),
                'USERGRP_ID' => $this->input->post('group_name'),
                'USERLVL_ID' => $this->input->post('level_name'),
                'USERTYPE' => 1,
                'EMP_ID' => $empID,
                'SUPPLIER_ID' => $supplier_id,
                'EMAIL' => $gEmail,
                'USERNAME' => $userName,
                'USERPW' => md5($password),
                //'EFECT_FROM_DT' => $this->input->post('effective_date'),
                'EFECT_FROM_DT' => date('Y-m-d', strtotime($this->input->post('effective_date'))),
                'EXPR_DT' => $this->input->post('expired_date'),
                'ACTIVE_STATUS' => (isset($_POST['ACTIVE_STATUS'])) ? 1 : 0
            );

            // for Image Upload
            if ($_FILES['user_img']['error'] == 0) {
                $configImage = array(
                    'upload_path' => "src/upload/profile_picture/",
                    'allowed_types' => "gif|jpg|png|jpeg|pdf",
                    'overwrite' => TRUE,
                    'remove_spaces' => TRUE
                        /* 'max_size' => "2048000",
                          'max_height' => "768",
                          'max_width' => "1024" */
                );
                $ext = pathinfo($_FILES['user_img']['name'], PATHINFO_EXTENSION);
                $configImage['file_name'] = date('Y_m_d_') . substr(md5(rand()), 0, 7) . '.' . $ext;
                $this->load->library('upload');
                $this->upload->initialize($configImage);
                if ($this->upload->do_upload('user_img')) {
                    $user_data['USERIMG'] = $this->upload->file_name;
                }
            }
            //$gEmail='itaminul@gmail.com';
             $this->utilities->insertData($user_data, 'sa_users');
            if ($gEmail != '') {
                $msgBody = "<html><head></html><body>Dear $fullName,<br> 
                                Congratulations!<br/>
                                You have successfully registered for access to DGDP.  Please Keep this mail for further reference. Your username and password information is below.<br />
                                <span style='color: #3366ff; font-weight: bold;'>User Name:</span><span style='color: #ff3333; font-weight: bold;'> $userName</span><br>
                                <span style='color: #3366ff; font-weight: bold;'>Password: </span><span style='color: #ff3333; font-weight: bold;'>$password</span><br><br>
                                 <span style='font-weight: bold;'>If you want to Login: Please Click </span><span style='color: #ff3333; font-weight: bold;'><a  href='" . site_url() . "auth/index'>Here</span><br><br><br><br>
                
                
                    Thanks and regards,<br>
                    DGDP</body></html>";

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
                $mail->AddAddress($gEmail);
                //$mail->AddReplyTo($emp_info->EMPLOYEE);
                $mail->IsHTML(TRUE);
                $mail->Subject = "DGDP New User Confirmation";
                $mail->Body = $msgBody;
                $mail->Send();
            }

            $this->session->set_flashdata('success', $this->lang->line('user') . ' ' . $this->lang->line('cre_success'));
            redirect('setup/userSetup');
        }

        $userSessonData = $this->session->userdata('logged_in');
        $session_org_id = $userSessonData['SES_ORG_ID'];

        $data['organizations'] = $this->utilities->dropdownFromTableWithCondition('sa_organizations', '', 'ORG_ID', 'ORG_NAME', array('ORG_TYPE_ID' => 213));
        $data['orgList'] = $this->utilities->findByAttribute('sa_organizations', array('ORG_ID' => $session_org_id));
        $data['user_groups_data'] = $this->utilities->dropdownFromTableWithCondition("sa_user_group", "Select Group", "USERGRP_ID", "USERGRP_NAME", array("ACTIVE_STATUS =" => 1, "ORG_ID" => $session_org_id));
        $data['employee'] = $this->utilities->dropdownFromTableWithCondition("sa_emp", "", "EMP_ID", "FULL_NAME", array("ACTIVE_STATUS" => 1));
        $data['suppliers'] = $this->utilities->dropdownFromTableWithCondition("pr_supplier", "", "SUPPLIER_ID", "SUPPLIER_NAME");
        $this->load->view('setup/userSetup/addUserSetup', $data);
    }

    /*
     * @methodName getUserGroup()
     * @access public
     * @param  none
     * @return  // 
     */

    public function getUserGroup() {
        $ORG_ID = $this->input->post("ORG_ID");
        $user_groups = $this->utilities->dropdownFromTableWithCondition("sa_user_group", "Select Group", "USERGRP_ID", "USERGRP_NAME", array("ACTIVE_STATUS =" => 1, "ORG_ID" => $ORG_ID));
        echo form_dropdown('group_name', $user_groups);
    }

    /*
     * @methodName getEmployee()
     * @access public
     * @param  none
     * @return  // 
     */

    public function getEmployee() {
        $EMP_ID = $this->input->post("org_id");
        $employee = $this->utilities->dropdownFromTableWithCondition("sa_emp", "Select Group", "EMP_ID", "FULL_NAME", array("ACTIVE_STATUS =" => 1, "EMP_ID" => $EMP_ID));
        echo form_dropdown('emp_name', $employee);
    }

    /*
     * @methodName getGroupLevel()
     * @access public
     * @param  none
     * @return  // 
     */

    public function getGroupLevel() {
        $group_id = $this->input->post("group_id");
        $user_group_level = $this->utilities->dropdownFromTableWithCondition("sa_ug_level", "Select Level", "UG_LEVEL_ID", "UGLEVE_NAME", array("ACTIVE_STATUS =" => 1, "USERGRP_ID" => $group_id));
        echo form_dropdown('level_name', $user_group_level);
    }

    /*
     * @methodName editUserSetup()
     * @access public
     * @param  $FLD_USER_ID
     * @return  // 
     */

    public function editUserSetup($FLD_USER_ID) {
        $data['result_from_view_table'] = $this->utilities->findByAttribute('sa_users_v', array('FLD_USER_ID' => $FLD_USER_ID)); // all data comes form view table
        //$organization_id = $data['result_from_view_table']->ORG_ID;
        $data['organizations'] = $this->utilities->dropdownFromTableWithCondition('sa_organizations', '', 'ORG_ID', 'ORG_NAME', array('ORG_TYPE_ID' => 213, "ACTIVE_STATUS =" => 1));
        $data['groups'] = $this->utilities->dropdownFromTableWithCondition("sa_user_group", '', "USERGRP_ID", "USERGRP_NAME");
        $data['level'] = $this->utilities->dropdownFromTableWithCondition("sa_ug_level", '', "UG_LEVEL_ID", "UGLEVE_NAME");
        $data['employee'] = $this->utilities->dropdownFromTableWithCondition("sa_emp", "", "EMP_ID", "FULL_NAME", array("ACTIVE_STATUS" => 1));
        $data['suppliers'] = $this->utilities->dropdownFromTableWithCondition("pr_supplier", "", "SUPPLIER_ID", "SUPPLIER_NAME");
        $this->load->view('setup/userSetup/editUserSetup', $data);
    }

    /*
     * @methodName updateUserData()
     * @access public
     * @param  
     * @return  // 
     */

    public function updateUserData() {
        if ($_POST) {
            // $supplier_id = $this->input->post('supplier');
            //echo "<pre>";
            //print_r($_POST);
            //echo "</pre>";
            //exit;
            //unlink($_FILES['user_img']['name']);
            $pass = $this->input->post('password1');
            unlink('base_url(src/upload/profile_picture/)' . $_FILES['user_img']['name']);
            $FLD_USER_ID = $this->input->post('FLD_USER_ID');
            $user_type = $this->input->post('user_type');
            if ($user_type == 1) {
                $employee_id = $this->input->post('employee');
                $supplier_id = '';
            } else {
                $supplier_id = $this->input->post('supplier');
                $employee_id = '';
            }
            $user_data = array(
                'ORG_ID' => $this->input->post('organzations'),
                'USERGRP_ID' => $this->input->post('group_name'),
                'USERLVL_ID' => $this->input->post('level_name'),
                'USERTYPE' => 1,
                'SUPPLIER_ID' => $supplier_id,
                'EMAIL' => $this->input->post('email'),
                'USERNAME' => $this->input->post('username'),
                //'USERPW' => $this->input->post('password1'),
                //'EFECT_FROM_DT' => $this->input->post('effective_date'),
                'EFECT_FROM_DT' => date('Y-m-d', strtotime($this->input->post('effective_date'))),
                'EFECT_FROM_DT' => date('Y-m-d', strtotime($this->input->post('expired_date'))),
                'ACTIVE_STATUS' => (isset($_POST['ACTIVE_STATUS'])) ? 1 : 0
            );

            // for Image Upload
            if ($_FILES['user_img']['error'] == 0) {
                $configImage = array(
                    'upload_path' => "src/upload/profile_picture/",
                    'allowed_types' => "gif|jpg|png|jpeg|pdf",
                    'overwrite' => TRUE,
                    'remove_spaces' => TRUE
                        /* 'max_size' => "2048000",
                          'max_height' => "768",
                          'max_width' => "1024" */
                );
                $ext = pathinfo($_FILES['user_img']['name'], PATHINFO_EXTENSION);
                $configImage['file_name'] = date('Y_m_d_') . substr(md5(rand()), 0, 7) . '.' . $ext;
                $this->load->library('upload');
                $this->upload->initialize($configImage);
                if ($this->upload->do_upload('user_img')) {
                    $user_data['USERIMG'] = $this->upload->file_name;
                }
            }
            if ($pass != '') {
                $user_data['USERPW'] = md5($pass);
            }
            $this->utilities->updateData('sa_users', $user_data, array('FLD_USER_ID' => $FLD_USER_ID));
            $this->session->set_flashdata('success', $this->lang->line('user') . ' ' . $this->lang->line('upd_success'));
            redirect('setup/userSetup');
        }
    }

    /*
     * @methodName viewUserSetup()
     * @access public
     * @param  $FLD_USER_ID
     * @return  // 
     */

    public function viewUserSetup($FLD_USER_ID) {
        $data['result_from_view_table'] = $this->utilities->findByAttribute('sa_users_v', array('FLD_USER_ID' => $FLD_USER_ID)); // all data comes form view table 
        $this->load->view('setup/userSetup/viewUserSetup', $data);
    }

    /*
     * @methodName checkEmailExist()
     * @access public
     * @param  
     * @return  // 
     */

    public function checkEmailExist() {
        $email = $this->input->post('email');
        $data = $this->utilities->findByAttribute('sa_users_v', array('EMAIL' => $email));
        $number = count($data);
        echo $number;
    }

    /*
     * @methodName checkUsernameExist()
     * @access public
     * @param  
     * @return  // 
     */

    public function checkUsernameExist() {
        $username = $this->input->post('username');
        $row = $data['result'] = $this->utilities->findByAttribute('sa_users_v', array('USERNAME' => $username));
        $number = count($row);
        echo $number;
    }

    /*
     * @methodName getEmpByOrg()
     * @access public
     * @param  
     * @return  // 
     */

    public function getEmpByOrg() {
        $ORG_ID = $this->input->post('ORG_ID');
        $empList = $this->utilities->dropdownFromTableWithCondition("sa_emp", "Select Employee", "EMP_ID", "FULL_NAME", array("ACTIVE_STATUS =" => 1, "ORG_ID" => $ORG_ID));
        echo form_dropdown('emp_name', $empList);
    }

    private function pr($data) {
        echo "<pre>";
        print_r($data);
        echo "</pre>";
        exit;
    }

}
