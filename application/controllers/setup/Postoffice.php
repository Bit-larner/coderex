<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Postoffice extends EXT_Controller {

    public function __construct() {
        parent::__construct();
        $this->user_session = $this->session->userdata('logged_in');
        if (!$this->user_session) {
            redirect('auth/index');
        }
        $this->load->model('postoffice_model');
    }

    /*
     * @methodName index()
     * @access
     * @param  none
     * @return  //Load district setup page layout
     */

    public function index() {
        $data['breadcrumbs'] = array(
            'Post Office' => '#'
        );
        $data['pageTitle'] = 'Post Office Setup';
    //    $data['list'] = $this->postoffice_model->getAllPostOfficeInfo();
//        $this->pr($data);
        $data['content_view_page'] = 'setup/postoffice/index';
        $this->template->display($data);
    }
     /**
     * Get Post Office list by ajax request for pagination
     * @methodName index()
     * @access
     * @param  none
     * @return 
     */
    public function ajaxCrudJoinIndex(){
        $this->load->library('DataTable');

        $draw               = $_REQUEST['draw'];
        $start              = $_REQUEST['start'];
        $length             = $_REQUEST['length'];
        $colToSort          = $_REQUEST["order"][0]["column"];
        $colToSortAction    = $_REQUEST["order"][0]["dir"];
        $search             = trim($_REQUEST["search"]["value"]);

        $sqlPartial = 'SELECT sa_post_offices.POST_OFFICE_ID,sa_post_offices.POST_OFFICE_ENAME,sa_post_offices.POST_CODE,sa_thanas.THANA_ENAME,sa_districts.DISTRICT_ENAME
FROM sa_post_offices LEFT JOIN sa_thanas using (THANA_ID) LEFT JOIN sa_districts  USING (DISTRICT_ID)';

        $tableName          = 'sa_post_offices';

        $fieldsName         = array('sa_post_offices.POST_OFFICE_ID','sa_post_offices.POST_OFFICE_ENAME','sa_post_offices.POST_CODE', 'sa_thanas.THANA_ENAME','sa_districts.DISTRICT_ENAME');

        $actions = array('setup/postoffice/view/','setup/postoffice/edit/','setup/postoffice/delete/');
        $modalTitle = array('View Post Office','Edit Post Office','Remove Post Office');
        $icons = array('glyphicon-eye-open','glyphicon-edit','glyphicon-trash');
        $htmlClass = array('btn btn-success btn-xs modalLink','btn btn-warning btn-xs modalLink','btn btn-danger btn-xs delete');


        $recordsArr = $this->datatable->getJoinDataTable(
            $draw,
            $start,
            $length,
            $colToSort,
            $colToSortAction,
            $search,
            $sqlPartial,
            $tableName,
            $fieldsName,
            $actions,
            $modalTitle,
            $icons,
            $htmlClass
        );

        echo json_encode($recordsArr);
    }

    /*
     * @methodName Create()
     * @access
     * @param  none
     * @return  //Load divition create page
     */

    public function create() {
        if (isset($_POST['THANA_ID'])) {
            $data = array(
                'THANA_ID' => $this->input->post('THANA_ID', true),
                'POST_OFFICE_ENAME' => $this->input->post('POST_ENAME', true),
                'POST_CODE' => $this->input->post('POST_CODE', true),
                'CRE_BY' => $this->user_session["FLD_USER_ID"]
            );
            if ($this->utilities->insertData($data, 'sa_post_offices')) {
                  $this->session->set_flashdata('success',
                    $this->lang->line('post_office').' '.$this->lang->line('cre_success'));
                redirect('setup/postoffice');
            }
        }
        $data['divisions'] = $this->utilities->dropdownFromTableWithCondition('sa_divisions', 'Select Division', 'DIVISION_ID', 'DIVISION_ENAME');
        $this->load->view('setup/postoffice/create',$data);
    }

    /*
     * @methodName edit()
     * @access
     * @param  none
     * @return  //Load divition create page
     */

    public function edit($id) {
        if (isset($_POST['ID_THANA'])) {
            $data = array(
                'THANA_ID' => $this->input->post('ID_THANA'),
                'POST_OFFICE_ENAME' => $this->input->post('POST_ENAME'),
                'POST_CODE' => $this->input->post('POST_CODE'),
                'UPD_BY' => $this->user_session["FLD_USER_ID"],
            	'UPD_DT' => date("Y-m-d:H-i-s")
            );
            if ($this->utilities->updateData('sa_post_offices', $data, array('POST_OFFICE_ID' => $id))) {
                $this->session->set_flashdata('success',
                    $this->lang->line('post_office').' '.$this->lang->line('upd_success'));
                redirect('setup/postoffice');
            }
        }
         $data['divisions'] = $this->utilities->dropdownFromTableWithCondition('sa_divisions', 'Select Item', 'DIVISION_ID', 'DIVISION_ENAME');
         $data['districts'] = $this->utilities->dropdownFromTableWithCondition('sa_districts', 'Select Item', 'DISTRICT_ID', 'DISTRICT_ENAME');
         $data['thanas'] = $this->utilities->dropdownFromTableWithCondition('sa_thanas', 'Select Item', 'THANA_ID', 'THANA_ENAME');
         $data['row'] = $this->postoffice_model->getAllPostOfficeInfoById($id);
//        $this->pr($data);
        $this->load->view('setup/postoffice/edit', $data);
    }


      /*
     * @methodName view()
     * @access
     * @param  none
     * @return  //
     */

    public function view($id) {
        $data['viewDetails'] = $this->postoffice_model->getAllPostOfficeInfoById($id);
//        $this->pr($data);
        $this->load->view('setup/postoffice/view', $data);
    }


    /*
     * @methodName Delete()
     * @access
     * @param  none
     * @return  //
     */


    public function delete($id){
        if ($this->utilities->deleteRowByAttribute(
            'sa_post_offices', array('POST_OFFICE_ID' => $id))
        ) {

            $this->util->resultObject(1,'Module Deleted Successfully!');

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