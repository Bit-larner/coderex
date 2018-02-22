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
 * Class Assessment
 * @package     ashokti Mukti\Controllers
 * @author      Nurullah <nurul@atilimited.net>
 * @copyright   2017 atilimited.net
 * @version     GIT: $Id$ In development. 1.0.0
 */
defined('BASEPATH') OR exit('No direct script access allowed');

class Assessment extends EXT_Controller 
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

    public function index() 
    {
        $data['breadcrumbs'] = array(
            'Modules' => '#'
        );
        $data['pageTitle'] = 'Assessment Setup';
        $data['assessment'] = $this->utilities->findAllByAttributeWithJoin('sa_assessment_info', 'sa_assessment_type', 'FLD_TYPE_ID', 'FLD_TYPE_ID', 'TYPE_NAME');
        $data['content_view_page'] = 'setup/assessment/index';
        $this->template->display($data);
    }

    public function create() 
    {
        $data['asses_type'] = $this->utilities->dropdownFromTableWithCondition('sa_assessment_type', 'Select Type', 'FLD_TYPE_ID', 'TYPE_NAME');
        $this->load->view('setup/assessment/create', $data);
    }

    public function saveAssessment() 
    {
        $data['FLD_TYPE_ID'] = $this->input->post('asses_type', true);
        $data['ASSESSMENT_NAME'] = $this->input->post('assessment_name', true);
        $data['CRE_BY'] = $this->user_session["FLD_USER_ID"];
        $data['ACTIVE_STATUS'] = (isset($_POST['ACTIVE_STATUS'])) ? 1 : 0;
        $this->utilities->insertDataWithReturn('sa_assessment_info', $data);
        $this->session->set_flashdata('success', $this->lang->line('assessment') . ' ' . $this->lang->line('cre_success'));
        redirect('setup/assessment');
    }

    public function edit($id) 
    {
        $data['result'] = $this->utilities->findByAttribute('sa_assessment_info', array('FLD_ASSES_ID' => $id));
        $data['asses_type'] = $this->utilities->dropdownFromTableWithCondition('sa_assessment_type', 'Select Type', 'FLD_TYPE_ID', 'TYPE_NAME');
        $this->load->view('setup/assessment/edit', $data);
    }

    public function updateAssessment() 
    {
        $id = $this->input->post('assessment_id', true);
        $data['FLD_TYPE_ID'] = $this->input->post('asses_type', true);
        $data['ASSESSMENT_NAME'] = $this->input->post('assessment_name', true);
        $data['UPD_BY'] = $this->user_session["FLD_USER_ID"];
        $data['UPD_DT'] = date('Y-m-d H:i:s', time());
        $data['ACTIVE_STATUS'] = (isset($_POST['ACTIVE_STATUS'])) ? 1 : 0;
        $this->utilities->updateData('sa_assessment_info', $data, array('FLD_ASSES_ID' => $id));
        $this->session->set_flashdata('success', $this->lang->line('assessment') . ' ' . $this->lang->line('upd_success'));
        redirect('setup/assessment');
    }

    public function delete($id) 
    {
        if ($this->utilities->deleteRowByAttribute('sa_assessment_info', array('FLD_ASSES_ID' => $id))) {
            $this->util->resultObject(1, 'Assessment Deleted Successfully!');
        }
    }
}