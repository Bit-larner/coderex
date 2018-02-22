<?php
/**
 * This file is part of the DGDP\e-DP System package
 *
 * (c) ATI Limited. <info@atilimited.net>
 *
 * PHP version 5 (5.6.25)
 *
 * @package     a2i\ashokti Mukti
 * @author      ATI Limited Dev Team
 * @copyright   2017 atilimited.net
 */
/**
 * Class AccessControl
 *
 * AccessControl is the extended class of EXT_Controller.
 *
 * This class implements all methods related to Role Based
 * Access Control for User of ashokti Mukti System.
 *
 * @package     a2i\ashokti Mukti
 * @author      Nurullah <nurullah@atilimited.net>
 * @copyright   2017 atilimited.net
 * @version     GIT: $Id$ In development. 1.0.0
 */
defined('BASEPATH') OR exit('No direct script access allowed');

class AccessControl extends EXT_Controller
{
    /**
     * reference of user data of session
     *
     * @var array should contain user data from session
     */
    private $user_session;

    /**
     * Class constructor
     */
    public function __construct()
    {
        parent::__construct();
        $this->user_session = $this->session->userdata('logged_in');
        if (!$this->user_session) {
            redirect('auth/index');
        }
        $this->form_validation->set_error_delimiters('<div class="alert alert-danger">','</div>');
        $this->load->model('accessControl_model');
        $this->load->helper('security');

    }
    

    /**
     * Action: Module Index
     *
     * Manage all modules from this panel. Tabular content is the short form of all modules.
     * Individual module can be edit or delete. Create button new record of module via ajax.
     *
     */
    public function index()
    {
        $data['pageTitle']   = 'Modules';
        $data['breadcrumbs'] = array(
            'Modules' => '#'
        );
        $data['all_modules'] = $this->utilities->findAllFromView("sa_modules");
        $data['content_view_page'] = 'accessControl/index';
        $this->template->display($data);
    }

    /**
     *  Method to Create  Module
     * @param none
     * @return none
     */
    public function createModule()
    {
        if (isset($_POST['txtModuleName'])) {
            $module = array(
                'MODULE_NAME' => $this->input->post('txtModuleName'),
                'SHORT_NAME' => $this->input->post('txtModuleShortName'),
                'MODULE_NAME_BN' => $this->input->post('txtModuleNameBn'),
                'SL_NO' => $this->input->post('SL_NO'),
                'ACTIVE_STATUS' => isset($_POST['ACTIVE_STATUS']) ? 1 : 0,
                'CRE_BY' => $this->user_session["FLD_USER_ID"],
            );
            if ($this->utilities->insertData($module, 'sa_modules')) {
                $this->session->set_flashdata('success',$this->lang->line('module').' '.$this->lang->line('cre_success'));
                redirect('accessControl');
            }
        }
        $this->load->view("accessControl/createModule");
    }

    /**
     * Method to display module
     * @param integer $moduleId Module Id
     * @return none
     */
    public function viewModule($moduleId)
    {
        $data['moduleDetails'] = $this->utilities->findByAttribute('sa_modules', array('MODULE_ID' => $moduleId)); // all data comes form view table
        $this->load->view('accessControl/viewModule', $data);
    }

    /**
     * Method to edit module
     * @param integer $moduleId Module Id
     * @return none
     */
    public function editModule($moduleId)
    {
        if (isset($_POST['MODULE_ID'])) {
            $module = array(
                'MODULE_NAME' => $this->input->post('txtModuleName'),
                'SHORT_NAME' => $this->input->post('txtModuleShortName'),
                'MODULE_NAME_BN' => $this->input->post('txtModuleNameBn'),
                'SL_NO' => $this->input->post('SL_NO'),
                'ACTIVE_STATUS' => isset($_POST['ACTIVE_STATUS']) ? 1 : 0,
                'UPD_BY' => $this->user_session["FLD_USER_ID"],
                'UPD_DT' => date("Y-m-d:H-i-s"),
            );


            
            if ($this->utilities->updateData('sa_modules', $module, array('MODULE_ID' => $moduleId))) {
               $this->session->set_flashdata('success',$this->lang->line('module').' '.$this->lang->line('upd_success'));
                redirect('accessControl');
            }
        }
        $data['module_details'] = $this->utilities->findByAttribute('sa_modules', array('MODULE_ID' => $moduleId));
        $this->load->view("accessControl/editModule", $data);
    }

