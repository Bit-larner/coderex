<?php
/**
 * Created by PhpStorm.
 * User: streetcoder
 * Date: 2/2/16
 * Time: 2:20 PM
 */

defined('BASEPATH') OR exit('No direct script access allowed');
class CRUD extends EXT_Controller{

    private $user_session;

    public function img(){

        /*  ImageMagic */

        $this->load->library('image_lib');
        $config['image_library'] = 'imagemagick';
        $config['library_path'] = '/usr/bin';
        $config['source_image'] = FCPATH.'src/img/blog-1.png';
        $config['x_axis'] = 100;
        $config['y_axis'] = 60;

        $this->image_lib->initialize($config);

        //$this->image_lib->resize();

        //$this->load->library('image_lib', $config);

        $this->image_lib->resize();
        /*if ( ! $this->image_lib->crop())
        {
            echo $this->image_lib->display_errors();
        }*/

        /* gd2 */
        /*$config['image_library'] = 'gd2';

        $config['source_image'] = FCPATH.'src/img/blog-1.png';
        $config['create_thumb'] = TRUE;
        $config['maintain_ratio'] = TRUE;
        $config['width']         = 75;
        $config['height']       = 50;

        $this->load->library('image_lib', $config);

        $this->image_lib->resize();*/

    }

    public function __construct() {
        parent::__construct();

        $this->user_session = $this->session->userdata('logged_in');
        $this->load->model('accessControl_model');
        $this->load->helper('security');
    }

    public function fileUpload(){
        $config['upload_path']          = './uploads/';
        $config['allowed_types']        = 'gif|jepg|png';
        $config['max_size']             = 100;
        $config['max_width']            = 1024;
        $config['max_height']           = 768;

        $this->load->library('upload', $config);

        if ( ! $this->upload->do_upload('userfile'))
        {
            $error = array('error' => $this->upload->display_errors());

            print_r($error);

        }
        else
        {
            $data = array('upload_data' => $this->upload->data());

            print_r($data);

        }

        $data['pageTitle'] = 'File Upload';
        $data['breadcrumbs'] = array(
            'File Upload' => '#'
        );
        $data['content_view_page'] = 'crud/upload';

        $this->template->display($data);
    }

    public function imageResizer(){

        /*$this->load->helper('path');

        $this->load->library('image_lib');

        $config['image_library'] = 'imagemagick';

        $directory = '/src/img/thumb';
        $config['library_path'] = '/var/www/dgdp-app/src/img/thumb';
        $config['source_image'] = '/var/www/dgdp-app/src/img/blog-1.png';
        $config['x_axis'] = 100;
        $config['y_axis'] = 60;

        $this->image_lib->initialize($config);

        if ( ! $this->image_lib->crop())
        {
            echo $this->image_lib->display_errors();
        }*/


        //echo base_url().'<img src="/src/img/blog-1.png" />';

        $this->load->library('image_lib');
        $config['image_library'] = 'imagemagick';
        $config['source_image'] = '/var/www/dgdp-app/src/img/blog-1.png';
        $config['create_thumb'] = TRUE;
        $config['maintain_ratio'] = TRUE;
        $config['width']         = 75;
        $config['height']       = 50;

        $this->load->library('image_lib', $config);

        $this->image_lib->resize();

        $data['pageTitle'] = 'CRUD Index';
        $data['breadcrumbs'] = array(
            'CRUD Index' => '#'
        );
        $data['content_view_page'] = 'crud/imgResize';

        $this->template->display($data);
    }


    public function index(){
        $data['pageTitle'] = 'CRUD Index';
        $data['breadcrumbs'] = array(
            'CRUD Index' => '#'
        );
        $data['content_view_page'] = 'crud/index';

        $this->template->display($data);
    }

    public function crudCreate(){
        $this->form_validation->set_rules('txtModuleName', 'Module Name', 'trim|required');
        $this->form_validation->set_rules('txtModuleNameBn', 'Module Name Bengali', 'trim|required');
        $this->form_validation->set_rules('txtModuleShortName', 'Module Short Name', 'trim|required');

        if ($this->form_validation->run() == FALSE) {

            $errors = validation_errors();
            if(!empty($errors)){

                $this->util->resultObject(0,validation_errors());

            }else{
                $this->load->view("crud/create");
            }


        }else{
            $this->util->resultObject(1,'Module Created Successfully!');
            //echo '<pre>'.print_r($_POST,1).'</pre>';
//            $module = array(
//                'MODULE_NAME' => $this->input->post('txtModuleName'),
//                'SHORT_NAME' => $this->input->post('txtModuleShortName'),
//                'MODULE_NAME_BN' => $this->input->post('txtModuleNameBn'),
//                'SL_NO' => $this->input->post('SL_NO'),
//                'ACTIVE_STATUS' => isset($_POST['ACTIVE_STATUS']) ? 1 : 0,
//                'CRE_BY' => $this->user_session["FLD_USER_ID"],
//            );
//            if ($this->utilities->insertData($module, 'sa_modules')) {
//
//                $this->util->resultObject(1,'Module Created Successfully!');
//            }
        }


    }


