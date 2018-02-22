<?php
/**
 * This file is part of the a2i\ashokti Mukti package
 *
 * (c) ATI Limited. <info@atilimited.net>
 *
 * PHP version 5 (5.6.25)
 *
 * @package     a2i\ashokti Mukti
 * @author      ATI Limited PHP Dev Team
 * @copyright   2017 atilimited.net
 */
/**
 * Class AssessmentType
 * @package     ashokti Mukti\Controllers
 * @author      Nurullah <nurul@atilimited.net>
 * @copyright   2017 atilimited.net
 * @version     GIT: $Id$ In development. 1.0.0
 */
defined('BASEPATH') OR exit('No direct script access allowed');

class AssessmentType extends EXT_Controller 
{

    private $now;

    public function __construct() 
    {
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
     * @return  //Load Assessment Type setup page layout
     */

    public function index() 
    {
        $data['breadcrumbs'] = array(
            'Modules' => '#'
        );
        $data['pageTitle'] = 'Assessment Type Setup';
        $data['asses_type'] = $this->utilities->findAllFromview('sa_assessment_type');
        $data['content_view_page'] = 'setup/assessmentType/index';
        $this->template->display($data);
    }

    /*
     * @methodName Create()
     * @access
     * @param  none
     * @return  //Load Assessment Type create page
     */

    public function create() 
    {
       $this->load->view('setup/assessmentType/create');
    }

    public function saveAssessmentType() 
    {
        $data['TYPE_NAME'] = $this->input->post('asses_name', true);
        $data['ACTIVE_STATUS'] = (isset($_POST['ACTIVE_STATUS'])) ? 1 : 0;
        $data['CRE_BY'] = $this->user_session["FLD_USER_ID"];
        $this->utilities->insertDataWithReturn('sa_assessment_type', $data);
        $this->session->set_flashdata('success', $this->lang->line('assess_type') . ' ' . $this->lang->line('cre_success'));
        redirect('setup/assessmentType');
    }

    public function edit($id) 
    {
        $data['result'] = $this->utilities->findByAttribute('sa_assessment_type', array('FLD_TYPE_ID' => $id));
        $this->load->view('setup/assessmentType/edit', $data);
    }

    public function updateAssessmentType() 
    {
        $id = $this->input->post('type_id', true);
        $data['TYPE_NAME'] = $this->input->post('asses_name', true);
        $data['UPD_BY'] = $this->user_session["FLD_USER_ID"];
        $data['UPD_DT'] = date('Y-m-d H:i:s', time());
        $data['ACTIVE_STATUS'] = (isset($_POST['ACTIVE_STATUS'])) ? 1 : 0;
        $this->utilities->updateData('sa_assessment_type', $data, array('FLD_TYPE_ID' => $id));
        $this->session->set_flashdata('success', $this->lang->line('division') . ' ' . $this->lang->line('upd_success'));
        redirect('setup/assessmentType');
    }

    public function delete($id) 
    {
        if ($this->utilities->deleteRowByAttribute('sa_assessment_type', array('FLD_TYPE_ID' => $id))) {
            $this->util->resultObject(1, 'Assessment Type Deleted Successfully!');
        }
    }
}