    /**
     * Method to Create view all module links
     * @return none
     */
    public function moduleLinks()
    {
        $data['pageTitle']   = 'Module Links';
        $data['breadcrumbs'] = array(
            'Access Control' => 'AccessControl',
            'Module Links' => '#'
        );
        $data['moduleLinks'] = $this->accessControl_model->getModuleLinks();

        $data['content_view_page'] = ('accessControl/moduleLinks');
        $this->template->display($data);
    }


  public function medicine()
    {
        $data['pageTitle']   = 'Module Links';
        $data['breadcrumbs'] = array(
            'Access Control' => 'AccessControl',
            'Module Links' => '#'
        );
        $data['moduleLinks'] = $this->accessControl_model->getModuleLinks();

        $data['content_view_page'] = ('accessControl/medicine');
        $this->template->display($data);
    }

    /**
     * Method to create Module Link
     * @parm none
     * @return none
     */
    public function createModuleLink()
    {
        if (isset($_POST['MODULE_ID'])) {
            $pages      = implode(",", $this->input->post('chkpages'));
            $page       = $this->input->post('chkpages');
            $modulelink = array(
                'MODULE_ID' => $this->input->post('MODULE_ID'),
                'LINK_NAME' => str_replace("'", "''", $this->input->post("txtLinkName")),
                'LINK_NAME_BN' => str_replace("'", "''", $this->input->post("txtLinkNameBn")),
                'URL_URI' => str_replace("'", "''", $this->input->post("txtModLink")),
                'SA_MLINK_PAGES' => "$pages",
                'CREATE' => (array_key_exists(0, $page)) ? 1 : 0,
                'READ' => (array_key_exists(1, $page)) ? 1 : 0,
                'UPDATE' => (array_key_exists(2, $page)) ? 1 : 0,
                'DELETE' => (array_key_exists(3, $page)) ? 1 : 0,
                'STATUS' => (array_key_exists(4, $page)) ? 1 : 0,
                'SL_NO' => $this->input->post('SL_NO'),
                'ACTIVE_STATUS' => (isset($_POST['ACTIVE_STATUS'])) ? 1 : 0,
                'CRE_BY' => $this->user_session["FLD_USER_ID"]
            );
            if ($this->utilities->insertData($modulelink, 'sa_module_links')) {
               $this->session->set_flashdata('success',$this->lang->line('module_link').' '.$this->lang->line('cre_success'));
                redirect('accessControl/moduleLinks');
            }
        }

        $data['module_list'] = $this->utilities->dropdownFromTableWithCondition('sa_modules', '', 'MODULE_ID', 'MODULE_NAME');
        $this->load->view("accessControl/createModuleLink", $data);
    }

    /**
     * Method to view module link individually
     * @param integer $LINK_ID Module Link Id
     * @return none
     */
    public function viewModuleLink($LINK_ID)
    {
        $data['moduleLinkDetails'] = $this->accessControl_model->getModuleLinksById($LINK_ID); // all data comes form view table
        $this->load->view('accessControl/viewModuleLink', $data);
    }

