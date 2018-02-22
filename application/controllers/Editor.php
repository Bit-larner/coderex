<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Editor extends CI_Controller {

    function __construct() {
        parent::__construct();
    }

    public function index() {

        $dir = 'resources/images/editor_img/';

        $config = array('upload_path' => 'uploads/editor/',
            'upload_url' => base_url() . 'uploads/editor/',
            'allowed_types' => 'jpg|gif|png',
            'overwrite' => false,
            'max_size' => 512000,
        );

        $this->load->library('upload', $config);

        if ($this->upload->do_upload('file')) {
            $data = $this->upload->data();
            $array = array(
                'filelink' => $config['upload_url'] . $data['file_name']
            );
            echo stripslashes(json_encode($array));
        } else {
            echo json_encode(array('error' => $this->upload->display_errors('', '')));
        }
    }

}