<?php
/**
 * Created by PhpStorm.
 * User: streetcoder
 * Date: 1/27/16
 * Time: 2:10 PM
 */
defined('BASEPATH') OR exit('No direct script access allowed');
class UiModel extends CI_Model{

    public function __construct() {
        parent::__construct();
    }

    public function countNumTblRows($tblName){
        $this->db->from($tblName);
        $query = $this->db->get();
        return $query->num_rows();

    }

    public function getFromDataTable($table_name,$start,$length,$col_num,$sort_type,$search){


        /*if(!empty($search)){
            $dataTableRecords = $this->getDataTableBySearch($table_name,$start,$length,$col_num,$sort_type,$search);
        }else{
            $dataTableRecords = $this->getDataTable($table_name,$start,$length,$col_num,$sort_type);
        }*/

        $dataTableRecords = $this->getDataTable($table_name,$start,$length,$col_num,$sort_type);

        return $dataTableRecords;

    }


    private function getDataTable($table_name,$start,$length,$col_num,$sort_type){

        $fieldName = $this->db->list_fields($table_name);


        for($i=0 ; $i < count($fieldName); $i++){
            if($col_num==$i){
                $colName = $fieldName[$i];
            }
        }

        $query = $this->db->query('SELECT * FROM ' . $table_name . ' ORDER BY '.$colName.' '.$sort_type.' LIMIT '.$start.', ' . $length . ' ');


        foreach ($query->result_array() as $row)
        {
            $values = array();
            for($i=0 ; $i < count($fieldName); $i++){
                $values[] = $row[$fieldName[$i]];
            }
            $recordsArr[] = $values;

        }

        return $recordsArr;

    }

    private function getDataTableBySearch($table_name,$start,$length,$col_num,$sort_type,$search){

        $fieldName = $this->db->list_fields($table_name);


        for($i=0 ; $i < count($fieldName); $i++){
            if($col_num==$i){
                $colName = $fieldName[$i];
            }
        }

        $query = $this->db->query('
            SELECT * FROM ' . $table_name . '
            WHERE actor_id LIKE "'.$search.'%"
            OR first_name  LIKE "'.$search.'%"
            OR last_name  LIKE "'.$search.'%"
            OR last_update  LIKE "'.$search.'%"
            ORDER BY '.$colName.' '.$sort_type.'
            LIMIT '.$start.', ' . $length . ' ');


        foreach ($query->result_array() as $row)
        {
            $values = array();
            for($i=0 ; $i < count($fieldName); $i++){
                $values[] = $row[$fieldName[$i]];
            }
            $recordsArr[] = $values;

        }

        return $recordsArr;

    }

}