    /**
     * Method to edit Module Link
     * @param integer $LINK_ID Module Link Id
     * @return none
     */
    public function editModuleLink($LINK_ID)
    {
        $previousInfo = $this->utilities->findByAttribute('sa_module_links', array('LINK_ID' => $LINK_ID));
        if (isset($_POST['MODULE_ID'])) {
            $pages     = implode(",", $this->input->post('chkpages'));
            $page      = $this->input->post('chkpages');
            $dataArray = array(
                'MODULE_ID' => $this->input->post('MODULE_ID'),
                'LINK_NAME' => str_replace("'", "''", $this->input->post("txtLinkName")),
                'LINK_NAME_BN' => str_replace("'", "''", $this->input->post("txtLinkNameBn")),
                'URL_URI' => str_replace("'", "''", $this->input->post("txtModLink")),
                'SA_MLINK_PAGES' => "$pages",
                'CREATE' => (array_key_exists(0, $page)) ? 1 : 0,
                'READ' => (array_key_exists(1, $page)) ? 1 : 0,
                'UPDATE' => (array_key_exists(2, $page)) ? 1 : 0,
                'DELETE' => (array_key_exists(3, $page)) ? 1 : 0,
                'STATUS' => (array_key_exists(4, $page)) ? 1 : 0,
                'SL_NO' => $this->input->post('SL_NO'),
                'ACTIVE_STATUS' => (isset($_POST['ACTIVE_STATUS'])) ? 1 : 0,
                'UPD_BY' => $this->user_session["FLD_USER_ID"],
                'UPD_DT' => date("Y-m-d:H-i-s")
            );

            if ($this->utilities->updateData('sa_module_links', $dataArray, array('LINK_ID' => $LINK_ID))) {
                if ($previousInfo->MODULE_ID != $this->input->post('MODULE_ID')) {
                    $PRE_SA_MODULE_ID = $this->utilities->get_max_value_by_attribute('sa_org_modules', 'SA_MODULE_ID', array('MODULE_ID' => $previousInfo->MODULE_ID));
                    $SA_MODULE_ID = $this->utilities->get_max_value_by_attribute('sa_org_modules', 'SA_MODULE_ID', array('MODULE_ID' => $this->input->post('MODULE_ID')));
                    $this->db->query("UPDATE sa_uglw_mlink m LEFT JOIN sa_org_mlinks o ON m.SA_MLINKS_ID = o.SA_MLINKS_ID SET  m.SA_MODULE_ID = $SA_MODULE_ID WHERE m.SA_MODULE_ID = $PRE_SA_MODULE_ID AND o.LINK_ID = $LINK_ID");
                    $this->utilities->updateData('sa_org_mlinks', array('SA_MODULE_ID' => $SA_MODULE_ID), array('SA_MODULE_ID' => $PRE_SA_MODULE_ID, 'LINK_ID' => $LINK_ID));
                }
                $this->session->set_flashdata('success',$this->lang->line('module_link').' '.$this->lang->line('upd_success'));
                redirect('accessControl/moduleLinks');
            }
        }
        $data['previousInfo'] = $previousInfo;
        $data['module_list'] = $this->utilities->dropdownFromTableWithCondition('sa_modules', '', 'MODULE_ID', 'MODULE_NAME');
        $this->load->view("accessControl/editModuleLink", $data);
    }

    /**
     * Method to display organization Module Setup
     * @param none
     * @return none
     */
    public function orgModuleSetup()
    {
        $data['pageTitle']   = 'Organization Modules';
        $data['breadcrumbs'] = array(
            'Access Control' => 'AccessControl',
            'Organizations' => '#'
        );

        $data["careProviders"] = $this->utilities->findAllByAttribute("sa_organizations", array("ACTIVE_STATUS" => 1));
        $data['content_view_page'] = ('accessControl/organizationModule');
        $this->template->display($data);
    }

    /**
     * Method to display All module and selected module to assign module modal
     * @param none
     * @return none
     */
    public function moduleModal()
    {
        $data["hid"] = $this->input->post('hid');
        $data["modules"] = $this->utilities->findAllByAttribute("sa_modules", array("ACTIVE_STATUS" => 1));
        $data["active_modules"] = $this->utilities->findAllByAttribute("sa_org_modules", array("ORG_ID" => $data["hid"]));
        echo $this->load->view("accessControl/add_module_to_cp", $data, true);
    }

    /**
     * Method to remove module to assign module modal
     * @param none
     * @return none
     */
    public function removeHcModule()
    {
        $module_id = $this->input->post('m_id');
        $attr      = array(
            "SA_MODULE_ID" => $module_id
        );
        return $this->utilities->deleteRowByAttribute("sa_org_modules", $attr);
    }

    /**
     * Method add module to assign module modal
     * @param none
     * @return none
     */
    public function addModules()
    {
        $hid = $this->input->post('hid');
        $module_ids   = $this->input->post('add_selected_single_id');
        $module_names = $this->input->post('add_selected_single_name');
        for ($i = 0; $i < sizeof($module_ids); $i++) {
            if ($this->utilities->hasInformationByThisId('sa_org_modules', array("MODULE_ID" => $module_ids[$i], "ORG_ID" => $hid)) == FALSE) {
                $attr = array(
                    "SA_MODULE_NAME" => $module_names[$i],
                    "MODULE_ID" => $module_ids[$i],
                    "ORG_ID" => $hid
                );
                $this->utilities->insertData($attr, "sa_org_modules");
            }
        }
        $selected_modules = $this->utilities->findAllByAttribute("sa_org_modules", array("ORG_ID" => $hid));
        $rtnSelectedModules = '';
        foreach ($selected_modules as $selected_module) {
            $rtnSelectedModules .= '<li title="'.$selected_module->SA_MODULE_NAME.'" id="'.$selected_module->SA_MODULE_ID.'" style="overflow: auto;" class="rename-module">
                                                        <span class="module-name">'.$selected_module->SA_MODULE_NAME.'</span>
                                                        <span class="module-name-input hidden">
                                                            <input type="text" style="width:90%; margin: 1px; float: left;" value="'.$selected_module->SA_MODULE_NAME.'" class="txtModuleName" data-hc-module-id="'.$selected_module->SA_MODULE_ID.'" id="txtModuleName">
                                                            <span class="remove-module-input pull-right fa fa-times pointer" title="Delete Module" style="font-size: 16px; color: red;"><span class="md-backspace"></span></span>
                                                        </span>
                                                        <span data-hc-module-id="'.$selected_module->SA_MODULE_ID.'" style="font-size: 16px; color: red;" title="Delete Module" class="remove-module pull-right fa fa-times pointer">
                                                            <span class="md-backspace"></span>
                                                        </span>
                                                    </li>';
        }
        echo $rtnSelectedModules;
    }

