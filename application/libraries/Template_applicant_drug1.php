<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class Template_applicant_drug1
{

    protected $_ci;

    function __construct() {

        $this->_ci = &get_instance();
    }

    function display($data = null) {
        $data['metaTitle'] = 'Directorate General Defense Purchase' . ((isset($data['metaTitle']) == '') ? ' ' : ' || ' . $data['metaTitle']);
        $data['pageTitle'] = ((isset($data['pageTitle']) == '') ? ' ' : $data['pageTitle']);
        $data['breadcrumb'] = ((isset($data['breadcrumb']) == '') ? array() : $data['breadcrumb']);
        $data['content'] = $this->_ci->load->view((isset($data['content_view_page']) == '') ? 'layouts/login/test_content' : $data['content_view_page'], $data, true);
        $this->_ci->load->view('template_pages1.php', $data);
    }

}