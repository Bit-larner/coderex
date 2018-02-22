<?php
/**
 * Created by PhpStorm.
 * User: streetcoder
 * Date: 1/30/16
 * Time: 5:47 PM
 */
defined('BASEPATH') OR exit('No direct script access allowed');
class DataTable
{

    protected $CI;

    private $_primaryKey;

    private $_col_num;

    private $_search;

    private $_table_name;

    private $_fields_name = array();

    private $_actions = array();

    private $_modal_title = array();

    private $_icons = array();

    private $_htmlClass = array();

    public function __construct() {
        $this->CI =& get_instance();
    }

    /*
     * todo: fields_name for colForSort() and whereSearch() require table.column format
     * todo: getQueryResult() requires only column name format
     *
     * */
    /**
     * @param $draw
     * @param $start
     * @param $length
     * @param $col_num
     * @param $sort_type
     * @param $search
     * @param $sql_partial
     * @param $table_name
     * @param array $fields_name
     * @param array $actions
     * @param array $modal_title
     * @param array $icons
     * @param array $htmlClass
     * @return array
     */
    public function getJoinDataTable(
        $draw,
        $start,
        $length,
        $col_num,
        $sort_type,
        $search,
        $sql_partial,
        $table_name,
        array $fields_name,
        $actions = array(),
        $modal_title = array('View','Edit','Remove'),
        $icons = array('glyphicon-eye-open','glyphicon-edit','glyphicon-trash'),
        $htmlClass = array('modalLink text-primary','modalLink text-info','modalLink text-danger')
    )
    {
        $this->_col_num         = $col_num;

        $this->_search          = $search;

        $this->_table_name      = $table_name;

        $this->_fields_name     = $fields_name;

        $this->_actions         = $actions;

        $this->_modal_title     = $modal_title;

        $this->_icons           = $icons;

        $this->_htmlClass       = $htmlClass;

        $colName = $this->colForSort($fields_name);

        if(!empty($search)){

            $searchWhere = $this->whereSearch();

            $query = $this->CI->db->query(' '.$sql_partial.'
                           WHERE '.$searchWhere.'
                           ORDER BY '.$colName.' '.$sort_type.'
                           LIMIT '.$start.','.$length.' ');

        }else{
            $query = $this->CI->db->query(' '.$sql_partial.'
                           ORDER BY '.$colName.' '.$sort_type.'
                           LIMIT '.$start.','.$length.' ');

        }

        foreach($fields_name as $value){

            $fields[] = substr(strstr($value, '.'), 1);
        }

        $this->_primaryKey = $this->getPrimaryKey();

        $dataTableRecords = $this->getQueryResult($query,$fields);


        $recordsTotal = $this->countNumRowsBySql($sql_partial);

        $dataArray = array(
            "draw" => $draw,
            "recordsTotal" => $recordsTotal,
            "recordsFiltered" => $recordsTotal,
            "data" => $dataTableRecords
        );

        return $dataArray;

    }


    /**
     * @param $draw
     * @param $start
     * @param $length
     * @param $col_num
     * @param $sort_type
     * @param $search
     * @param $table_name
     * @param array $fields_name
     * @param array $actions
     * @param array $modal_title
     * @param array $icons
     * @param array $htmlClass
     * @return array
     */
    public function getDataTable(
        $draw,
        $start,
        $length,
        $col_num,
        $sort_type,
        $search,
        $table_name,
        array $fields_name,
        $actions = array(),
        $modal_title = array('View','Edit','Remove'),
        $icons = array('glyphicon-eye-open','glyphicon-edit','glyphicon-trash'),
        $htmlClass = array('modalLink text-primary','modalLink text-info','modalLink text-danger')

    ){

        $this->_col_num         = $col_num;

        $this->_search          = $search;

        $this->_table_name      = $table_name;

        $this->_fields_name     = $fields_name;

        $this->_actions         = $actions;

        $this->_modal_title     = $modal_title;

        $this->_icons           = $icons;

        $this->_htmlClass       = $htmlClass;

        $colName = $this->colForSort();

        if(!empty($search)){

            $whereSearch = $this->whereSearch();

            $query = $this->CI->db->query('
                    SELECT * FROM ' . $table_name . '
                    WHERE '.$whereSearch.'
                    ORDER BY '.$colName.' '.$sort_type.'
                    LIMIT '.$start.', ' . $length . ' ');

        }else{

            $query = $this->CI->db->query('
                    SELECT * FROM ' . $table_name . '
                    ORDER BY '.$colName.' '.$sort_type.'
                    LIMIT '.$start.', ' . $length . ' ');

        }

        $this->_primaryKey = $this->getPrimaryKey();

        $dataTableRecords = $this->getQueryResult($query,$fields_name);

        $recordsTotal = $this->countNumRowsByTableName($table_name);

        $dataArray = array(
            "draw" => $draw,
            "recordsTotal" => $recordsTotal,
            "recordsFiltered" => $recordsTotal,
            "data" => $dataTableRecords
        );

        return $dataArray;

    }

    /**
     * @return mixed
     */
    private function getPrimaryKey(){
        $query = $this->CI->db->query("SHOW INDEX FROM ".$this->_table_name." WHERE Key_name = 'PRIMARY'");
        return $query->result()[0]->Column_name;
    }

    private function countNumRowsBySql($sql){
        $query = $this->CI->db->query($sql);
        return $query->num_rows($query);
    }

    private function countNumRowsByTableName($tblName){

        return $this->CI->db->count_all($tblName);

    }

    private function colForSort(){

        for($i=0 ; $i < count($this->_fields_name); $i++){
            if($this->_col_num==$i){
                $colName = $this->_fields_name[$i];
            }
        }

        return $colName;
    }

    public function isEnum($fieldName,$fieldValue){

    }
    private function getQueryResult($query,array $fields_name){
        //$fieldsName         = array('MODULE_NAME','SHORT_NAME','MODULE_NAME_BN','SL_NO',array('type' => 'alt','field_name' => 'ACTIVE_STATUS','value' => array('Inactive', 'Active')));
        $returnArray = array();
        $queryResults = $query->result_array();
        if(!empty($queryResults)){
            foreach ($queryResults as $row)
            {
                $values = array();

                for($i=0 ; $i < count($fields_name); $i++){

                    // todo: add option for enum fields
                    if(is_array($fields_name[$i])){
                        if($fields_name[$i]['type'] == 'alt'){
                            $values[] = $fields_name[$i]['value'][$row[$fields_name[$i]['field_name']]];
                        }
                    }else{
                        $values[] = $row[$fields_name[$i]];
                    }
                }

                if(!empty($this->_actions)){
                    $actionsUrl = $this->buildAnchor($row[$this->_primaryKey]);
                    array_push($values, $actionsUrl);
                }
                $returnArray[] = $values;
            }
        }

        return $returnArray;
    }

    private function whereSearch(){


        $newFieldsArray = array();

        foreach($this->_fields_name as $fields){

            if(is_array($fields)){
                $newFieldsArray[] = $fields['field_name'];
            }
            else{
                $newFieldsArray[] = $fields;
            }
        }

        $partialQuery = "";
        for($i=0; $i < count($newFieldsArray); $i++){
            if($i==0){
                $partialQuery .= $newFieldsArray[$i].' LIKE "'.$this->_search.'%"';
            }
            else{
                $partialQuery .= 'OR '.$newFieldsArray[$i].' LIKE "'.$this->_search.'%"';
            }
        }

        return $partialQuery;
    }

    private function buildAnchor($key_id){

        $atts = array(
            'type'              => 'button',
            'data-tooltip'      => 'tooltip',
            'data-placement'    => 'top'
        );

        $actionUrl = "";
        for($i=0 ; $i < count($this->_actions); $i++){

            $atts['class'] = $this->_htmlClass[$i];
            $atts['title'] = $this->_modal_title[$i];

            $actionUrl .= anchor($this->_actions[$i].$key_id, ' <span class="glyphicon '.$this->_icons[$i].'"></span> ', $atts);
        }

        return $actionUrl;

    }

}