    /**
     * Method get all module in assign module modal
     * @param none
     * @return none
     */
    public function getModules()
    {
        $modules = $this->utilities->findAllByAttribute("sa_modules", array("ACTIVE_STATUS" => 1));
       foreach ($modules as $module) {
            echo '<li class="ui-widget-content" id="'.$module->MODULE_ID.'" title="'.$module->MODULE_NAME.'">'.$module->MODULE_NAME.'</li>';
        }
    }

    /**
     * Method To update Module availability by organizations
     * @param none
     * @return none
     */
    public function updateModule()
    {
        $module_id = $this->input->post('m_id');
        $module_name = $this->input->post('m_name');
        $attr = array(
            "SA_MODULE_NAME" => $module_name
        );
        $rs = $this->utilities->updateData("sa_org_modules", $attr, array("SA_MODULE_ID" => $module_id));
        if ($rs == TRUE) {
            echo "green";
        }
    }

    /**
     * Method find module links by organizations
     * @param none
     * @return none
     */
    public function moduleModalLink()
    {
        $data["hid"] = $this->input->post('hid');
        $data["active_modules"] = $this->utilities->findAllByAttribute("sa_org_modules", array("ORG_ID" => $data["hid"]));
        echo $this->load->view("accessControl/module_list", $data, true);
    }

    /**
     * Method Assign link by modules
     * @param none
     * @return none
     */
    function assignModulePage()
    {
        $values = explode(",", $this->input->post("values"));
        $module_id = $values[0];
        $link_id = $values[1];
        $page_type = $values[2];
        $org_id = $values[3];
        $is_checked = $this->input->post("is_checked");
        $check_existance = $this->utilities->findByAttribute("sa_org_mlinks", array("SA_MODULE_ID" => $module_id, "LINK_ID" => $link_id, "ORG_ID" => $org_id));
        if (!empty($check_existance)) {
            $updateData = array(
                'CREATE' => ($page_type == 'C') ? $is_checked : $check_existance->CREATE,
                'READ' => ($page_type == 'R') ? $is_checked : $check_existance->READ,
                'UPDATE' => ($page_type == 'U') ? $is_checked : $check_existance->UPDATE,
                'DELETE' => ($page_type == 'D') ? $is_checked : $check_existance->DELETE,
                'STATUS' => ($page_type == 'S') ? $is_checked : $check_existance->STATUS,
                'UPD_BY' => $this->user_session["FLD_USER_ID"],
                'UPD_DT' => date("Y-m-d H:i:s")
            );
            $this->utilities->updateData('sa_org_mlinks', $updateData, array("SA_MLINKS_ID" => $check_existance->SA_MLINKS_ID));
            echo "updated";
        } else {
            $insertData = array(
                'LINK_ID' => $link_id,
                'ORG_ID' => $org_id,
                'SA_MODULE_ID' => $module_id,
                'CREATE' => ($page_type == 'C') ? 1 : 0,
                'READ' => ($page_type == 'R') ? 1 : 0,
                'UPDATE' => ($page_type == 'U') ? 1 : 0,
                'DELETE' => ($page_type == 'D') ? 1 : 0,
                'STATUS' => ($page_type == 'S') ? 1 : 0,
                'CRE_BY' => $this->user_session["FLD_USER_ID"]
            );
            $this->utilities->insertData($insertData, 'sa_org_mlinks');
            echo "inserted";
        }
    }

    /**
     * Method to load modal for creatin group by organizations
     * @param none
     * @return none
     */
    public function groupModal()
    {
         $hid  = $data["hid"]  = $this->input->post('hid');
        $data['group_list'] = $this->accessControl_model->findUserGroupList($hid);
        echo $this->load->view("accessControl/create_group", $data, true);
    }

