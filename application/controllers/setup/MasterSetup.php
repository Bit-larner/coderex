<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class MasterSetup extends EXT_Controller {

    public function __construct() {
        parent::__construct();
        $this->user_session = $this->session->userdata('logged_in');
        if (!$this->user_session) {
            redirect('auth/index');
        }
        $this->load->model('MasterSetupModel');
        // $this->load->model('setupModel');
    }

    /*
     * @methodName index()
     * @access public
     * @param  none
     * @return  //Load all group data 
     */

    public function index() {
        $data['metaTitle'] = 'Setup Module';
        $data['breadcrumbs'] = array(
            'Setup' => 'setup/index',
            'Setup' => '#'
        );
        $data['pageTitle'] = 'All Groups';
        $data['result'] = $this->utilities->findAllFromView('sa_lookup_grp');
        $data['content_view_page'] = 'setup/masterSetup/groupSetup';
        $this->template->display($data);
    }

    /*
     * @methodName addGroup()
     * @access public
     * @param  none
     * @return  //
     */

    public function addGroup() {
        $this->load->view('setup/masterSetup/addGroup');
    }

    /*
     * @methodName saveGroup()
     * @access public
     * @param  none
     * @return  //  
     */

    public function saveGroup() {

        $group_data = array(
            'LOOKUP_GRP_NAME' => $this->input->post('LOOKUP_GRP_NAME'),
            'USE_CHAR_NUMB' => $this->input->post('short_name'),
            'ACTIVE_FLAG' => (isset($_POST['ACTIVE_FLAG'])) ? 1 : 0
        );
        $this->utilities->insertData($group_data, 'sa_lookup_grp');
        $this->session->set_flashdata('success',$this->lang->line('group').' '.$this->lang->line('cre_success'));
        redirect('setup/masterSetup/index');
    }

    /*
     * @methodName addGroupItem()
     * @access public
     * @param  $lkp_grp_id, $USE_CHAR_NUMB
     * @return  //  
     */

    function addGroupItem($lkp_grp_id, $USE_CHAR_NUMB) {
        $data['lkp_grp_id'] = $lkp_grp_id;
        $data['USE_CHAR_NUMB'] = $USE_CHAR_NUMB;
        $this->load->view('setup/masterSetup/addGroupItem', $data);
    }

    /*
     * @methodName saveGroupIitem()
     * @access public
     * @param  
     * @return  //   return all data from table "sa_lookup_data"
     */

    function saveGroupIitem() {
        $LOOKUP_GRP_ID = $_POST['LOOKUP_GRP_ID'];
        $USE_CHAR_NUMB = $_POST['USE_CHAR_NUMB'];
        if ($USE_CHAR_NUMB == 'N') {
            $NUMB_LOOKUP = $_POST['NUMB_LOOKUP'];
            $CHAR_LOOKUP = null;
        } else {
            $NUMB_LOOKUP = null;
            $CHAR_LOOKUP = $_POST['CHAR_LOOKUP'];
        }
        $item_data = array(
            'LOOKUP_DATA_NAME' => $_POST['LOOKUP_DATA_NAME'],
            'LOOKUP_GRP_ID' => $LOOKUP_GRP_ID,
            'CHAR_LOOKUP' => $CHAR_LOOKUP,
            'NUMB_LOOKUP' => $NUMB_LOOKUP,
            'ACTIVE_FLAG' => $_POST['ACTIVE_FLAG']
        );
        $this->utilities->insertData($item_data, 'sa_lookup_data');
        $data['lookup_item_data'] = $this->utilities->findAllByAttribute('sa_lookup_data', array('LOOKUP_GRP_ID' => $LOOKUP_GRP_ID));
        $data['USE_CHAR_NUMB'] = $this->db->query("select USE_CHAR_NUMB  from sa_lookup_grp where LOOKUP_GRP_ID=$LOOKUP_GRP_ID")->row();
        $this->load->view('setup/masterSetup/ajax_lookup_data', $data);
    }

    /*
     * @methodName editGroupItem()
     * @access public
     * @param  $lkp_id
     * @return  //   return all data from table "sa_lookup_data"
     */

    function editGroupItem($lkp_id) {
        $data['item'] = $this->MasterSetupModel->getLookupData($lkp_id);
       //echo "<pre>";
       //print_r($data['item']);
       //exit;
        $this->load->view('setup/masterSetup/editGroupIitem', $data);
    }

    /*
     * @methodName updateGroupItem()
     * @access public
     * @param  $lkp_id
     * @return  //   return all data from table "sa_lookup_data"
     */

    function updateGroupItem() {
        $LOOKUP_DATA_ID = $_POST['LOOKUP_DATA_ID'];
        $LOOKUP_GRP_ID = $_POST['LOOKUP_GRP_ID'];
        $USE_CHAR_NUMB = $_POST['USE_CHAR_NUMB'];
        if ($USE_CHAR_NUMB == 'N') {
            $NUMB_LOOKUP = $_POST['NUMB_LOOKUP'];
            $CHAR_LOOKUP = '';
        } else {
            $NUMB_LOOKUP = '';
            $CHAR_LOOKUP = $_POST['CHAR_LOOKUP'];
        }
        $act_fg = $_POST['active_flag'];
        $update_item_data = array(
            'LOOKUP_DATA_NAME' => $_POST['LOOKUP_DATA_NAME'],
            'NUMB_LOOKUP' => $NUMB_LOOKUP,
            'CHAR_LOOKUP' => $CHAR_LOOKUP,
            'ACTIVE_FLAG' => $act_fg
        );
//       print_r($update_item_data);
//        exit;
        $this->utilities->updateData('sa_lookup_data', $update_item_data, array('LOOKUP_DATA_ID' => $LOOKUP_DATA_ID));
        $data['lookup_item_data'] = $this->utilities->findAllByAttribute('sa_lookup_data', array('LOOKUP_GRP_ID' => $LOOKUP_GRP_ID));
        $data['USE_CHAR_NUMB'] = $this->db->query("select USE_CHAR_NUMB  from sa_lookup_grp where LOOKUP_GRP_ID=$LOOKUP_GRP_ID")->row();
        $this->load->view('setup/MasterSetup/ajax_lookup_data', $data);
    }

}

?>