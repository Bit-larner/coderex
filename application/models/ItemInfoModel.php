<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class ItemInfoModel extends CI_Model {

    public function insert($tableName, $data) {
        $this->db->insert($tableName, $data);
        return $this->db->insert_id();
    }

    public function allItemInformation($table) {
        return $this->db->query("SELECT a.*, (SELECT b.LOOKUP_DATA_NAME FROM sa_lookup_data b WHERE b.LOOKUP_DATA_ID = a.ITEM_CATEGORY) AS CATEGORY FROM {$table} a ")->result();
    }

    public function getAllItemInformationById($id) {
        return $this->db->query("SELECT a.*, (SELECT b.LOOKUP_DATA_NAME FROM sa_lookup_data b WHERE b.LOOKUP_DATA_ID = a.ITEM_CATEGORY) AS CATEGORY , (SELECT c.ITEM_NAME FROM sa_budget_code c WHERE c.EXP_ITEM_NO = a.EXP_ITEM_NO) AS EXP_ITEM, (SELECT d.ORG_NAME FROM sa_organizations d WHERE d.ORG_ID = a.ORG_ID) AS ORG_NAME, (SELECT e.GROUP_NAME FROM sa_itemgroups e WHERE e.GROUP_ID = a.GROUP_ID) AS GROUP_NAME FROM mm_iteminfo a WHERE a.ITEM_ID = {$id}")->row();
    }

    public function getAllOrganization($table) {
        return $this->db->query("SELECT * FROM {$table}")->result_array();
    }

    public function getAllOrganizationInfoById($id) {
        return $this->db->query("SELECT a.*, (SELECT o.ORG_NAME FROM sa_organizations o WHERE o.ORG_ID = a.PARENT_ORG_ID) AS PARENT_ORG_NAME, (SELECT b.LOOKUP_DATA_NAME FROM sa_lookup_data b WHERE b.LOOKUP_DATA_ID = a.ORG_TYPE_ID) AS ORG_TYPE FROM sa_organizations a WHERE a.ORG_ID = {$id}")->row();
    }

    function dropdownFromTableWithCondition($tableName, $selectText, $key, $value, $condition = '', $orderByField = '', $orderBy = 'ASC') {
        if (!empty($condition)) {
            $this->db->where($condition);
        }
        if ($orderByField == '') {
            $this->db->order_by("$value", "$orderBy");
        } else {
            $this->db->order_by("$orderByField", "$orderBy");
        }
        $query = $this->db->get($tableName);

        if ($query->num_rows() > 0) {
            foreach ($query->result() as $row) {
                if (!empty($row->{$value})) {
                    $lookupInfo[$row->{$key}] = $row->{$value};
                }
            }
        }
        if (!empty($lookupInfo)) {
            return $lookupInfo;
        }
    }

    public function selectAllSelectedValue($id) {
        return $this->db->query("select TYPE_NO FROM mm_itemtypemap WHERE ITEM_ID = {$id}")->result();
    }

    public function getAttrByIdInfo($id) {
        $result = $this->db->query("SELECT DISTINCT  b.BASEATTR_ID, b.ATTR_NAME FROM mm_itemtypemap a INNER JOIN mm_baseattr b ON a.TYPE_NO = b.TYPE_NO WHERE a.ITEM_ID = {$id}")->result();
        $result[] = array("BASEATTR_ID" => "-1", "ATTR_NAME" => "Others Option");
        return $result;
    }

    public function getAllBaeAttrDetailsByIdInfo($id) {
        return $this->db->query("SELECT a.* FROM mm_baseattr a WHERE a.BASEATTR_ID = {$id} ")->row();
    }

    public function gellAllItemSpecById($id) {
        return $this->db->query("SELECT a.*, b.ITEM_NAME FROM mm_itemspecs a LEFT JOIN mm_iteminfo b ON a.ITEM_NO = b.ITEM_ID WHERE a.ITEMspecs_ID = $id")->row();
    }

    public function findItemModels() {
        return $this->db->query("SELECT I_MODEL_ID,MODEL_NAME FROM mm_item_models")->result();
    }

    public function findItemModelsSelected($id) {
        return $this->db->query("SELECT I_MODEL_ID,NOMENCLATURE_ID FROM mm_nomenclature_models WHERE NOMENCLATURE_ID= $id")->result();
    }

    public function findItemAttrSelected($id) {

        return $this->db->query("SELECT ITEMMAP_NO,TYPE_NO FROM mm_nc_itemtypemap WHERE NOMENCLATURE_ID = $id")->result();
    }

    public function getAttrNameById($id) {
        $result = $this->db->query("SELECT DISTINCT  b.BASEATTR_ID, b.ATTR_NAME FROM mm_nc_itemtypemap a INNER JOIN mm_baseattr b ON a.TYPE_NO = b.TYPE_NO WHERE a.NOMENCLATURE_ID = $id")->result();
        return $result;
    }

    public function getParentAttrNameById($id) {
        $result = $this->db->query("SELECT DISTINCT  b.BASEATTR_ID, b.ATTR_NAME FROM mm_nc_itemtypemap a INNER JOIN mm_baseattr b ON a.TYPE_NO = b.TYPE_NO WHERE a.NOMENCLATURE_ID = $id")->result();
        return $result;
    }

    public function getmultiSelectedAttrNameById($id) {
        $result = $this->db->query("SELECT a.BASEATTR_ID, a.ATTR_NAME FROM mm_nc_specs_attr a WHERE a.NOMENCLATURE_ID =  $id")->result();
        return $result;
    }

    public function getAllNomenclatureModel($id) {
        return $this->db->query("SELECT a.*, b.ATTR_NAME FROM mm_nc_itemtypemap a LEFT JOIN mm_baseattr b ON a.TYPE_NO = b.TYPE_NO WHERE a.NOMENCLATURE_ID = {$id}")->result();
    }

    public function getAllBudget() {
        return $result = $this->db->query("SELECT EXP_ITEM_NO, ECONOMIC_CODE,ITEM_NAME FROM sa_budget_code")->result();
    }

}

