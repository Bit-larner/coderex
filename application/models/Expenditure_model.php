<?php

defined('BASEPATH') OR exit('No direct script access allowed');
class Expenditure_model extends CI_Model {
    
    public function __construct() {
        parent::__construct();
    }

    public function getAllExpenditure(){
       return $this->db->query("SELECT * FROM sa_budget_code")->result_array();
    }
    
    
    
}


