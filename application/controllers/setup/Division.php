<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Division extends EXT_Controller {

    private $now;

    public function __construct() {
        parent::__construct();
        $this->user_session = $this->session->userdata('logged_in');
        if (!$this->user_session) {
            redirect('auth/index');
        }
        date_default_timezone_set("Asia/Dhaka");
        $this->now = date('Y-m-d H:i:s', time());
    }

    /*
     * @methodName index()
     * @access
     * @param  none
     * @return  //Load divition setup page layout
     */

    public function index() {
        $data['breadcrumbs'] = array(
            'Modules' => '#'
        );
        $data['pageTitle'] = 'Division Setup';
        $data['divisions'] = $this->utilities->findAllFromview('sa_divisions');
        $data['content_view_page'] = 'setup/division/index';
        $this->template->display($data);
    }

    /*
     * @methodName Create()
     * @access
     * @param  none
     * @return  //Load divition create page
     */

    public function create() {
        $data['country'] = $this->utilities->dropdownFromTableWithCondition('sa_country', 'Select Country', 'COUNTRY_ID', 'NAME');
        $this->load->view('setup/division/create', $data);
    }

    /*
     * @methodName createDivision()
     * @access
     * @param  none
     * @return  //For modal load for create division
     */

    public function saveDivision() {
        $data['COUNTRY_ID'] = $this->input->post('country', true);
        $data['DIVISION_ENAME'] = $this->input->post('division_name', true);
        $data['UD_DIVISION_CODE'] = $this->input->post('division_code', true);
        $data['ORDER_SL'] = $this->input->post('ORDER_SL', true);
        $data['CRE_BY'] = $this->user_session["FLD_USER_ID"];
        $data['CRE_DT'] = date('Y-m-d H:i:s', time());
        $data['ACTIVE_STATUS'] = (isset($_POST['ACTIVE_STATUS'])) ? 1 : 0;
        $this->utilities->insertDataWithReturn('sa_divisions', $data);
        $this->session->set_flashdata('success', $this->lang->line('division') . ' ' . $this->lang->line('cre_success'));
        redirect('setup/division');
    }

    /*
     * @methodName edit()
     * @access
     * @param  none
     * @return  //For modal load for create division
     */

    public function edit($id) {
        $data['result'] = $this->utilities->findByAttribute('sa_divisions', array('DIVISION_ID' => $id));
        $data['country'] = $this->utilities->dropdownFromTableWithCondition('sa_country', 'Select Country', 'COUNTRY_ID', 'NAME');
        $this->load->view('setup/division/edit', $data);
    }

    /*
     * @methodName Update()
     * @access
     * @param  none
     * @return  //
     */

    public function updateDivision() {
        $id = $this->input->post('division_id', true);
        $data['COUNTRY_ID'] = $this->input->post('country', true);
        $data['DIVISION_ENAME'] = $this->input->post('division_name', true);
        $data['UD_DIVISION_CODE'] = $this->input->post('division_code', true);
        $data['ORDER_SL'] = $this->input->post('ORDER_SL', true);
        $data['UPD_BY'] = $this->user_session["FLD_USER_ID"];
        $data['UPD_DT'] = date('Y-m-d H:i:s', time());
        $data['ACTIVE_STATUS'] = (isset($_POST['ACTIVE_STATUS'])) ? 1 : 0;
        $this->utilities->updateData('sa_divisions', $data, array('DIVISION_ID' => $id));
        $this->session->set_flashdata('success', $this->lang->line('division') . ' ' . $this->lang->line('upd_success'));
        redirect('setup/division');
    }

    /*
     * @methodName view()
     * @access
     * @param  none
     * @return  //
     */

    public function view($id) {
        $data['viewdetails'] = $this->utilities->findByAttribute('sa_divisions', array('DIVISION_ID' => $id));
        $this->load->view('setup/division/view', $data);
    }

    /*
     * @methodName view()
     * @access
     * @param  none
     * @return  //
     */

    public function delete($id) {
        if ($this->utilities->deleteRowByAttribute('sa_divisions', array('DIVISION_ID' => $id))) {
            $this->util->resultObject(1, 'Division Deleted Successfully!');
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

