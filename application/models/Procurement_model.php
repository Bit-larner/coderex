<?php

/**
 * Created by PhpStorm.
 * User: streetcoder
 * Date: 4/5/16
 * Time: 4:52 PM
 */
defined('BASEPATH') OR exit('No direct script access allowed');

class Procurement_model extends CI_Model {

    function __construct() {
        parent::__construct();
    }

    /**
     * @param $proc_list_id
     * @return mixed
     */
    public function getNomenclature($proc_list_id) {
        $query = $this->db->query("select mm_item_nomenclature.* from pr_proc_list_chd join mm_item_nomenclature
on pr_proc_list_chd.NOMENCLATURE_ID = mm_item_nomenclature.NOMENCLATURE_ID and pr_proc_list_chd.PROC_MST_ID = $proc_list_id")->result();
        $nomenArray[''] = 'Seelct Nomenclature';
        foreach ($query as $key => $val) {
            $nomenArray[$val->NOMENCLATURE_ID] = $val->NOMENCLATURE_NAME;
        }
        return $nomenArray;
    }

    /**
     * @param $nomen_id
     * @return mixed
     */
    public function getProductInfo($nomen_id) {
        $query = $this->db->query(
                'SELECT mm_nomenclature_models.NOMENCLATURE_MODEL_ID, mm_nomenclature_models.NOMENCLATURE_ID, mm_item_models.I_MODEL_ID, mm_item_models.MODEL_NAME, mm_iteminfo.ITEM_NAME, sa_lookup_data.LOOKUP_DATA_NAME, mm_item_models.PRICE, sa_budget_code.ECONOMIC_CODE
            FROM mm_nomenclature_models
            JOIN mm_item_models
            ON mm_nomenclature_models.I_MODEL_ID=mm_item_models.I_MODEL_ID AND mm_nomenclature_models.NOMENCLATURE_ID=' . $nomen_id . '
            LEFT JOIN mm_iteminfo
            ON mm_item_models.ITEM_ID=mm_iteminfo.ITEM_ID
            LEFT JOIN sa_lookup_data
            ON mm_item_models.ITEM_TYPE=sa_lookup_data.LOOKUP_DATA_ID
            LEFT JOIN sa_budget_code
            ON mm_iteminfo.EXP_ITEM_NO=sa_budget_code.EXP_ITEM_NO');
        return $query;
    }

    /**
     * @param $nomen_model_id
     * @return mixed
     */
    public function getModelNameByNomenModelId($nomen_model_id) {
        $query = $this->db->query('
            select mm_item_models.I_MODEL_ID, mm_item_models.MODEL_NAME
            from mm_nomenclature_models
            join mm_item_models
            on mm_nomenclature_models.I_MODEL_ID = mm_item_models.I_MODEL_ID and mm_nomenclature_models.NOMENCLATURE_MODEL_ID = ' . $nomen_model_id . '
            ');
        return $query;
    }

    public function getAllModelNameByNomenclaturId($id) {
        return $this->db->query("SELECT b.I_MODEL_ID, b.MODEL_NAME FROM  mm_nomenclature_models a LEFT JOIN mm_item_models b ON a.I_MODEL_ID = b.I_MODEL_ID WHERE a.NOMENCLATURE_ID = {$id} ")->result();
    }

    public function getExistModelListByNomenclatureid($id, $userId) {
        return $this->db->query("SELECT a.MODEL_ID FROM pr_pindent_model_temp a WHERE a.NOMENCLATURE_ID ={$id} AND a.FLD_USER_ID = {$userId}")->result();
    }

    
//   record truncate
    function deleteRowByAttribute($tableName, $attribute) {
        $this->db->trans_start();
        $this->db->truncate($tableName, $attribute);
        $this->db->trans_complete();
        if ($this->db->trans_status() == TRUE) {
            return TRUE;
        } else {
            return FALSE;
        }
    }

    public function getAllPreIndendChdList($id) {
        return $this->db->query("SELECT a.*, (SELECT b.NOMENCLATURE_NAME FROM mm_item_nomenclature b WHERE b.NOMENCLATURE_ID = a.NOMENCLATURE_ID) nomenclatureName FROM pr_pindent_chd a WHERE a.PINDENT_MSTID = {$id}")->result();
    }

    /**
     * @param $nomen_model_id
     * @return array
     */
    public function getItemToEdit($nomen_model_id) {

        $item_info = $this->session->userdata('item_info');

        $itemToEdit = array();

        if (!empty($item_info)) {

            foreach ($item_info as $items) {

                if ($items['nomen_model_id'] == $nomen_model_id) {

                    $itemToEdit = $items;
                }
            }

            return $itemToEdit;
        } else {

            return false;
        }
    }

    /**
     * @return mixed
     */
    public function getIdCurrentFiscalYear() {

        $query = $this->db->query('SELECT FY_NO FROM sa_fin_year WHERE YEAR(END_DT) = YEAR(CURDATE())')->result();

        return $query[0]->FY_NO;
    }

    /*
     * @methodName itemNameSearch()
     * @access public
     * @param  $item_type, $section
     * @author  Gaji Asif
     * @return  Nomenclature details 
     */

    public function itemNameSearch($item_type, $section) {

        $query = $this->db->query("SELECT n.NOMENCLATURE_ID, n.NOMENCLATURE_NAME
                                        FROM mm_nomenclature_models nm
                                        INNER JOIN mm_item_nomenclature n ON nm.NOMENCLATURE_ID = n.NOMENCLATURE_ID
                                        INNER JOIN mm_item_models m ON nm.I_MODEL_ID = m.I_MODEL_ID
                                        INNER JOIN mm_iteminfo i ON i.ITEM_ID = m.ITEM_ID
                                        WHERE  m.ITEM_TYPE = '$item_type' AND n.ITEM_SECTION_ID = '$section' GROUP BY n.NOMENCLATURE_ID ORDER BY n.NOMENCLATURE_NAME ASC")->result();
        return $query;
    }

    public function getAllPindent() {
        return $this->db->query("SELECT a.*, b.*, c.* , d.MEETING_NAME  FROM pr_pindent_mst a LEFT JOIN pr_proc_list_mst b ON a.PROC_LIST_ID = b.PROC_MST_ID LEFT JOIN sa_fin_year c ON c.FY_NO = b.FY_NO LEFT JOIN mm_meeting_authority d ON d.MEETING_ID = b.MEETING_ID")->result();
    }

    public function getPindentById($id) {
        return $this->db->query("SELECT a.*, b.*, c.* , d.MEETING_NAME  FROM pr_pindent_mst a LEFT JOIN pr_proc_list_mst b ON a.PROC_LIST_ID = b.PROC_MST_ID LEFT JOIN sa_fin_year c ON c.FY_NO = b.FY_NO LEFT JOIN mm_meeting_authority d ON d.MEETING_ID = b.MEETING_ID WHERE a.PINDENT_MSTID = {$id}")->row();
    }

    public function getAllModelList($id) {
        return $this->db->query("SELECT a.*, b.I_MODEL_ID, c.MODEL_NAME, d.NOMENCLATURE_NAME,  e.ITEM_ID, f.ITEM_NAME FROM pr_pindent_chd a LEFT JOIN mm_nomenclature_models b ON b.NOMENCLATURE_MODEL_ID = a.NOMENCLATURE_MODEL_ID LEFT JOIN mm_item_models c ON c.I_MODEL_ID = b.I_MODEL_ID LEFT JOIN mm_item_nomenclature d ON d.NOMENCLATURE_ID = b.NOMENCLATURE_ID LEFT JOIN mm_item_models e ON e.I_MODEL_ID = b.I_MODEL_ID LEFT JOIN mm_iteminfo f ON f.ITEM_ID = e.ITEM_ID  WHERE a.PINDENT_MSTID = {$id}")->result();
    }

    // nomenclature list start here

    public function getAllNomenclatureList($id) {
        return $this->db->query("SELECT a.*, b.NOMENCLATURE_NAME, b.EXP_ITEM_NO FROM pr_proc_list_chd a LEFT JOIN mm_item_nomenclature b ON a.NOMENCLATURE_ID = b.NOMENCLATURE_ID WHERE PROC_MST_ID = {$id} ")->result();
    }
    
    public function getAllNomenclatureListForApproval($id) {
        return $this->db->query("SELECT a.*, b.NOMENCLATURE_NAME, b.EXP_ITEM_NO FROM pr_pindent_approval a LEFT JOIN mm_item_nomenclature b ON a.NOMENCLATURE_ID = b.NOMENCLATURE_ID WHERE PROC_MST_ID = {$id} ")->result();
    }
    
    public function getNomenclatureList($id){
        return $this->db->query("SELECT DISTINCT a.NOMENCLATURE_ID, b.* FROM pr_pindent_model_temp a LEFT JOIN pr_proc_list_chd b ON a.NOMENCLATURE_ID = b.NOMENCLATURE_ID  WHERE a.FLD_USER_ID = {$id}")->result();
    }

    public function getCurrentYearAndOwnMeeting($id) {
        return $this->db->query("SELECT a.*, b.MEETING_NAME, c.FY_NAME FROM pr_proc_list_mst a LEFT JOIN mm_meeting_authority b ON a.MEETING_ID = b.MEETING_ID LEFT JOIN sa_fin_year c ON a.FY_NO = c.FY_NO  WHERE a.PROC_MST_ID = {$id} ")->row();
    }

    public function nomenclatureDropDownList($id) {

        $query = $this->db->query("SELECT b.NOMENCLATURE_ID, b.NOMENCLATURE_NAME FROM pr_proc_list_chd a LEFT JOIN mm_item_nomenclature b ON a.NOMENCLATURE_ID = b.NOMENCLATURE_ID WHERE a.PROC_MST_ID = {$id}");
        if ($query->num_rows() > 0) {
            $lookupInfo[''] = 'Select Option';
            foreach ($query->result() as $row) {
                if (!empty($row->NOMENCLATURE_NAME)) {
                    $lookupInfo[$row->NOMENCLATURE_ID] = $row->NOMENCLATURE_NAME;
                }
            }
        }
        return $lookupInfo;
    }

}