    public function crudView($id){
        $data['module_details'] = $this->utilities->findByAttribute('sa_modules',
            array('MODULE_ID' => $id));
        $this->load->view("crud/view",$data);

    }

    public function crudEdit($moduleId){

        $this->form_validation->set_rules('txtModuleName', 'Module Name', 'trim|required');
        $this->form_validation->set_rules('txtModuleNameBn', 'Module Name Bengali', 'trim|required');
        $this->form_validation->set_rules('txtModuleShortName', 'Module Short Name', 'trim|required');

        if ($this->form_validation->run() == FALSE) {

            $errors = validation_errors();

            if(!empty($errors)){

                $this->util->resultObject(0,$errors);

            }else{
                $data['module_details'] = $this->utilities->findByAttribute('sa_modules',
                    array('MODULE_ID' => $moduleId));
                $this->load->view("crud/edit",$data);
            }


        }else{
            $module = array(
                'MODULE_NAME' => $this->input->post('txtModuleName'),
                'SHORT_NAME' => $this->input->post('txtModuleShortName'),
                'MODULE_NAME_BN' => $this->input->post('txtModuleNameBn'),
                'SL_NO' => $this->input->post('SL_NO'),
                'ACTIVE_STATUS' => isset($_POST['ACTIVE_STATUS']) ? 1 : 0,
                'UPD_BY' => $this->user_session["FLD_USER_ID"],
                'UPD_DT' => date("Y-m-d:H-i-s"),
            );
            if ($this->utilities->updateData('sa_modules', $module,
                array('MODULE_ID' => $moduleId))) {

                $this->util->resultObject(1,'Module Updated Successfully!');

            }
        }

    }

    public function crudRemove($id){
        if ($this->utilities->deleteRowByAttribute(
            'sa_modules', array('MODULE_ID' => $id))
        ) {

            $this->util->resultObject(1,'Module Deleted Successfully!');

        }
    }

    public function ajaxCrudIndex(){
        $this->load->library('DataTable');

        $draw               = $_REQUEST['draw'];
        $start              = $_REQUEST['start'];
        $length             = $_REQUEST['length'];
        $colToSort          = $_REQUEST["order"][0]["column"];
        $colToSortAction    = $_REQUEST["order"][0]["dir"];
        $search             = trim($_REQUEST["search"]["value"]);

        $tableName          = 'sa_modules';
        //$fieldsName         = array('MODULE_NAME','SHORT_NAME','MODULE_NAME_BN','SL_NO','ACTIVE_STATUS');
        $fieldsName         = array('MODULE_NAME','SHORT_NAME','MODULE_NAME_BN','SL_NO',array('type' => 'alt','field_name' => 'ACTIVE_STATUS','value' => array('Inactive', 'Active')));

        $actions = array('CRUD/crudView/','CRUD/crudEdit/','CRUD/crudRemove/');
        $modalTitle = array('View Module','Edit Module','Remove Module');
        $icons = array('glyphicon-eye-open','glyphicon-edit','glyphicon-trash');
        $htmlClass = array('modalLink text-primary view','modalLink text-info edit','text-danger delete');

        $recordsArr = $this->datatable->getDataTable(
            $draw,
            $start,
            $length,
            $colToSort,
            $colToSortAction,
            $search,
            $tableName,
            $fieldsName,
            $actions,
            $modalTitle,
            $icons,
            $htmlClass
        );

        echo json_encode($recordsArr);
    }

    public function dataTableJoin(){
        $data['pageTitle'] = 'CRUD Join Index';
        $data['breadcrumbs'] = array(
            'CRUD Join Index' => '#'
        );
        $data['content_view_page'] = 'crud/joinIndex';

        $this->template->display($data);
    }

