<?php
/**
 * This file is part of the DGDP\e-DP System package
 *
 * (c) ATI Limited. <info@atilimited.net>
 *
 * PHP version 5 (5.5.9)
 *
 * @package     DGDP\e-DP
 * @author      ATI Limited Dev Team
 * @copyright   2016 atilimited.net
 */
/**
 * Class Util
 *
 * This class will be used add any new common function which can
 * be effect over several aspect of the application. For example
 * getJsCode() injects js code from view to footer the template.
 * and addJsCode() is used to receive the parameter of code from
 * view file. However, it can use different approach of the application.
 *
 *
 * @package     DGDP\Libraries
 * @author      streetcoder <proshimul@yahoo.com>
 * @copyright   2016 atilimited.net
 * @version     GIT: $Id$ In development. 1.0.0
 */
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Class Util
 */
class Util
{

    /**
     * @var
     */
    protected $CI;

    /**
     * @var
     */
    private $code;

    /**
     * @var
     */
    private $modalPartial;

    /**
     * @var
     */
    private $resultCode;

    /**
     * @var
     */
    private $message;


    /**
     * @var
     */
    private $data;


    public function __construct() {
        $this->CI =& get_instance();
    }

    /**
     * @description
     * @param array $breadcrumb
     * @return void
     */
    public function breadcrumb($breadcrumb){
        $numItems = count($breadcrumb);
        $i = 0;

        foreach($breadcrumb as $key=>$val){
            if(++$i === $numItems) {
                echo '<li class="active">' . $key . '</li>';
            }else{
                echo '<li><a href=" ' . $val . ' "> ' . $key . ' </a></li>';
            }
        }

    }

    /**
     * This method is used to display form in global
     * modal which means a generic markup of bootstrap Modal
     * is defined in template. Method receives the url as param
     * which will be used to get Modal Form.
     *
     *
     * @param $url|string
     * */
    public function modalPartial($url){
        $this->modalPartial = $url;
    }

    /*
     *
     * */
    public function getModalForm(){
        return $this->modalPartial;
    }


    /**
     * @param $code
     */
    public function addJsCode($code){
        $this->code = $code;
    }

    /*
     *
     * */
    public function getJsCode(){
        return $this->code;
    }

    public static function arrayDump(array $array){
        echo '<pre>'.print_r($array,1).'</pre>';
    }

    public function resultObject($resultCode,$message='',$data=''){

        $this->resultCode   = $resultCode;
        $this->message      = $message;
        $this->data         = $data;

        $this->resultController();

    }

    private function resultController(){
        switch ($this->resultCode) {

            case "0":
                return $this->resultError();
                break;

            case "1":
                return $this->resultSuccess();;
                break;

            case "2":
                return $this->resultSuccessWithData();;
                break;

            // other codes

            default:


        }
    }

    private function resultError(){
        $msg = "<div class='alert alert-danger'>".$this->message."</div>";

        $final = array('result'=>'error','msg'=>$msg);

        echo json_encode($final);
    }

    private function resultSuccess(){
        $msg = "<div class='alert alert-success'>".$this->message."</div>";

        $final = array('result'=>'success','msg'=>$msg);

        echo json_encode($final);
    }

    private function resultSuccessWithData(){
        $msg = "<div class='alert alert-success'>".$this->message."</div>";

        $final = array('result'=>'success','msg'=>$msg, 'data'=>$this->data);

        echo json_encode($final);
    }


    /**
     * Return body text of template replacing tags
     *
     * @param $tpl_id
     * @param array $string_to_change
     * @return mixed
     */
    public function getTemplateText($tpl_id, array $string_to_change){

        $query = $this->CI->db->get_where('sa_template_letter', array('TEMPL_ID' => $tpl_id));

        $body = null;
        foreach ($query->result() as $row)
        {

            $body = $row->TEMPL_BODY;
        }

        preg_match_all("/\[[^\]]*\]/", $body, $matches);

        $templateFinal = str_replace($matches[0], $string_to_change, $body);

        return $templateFinal;

    }


}