    /**
     *  Method to process data from Create group modal
     * @param none
     * @return none
     */
    public function addNewGroup()
    {
        $h_id       = $this->input->post('hid');
        $group_name = $this->input->post("txtGroupName");
        $attr       = array(
            "ORG_ID" => $h_id,
            "USERGRP_NAME" => $group_name,
            "ACTIVE_STATUS" => isset($_POST['ACTIVE_STATUS']) ? 1 : 0,
            "CRE_BY" => $this->user_session["FLD_USER_ID"],
        );
        $rs = $this->utilities->insertData($attr, "sa_user_group");
        if ($rs == TRUE) {
            $this->session->set_flashdata('success',$this->lang->line('group').' '.$this->lang->line('cre_success'));
            redirect("AccessControl/allGroup");
        } else {
            $this->session->set_flashdata('Error', 'User Group Create Failled.');
            redirect("AccessControl/allGroup");
        }
    }

    /**
     *  Method find all user groups
     * @param none
     * @return none
     */
    public function allGroup()
    {
        $data['pageTitle']   = 'View All Groups';
        $data['breadcrumbs'] = array(
            'Access Control' => 'AccessControl',
            'Groups' => '#'
        );
        $data["orgList"] = $this->accessControl_model->organizationList();
        $data['content_view_page'] = 'accessControl/all_groups';
        $this->template->display($data);
    }

