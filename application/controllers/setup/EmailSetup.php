<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class EmailSetup extends EXT_Controller
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
    /**
     * Display Email Template List
     * @methodName index()
     * @access
     * @param  none
     * @author Fahim
     * @return  
     */

    public function index()
    {
        $data['breadcrumbs'] = array(
            'Dashboard' => '',
            'Setup' => '#',
            'Email Setup' => '#',

        );
        $data['pageTitle']         = 'Email Setup';
        $data['allTemplate']       = $this->setup_model->templateList();
        $data['content_view_page'] = 'setup/emailSetup/index';
        $this->template->display($data);
    }
    public function create()
    {
        if(isset($_POST['TEMPL_NAME']))
        {

            $data=array(
                'TEMPL_CAT'=>$this->input->post('TEMPL_CAT'),
                'TEMPL_TYPE'=>$this->input->post('TEMPL_TYPE'),
                'TEMPL_NAME'=>$this->input->post('TEMPL_NAME'),
                'TEMPL_SUBJECT'=>$this->input->post('TEMPL_SUBJECT'),
                'ACTIVE_FLAG'=>isset($_POST['ACTIVE_STATUS']) ? 1 : 0,
                'TEMPL_WF_ID'=>$this->input->post('TEMPL_WF_ID'),
                'TEMPL_BODY'=>$this->input->post('TEMPL_BODY'),
                'ORG_ID'=>$this->user_session["SES_ORG_ID"],
                'CRE_BY' => $this->user_session["FLD_USER_ID"],
                'VC_FLAG' => $this->user_session["FLD_USER_ID"],
            );
             if ($this->utilities->insertData($data, 'sa_template_letter')) {
                $this->session->set_flashdata('success',$this->lang->line('template').' '.$this->lang->line('cre_success'));
                redirect('setup/EmailSetup');
            }
        }
        $data=array();
        $data['workflow'] = $this->utilities->dropdownFromTableWithCondition('sa_workflow',
            '', 'WF_ID', 'WF_NAME');
        $this->load->view('setup/emailSetup/create', $data);
    }


    /*
     * @methodName edit()
     * @access
     * @param  none
     * @return  //Load divition create page
     */

    public function edit($id)
    {
       if(isset($_POST['TEMPL_NAME']))
        {
           if($this->input->post('TEMPL_WF_ID')=='')
           {
               $WF_ID=NULL;
           }
           else
           {
               
               $WF_ID=$this->input->post('TEMPL_WF_ID');
           }
            $data=array(
                'TEMPL_CAT'=>$this->input->post('TEMPL_CAT'),
                'TEMPL_TYPE'=>$this->input->post('TEMPL_TYPE'),
                'TEMPL_NAME'=>$this->input->post('TEMPL_NAME'),
                'TEMPL_SUBJECT'=>$this->input->post('TEMPL_SUBJECT'),
                'ACTIVE_FLAG'=>isset($_POST['ACTIVE_STATUS']) ? 1 : 0,
                'TEMPL_WF_ID'=>$WF_ID,
                'TEMPL_BODY'=>$this->input->post('TEMPL_BODY'),
                'ORG_ID'=>$this->user_session["SES_ORG_ID"],
                'UPD_BY' => $this->user_session["FLD_USER_ID"],
            );
             if ($this->utilities->updateData('sa_template_letter', $data,
                    array('TEMPL_ID' => $id))) {
               $this->session->set_flashdata('success',$this->lang->line('template').' '.$this->lang->line('upd_success'));
                 redirect('setup/emailSetup');
            }
        }
        $data['viewdetails'] = $this->setup_model->templateDetails($id);
        $data['workflow'] = $this->utilities->dropdownFromTableWithCondition('sa_workflow',
            '', 'WF_ID', 'WF_NAME');
        $this->load->view('setup/emailSetup/edit', $data);
    }
    /*
     * @methodName view()
     * @access
     * @param  none
     * @return  //
     */

    public function view($id)
    {
       $data['viewdetails'] = $this->setup_model->templateDetails($id);
        $this->load->view('setup/emailSetup/view', $data);
    }
  
    /*
     * @methodName Pr()
     * @access
     * @param  none
     * @return  Debug Function
     */
 public function deleteTemplate($id)
    {


         if ($this->utilities->deleteRowByAttribute(
                'sa_template_letter', array('TEMPL_ID' => $id))
        ) {

            $this->util->resultObject(1, 'Template Deleted Successfully!');
        }


    }
    private function pr($data)
    {
        echo "<pre>";
        print_r($data);
        echo "</pre>";
        exit;
    }
}