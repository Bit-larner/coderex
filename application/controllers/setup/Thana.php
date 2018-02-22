<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Thana extends EXT_Controller {

    public function __construct() {
        parent::__construct();
        $this->user_session = $this->session->userdata('logged_in');
        if (!$this->user_session) {
            redirect('auth/index');
        }
        $model = $this->load->model('setup_model');
    }

    /*
     * @methodName index()
     * @access
     * @param  none
     * @return  //Load district setup page layout
     */

    public function index() {
        $data['breadcrumbs'] = array(
            'Modules' => '#'
        );
        $data['pageTitle'] = 'Thana Setup';
        $data['list'] = $this->setup_model->getAllThanas();
        $data['content_view_page'] = 'setup/thana/index';
        $this->template->display($data);
    }

    /*
     * @methodName Create()
     * @access
     * @param  none
     * @return  //Load divition create page
     */

    public function create() {
        if (isset($_POST['DISTRICT_ID'])) {
            $data1 = array(
                'THANA_ENAME' => $this->input->post('THANA_ENAME', true),
                'DISTRICT_ID' => $this->input->post('DISTRICT_ID', true),
                'CRE_BY' => $this->user_session["FLD_USER_ID"]
            );
            if ($this->utilities->insertData($data1, 'sa_thanas')) {
                $this->session->set_flashdata('success', $this->lang->line('thana') . ' ' . $this->lang->line('cre_success'));
                redirect('setup/thana');
            }
        }
        $data['divisions'] = $this->utilities->dropdownFromTableWithCondition('sa_divisions', 'Select Division', 'DIVISION_ID', 'DIVISION_ENAME');
        $data['districts'] = $this->utilities->dropdownFromTableWithCondition('sa_districts', 'Select Item', 'DISTRICT_ID', 'DISTRICT_ENAME');
        $this->load->view('setup/thana/create', $data);
    }

    /*
     * @methodName edit()
     * @access
     * @param  none
     * @return  //Load divition create page
     */

    public function edit($id) {
        if (isset($_POST['DISTRICT_ID'])) {
            $data = array(
                'THANA_ENAME' => $this->input->post('THANA_ENAME', true),
                'DISTRICT_ID' => $this->input->post('DISTRICT_ID', true),
                'UPD_BY' => $this->user_session["FLD_USER_ID"],
                'UPD_DT' => date("Y-m-d:H-i-s")
            );
            if ($this->utilities->updateData('sa_thanas', $data, array('THANA_ID' => $id))) {
                $this->session->set_flashdata('success', $this->lang->line('thana') . ' ' . $this->lang->line('upd_success'));
                redirect('setup/thana');
            }
        }
        $data['row'] = $this->setup_model->getAllThanaInfoById($id);
        $data['divisions'] = $this->utilities->dropdownFromTableWithCondition('sa_divisions', 'Select Item', 'DIVISION_ID', 'DIVISION_ENAME');
        $data['districts'] = $this->utilities->dropdownFromTableWithCondition('sa_districts', 'Select Item', 'DISTRICT_ID', 'DISTRICT_ENAME');
//        $this->pr($data);
        $this->load->view('setup/thana/edit', $data);
    }

    /*
     * @methodName view()
     * @access
     * @param  none
     * @return  //
     */

    public function view($id) {
        $data['viewdetails'] = $this->setup_model->getAllthanaById($id);
        $this->load->view('setup/thana/view', $data);
    }

    /*
     * @methodName Delete()
     * @access
     * @param  none
     * @return  //
     */

    public function delete($id) {
        if ($this->utilities->deleteRowByAttribute('sa_thanas', array('THANA_ID' => $id))) {
            $this->util->resultObject(1, 'Thana Deleted Successfully!');
            //redirect('setup/thana');
        }
    }

    /*
     * @methodName getDistrictById()
     * @access
     * @param  none
     * @return  district name and id
     */

    public function getDistrictById() {
        $id = $_POST['fld_id'];
        $result = $this->db->query("SELECT DISTRICT_ID, DISTRICT_ENAME FROM sa_districts  WHERE DIVISION_ID  = {$id}")->result();
        echo json_encode($result);
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