    /**
     *  Method to edit user group
     * @param none
     * @return none
     */
    public function editUserGroup()
    {
        $group_id = $data["user_group_id"] = $this->input->post("group_id");
        $groupName = $this->input->post("USERGRP_NAME");
        $orgId     = $this->input->post("ORG_ID");
        $group_db  = $this->input->post("grpId");
        if (isset($_POST['ORG_ID'])) {
            $data = array(
                'USERGRP_NAME' => $groupName,
                'ORG_ID' => $orgId,
                'ACTIVE_STATUS' => isset($_POST['ACTIVE_STATUS']) ? 1 : 0,
                'UPD_BY' => $this->user_session["FLD_USER_ID"],
                'UPD_DT' => date("Y-m-d:H-i-s"),
            );
            if ($this->utilities->updateData('sa_user_group', $data, array('USERGRP_ID' => $group_db))) {
                $data['groups'] = $this->accessControl_model->userGroupList($orgId);
                echo $this->load->view("accessControl/ajaxIndividualGroupAdd", $data, true);
            }
        } else {
            $data['pageTitle']  = 'Edit User Group';
            $data['org_list']   = $this->utilities->dropdownFromTableWithCondition('sa_organizations',  '', 'ORG_ID', 'ORG_NAME');
            $data['group_info'] = $this->utilities->findByAttribute('sa_user_group', array('USERGRP_ID' => $group_id));
            echo $this->load->view("AccessControl/editUserGroup", $data, true);
        }
    }
    /**
     * Create group by organization
     * @param none
     * @return none
     */
    public function groupModalIndvidual()
    {
        $data = array();
        $data['org_id'] = $this->input->post('orgId');
        if (isset($_POST['USERGRP_NAME'])) {
            $organization = $this->input->post('ORG_ID');
            $attr = array(
                "ORG_ID" => $organization,
                "USERGRP_NAME" => $this->input->post('USERGRP_NAME'),
                "ACTIVE_STATUS" => isset($_POST['ACTIVE_STATUS']) ? 1 : 0,
                "CRE_BY" => $this->user_session["FLD_USER_ID"],
            );
            if ($this->utilities->insertData($attr, 'sa_user_group')) {
                $data['groups'] = $this->accessControl_model->userGroupList($organization);
                echo $this->load->view("accessControl/ajaxIndividualGroupAdd", $data, true);
            }
        } else {
            echo $this->load->view("accessControl/createGroupIndividual", $data, true);
        }
    }
    /**
     * Method to load modal for create level
     * @param none
     * @return none
     */
    public function createLevelModal()
    {

        $data["user_group_id"] = $this->input->post("group_id");
        $data["grp_org"] = $this->input->post("ORG_GRP");
        $data['pageTitle'] = 'Create Level';
        echo $this->load->view("accessControl/createLavel", $data, true);
    }
    /**
     *  Method to Create level using organization and group id
     * @param none
     * @return none
     */
    public function createLevel()
    {
        $group_org = $this->input->post('txtGroupId');
        $divide    = explode("_", $group_org);
        $group_id  = $divide[0];
        $org_id    = $divide[1];

        $insertdata = array(
            'UGLEVE_NAME' => $this->input->post('txtLevelName'),
            'ORG_ID' => $org_id,
            'ACTIVE_STATUS' => isset($_POST['ACTIVE_STATUS']) ? 1 : 0,
            'USERGRP_ID' => $group_id,
            'CRE_BY' => $this->user_session["FLD_USER_ID"]
        );

        if ($this->utilities->insertData($insertdata, 'sa_ug_level')) {
            $data['group_levels'] = $this->utilities->findAllByAttribute("sa_ug_level", array("USERGRP_ID" => $group_id, "ACTIVE_STATUS" => 1));
            echo $this->load->view('accessControl/ajaxLevel', $data, true);
        } else {
            $this->session->set_flashdata('Error', 'User Group Create Failled.');
            redirect('AccessControl/allGroup');
        }
    }
    /**
     *  Method to Update level using organization and group id
     * @param none
     * @return none
     */
    public function update_user_group_lavel()
    {
        $level_id   = $this->input->post("levelid");
        $level_data = $this->input->post("leveldata");

        if (!empty($level_data)) {
            $updateData = array(
                'UGLEVE_NAME' => $level_data,
                'UPD_BY' => $this->user_session["FLD_USER_ID"],
                'UPD_DT' => date("Y-m-d H:i:s")
            );
            if ($this->utilities->updateData('sa_ug_level', $updateData, array("UG_LEVEL_ID" => $level_id))) {
                echo "updated";
            } else {
                echo "failed";
            }
        }
    }
   /**
    * Method to create user organizationwise
    * @param integer $org_id Organization Id
    * @return none
    */
    public function createUser($org_id)
    {
        if (isset($_POST['ORG_ID'])) {

            $userInfo = array(
                'USERNAME' => $this->input->post('USERNAME'),
                'USERPW' => md5($this->input->post('password1')),
                'EFECT_FROM_DT' => date('Y-m-d', strtotime($this->input->post('EFECT_FROM_DT'))),
                'EXPR_DT' => date('Y-m-d', strtotime($this->input->post('EXPIRE_DT'))),
                'ORG_ID' => $this->input->post('ORG_ID'),
                'USERGRP_ID' => $this->input->post('USERGRP_ID'),
                'USERLVL_ID' => $this->input->post('UG_LVL_ID'),
                'USERTYPE' => 1,
                'EMP_ID' => $this->input->post('EMP_ID'),
                'EMAIL' => $this->input->post('EMAIL'),
                'ACTIVE_STATUS' => (isset($_POST['ACTIVE_STATUS'])) ? 1 : 0,
                'CRE_BY' => $this->user_session["FLD_USER_ID"],
            );
            if ($this->utilities->insertData($userInfo, 'sa_users')) {
                $this->session->set_flashdata('success',$this->lang->line('user').' '.$this->lang->line('cre_success'));
                redirect('accessControl/orgModuleSetup');
            }
        } else {
            $hid = $data['hid'] = $org_id;
            $data['empList'] = $this->utilities->dropdownFromTableWithCondition("sa_users", "Select Employee", "FLD_USER_ID", "FULL_NAME", array("ACTIVE_STATUS =" => 1, "ORG_ID" => $hid));
            $data['groups']   = $this->utilities->dropdownFromTableWithCondition('sa_user_group',  '', 'USERGRP_ID', 'USERGRP_NAME', array('ACTIVE_STATUS' => 1, 'ORG_ID' => $hid));
            echo $this->load->view('accessControl/createUser', $data, true);
        }
    }
    /**
    * Method to get group level by group id
    * @param none
    * @return none
    */

