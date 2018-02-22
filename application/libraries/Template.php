<?php

defined('BASEPATH') OR exit('No direct script access allowed');
class Template
{
    protected $_ci;

    function __construct() {

        $this->_ci = &get_instance();
    }

    function display($data = null) {
        $data['pageTitle'] = ((isset($data['pageTitle']) == '') ? ' ' : $data['pageTitle']);
        $data['metaTitle'] = 'Drug' . ((isset($data['pageTitle']) == '') ? ' ' : ' || ' . $data['pageTitle']);
        $data['breadcrumbs'] = ((isset($data['breadcrumbs']) == '') ? array() : $data['breadcrumbs']);
        $data['content'] = $this->_ci->load->view((isset($data['content_view_page']) == '') ? 'layouts/main/content' : $data['content_view_page'], $data, true);
        $this->_ci->load->view('template.php', $data);
    }

}