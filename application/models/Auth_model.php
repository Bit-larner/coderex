<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Auth_model extends CI_Model {

    function __construct() {
        // Call the Model constructor
        parent::__construct();
    }

    public function login($username, $password) 
    { // Done
        $query = $this->db->get_where('sa_users', array('USERNAME' => $username, 'USERPW' => $password));
        if ($query->num_rows() == 0) {
            return false;
        } else {
            return $query->row();
        }
    }

    /*
      public function applicant_login($appUserCode, $password) {
      $query = $this->db->get_where('or_applicant_info', array('CODE' => $appUserCode, 'APPLICANT_PSWD' => $password, 'LSTATUS_FG' => 'A'));
      if ($query->num_rows() == 0) {
      return false;
      } else {
      return $query->row();
      }
      }
     */
    /*
      public function getUsersData($username_email) {
      return $this->db->query("select a.* from sa_users a where USERNAME = '$username_email' OR EMAIL = '$username_email'")->row();
      }
     * /
      /*
      public function getPassRequestData($user_id){
      return $this->db->query("select a.* from sa_forget_pass_request a where FLD_USER_ID = '$user_id'")->row();
      }
     */
}