    public function getLevelsByGroup()
    {
        $group  = $this->input->post("group");
        $levels = $this->utilities->dropdownFromTableWithCondition('sa_ug_level',  'Select Level -', 'UG_LEVEL_ID', 'UGLEVE_NAME', array('USERGRP_ID' => $group));
        if (!empty($levels)) {
            echo form_dropdown('cmbLevel', $levels, '', 'id="cmbLevel" class="form-control"');
        } else {
            return FALSE;
        }
    }
    /**
    * Method to create user
    * @param none
    * @return none
    */
    public function addUserBySubproject()
    {
        $h_id = $this->input->post("txtOrgId");
        $attr = array(
            "ORG_ID" => $h_id,
            "USERNAME" => $this->input->post("txtFirstName"),
            "USERPW" => md5($this->input->post("txtPassword")),
            "USERGRP_ID" => $this->input->post("cmbGroupName"),
            "USERLVL_ID" => $this->input->post("cmbLevel"),
            "EMAIL" => $this->input->post("txtEmail"),
            "USERTYPE" => 1,
            "ACTIVE_STATUS" => 1,
            "CRE_BY" => $this->user_session["FLD_USER_ID"]
        );
        $rs = $this->utilities->insertData($attr, "sa_users");
        if ($rs == TRUE) {
        $this->session->set_flashdata('success','User '.$this->lang->line('cre_success'));
            redirect('AccessControl/orgModuleSetup');
        } else {
            $this->session->set_flashdata('Error', 'User Group Create Failled.');
            redirect('AccessControl/orgModuleSetup');
        }
    }
    /**
    * Method to create user organizationwise
    * @param integer $org_id Organization Id
    * @return none
    */
    public function assignModuleToGroup()
    {
        $data['pageTitle']   = 'Assign Link To Group';
        $data['breadcrumbs'] = array(
            'Assign Link To Group' => '#'
        );
        $data["org"] = $this->utilities->dropdownFromTableWithCondition("sa_organizations", "Select A Organization", "ORG_ID", "ORG_NAME",  array("ACTIVE_STATUS" => 1));
        $data["org_modules"] = $this->utilities->findAllByAttribute("sa_org_modules",  array("ORG_ID" => $this->user_session["ORG_ID"], "ACTIVE_STATUS" => 1));
        $data['content_view_page'] = 'accessControl/assign_module_to_group';
        $this->template->display($data);
    }
    /**
    * Method to groups by organization
    * @param none
    * @return none
    */
    public function getGroupsByOrg()
    {
        $group  = $this->input->post("org");
        $groups = $this->utilities->dropdownFromTableWithCondition('sa_user_group', 'Select Group -', 'USERGRP_ID', 'USERGRP_NAME', array('ORG_ID' => $group));
        if (!empty($groups)) {
            echo form_dropdown('cmbGroup', $groups, '', 'id="cmbGroup" class="form-control"');
        } else {
            return FALSE;
        }
    }
    /**
    * Method to get users by groups
    * @param none
    * @return none
    */
    function getUsersByGroup()
    {
        $group_org = $this->input->post("group");
        $divide    = explode("_", $group_org);
        $group_id  = $divide[0];
        $org_id    = $divide[1];
        $users     = $this->utilities->findAllByAttribute("sa_users", array("ORG_ID" => $org_id, "USERGRP_ID" => $group_id, "ACTIVE_STATUS" => 1));
            
        if (!empty($users)) {
            foreach ($users as $user) {
                echo "<tr>";
                echo "<td>".$user->FULL_NAME."</td>";
                echo "</tr>";
            }
        } else {
            echo "<tr>";
            echo "<td>No User Found</td>";
            echo "</tr>";
        }
    }
    /**
    * Method to get module Access by Group
    * @param none
    * @return none
    */
    public function getModuleAcceesByGroup()
    {
        $group_org  = $this->input->post("group");
        $divide = explode("_", $group_org);
        $group_id = $divide[0];
        $org_id = $divide[1];
        $data['group'] = $group_id;
        $data["org_modules"] = $this->utilities->findAllByAttribute("sa_org_modules", array("ORG_ID" => $org_id, "ACTIVE_STATUS" => 1));
        echo $this->load->view("AccessControl/assignModuleByGroupId", $data, true);
    }
   /**
    * Method to get user by level
    * @param none
    * @return none
    */

