<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class Template_auth
{

    protected $_ci;

    function __construct() {

        $this->_ci = &get_instance();
    }

    function display($data = null) {
        $data['metaTitle'] = 'Drug International Limited' . ((isset($data['metaTitle']) == '') ? ' ' : ' || ' . $data['metaTitle']);
        $data['pageTitle'] = ((isset($data['pageTitle']) == '') ? ' ' : $data['pageTitle']);
        $data['breadcrumb'] = ((isset($data['breadcrumb']) == '') ? array() : $data['breadcrumb']);
        $data['content'] = $this->_ci->load->view((isset($data['content_view_page']) == '') ? 'layouts/admin/test_content' : $data['content_view_page'], $data, true);
        $this->_ci->load->view('templateAuth.php', $data);
    }

}