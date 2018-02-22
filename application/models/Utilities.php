<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Utilities extends CI_Model {

    function __construct() {
        parent::__construct();
    }

    function get_max_value($tableName, $fieldName) {
        return $this->db->select_max($fieldName)->get($tableName)->row()->{$fieldName};
    }

    function get_max_value_by_attribute($tableName, $fieldName, $attribute) {
        return $this->db->select_max($fieldName)->where($attribute)->get($tableName)->row()->{$fieldName};
    }

    function get_field_value_by_attribute($tableName, $fieldName, $attribute) {
        $result = $this->db->get_where($tableName, $attribute)->row();
        if (!empty($result)):
            return $result->{$fieldName};
        else:
            return false;
        endif;
    }

    function dropdownFromTable($tableName, $selectText, $key, $labels) {
        $query = $this->db->get($tableName);
        $lookupInfo = array();

        if ($query->num_rows() > 0) {
            $lookupInfo = array(
                '' => $selectText
            );
            foreach ($query->result() as $row) {
                $labelText = '';
                for ($i = 0; $i < sizeof($labels); $i++) {
                    $labelText = $labelText . ' ' . $row->{$labels[$i]};
                }
                $lookupInfo[$row->{$key}] = $labelText;
            }
        }
        return $lookupInfo;
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

        if (empty($selectText)) {
            $selectText = '--- Select ---';
        }

        if ($selectText == 'none') {
            $lookupInfo = array();
        } else {
            $lookupInfo = array('' => $selectText);
        }
        if ($query->num_rows() > 0) {
            foreach ($query->result() as $row) {
                if (!empty($row->{$value})) {
                    $lookupInfo[$row->{$key}] = $row->{$value};
                }
            }
        }
        return $lookupInfo;
    }

    public function hasInformationByThisId($tableName, $attribute) {
        $query = $this->db->get_where($tableName, $attribute);
        $no_of_row = 0;
        if (!empty($query)) {
            $no_of_row = $query->num_rows();
        }
        return ($no_of_row > 0) ? TRUE : FALSE;
    }

    public function countRowByAttribute($tableName, $attribute) {
        return $this->db->get_where($tableName, $attribute)->num_rows();
    }

    function insertData($post, $tableName) {
        $this->db->trans_start();
        $this->db->insert($tableName, $post);
        $this->db->trans_complete();
        if ($this->db->trans_status() == TRUE) {
            return TRUE;
        } else {
            return FALSE;
        }
    }

    function insertDataWithReturn($tableName, $data) {
        $this->db->insert($tableName, $data);
        return $this->db->insert_id();
    }

    function updateData($tableName, $data, $condition) {
        $this->db->trans_start();
        $this->db->update($tableName, $data, $condition);
        $this->db->trans_complete();
        if ($this->db->trans_status() == TRUE) {
            return TRUE;
        } else {
            return FALSE;
        }
    }

    function deleteRowByAttribute($tableName, $attribute) {
        $this->db->trans_start();
        $this->db->delete($tableName, $attribute);
        $this->db->trans_complete();

        if ($this->db->trans_status() == TRUE) {
            return TRUE;
        } else {
            return FALSE;
        }
    }

    function findByAttribute($tableName, $attribute) {
        return $this->db->get_where($tableName, $attribute)->row();
    }

    function rowCountByAttribute($tableName, $attribute) {
        return $this->db->get_where($tableName, $attribute)->num_rows();
    }

    function change_status_by_attribute($table_name, $attribute) {
        $rowInfo = $this->findByAttribute($table_name, $attribute);
        if (empty($rowInfo)) {
            $returnValue = 'Invalid';
        } else {
            if ($rowInfo->ACTIVE_STAT == 'Y') {
                $returnValue = 'Inactivated';
            } else {
                $returnValue = 'Activated';
            }
            $this->ACTIVE_STAT = ($rowInfo->ACTIVE_STAT == 'Y') ? 'N' : 'Y';
            $this->db->update($table_name, $this, $attribute);
        }
        return $returnValue;
    }

    function change_new_table_status_by_attribute($table_name, $attribute) {
        $rowInfo = $this->findByAttribute($table_name, $attribute);
        if (empty($rowInfo)) {
            $returnValue = 'Invalid';
        } else {
            if ($rowInfo->STA_FG == 1) {
                $returnValue = 'Inactivated';
            } else {
                $returnValue = 'Activated';
            }
            $this->STA_FG = ($rowInfo->STA_FG == 1) ? 0 : 1;
            $this->db->update($table_name, $this, $attribute);
        }
        return $returnValue;
    }

    function lookupTypesByLookupNo($lookupNo, $selectedText = '--- Select ---') {
        $query = $this->db->get_where('CM_LOOKUP_DTL', array('LOOKUP_NO' => $lookupNo, 'ACTIVE_STAT' => 'Y'));
        $docType = array();
        if ($query->num_rows() > 0) {
            $docType = array(
                '' => $selectedText
            );
            foreach ($query->result() as $row) {
                $docType[$row->LOOKUPDTL_NO] = $row->DTL_NAME;
            }
        }
        return $docType;
    }

    function attributeArrayByGroupId($group_id, $selectedText = '--- Select ---') {
        $query = $this->db->get_where('A00_ATRB', array('GRP_ID' => $group_id, 'STA_FG' => 1));
        $returnArray = array();
        if ($query->num_rows() > 0) {
            $returnArray = array(
                '' => $selectedText
            );
            foreach ($query->result() as $row) {
                $returnArray[$row->ATRB_ID] = $row->ATRB_NAME;
            }
        }
        return $returnArray;
    }

    function findAllFromView($viewName) {
        return $this->db->get($viewName)->result();
    }

    function findAllAttributeArray($tableName) {
        return $this->db->get($tableName)->result_array();
    }

    function findAllByAttributeWithLike($tableName, $attribute, $like) {
        if (!empty($like)) {
            $this->db->like($like);
        }
        if (!empty($attribute)) {
            $this->db->where($attribute);
        }
        return $this->db->get($tableName)->result();
    }

    function findAllByAttribute($tableName, $attribute) {
        return $this->db->get_where($tableName, $attribute)->result();
    }

    public function countRow($tableName, $attribute = array()) {
        if (!empty($attribute)) {
            $this->db->where($attribute);
        }
        return $this->db->get($tableName)->num_rows();
    }

    function findByLimit($tableName, $limit = 20, $row = 0, $order_by_field_name = '', $order_by = 'ASC', $attribute = array()) {
        if (!empty($attribute)) {
            $this->db->where($attribute);
        }
        if ($order_by_field_name != '') {
            $this->db->order_by("$order_by_field_name", "$order_by");
        }
        $query = $this->db->get($tableName, $limit, $row);
        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return false;
        }
    }

    function formatDate($format, $dateStr) {
        if (trim($dateStr) == '' || substr($dateStr, 0, 10) == '0000-00-00') {
            return '';
        }
        $ts = strtotime($dateStr);
        if ($ts === false) {
            return '';
        }
        return date($format, $ts);
    }

    function findAllByAttributeWithOrderBy($tableName, $attribute, $order_by_field_name, $order_by = 'ASC') {
        return $this->db->order_by("$order_by_field_name", "$order_by")->get_where($tableName, $attribute)->result();
    }

    function getIdByName($tableName, $name, $returnFieldName) {
        return $this->db->query("SELECT $returnFieldName  FROM $tableName WHERE (FIRST_NAME||' '||LAST_NAME)='$name'")->row()->{$returnFieldName};
    }

    function findByAttributeWithJoin($mainTableName, $joinTableName, $joinByFieldName, $joinWithFieldName, $joinFieldName, $attribute, $joinType = 'left') {
        $this->db->select("$mainTableName.*, $joinTableName.$joinFieldName");
        $this->db->from($mainTableName);
        $this->db->join($joinTableName, "$mainTableName.$joinByFieldName = $joinTableName.$joinWithFieldName", $joinType);
        $this->db->where($attribute);
        return $this->db->get()->row();
    }

    function findAllByAttributeWithJoin($mainTableName, $joinTableName, $joinByFieldName, $joinWithFieldName, $joinFieldName, $attribute = '', $joinType = 'left') {
        $this->db->select("$mainTableName.*, $joinTableName.$joinFieldName");
        $this->db->from($mainTableName);
        $this->db->join($joinTableName, "$mainTableName.$joinByFieldName = $joinTableName.$joinWithFieldName", $joinType);
        if (!empty($attribute)) {
            $this->db->where($attribute);
        }
        return $this->db->get()->result();
    }

    function findByAttributeWithJoinMF($mainTableName, $joinTableName, $joinByFieldName, $joinWithFieldName, $returnValue, $attribute = '', $joinType = 'left') {
        $this->db->select($returnValue);
        $this->db->from($mainTableName);
        $this->db->join($joinTableName, "$mainTableName.$joinByFieldName = $joinTableName.$joinWithFieldName", $joinType);
        if (!empty($attribute)) {
            $this->db->where($attribute);
        }
        return $this->db->get()->row();
    }

    function findAllByAttributeWithJoinMF($mainTableName, $joinTableName, $joinByFieldName, $joinWithFieldName, $returnValue, $attribute = '', $joinType = 'left') {
        $this->db->select($returnValue);
        $this->db->from($mainTableName);
        $this->db->join($joinTableName, "$mainTableName.$joinByFieldName = $joinTableName.$joinWithFieldName", $joinType);
        if (!empty($attribute)) {
            $this->db->where($attribute);
        }
        return $this->db->get()->result();
    }

    function is_it_checked_or_not($role_id, $form_id) {
        $role_permission_info = $this->db->get_where('SM_ROLE_FORMS', array('ROLE_ID' => $role_id, 'FORM_ID' => $form_id))->row();
        if (empty($role_permission_info)) {
            return FALSE;
        } else {
            if ($role_permission_info->ACTIVE_STAT == 'Y') {
                return TRUE;
            } else {
                return FALSE;
            }
        }
    }

    function change_access_forms_by_ajax($role_id, $form_id, $status) {
        $role_form_info = $this->db->get_where('SM_ROLE_FORMS', array('ROLE_ID' => $role_id, 'FORM_ID' => $form_id))->row();
        $session_info = $this->session->userdata('logged_in');
        if (empty($role_form_info)) {
            $this->ROLE_FORMS_ID = $this->get_max_value('SM_ROLE_FORMS', 'ROLE_FORMS_ID') + 1;
            $this->ROLE_ID = $role_id;
            $this->FORM_ID = $form_id;
            $this->ACTIVE_STAT = $status;
            $this->CRE_BY = $session_info['FLD_USER_ID'];
            $this->db->insert('SM_ROLE_FORMS', $this);
        } else {
            $this->ACTIVE_STAT = $status;
            $this->UPD_BY = $session_info['FLD_USER_ID'];
            $this->UPD_DT = date('d-M-Y h:i:s A');
            $this->db->update('SM_ROLE_FORMS', $this, array('ROLE_FORMS_ID' => $role_form_info->ROLE_FORMS_ID));
        }
    }

    function SPEL_OUT_AMOUNT($amount) {
        return $this->db->query("SELECT SPEL_OUT ($amount) AS IN_WORD  FROM dual")->row()->IN_WORD;
    }

    function remove_case_doc_by_id($id) {
        if (is_numeric($id) && $id > 0) {
            $row = $this->findByAttribute('CM_CASE_DOC', array('CASE_DOC_ID' => $id));
            $file_name = $row->FILE_NAME;
            if (!empty($file_name)) {
                $path = APPPATH . '../resources/docStore/' . $file_name;
                if (file_exists($path)) {
                    unlink($path) or die('failed deleting: ' . $path);
                }
            }
            $this->db->where('CASE_DOC_ID', $id);
            $this->db->delete('CM_CASE_DOC');
            return ($this->db->affected_rows() > 0) ? TRUE : FALSE;
        } else {
            return FALSE;
        }
    }

    function getPreviousArrayByAttribute($tableName, $returnFieldName, $attribute) {
        $preRecords = $this->db->select($returnFieldName)->get_where($tableName, $attribute)->result();
        $singleArray = array();
        if (!empty($preRecords)) {
            foreach ($preRecords as $preRecord) {
                $singleArray[] = $preRecord->{$returnFieldName};
            }
        }
        return $singleArray;
    }

    function getRowArrayByAttribute($tableName, $attribute) {
        $preRecords = $this->db->select('*')->get_where($tableName, $attribute)->result();
        $singleArray = array();
        if (!empty($preRecords)) {
            foreach ($preRecords as $preRecord) {
                $singleArray[] = $preRecord;
            }
        }
        return $singleArray;
    }

    function getArrayOfColumnByAttribute($tableName, $columnName, $attribute = array()) {
        $returnArray = array();
        if (!empty($attribute)) {
            $this->db->where($attribute);
        }
        $query = $this->db->get($tableName);
        if ($query->num_rows() > 0) {
            foreach ($query->result() as $row) {
                if (!empty($row->{$columnName})) {
                    $returnArray[] = $row->{$columnName};
                }
            }
        }
        return $returnArray;
    }

    public function get_php_date_format($string) {
        list($date, $time, $ampm) = explode(' ', $string);
        list($hour, $minute, $second) = explode('.', $time);
        $second = substr($second, 0, 2);
        $time = $hour . '.' . $minute . '.' . $second . '' . $ampm;
        return date('F d, Y h:i:s a', strtotime($date . ' ' . $time));
    }

    public function get_item_usage_info_by_item_id($user_id, $item_id) {
        $query_for_last_info = $this->db->query("SELECT A.IRITM_ID, A.RCV_QTY, A.RCV_DT FROM A32_ISITM A, A32_IS S WHERE A.IS_ID = S.IS_ID AND A.RCV_FG = 1 AND A.ITM_ID = $item_id AND S.IS_TO = $user_id ORDER BY A.RCV_DT DESC")->first_row();
        $IRITM_ID = '';
        $RCV_QTY = 'N/A';
        $RCV_DT = 'N/A';
        $TOTAL_USAGE = 'N/A';
        if (!empty($query_for_last_info)) {
            $IRITM_ID = $query_for_last_info->IRITM_ID;
            $RCV_QTY = $query_for_last_info->RCV_QTY;
            $RCV_DT = date('d-M-Y', strtotime($query_for_last_info->RCV_DT));
        }
        $bgt_range = $this->db->query("SELECT DT1, DT2 FROM A32_BGTYRRANGE WHERE BGTYR_ID = (SELECT MAX(BGTYR_ID) FROM A32_BGTYRRANGE)")->row();
        if (!empty($bgt_range)) {
            $DT1 = date('d-M-Y', strtotime($bgt_range->DT1));
            $DT2 = date('d-M-Y', strtotime($bgt_range->DT2));
            $TOTAL_USAGE = $this->db->query("SELECT SUM(A.RCV_QTY) TOTAL_USAGE FROM A32_ISITM A, A32_IS S WHERE A.IS_ID = S.IS_ID AND A.RCV_FG = 1 AND A.ITM_ID = $item_id AND S.IS_TO = $user_id AND A.RCV_DT BETWEEN '" . $DT1 . "' AND '" . $DT2 . "' ORDER BY A.RCV_DT DESC")->row()->TOTAL_USAGE;
        }
        return array('IRITM_ID' => $IRITM_ID, 'RCV_QTY' => $RCV_QTY, 'RCV_DT' => $RCV_DT, 'TOTAL_USAGE' => $TOTAL_USAGE);
    }

    public function get_item_points_info_by_item_point_id($user_id, $item_id, $point_id) {
        $query_for_last_info = $this->db->query("SELECT A.CRE_DT FROM A32_ITMINSTPOINT A, A32_IRITM IRI WHERE A.IRITM_ID = IRI.IRITM_ID AND A.IS_VERIFIED = 1 AND A.CRE_BY = $user_id AND IRI.ITM_ID = $item_id AND A.INSTPOINT_ID = $point_id ORDER BY A.CRE_DT DESC")->first_row();
        $PT_RCV_DT = 'N/A';
        $PT_TOTAL_USAGE = 'N/A';
        if (!empty($query_for_last_info)) {
            $PT_RCV_DT = $query_for_last_info->CRE_DT;
        }
        $bgt_range = $this->db->query("SELECT DT1, DT2 FROM A32_BGTYRRANGE WHERE BGTYR_ID = (SELECT MAX(BGTYR_ID) FROM A32_BGTYRRANGE)")->row();
        if (!empty($bgt_range)) {
            $DT1 = date('d-M-Y', strtotime($bgt_range->DT1));
            $DT2 = date('d-M-Y', strtotime($bgt_range->DT2));
            $PT_TOTAL_USAGE = $this->db->query("SELECT COUNT(A.IRITM_ID) TOTAL_USAGE FROM A32_ITMINSTPOINT A, A32_IRITM IRI WHERE A.IRITM_ID = IRI.IRITM_ID AND A.IS_VERIFIED = 1 AND A.CRE_BY = $user_id AND IRI.ITM_ID = $item_id AND A.INSTPOINT_ID = $point_id AND TRUNC(A.CRE_DT) BETWEEN '" . $DT1 . "' AND '" . $DT2 . "'")->row()->TOTAL_USAGE;
        }
        return array('PT_RCV_DT' => $PT_RCV_DT, 'PT_TOTAL_USAGE' => $PT_TOTAL_USAGE);
    }

    function bn2enNumber($number) {
        $search_array = array("১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯", "০");
        $replace_array = array("1", "2", "3", "4", "5", "6", "7", "8", "9", "0");
        $en_number = str_replace($search_array, $replace_array, $number);
        return $en_number;
    }

    function en2bnNumber($number) {
        $search_array = array("1", "2", "3", "4", "5", "6", "7", "8", "9", "0");
        $replace_array = array("১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯", "০");
        $en_number = str_replace($search_array, $replace_array, $number);
        return $en_number;
    }

    function generateRandomString($length = 10) {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }
        return $randomString;
    }

    /*
     * For this function, i have used the native functions of PHP. It calculates the difference between two Dates.
     *
     * Author: Maruf
     *
     * @param $start
     * @param bool $end
     * @return bool|string
     */

    function dateDiff($start, $end = false) {
        // Checks $start and $end format (timestamp only for more simplicity and portability)
        if (!$end) {
            $end = time();
        }
        // Convert $start and $end into EN format (ISO 8601)
        //$start  = date('Y-m-d',strtotime($start));
        //$end    = date('Y-m-d',strtotime($end));
        $diff = abs(strtotime($start) - strtotime($end));
        $years = floor($diff / (365 * 60 * 60 * 24));
        $duration = ($years == 0) ? '' : "$years years, ";
        $months = floor(($diff - $years * 365 * 60 * 60 * 24) / (30 * 60 * 60 * 24));
        $duration .= ($months == 0) ? '' : "$months months, ";
        $days = floor(($diff - $years * 365 * 60 * 60 * 24 - $months * 30 * 60 * 60 * 24) / (60 * 60 * 24));
        $duration .= ($days == 0) ? '' : "$days days";

        return $duration;
        /*
          $d_start    = new DateTime($start);
          $d_end      = new DateTime($end);
          $interval = $d_start->diff($d_end);
          // return
          $returnString = '';
          $y_diff = $interval->format('%y');
          if($y_diff > 0){
          $returnString .= $y_diff." Years ";
          }
          $m_diff = $interval->format('%m');
          if($m_diff > 0){
          $returnString .= $m_diff." Months ";
          }
          $d_diff = $interval->format('%d');
          if($d_diff > 0){
          $returnString .= $d_diff." Days";
          }
          return $returnString; */
    }

    public function getDocumentSearch($search_data) {
        $this->db->select('LINK_ID,LINK_NAME');
        $this->db->like('LINK_NAME', $search_data);
        return $this->db->get('sa_module_links');
    }

}

?>