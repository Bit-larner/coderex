<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Union extends EXT_Controller
{

    public function __construct()
    {
        parent::__construct();
        $this->user_session = $this->session->userdata('logged_in');
        if (!$this->user_session) {
            redirect('auth/index');
        }
        $this->load->model('setup_model');
    }
    /*
     * @methodName index()
     * @access
     * @param  none
     * @return  //Load district setup page layout
     */

    public function index()
    {
        $data['breadcrumbs'] = array(
            'Modules' => '#'
        );
        $data['pageTitle']         = 'Union Setup';
       // $data['unions']            = $this->setup_model->getAllUnions();
        $data['content_view_page'] = 'setup/union/index';
        $this->template->display($data);
    }
    /**
     * Get Union list by ajax request for pagination
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

        $sqlPartial = 'SELECT sa_unions.UNION_ID,sa_unions.UD_UNION_CODE,sa_unions.UNION_NAME,sa_thanas.THANA_ENAME,sa_districts.DISTRICT_ENAME FROM sa_unions
 LEFT JOIN sa_thanas using (THANA_ID) LEFT JOIN sa_districts  USING (DISTRICT_ID)';

        $tableName          = 'sa_unions';

        $fieldsName         = array('sa_unions.UNION_ID','sa_unions.UNION_NAME','sa_thanas.THANA_ENAME', 'sa_districts.DISTRICT_ENAME');

        $actions = array('setup/union/view/','setup/union/edit/','setup/union/delete/');
        $modalTitle = array('View Union','Edit Union','Remove Union');
        $icons = array('glyphicon-eye-open','glyphicon-edit','glyphicon-trash');
        $htmlClass = array('btn btn-success btn-xs modalLink','btn btn-warning btn-xs modalLink','btn btn-danger btn-xs modalLink');


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

    public function create()
    {
        if (isset($_POST['THANA_ID'])) {
            $data = array(
                'UNION_NAME' => $this->input->post('UNION_ENAME', true),
                'THANA_ID' => $this->input->post('THANA_ID', true),
                'CRE_BY' => $this->user_session["FLD_USER_ID"]
            );
            if ($this->utilities->insertData($data, 'sa_unions')) {
                $this->session->set_flashdata('success',
                    $this->lang->line('union').' '.$this->lang->line('cre_success'));
                redirect('setup/union');
            }
        }
        $data['divisions'] = $this->utilities->dropdownFromTableWithCondition('sa_divisions',
            'Select Division', 'DIVISION_ID', 'DIVISION_ENAME');
        $data['thanas']    = $this->utilities->dropdownFromTableWithCondition('sa_thanas',
            'Select Item', 'THANA_ID', 'THANA_ENAME');
        $this->load->view('setup/union/create', $data);
    }
    /*
     * @methodName edit()
     * @access
     * @param  none
     * @return  //Load divition create page
     */

    public function edit($id)
    {
        if (isset($_POST['ID_THANA'])) {
            $data = array(
                'UNION_NAME' => $this->input->post('UNION_ENAME'),
                'THANA_ID' => $this->input->post('ID_THANA'),
                'UPD_BY' => $this->user_session["FLD_USER_ID"],
                'UPD_DT' => date("Y-m-d H:i:s")
            );
            if ($this->utilities->updateData('sa_unions', $data,
                    array('UNION_ID' => $id))) {
                $this->session->set_flashdata('success',
                    $this->lang->line('union').' '.$this->lang->line('upd_success'));
                redirect('setup/union');
            }
        }
        $data['row']       = $this->setup_model->getAllUnionInfoById($id);
        $data['divisions'] = $this->utilities->dropdownFromTableWithCondition('sa_divisions',
            'Select Item', 'DIVISION_ID', 'DIVISION_ENAME');
        $data['districts'] = $this->utilities->dropdownFromTableWithCondition('sa_districts',
            'Select Item', 'DISTRICT_ID', 'DISTRICT_ENAME');
        $data['thanas']    = $this->utilities->dropdownFromTableWithCondition('sa_thanas',
            'Select Item', 'THANA_ID', 'THANA_ENAME');
//        $this->pr($data);
        $this->load->view('setup/union/edit', $data);
    }
    /*
     * @methodName view()
     * @access
     * @param  none
     * @return  //
     */

    public function view($id)
    {
        $data['viewdetails'] = $this->setup_model->getAllUnionById($id);
//        $this->pr($data);s
        $this->load->view('setup/union/view', $data);
    }
    /*
     * @methodName Delete()
     * @access
     * @param  none
     * @return  //
     */

    public function delete($id)
    {
        $this->utilities->deleteRowByAttribute('sa_unions',
            array('UNION_ID' => $id));
        redirect('setup/union');
    }
    /*
     * @methodName Pr()
     * @access
     * @param  none
     * @return  Debug Function
     */

    private function pr($data)
    {
        echo "<pre>";
        print_r($data);
        echo "</pre>";
        exit;
    }
}