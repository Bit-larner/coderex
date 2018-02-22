<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class MasterSetupModel extends CI_Model {

    public function __construct() {
        parent::__construct();
    }

    public function getLookupData($LOOKUP_DATA_ID) {

        return $this->db->query("select sa_lookup_data.*, grp.USE_CHAR_NUMB as USE_CHAR_NUMB  from sa_lookup_data 
                                 left join sa_lookup_grp as grp on grp.LOOKUP_GRP_ID = sa_lookup_data.LOOKUP_GRP_ID
                                 where LOOKUP_DATA_ID=$LOOKUP_DATA_ID")->row();
    }

}

?>