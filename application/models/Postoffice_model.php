<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Postoffice_model extends CI_Model {
    
    
    public function getAllPostOfficeInfo(){
        
        return $this->db->query("SELECT a.*, b.THANA_ENAME, c.DISTRICT_ENAME FROM sa_post_offices a LEFT JOIN sa_thanas b ON b.THANA_ID = a.THANA_ID LEFT JOIN sa_districts c ON c.DISTRICT_ID = b.DISTRICT_ID")->result();
        
    }
    public function getAllPostOfficeInfoById($id){
        
        return $this->db->query("SELECT a.*, b.THANA_ENAME, d.DIVISION_ID, b.THANA_ID,  c.DISTRICT_ID, c.DISTRICT_ENAME FROM sa_post_offices a LEFT JOIN sa_thanas b ON b.THANA_ID = a.THANA_ID LEFT JOIN sa_districts c ON c.DISTRICT_ID = b.DISTRICT_ID LEFT JOIN sa_divisions d ON d.DIVISION_ID = c.DIVISION_ID WHERE POST_OFFICE_ID = {$id}")->row();
        
    }
    
}

