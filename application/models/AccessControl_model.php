<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class AccessControl_model extends CI_Model {

    public function __construct() {
        parent::__construct();
    }

    public function getModuleLinks() {
        return $this->db->query("SELECT m.LINK_ID, m.LINK_NAME, m.LINK_NAME_BN, m.SA_MLINK_PAGES, m.MODULE_ID,
                    (SELECT MODULE_NAME FROM sa_modules WHERE MODULE_ID = m.MODULE_ID)MODULE_NAME,
                    m.URL_URI, m.LINK_DESC,  m.SL_NO, m.`CREATE`, m.`READ`, m.`UPDATE`, m.`DELETE`, m.STATUS, m.ACTIVE_STATUS
                    FROM sa_module_links m;")->result();
    }

    public function simple_drop_down_select($tableName, $primaryKey, $displayName) {

        $sql = $this->db->query("select $primaryKey,$displayName from $tableName  order by $primaryKey desc");
        return $result = $sql->result();
    }

    public function organizationList() {
        return $this->db->query("SELECT ORG_ID,ORG_NAME from sa_organizations ORDER BY ORG_ID ASC")->result();
    }

    public function userGroupList($id) {
        return $this->db->query("SELECT ORG_ID,USERGRP_ID,sa_user_group.ACTIVE_STATUS,USERGRP_NAME,ORG_NAME FROM sa_user_group left join sa_organizations using (ORG_ID) where ORG_ID=$id ORDER BY ORG_ID DESC")->result();
    }

    public function findUserGroupList($hid) {
        return $this->db->query("SELECT USERGRP_NAME FROM sa_user_group WHERE ORG_ID=$hid and ACTIVE_STATUS=1 ORDER BY USERGRP_ID DESC")->result();
    }

    public function findEmployeeInfo($org_id, $group_id) {
        return $this->db->query("SELECT FULL_NAME,EMP_ID,FLD_USER_ID from sa_users left join sa_emp using (EMP_ID) where USERGRP_ID=$group_id and sa_users.ORG_ID=$org_id ORDER BY USERGRP_ID DESC")->result();
    }

    public function findEmployeeInfoByLevel($org, $group, $lavel) {
        return $this->db->query("SELECT FULL_NAME,EMP_ID,FLD_USER_ID,USERLVL_ID from sa_users left join sa_emp using (EMP_ID) where USERGRP_ID=$group and sa_users.ORG_ID=$org and sa_users.USERLVL_ID=$lavel ORDER BY USERLVL_ID DESC")->result();
    }

//    public function findUserInfoByOrg($org) {
//        return $this->db->query("SELECT FULL_NAME,FLD_USER_ID,USERLVL_ID from sa_users where sa_users.ORG_ID=$org ORDER BY sa_users.ORG_ID DESC")->result();
//    }

    public function getOrgModules($userGroup, $userLvl, $userOrg) {
        return $this->db->query("SELECT SA_MODULE_NAME,SA_MODULE_ID FROM sa_uglw_mlink
LEFT JOIN sa_org_modules using (SA_MODULE_ID)
WHERE sa_uglw_mlink.ORG_ID=$userOrg AND UG_LEVEL_ID=$userLvl AND USERGRP_ID=$userGroup
             AND sa_uglw_mlink.ACTIVE_STATUS=1")->result();
    }

    public function getOrgModulesLinks($userGroup, $userLvl, $userOrg, $saModuleId) {
        return $this->db->query("SELECT SA_MODULE_NAME,MODULE_ID,LINK_NAME,sa_module_links.URL_URI FROM sa_uglw_mlink
LEFT JOIN sa_org_modules using (SA_MODULE_ID)
LEFT JOIN sa_modules USING (MODULE_ID)
LEFT JOIN sa_module_links using  (MODULE_ID)
WHERE sa_uglw_mlink.ORG_ID=$userOrg AND UG_LEVEL_ID=$userLvl AND USERGRP_ID=$userGroup and sa_org_modules.SA_MODULE_ID=$saModuleId")->result();
    }

    public function getModuleLinksById($LINK_ID) {
        return $this->db->query("SELECT m.LINK_ID, m.LINK_NAME, m.LINK_NAME_BN, m.SA_MLINK_PAGES, m.MODULE_ID,
                    (SELECT MODULE_NAME FROM sa_modules WHERE MODULE_ID = m.MODULE_ID)MODULE_NAME,
                    m.URL_URI, m.LINK_DESC,  m.SL_NO, m.`CREATE`, m.`READ`, m.`UPDATE`, m.`DELETE`, m.STATUS, m.ACTIVE_STATUS
                    FROM sa_module_links m WHERE m.LINK_ID=$LINK_ID;")->row();
    }

    public function getModuleByOrganization($orgId) {
        return $this->db->query("SELECT SA_MODULE_ID,MODULE_ID,MODULE_NAME FROM sa_org_modules LEFT JOIN sa_modules USING (MODULE_ID) WHERE ORG_ID=$orgId AND sa_modules.ACTIVE_STATUS=1 ORDER BY sa_modules.SL_NO ASC")->result();
    }

    public function getAccessLink($orgId, $userGroupId, $userLevelId, $saModuleId) // Done
    {
        return $this->db->query("SELECT sml.LINK_ID,sml.LINK_NAME,sml.LINK_NAME_BN,sml.URL_URI,sml.SL_NO,sgm.SA_UGLWM_LINK,sgm.`CREATE`,sgm.`READ`,sgm.`UPDATE` FROM sa_uglw_mlink as sgm
                                                    LEFT JOIN sa_org_mlinks as som USING(SA_MLINKS_ID)
                                                    LEFT JOIN sa_module_links as sml ON som.LINK_ID=sml.LINK_ID
                                                     WHERE sgm.ORG_ID=$orgId and sgm.UG_LEVEL_ID=$userLevelId and sml.ACTIVE_STATUS=1
                                                     and sgm.USERGRP_ID=$userGroupId and sgm.SA_MODULE_ID=$saModuleId and sgm.ACTIVE_STATUS=1 ORDER BY SL_NO ASC")->result();
    }

    public function countAccessLink($orgId, $userGroupId, $userLevelId, $url) {
        return $this->db->query("SELECT count(sml.LINK_ID) as TOTAL_ROW FROM sa_uglw_mlink as sgm
LEFT JOIN sa_org_mlinks as som USING(SA_MLINKS_ID)
LEFT JOIN sa_module_links as sml ON som.LINK_ID=sml.LINK_ID
 WHERE sgm.ORG_ID=$orgId and sgm.UG_LEVEL_ID=$userLevelId and sgm.USERGRP_ID=$userGroupId  and sml.URL_URI='$url'")->row();
    }
}
