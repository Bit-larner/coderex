<?php

defined('BASEPATH') OR exit('No direct script access allowed');
class Employee_model extends CI_Model {
    
    public function __construct() {
        parent::__construct();
    }

    public function getAllSuppier(){
       return $this->db->query("SELECT * FROM sa_workflow")->result_array();
    }
    
    
    
}


