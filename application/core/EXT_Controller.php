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
 * Class EXT_Controller
 *
 * EXT_Controller is the extended from base class CI_Controller.
 *
 * This class load all the common files in constructor, global method
 * which can be used in the derived class.
 *
 * @package     DGDP\Controllers
 * @author      streetcoder <proshimul@yahoo.com>
 * @copyright   2016 atilimited.net
 * @version     GIT: $Id$ In development. 1.0.0
 */
defined('BASEPATH') OR exit('No direct script access allowed');

class EXT_Controller extends CI_Controller
{

    /**
     * Class constructor
     *
     */
    function __construct()
    {
        parent::__construct();
        $this->load->helper('form');
        $this->load->helper('url');
        $this->load->helper('security');
        $this->load->model('utilities');
        $this->load->library('form_validation');
        $this->load->helper('language');
        /*
         * Fahim Start
         * Checking URL access By USER Organization,User Group and User Level
         *
         */
        /*
        if (!isset($_SERVER["HTTP_REFERER"])) {
            if (isset($_SESSION['logged_in']['SES_ORG_ID']) AND isset($_SESSION['logged_in']['USERGRP_ID']) AND isset($_SESSION['logged_in']['USERLVL_ID'])) {
                $orgId       = $_SESSION['logged_in']['SES_ORG_ID'];
                $userGroupId = $_SESSION['logged_in']['USERGRP_ID'];
                $userLevelId = $_SESSION['logged_in']['USERLVL_ID'];
                $uri         = $this->uri->uri_string();
                $links       = $this->accessControl_model->countAccessLink($orgId,
                    $userGroupId, $userLevelId, $uri);
                $n           = $links->TOTAL_ROW;
                if ($n == 0) {
                    redirect('undefined/undefinedUrl');
                }
            }
        }
         *
         */
        /*
         * Fahim End
         */
    }


}