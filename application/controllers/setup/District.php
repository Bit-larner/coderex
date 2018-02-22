<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class District extends EXT_Controller {

    public function __construct() {
        parent::__construct();
        $this->user_session = $this->session->userdata('logged_in');
        if (!$this->user_session) {
            redirect('auth/index');
        }
        $this->load->model('setup_model');
        date_default_timezone_set("Asia/Dhaka");
        $this->now = date('Y-m-d H:i:s', time());
    }

    /*
     * @methodName index()
     * @access public
     * @param  none
     * @return  district details
     */

    public function index() {
        $data['breadcrumbs'] = array(
            'Modules' => '#'
        );
        $data['pageTitle'] = 'District Setup';
        $data['list'] = $this->setup_model->getAllDisticts();
        $data['content_view_page'] = 'setup/district/index';
        $this->template->display($data);
    }

    /*
     * @methodName Create()
     * @access public
     * @param  none
     * @return  
     */

    public function create() {
        if (isset($_POST['DISTRICT_ENAME'])) {
            $data = array(
                'DIVISION_ID' => $this->input->post('DIVISION_ID', true),
                'DISTRICT_ENAME' => $this->input->post('DISTRICT_ENAME', true),
                'UD_DISTRICT_CODE' => $this->input->post('UD_DISTRICT_CODE', true),
                'ACTIVE_STATUS' => (isset($_POST['ACTIVE_STATUS'])) ? 1 : 0,
                'CRE_BY' => $this->user_session["FLD_USER_ID"],
                'CRE_DT' => date('Y-m-d H:i:s', time()),
                'ORG_ID' => $this->user_session["SES_ORG_ID"]
            );
            if ($this->utilities->insertData($data, 'sa_districts')) {
                $this->session->set_flashdata('success',$this->lang->line('district').' '.$this->lang->line('cre_success'));
                redirect('setup/district');
            }
        }
        $data['divisions'] = $this->utilities->dropdownFromTableWithCondition('sa_divisions', 'Select Division', 'DIVISION_ID', 'DIVISION_ENAME');
        $this->load->view('setup/district/create', $data);
    }

    /*
     * @methodName edit()
     * @access public
     * @param  $id
     * @return  // load disricts details from sa_districts table by parameter
     */

    public function edit($id) {
        if (isset($_POST['DISTRICT_ENAME'])) {
            $data = array(
                'DIVISION_ID' => $this->input->post('DIVISION_ID', true),
                'DISTRICT_ENAME' => $this->input->post('DISTRICT_ENAME', true),
                'UD_DISTRICT_CODE' => $this->input->post('UD_DISTRICT_CODE', true),
                'ACTIVE_STATUS' => (isset($_POST['ACTIVE_STATUS'])) ? 1 : 0,
                'UPD_BY' => $this->user_session["FLD_USER_ID"],
                'UPD_DT' => date('Y-m-d H:i:s', time()),
                'ORG_ID' => $this->user_session["SES_ORG_ID"]
            );
            if ($this->utilities->updateData('sa_districts', $data, array('DISTRICT_ID' => $id))) {
                $this->session->set_flashdata('success',$this->lang->line('').' '.$this->lang->line('upd_success'));
                redirect('setup/district');
            }
        }
        $data['row'] = $this->utilities->findByAttribute('sa_districts', array('DISTRICT_ID' => $id));
        $data['divisions'] = $this->utilities->dropdownFromTableWithCondition('sa_divisions', 'Select Division', 'DIVISION_ID', 'DIVISION_ENAME');
        $this->load->view('setup/district/edit', $data);
    }

    /*
     * @methodName view()
     * @access public
     * @param  $id
     * @return  district details
     */

    public function view($id) {
        $data['viewdetails'] = $this->setup_model->getAllDistictsById($id);
        $this->load->view('setup/district/view', $data);
    }

    /*
     * @methodName Delete()
     * @access public
     * @param  $id
     * @return  none
     */

    public function delete($id) {
        if ($this->utilities->deleteRowByAttribute('sa_districts', array('DISTRICT_ID' => $id))) {
            $this->util->resultObject(1, 'District Deleted Successfully!');
            redirect('setup/district');
        }
    }

    /*
     * @methodName Pr()
     * @access
     * @param  none
     * @return  Debug Function
     */

    private function pr($data) {
        echo "<pre>";
        print_r($data);
        echo "</pre>";
        exit;
    }

}