    public function ajaxCrudJoinIndex(){
        $this->load->library('DataTable');

        $draw               = $_REQUEST['draw'];
        $start              = $_REQUEST['start'];
        $length             = $_REQUEST['length'];
        $colToSort          = $_REQUEST["order"][0]["column"];
        $colToSortAction    = $_REQUEST["order"][0]["dir"];
        $search             = trim($_REQUEST["search"]["value"]);

        $sqlPartial = 'SELECT sa_modules.MODULE_ID, sa_module_links.LINK_ID, sa_modules.MODULE_NAME, sa_module_links.LINK_NAME  FROM sa_modules JOIN sa_module_links ON sa_module_links.MODULE_ID = sa_modules.MODULE_ID';

        $tableName          = 'sa_modules';

        $fieldsName         = array('sa_modules.MODULE_ID','sa_modules.MODULE_NAME','sa_module_links.LINK_ID', 'sa_module_links.LINK_NAME');

        $actions = array('CRUD/crudView/','CRUD/crudEdit/','CRUD/crudRemove/');
        $modalTitle = array('View Module','Edit Module','Remove Module');
        $icons = array('glyphicon-eye-open','glyphicon-edit','glyphicon-trash');
        $htmlClass = array('modalLink text-primary view','modalLink text-info edit','text-danger delete');


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


    public function Modules(){

        $this->form_validation->set_rules('txtModuleName', 'Module Name', 'trim|required');
        $this->form_validation->set_rules('txtModuleNameBn', 'Module Name Bengali', 'trim|required');

        if ($this->form_validation->run() == FALSE) {

            //echo validation_errors();

        }

        $data['pageTitle'] = 'CRUD Index';
        $data['breadcrumbs'] = array(
            'CRUD Index' => '#'
        );
        $data['content_view_page'] = 'crud/module';

        $this->template->display($data);
    }

    public function getDataArray(){
        $data['pageTitle'] = 'CRUD Data Array Index';
        $data['breadcrumbs'] = array(
            'CRUD Data Array Index' => '#'
        );
        $data['content_view_page'] = 'crud/dataArrayIndex';

        $this->template->display($data);;
    }


    public function ajaxDataArrayIndex(){
        $this->load->library('DataTable');

        $draw               = $_REQUEST['draw'];
        $start              = $_REQUEST['start'];
        $length             = $_REQUEST['length'];
        $colToSort          = $_REQUEST["order"][0]["column"];
        $colToSortAction    = $_REQUEST["order"][0]["dir"];
        $search             = trim($_REQUEST["search"]["value"]);

        $sqlPartial = 'SELECT sa_modules.MODULE_ID, sa_module_links.LINK_ID, sa_modules.MODULE_NAME, sa_module_links.LINK_NAME  FROM sa_modules JOIN sa_module_links ON sa_module_links.MODULE_ID = sa_modules.MODULE_ID';

        $tableName          = 'sa_modules';

        $fieldsName         = array('sa_modules.MODULE_ID','sa_modules.MODULE_NAME','sa_module_links.LINK_ID', 'sa_module_links.LINK_NAME');

        $actions = array('CRUD/crudView/','CRUD/crudEdit/','CRUD/crudRemove/');
        $modalTitle = array('View Module','Edit Module','Remove Module');
        $icons = array('glyphicon-eye-open','glyphicon-edit','glyphicon-trash');
        $htmlClass = array('modalLink text-primary view','modalLink text-info edit','text-danger delete');


        $dataTableRecords = $this->datatable->getJoinDataTable(
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

//        $dataArray = array(
//            "draw" => $draw,
//            "recordsTotal" => 200,
//            "recordsFiltered" => 200,
//            "data" => $dataTableRecords
//        );

        echo json_encode($dataTableRecords);
    }


    public function preindentIndex(){
        $data['pageTitle'] = 'Pre Indent Index';
        $data['breadcrumbs'] = array(
            'Pre Indent Index' => '#'
        );
        $data['content_view_page'] = 'crud/preIndex';

        $this->template->display($data);
    }

    public function ajaxPreIndex(){
        $this->load->library('DataTable');

        $draw               = $_REQUEST['draw'];
        $start              = $_REQUEST['start'];
        $length             = $_REQUEST['length'];
        $colToSort          = $_REQUEST["order"][0]["column"];
        $colToSortAction    = $_REQUEST["order"][0]["dir"];
        $search             = trim($_REQUEST["search"]["value"]);

        $tableName          = 'pr_pindent_mst';
        $fieldsName         = array('UD_ID','PI_DATE','PROC_LIST_ID');

        $actions = array('CRUD/crudView/','CRUD/crudEdit/','CRUD/crudRemove/');
        $modalTitle = array('View Module','Edit Module','Remove Module');
        $icons = array('glyphicon-eye-open','glyphicon-edit','glyphicon-trash');
        $htmlClass = array('modalLink text-primary view','modalLink text-info edit','text-danger delete');

        $recordsArr = $this->datatable->getDataTable(
            $draw,
            $start,
            $length,
            $colToSort,
            $colToSortAction,
            $search,
            $tableName,
            $fieldsName,
            $actions,
            $modalTitle,
            $icons,
            $htmlClass
        );

        echo json_encode($recordsArr);
    }

    public function preCreate(){
        $this->form_validation->set_rules('udid', 'User Define Id', 'trim');

        if ($this->form_validation->run() == FALSE) {

            $errors = validation_errors();
            if(!empty($errors)){

                $this->util->resultObject(0,validation_errors());

            }else{
                $this->load->view("crud/preCreate");
            }


        }else{
            $this->util->resultObject(1,'Preindent created Successfully!');
        }


    }

    public function onchangeValidation(){
        $data['pageTitle'] = 'On Change Validation';
        $data['breadcrumbs'] = array(
            'On Change Validation' => '#'
        );
        $data['content_view_page'] = 'crud/onChangeValidate';

        $this->template->display($data);
    }


}