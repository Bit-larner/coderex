<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Designation_model extends CI_Model {

    public function gellAllDesignationInfoById($id){
        return $this->db->query("SELECT a.*, (SELECT b.ORG_NAME FROM sa_organizations b WHERE b.ORG_ID = a.ORG_ID ) as orgname, (SELECT c.DESIG_NAME FROM sa_designation c WHERE c.DESIG_ID = a.PARENT_DESIG_ID) as parentname FROM sa_designation a WHERE a.DESIG_ID = {$id}
")->row();
    }
            public function gellAllDepartment(){
        return $this->db->query("select *,
(select b.ORG_NAME from sa_organizations b where b.ORG_ID = a.ORG_ID)ORG_NAME from sa_designation a
")->result();
    }
    
}


