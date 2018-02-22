<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class User extends EXT_Controller {

    public function __construct() {
        parent::__construct();
        $this->user_session = $this->session->userdata('logged_in');
        if (!$this->user_session) {
            redirect('auth/index');
        }
        $this->load->model('setup_model');
    }

    public function index() {
        $data['metaTitle'] = 'All Users';
        $data['breadcrumbs'] = array(
            'Modules' => '#'
        );
        $data["users"] = $this->db->query("SELECT u.*, o.ORG_NAME, ug.USERGRP_NAME, l.UGLEVE_NAME
                                                                    FROM sa_users u
                                                                    LEFT JOIN sa_organizations o ON u.ORG_id = o.ORG_ID
                                                                    LEFT JOIN sa_user_group ug ON u.USERGRP_ID = ug.USERGRP_ID
                                                                    LEFT JOIN sa_ug_level l ON u.USERLVL_ID = l.UG_LEVEL_ID")->result();

        $data['content_view_page'] = 'setup/user/index';
        $this->template->display($data);
    }

    public function create() {
        if (isset($_POST['full_name'])) {
            $data = array(
                'ORG_ID' => $this->input->post('organization'),
                'DESIG_ID' => $this->input->post('degisnation'),
                'FULL_NAME' => $this->input->post('full_name'),
                'FATHER_NAME' => $this->input->post('father_name'),
                'MOTHER_NAME' => $this->input->post('mother_name'),
                'RELIGION' => $this->input->post('religion'),
                'GENDER' => $this->input->post('gender'),
                'MARITAL_STATUS' => $this->input->post('marital'),
                'MOBILE' => $this->input->post('Phone'),
                'NID' => $this->input->post('nationalId'),
                'EMAIL' => $this->input->post('email'),
                'USERGRP_ID' => $this->input->post('group_name'),
                'USERLVL_ID' => $this->input->post('level_name'),
                'USERNAME' => $this->input->post('user_name'),
                'USERPW' => md5($this->input->post('password')),
                'ACTIVE_STATUS' => ($this->input->post('ACTIVE_STATUS') == '') ? 0 : 1,
                'CRE_BY' => $this->user_session["FLD_USER_ID"]
            );

            // for Image Upload
            if ($_FILES['user_img']['error'] == 0) {
                $configImage = array(
                    'upload_path' => "src/upload/user_image/",
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
                    $data['USERIMG'] = $this->upload->file_name;
                }
            }

            if ($this->utilities->insertData($data, 'sa_users')) {
                redirect('setup/user');
            }
        }
        $data['organization'] = $this->utilities->dropdownFromTableWithCondition('sa_organizations', '', 'ORG_ID', 'ORG_NAME', array('ACTIVE_STATUS' => 1));
        $data['degisnation'] = $this->utilities->dropdownFromTableWithCondition('sa_lookup_data', '', 'LOOKUP_DATA_ID', 'LOOKUP_DATA_NAME', array('ACTIVE_FLAG' =>1, 'LOOKUP_GRP_ID' => 32));
        $data['religion'] = $this->utilities->dropdownFromTableWithCondition('sa_lookup_data', '', 'LOOKUP_DATA_ID', 'LOOKUP_DATA_NAME', array('ACTIVE_FLAG' =>1, 'LOOKUP_GRP_ID' => 4));
        $data['gender'] = $this->utilities->dropdownFromTableWithCondition('sa_lookup_data', '', 'LOOKUP_DATA_ID', 'LOOKUP_DATA_NAME', array('ACTIVE_FLAG' =>1, 'LOOKUP_GRP_ID' => 31));
        $data['marital'] = $this->utilities->dropdownFromTableWithCondition('sa_lookup_data', '', 'LOOKUP_DATA_ID', 'LOOKUP_DATA_NAME', array('ACTIVE_FLAG' =>1, 'LOOKUP_GRP_ID' => 35));
        $this->load->view('setup/user/create', $data);
    }

    public function edit($user_id) {
        if (isset($_POST['full_name'])) {
            unlink('base_url(src/upload/user_image/)' . $_FILES['user_img']['name']);
            $data = array(
                'ORG_ID' => $this->input->post('organization'),
                'DESIG_ID' => $this->input->post('degisnation'),
                'FULL_NAME' => $this->input->post('full_name'),
                'FATHER_NAME' => $this->input->post('father_name'),
                'MOTHER_NAME' => $this->input->post('mother_name'),
                'RELIGION' => $this->input->post('religion'),
                'GENDER' => $this->input->post('gender'),
                'MARITAL_STATUS' => $this->input->post('marital'),
                'MOBILE' => $this->input->post('Phone'),
                'NID' => $this->input->post('nationalId'),
                'EMAIL' => $this->input->post('email'),
                'USERGRP_ID' => $this->input->post('group_name'),
                'USERLVL_ID' => $this->input->post('level_name'),
                'USERNAME' => $this->input->post('user_name'),
                'ACTIVE_STATUS' => ($this->input->post('ACTIVE_STATUS') == '') ? 0 : 1,
                'UPD_DT' => date("Y-m-d:H-i-s"),
                'UPD_BY' => $this->user_session["FLD_USER_ID"]
             );
            
             // for Image Upload
            if ($_FILES['user_img']['error'] == 0) {
                $configImage = array(
                    'upload_path' => "src/upload/user_image/",
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
                    $data['USERIMG'] = $this->upload->file_name;
                }
            }
            
            if ($this->utilities->updateData('sa_users', $data, array('FLD_USER_ID' => $user_id))) {
                redirect('setup/user');
            }
        }
        
        $data['result'] = $this->utilities->findByAttribute('sa_users', array("FLD_USER_ID" => $user_id));
        $data['organization'] = $this->utilities->dropdownFromTableWithCondition('sa_organizations', '', 'ORG_ID', 'ORG_NAME', array('ACTIVE_STATUS' => 1));
        $data['degisnation'] = $this->utilities->dropdownFromTableWithCondition('sa_lookup_data', '', 'LOOKUP_DATA_ID', 'LOOKUP_DATA_NAME', array('ACTIVE_FLAG' =>1, 'LOOKUP_GRP_ID' => 32));
        $data['religion'] = $this->utilities->dropdownFromTableWithCondition('sa_lookup_data', '', 'LOOKUP_DATA_ID', 'LOOKUP_DATA_NAME', array('ACTIVE_FLAG' =>1, 'LOOKUP_GRP_ID' => 4));
        $data['gender'] = $this->utilities->dropdownFromTableWithCondition('sa_lookup_data', '', 'LOOKUP_DATA_ID', 'LOOKUP_DATA_NAME', array('ACTIVE_FLAG' =>1, 'LOOKUP_GRP_ID' => 31));
        $data['marital'] = $this->utilities->dropdownFromTableWithCondition('sa_lookup_data', '', 'LOOKUP_DATA_ID', 'LOOKUP_DATA_NAME', array('ACTIVE_FLAG' =>1, 'LOOKUP_GRP_ID' => 35));
       $data['groups'] = $this->utilities->dropdownFromTableWithCondition("sa_user_group", '', "USERGRP_ID", "USERGRP_NAME");
        $data['level'] = $this->utilities->dropdownFromTableWithCondition("sa_ug_level", '', "UG_LEVEL_ID", "UGLEVE_NAME");
        $this->load->view('setup/user/edit', $data);
    }
    
    public function view($user_id)
    {
        $data['result'] = $this->utilities->findByAttribute('sa_users', array("FLD_USER_ID" => $user_id));
        $this->load->view('setup/user/view', $data);
    }
    
    public function delete($id)
    {
         if ($this->utilities->deleteRowByAttribute( 'sa_users', array('FLD_USER_ID' => $id))) {
            $this->util->resultObject(1,'User Deleted Successfully!');
        }
    }

    public function userGroupByOrgId() 
    {
        $orgId = $this->input->post('orgId');
        $data['user_groups'] = $this->utilities->dropdownFromTableWithCondition("sa_user_group", "none", "USERGRP_ID", "USERGRP_NAME", array("ORG_ID" => $orgId));
        echo json_encode($data);
    }



    /*
     * @methodName getGroupLevel()
     * @access public
     * @param  none
     * @return   
     */

    public function getGroupLevel() {
        $group_id = $this->input->post("group_id");
        $user_group_level = $this->utilities->dropdownFromTableWithCondition("sa_ug_level", "Select Level", "UG_LEVEL_ID", "UGLEVE_NAME", array("ACTIVE_STATUS =" => 1, "USERGRP_ID" => $group_id));
        echo form_dropdown('level_name', $user_group_level);
    }

    public function checkUnique() {
        $thisValue = $this->input->post('thisValue');
        $thisValueColumn = $this->input->post('thisValueColumn');
        $tbl = $this->input->post('thisValueTbl');
        $result = $this->utilities->findByAttribute("$tbl", array("$thisValueColumn" => $thisValue));
        if (!empty($result)) {
            echo "Already Exist";
        } else {
            echo "Y";
        }
    }
    
}
