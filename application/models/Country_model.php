<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Country_model extends CI_Model {
    
    
    public function getAllCountres(){
        return $this->db->query('select a.*, b.CON_CAT_NAME from sa_country a left join sav_coun_category b on a.CATEGORY = b.CON_CAT_ID')->result();
    }
    
    public function getAllCountresById($id){
        return $this->db->query("select a.*, b.CON_CAT_NAME from sa_country a left join sav_coun_category b on a.CATEGORY = b.CON_CAT_ID where COUNTRY_ID = {$id}")->row();
    }
    
}


