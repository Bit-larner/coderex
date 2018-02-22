<?php

/**
 * Created by PhpStorm.
 * User: streetcoder
 * Date: 1/23/16
 * Time: 7:37 PM
 */
defined('BASEPATH') OR exit('No direct script access allowed');

class Setup_model extends CI_Model {

    function __construct() {
        // Call the Model constructor
        parent::__construct();
    }

    public function getReligionCusteList() {
        return $this->db->query("SELECT m.CASTE_ID, m.RELIGION_ID, r.RELIGION_NAME, m.CASTE_NAME, m.ACTIVE_STATUS
                        FROM sa_castes m LEFT JOIN sav_religion r ON m.RELIGION_ID = r.RELIGION_ID")->result();
    }

    public function simple_drop_down_select($tableName, $primaryKey, $displayName) {

        $sql = $this->db->query("select $primaryKey,$displayName from $tableName order by $primaryKey asc");
        return $result = $sql->result();
    }

    public function getReligionCaste($id) {
        return $this->db->query("SELECT CASTE_ID,CASTE_NAME,ACTIVE_STATUS from sa_castes where CASTE_ID=$id")->row();
    }

    public function getModuleLinks() {
        return $this->db->query("SELECT m.LINK_ID, m.LINK_NAME, m.LINK_NAME_BN, m.SA_MLINK_PAGES, m.MODULE_ID,
                    (SELECT MODULE_NAME FROM sa_modules WHERE MODULE_ID = m.MODULE_ID)MODULE_NAME,
                    m.URL_URI, m.LINK_DESC,  m.SL_NO, m.`CREATE`, m.`READ`, m.`UPDATE`, m.`DELETE`, m.STATUS, m.ACTIVE_STATUS
                    FROM sa_module_links m")->result();
    }
    
    /* khayrul Start*/
    public function getAllDisticts() {
        return $this->db->query('select m.DISTRICT_ID, m.ACTIVE_STATUS, m.DISTRICT_ENAME, j.DIVISION_ENAME from sa_districts as m inner JOIN sa_divisions as j ON m.DIVISION_ID=j.DIVISION_ID')->result();
    }

    public function getAllThanas() {
        return $this->db->query('SELECT a.*, b.DISTRICT_ENAME FROM sa_thanas a LEFT JOIN sa_districts b ON a.DISTRICT_ID = b.DISTRICT_ID')->result();
    }

    public function getAllUnions() {
        return $this->db->query('SELECT u.*, t.THANA_ENAME, d.DISTRICT_ENAME FROM sa_unions u LEFT JOIN sa_thanas t ON u.THANA_ID = t.THANA_ID LEFT JOIN sa_districts d ON t.DISTRICT_ID = d.DISTRICT_ID')->result();
    }

    public function getAllPostoffice() {
        return $this->db->query('SELECT a.*, b.THANA_ENAME, c.DISTRICT_ENAME, d.DIVISION_ENAME  FROM sa_post_offices a
        LEFT JOIN sa_thanas b ON a.THANA_ID = b.THANA_ID 
        LEFT JOIN sa_districts c ON c.DISTRICT_ID = b.DISTRICT_ID
        LEFT JOIN sa_divisions d ON d.DIVISION_ID = c.DIVISION_ID')->result();
    }

    public function getAllDistictsById($id) {
        return $this->db->query("select a.*, b.DIVISION_ENAME  from sa_districts a
        inner join sa_divisions b on a.DIVISION_ID = b.DIVISION_ID where a.DISTRICT_ID = {$id}")->row();
    }

    public function getAllthanaById($id) {
        return $this->db->query("select a.*,b.DISTRICT_ENAME, c.DIVISION_ENAME 
        from sa_thanas a 
        inner join sa_districts b on a.DISTRICT_ID = b.DISTRICT_ID
        inner join sa_divisions c on b.DIVISION_ID = c.DIVISION_ID 
        where a.THANA_ID = {$id}")->row();
    }
    
    public function getAllUnionById($id)
    {
        return $this->db->query("SELECT u.*, t.THANA_ENAME, d.DISTRICT_ENAME, e.DIVISION_ENAME FROM sa_unions u LEFT JOIN sa_thanas t ON u.THANA_ID = t.THANA_ID LEFT JOIN sa_districts d ON t.DISTRICT_ID = d.DISTRICT_ID LEFT JOIN sa_divisions e ON e.DIVISION_ID = d.DIVISION_ID WHERE UNION_ID= {$id}")->row();
    }
    
    public function getAllThanaInfoById($id){
        return $this->db->query("SELECT a.*, b.DISTRICT_ID, b.DISTRICT_ENAME, c.DIVISION_ID, c.DIVISION_ENAME FROM sa_thanas a LEFT JOIN sa_districts b ON b.DISTRICT_ID = a.DISTRICT_ID LEFT JOIN sa_divisions c ON c.DIVISION_ID = b.DIVISION_ID WHERE THANA_ID = {$id}")->row();
    }
    
    public function getAllUnionInfoById($id){
        return $this->db->query("SELECT a.*, b.THANA_ID, b.THANA_ENAME, c.DISTRICT_ID, c.DISTRICT_ENAME, d.DIVISION_ID, d.DIVISION_ENAME FROM sa_unions a LEFT JOIN sa_thanas b ON b.THANA_ID = a.THANA_ID LEFT JOIN sa_districts c ON c.DISTRICT_ID = b.DISTRICT_ID LEFT JOIN sa_divisions d ON d.DIVISION_ID = c.DIVISION_ID WHERE UNION_ID = {$id}")->row();
    }
     
    /* khayrul End*/
    /* Fahim Start */
    public function templateList(){
        return $this->db->query("SELECT * FROM (SELECT TEMPL_ID,TEMPL_NAME,TEMPL_SUBJECT,TEMPL_CAT,TEMPL_TYPE,ACTIVE_FLAG,WF_NAME
FROM sa_template_letter as stl LEFT JOIN sa_workflow as sw ON stl.TEMPL_WF_ID=sw.WF_ID) as b")->result();
    }
    public function templateDetails($id){
        return $this->db->query("SELECT * FROM (SELECT TEMPL_ID,TEMPL_WF_ID,TEMPL_NAME,TEMPL_SUBJECT,TEMPL_CAT,TEMPL_BODY,TEMPL_TYPE,ACTIVE_FLAG,WF_NAME
FROM sa_template_letter as stl LEFT JOIN sa_workflow as sw ON stl.TEMPL_WF_ID=sw.WF_ID WHERE TEMPL_ID=$id) as b;")->row();
    }
    /*
     * Fahim End
     */
}