    public function getUsersByLevel()
    {
        $group  = $this->input->post('group');
        $org    = $this->input->post('org');
        $lavel  = $this->input->post('level');
        $users  = $this->utilities->findAllByAttribute("sa_users", array("ORG_ID" => $org, "USERGRP_ID" => $group, "USERLVL_ID" => $lavel, "ACTIVE_STATUS" => 1));
        
        if (!empty($users)) {
            foreach ($users as $user) {
                echo "<tr>";
                echo "<td>".$user->FULL_NAME."</td>";
                echo "</tr>";
            }
        } else {
            echo "<tr>";
            echo "<td>No User Found</td>";
            echo "</tr>";
        }
    }
    /**
    * Method to get module Access by Group Level
    * @param none
    * @return none
    */
    public function getModuleAcceesByGroupLevel()
    {
        $data["group"] = $this->input->post("group");
        $data["level"] = $this->input->post("level");
        $org = $this->input->post('org');
        $data['org'] = $org;
        $data["org_modules"] = $this->utilities->findAllByAttribute("sa_org_modules",  array("ORG_ID" => $org, "ACTIVE_STATUS" => 1));
        echo $this->load->view("accessControl/assignModuleByGroupLevel", $data, true);
    }
    /**
    * Method to assign assign Module To Group
    * @param none
    * @return none
    */
    public function assignModuleToGroupAction()
    {
        $group = $this->input->post('group_id');
        $level = $this->input->post('level_id');
        $org = $this->input->post('org_id');
        $values = explode(',', $this->input->post('values'));
        $module_id  = $values[0];
        $link_id = $values[1];
        $page_type = $values[2];
        $is_checked = $this->input->post("is_checked");

        $check_existance = $this->utilities->findByAttribute("sa_uglw_mlink", array("SA_MLINKS_ID" => $link_id, "USERGRP_ID" => $group, "UG_LEVEL_ID" => $level, "ORG_ID" => $org));
        if (!empty($check_existance)) {
            $updateData = array(
                'CREATE' => ($page_type == 'C') ? $is_checked : $check_existance->CREATE,
                'READ' => ($page_type == 'R') ? $is_checked : $check_existance->READ,
                'UPDATE' => ($page_type == 'U') ? $is_checked : $check_existance->UPDATE,
                'DELETE' => ($page_type == 'D') ? $is_checked : $check_existance->DELETE,
                'STATUS' => ($page_type == 'S') ? $is_checked : $check_existance->DELETE,
                'CRE_BY' => $this->user_session["FLD_USER_ID"],
                'UPD_DT' => date("Y-m-d H:i:s")
            );
            $this->utilities->updateData('sa_uglw_mlink', $updateData, array("SA_UGLWM_LINK" => $check_existance->SA_UGLWM_LINK));
        } else {
            $insertData = array(
                'SA_MLINKS_ID' => $link_id,
                'USERGRP_ID' => $group,
                'UG_LEVEL_ID' => $level,
                'SA_MODULE_ID' => $module_id,
                'CREATE' => ($page_type == 'C') ? 1 : 0,
                'READ' => ($page_type == 'R') ? 1 : 0,
                'UPDATE' => ($page_type == 'U') ? 1 : 0,
                'DELETE' => ($page_type == 'D') ? 1 : 0,
                'STATUS' => ($page_type == 'S') ? 1 : 0,
                'ORG_ID' => $org,
                'UPD_BY' => $this->user_session["FLD_USER_ID"],
                'UPD_DT' => date("Y-m-d H:i:s")
            );
            $this->utilities->insertData($insertData, 'sa_uglw_mlink');
        }
    }
    /**
    * Method get users by organization
    * @param none
    * @return none
    */
    public function getUsersByOrganization()
    {
        $org    = $this->input->post('org');
        $org_id = '';
        $users  = $this->utilities->findAllByAttribute("sa_users", array("ORG_ID" => $org, "ACTIVE_STATUS" => 1));
        
            if (!empty($users)) {
                foreach ($users as $user) {
                    echo "<tr>";
                    echo "<td>".$user->FULL_NAME."</td>";
                    echo "</tr>";
                }
            } else {
                echo "<tr>";
                echo "<td>No User Found</td>";
                echo "</tr>";
            }
    }
    /**
    * Method get module access by organization
    * @param none
    * @return none
    */

    public function getModuleAcceesByOrganization()
    {
        $org_id = $this->input->post("org");
        $data['group'] = $org_id;
        $data["org_modules"] = $this->utilities->findAllByAttribute("sa_org_modules", array("ORG_ID" => $org_id, "ACTIVE_STATUS" => 1));
        echo $this->load->view("AccessControl/assignModuleByOrgId", $data, true);
    }
    
     public function deleteModule($id)
    {
         if ($this->utilities->deleteRowByAttribute(
            'sa_modules', array('MODULE_ID' => $id))
        ) {
            $this->util->resultObject(1,'Module Deleted Successfully!');
        }
    }
     public function deleteModuleLink($id)
    {
        if ($this->utilities->deleteRowByAttribute(
                'sa_module_links', array('LINK_ID' => $id))
        ) {
            $this->util->resultObject(1, 'Module Link Deleted Successfully!');
        }
    }
     public function deleteUserGroup($id)
    {
         if ($this->utilities->deleteRowByAttribute(
                'sa_user_group', array('USERGRP_ID' => $id))
        ) {
            $this->util->resultObject(1, 'Module Link Deleted Successfully!');
        }
    }
}
?>