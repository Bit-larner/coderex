<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class WfSetup_model extends CI_Model {

    public function saveWf($data, $tableName) {
        $this->db->trans_start();
        $this->db->insert($tableName, $data);
        $this->db->trans_complete();
        if ($this->db->trans_status() == TRUE) {
            return TRUE;
        } else {
            return FALSE;
        }
    }
    public function getOrganizationInfoById($id) {
        if ($this->user_session['SES_ORG_ID'] == 1) {
            return $this->db->query("SELECT CONCAT(a.ORG_ID,'_',$id) as ORG_IDD,a.ORG_ID, a.ORG_NAME,
IF((SELECT COUNT(c.ORG_ID_APP) FROM sa_workflow_org c WHERE c.WF_ID={$id} AND c.ORG_ID_APP=a.ORG_ID AND c.ACTIVE_FLAG = 1) = 0, 0,1) AS STATUS 
FROM sa_organizations a")->result();
        } else {
            return $this->db->query("SELECT CONCAT(a.ORG_ID,'_',$id) as ORG_IDD, a.ORG_ID,a.ORG_NAME,
IF((SELECT COUNT(c.ORG_ID_APP) FROM sa_workflow_org c WHERE c.WF_ID={$id} AND c.ORG_ID_APP=a.ORG_ID AND c.ACTIVE_FLAG = 1) = 0, 0,1) AS STATUS 
FROM sa_organizations a WHERE a.ORG_ID = {$this->user_session['SES_ORG_ID']} ")->result();
        }
    }
    public function checkAssignWorkWithStatus($o, $w) {
        $query = $this->db->get_where('sa_workflow_org', array('ORG_ID_APP' => $o, 'WF_ID' => $w, 'ACTIVE_FLAG' => 1));
        if ($query->num_rows() == 0) {
            return false;
        } else {
            return $query->row();
        }
    }
    public function checkAssignWork($o, $w) {
        $query = $this->db->get_where('sa_workflow_org', array('ORG_ID_APP' => $o, 'WF_ID' => $w));
        if ($query->num_rows() == 0) {
            return false;
        } else {
            return $query->row();
        }
    }
    public function getAllDesignationList($a, $b) {
        return $this->db->order_by('UD_SL_NO', 'ASC')->get_where('sa_workflow_level', array('WF_ID' => $b, 'WF_ORG_ID' => $a))->result();
    }
    public function deleteAllReadyExistsData($a, $b) {
        $this->db->trans_start();
        $this->db->delete('sa_workflow_level', array('WF_ID' => $b, 'WF_ORG_ID' => $a));
        $this->db->trans_complete();
        if ($this->db->trans_status() == TRUE) {
            return TRUE;
        } else {
            return FALSE;
        }
    }
    public function getAllReadyExistsData($a, $b, $c) {
        $query = $this->db->get_where('sa_workflow_level', array('WF_ID' => $b, 'WF_ORG_ID' => $a, 'DESIG_ID' => $c));
        if ($query->num_rows() == 0) {
            return false;
        } else {
            return $query->row();
        }
    }
    /*
     * Fahim Start
     */
    public function pendingSupplierListOfThisDesignationFirst($step,$wfId)
    {
      // $org_id=$this->user_session['SES_ORG_ID'];
       $org_id=$this->user_session['SES_ORG_ID'];
        return $this->db->query("SELECT ri.APPLICANT_ID,ri.COMPANY_NAME,CONCAT(APPLICANT_FNAME,' ',APPLICANT_MNAME,' ',APPLICANT_LNAME) as APPLICANT_EFNAME,ri.MOBILE_NO,ri.OFFICE_ADRESS,ri.NATIONAL_ID,ri.EMAIL_ADRESS FROM rg_applicant_info as ri
WHERE ri.APPLICANT_ID NOT IN (SELECT ra.APPLICANT_ID FROM rg_applicant_approval as ra WHERE WF_ID=$wfId) and ri.STEP_TLSL=$step ")->result();
    }
    public function pendingSupplierListAfterDgfi($step,$wfId)
    {
      // $org_id=$this->user_session['SES_ORG_ID'];
       $org_id=$this->user_session['SES_ORG_ID'];
        return $this->db->query("SELECT rdal.FINAL_APR_FLAG,ri.APPLICANT_ID,ri.COMPANY_NAME,CONCAT(APPLICANT_FNAME,' ',APPLICANT_MNAME,' ',APPLICANT_LNAME) as APPLICANT_EFNAME,ri.MOBILE_NO,ri.OFFICE_ADRESS,ri.NATIONAL_ID,ri.EMAIL_ADRESS FROM
rg_dgfi_approved_list as rdal LEFT JOIN rg_applicant_info as ri USING (APPLICANT_ID)
WHERE ri.STEP_TLSL=$step and ri.APPLICANT_ID NOT IN (SELECT ra.APPLICANT_ID FROM rg_applicant_approval as ra WHERE WF_ID=$wfId)")->result();
    }
    public function pendingSupplierListOfThisDesignationFirstDgfi($step,$wfId)
    {
      // $org_id=$this->user_session['SES_ORG_ID'];
       $org_id=$this->user_session['SES_ORG_ID'];
        return $this->db->query("SELECT ri.APPLICANT_ID,ri.COMPANY_NAME,CONCAT(APPLICANT_FNAME,' ',APPLICANT_MNAME,' ',APPLICANT_LNAME) as APPLICANT_EFNAME,ri.MOBILE_NO,ri.OFFICE_ADRESS,ri.NATIONAL_ID,ri.EMAIL_ADRESS FROM rg_applicant_info as ri
WHERE ri.APPLICANT_ID NOT IN (SELECT ra.APPLICANT_ID FROM rg_dgfi_approval as ra WHERE WF_ID=$wfId) and ri.STEP_TLSL=$step ")->result();
    }
    public function supplierStepsModel($wfId)
    {
       $org_id=$this->user_session['SES_ORG_ID'];
       return $this->db->query("SELECT DESIG_NAME,DESIG_ID,UD_SL_NO FROM sa_workflow_level LEFT JOIN sa_designation USING (DESIG_ID) WHERE sa_workflow_level.WF_ID=$wfId and sa_workflow_level.ORG_ID=$org_id ORDER BY UD_SL_NO ASC")->result();
    }
     public function currentUserProperty($wfId)
    {
      $org_id=$this->user_session['SES_ORG_ID'];
      $userId=$this->user_session['FLD_USER_ID'];
       return $this->db->query("SELECT swl.DESIG_ID, swl.LEVEL_ID, swl.UD_SL_NO, swl.WF_ID FROM sa_workflow_level AS swl LEFT JOIN sa_designation AS sd USING (DESIG_ID) LEFT JOIN sa_users AS se USING (DESIG_ID) LEFT JOIN sa_workflow_org AS swo
 ON swl.WF_ORG_ID=swo.WF_ORG_ID WHERE se.FLD_USER_ID=$userId AND swl.WF_ID=$wfId AND swo.ORG_ID_APP=$org_id")->row();
    }
    public function nextUserProperty($serial,$wfId)
    {
       $org_id=$this->user_session['SES_ORG_ID'];
        $user_id=$this->user_session['FLD_USER_ID'];
       return $this->db->query("SELECT DESIG_ID FROM sa_workflow_level WHERE WF_ID=$wfId and UD_SL_NO=$serial and ORG_ID=$org_id")->row();
    }
    public function prevUserProperty($serialNeg,$wfId)
    {
       $org_id=$this->user_session['SES_ORG_ID'];
       $emp_id=$this->user_session['FLD_USER_ID'];
       return $this->db->query("SELECT DESIG_ID FROM sa_workflow_level WHERE ORG_ID=$org_id and WF_ID=$wfId and UD_SL_NO=$serialNeg")->row();
    }
    public function maximumCount($applicantID)
    {
         return $this->db->query("SELECT max(COUNT_SL) as maxPriority FROM rg_applicant_approval WHERE APPLICANT_ID=$applicantID")->row();
    }
    public function maximumCountDgfi($applicantID)
    {
         return $this->db->query("SELECT max(COUNT_SL) as maxPriority FROM rg_dgfi_approval WHERE APPLICANT_ID=$applicantID")->row();
    }
    public function pendingSupplierListOfThisDesignation($wfId,$sendTo,$step)
    {
        return $this->db->query("SELECT ri.APPLICANT_ID,ri.COMPANY_NAME,CONCAT(APPLICANT_FNAME,' ',APPLICANT_MNAME,' ',APPLICANT_LNAME) as APPLICANT_EFNAME,ri.MOBILE_NO,ri.OFFICE_ADRESS,ri.NATIONAL_ID,ri.EMAIL_ADRESS FROM (SELECT s1.APPLICANT_ID, s1.APPROVAL_ID,s1.WF_ID,s1.SEND_TO, s1.COUNT_SL
FROM rg_applicant_approval s1
JOIN (
  SELECT APPLICANT_ID, MAX(COUNT_SL) AS priority
  FROM rg_applicant_approval
  GROUP BY APPLICANT_ID) AS s2
  ON s1.APPLICANT_ID = s2.APPLICANT_ID AND s1.COUNT_SL = s2.priority) as b
 LEFT JOIN rg_applicant_info as ri using (APPLICANT_ID) WHERE b.WF_ID=$wfId and ri.STEP_TLSL=$step and b.SEND_TO!=$sendTo")->result();
    }
    public function pendingSupplierListOfThisDesignationFinal($wfId,$sendTo,$step)
    {
        return $this->db->query("SELECT ri.APPLICANT_ID,ri.COMPANY_NAME,CONCAT(APPLICANT_FNAME,' ',APPLICANT_MNAME,' ',APPLICANT_LNAME) as APPLICANT_EFNAME,ri.MOBILE_NO,ri.OFFICE_ADRESS,ri.NATIONAL_ID,ri.EMAIL_ADRESS FROM (SELECT s1.APPLICANT_ID, s1.APPROVAL_ID,s1.WF_ID,s1.SEND_TO,s1.FINAL_FLAG , s1.COUNT_SL
FROM rg_applicant_approval s1
JOIN (
  SELECT APPLICANT_ID, MAX(COUNT_SL) AS priority
  FROM rg_applicant_approval
  GROUP BY APPLICANT_ID) AS s2
  ON s1.APPLICANT_ID = s2.APPLICANT_ID AND s1.COUNT_SL = s2.priority) as b
 LEFT JOIN rg_applicant_info as ri using (APPLICANT_ID)  WHERE b.FINAL_FLAG=2 and b.WF_ID=$wfId and ri.STEP_TLSL=$step and b.SEND_TO!=$sendTo")->result();
    }
    public function pendingSupplierListOfThisDesignationAfter($wfId,$sendTo,$step)
    {
        return $this->db->query("SELECT ri.APPLICANT_ID,ri.COMPANY_NAME,CONCAT(APPLICANT_FNAME,' ',APPLICANT_MNAME,' ',APPLICANT_LNAME) as APPLICANT_EFNAME,ri.MOBILE_NO,ri.OFFICE_ADRESS,ri.NATIONAL_ID,ri.EMAIL_ADRESS FROM (SELECT s1.APPLICANT_ID, s1.APPROVAL_ID,s1.WF_ID,s1.SEND_TO,s1.FINAL_FLAG, s1.COUNT_SL
FROM rg_applicant_approval s1
JOIN (
  SELECT APPLICANT_ID, MAX(COUNT_SL) AS priority
  FROM rg_applicant_approval
  GROUP BY APPLICANT_ID) AS s2
  ON s1.APPLICANT_ID = s2.APPLICANT_ID AND s1.COUNT_SL = s2.priority) as b
 LEFT JOIN rg_applicant_info as ri using (APPLICANT_ID) WHERE b.WF_ID=$wfId and b.FINAL_FLAG=1  and ri.STEP_TLSL=$step and b.SEND_TO=$sendTo")->result();
    }
    public function pendingApplicantListAfterDgfi($wfId,$sendTo,$step)
    {
        return $this->db->query("SELECT rdal.FINAL_APR_FLAG,ri.APPLICANT_ID,ri.COMPANY_NAME,CONCAT(APPLICANT_FNAME,' ',APPLICANT_MNAME,' ',APPLICANT_LNAME) as APPLICANT_EFNAME,ri.MOBILE_NO,ri.OFFICE_ADRESS,ri.NATIONAL_ID,ri.EMAIL_ADRESS FROM (SELECT s1.APPLICANT_ID, s1.APPROVAL_ID,s1.WF_ID,s1.SEND_TO,s1.FINAL_FLAG, s1.COUNT_SL
FROM rg_applicant_approval s1
JOIN (
  SELECT APPLICANT_ID, MAX(COUNT_SL) AS priority
  FROM rg_applicant_approval 
  GROUP BY APPLICANT_ID) AS s2
  ON s1.APPLICANT_ID = s2.APPLICANT_ID AND s1.COUNT_SL = s2.priority) as b
 LEFT JOIN rg_applicant_info as ri using (APPLICANT_ID) LEFT JOIN rg_dgfi_approved_list as rdal USING (APPLICANT_ID) WHERE b.WF_ID=$wfId and b.FINAL_FLAG=1  and ri.STEP_TLSL=$step and b.SEND_TO=$sendTo")->result();
    }
    public function pendingSupplierListOfThisDesignationDgfi($wfId,$sendTo,$step)
    {
        return $this->db->query("SELECT ri.APPLICANT_ID,ri.COMPANY_NAME,CONCAT(APPLICANT_FNAME,' ',APPLICANT_MNAME,' ',APPLICANT_LNAME) as APPLICANT_EFNAME,ri.MOBILE_NO,ri.OFFICE_ADRESS,ri.NATIONAL_ID,ri.EMAIL_ADRESS FROM (SELECT s1.APPLICANT_ID, s1.APPROVAL_ID,s1.WF_ID,s1.SEND_TO, s1.COUNT_SL
FROM rg_dgfi_approval s1
JOIN (
  SELECT APPLICANT_ID, MAX(COUNT_SL) AS priority
  FROM rg_dgfi_approval
  GROUP BY APPLICANT_ID) AS s2
  ON s1.APPLICANT_ID = s2.APPLICANT_ID AND s1.COUNT_SL = s2.priority) as b
 LEFT JOIN rg_applicant_info as ri using (APPLICANT_ID) WHERE b.WF_ID=$wfId and ri.STEP_TLSL=$step and b.SEND_TO!=$sendTo")->result();
    }
    public function pendingSupplierListOfThisDesignationDgfiAfter($wfId,$sendTo,$step)
    {
        return $this->db->query("SELECT ri.APPLICANT_ID,ri.COMPANY_NAME,CONCAT(APPLICANT_FNAME,' ',APPLICANT_MNAME,' ',APPLICANT_LNAME) as APPLICANT_EFNAME,ri.MOBILE_NO,ri.OFFICE_ADRESS,ri.NATIONAL_ID,ri.EMAIL_ADRESS FROM (SELECT s1.APPLICANT_ID, s1.APPROVAL_ID,s1.WF_ID,s1.SEND_TO, s1.COUNT_SL
FROM rg_dgfi_approval s1
JOIN (
  SELECT APPLICANT_ID, MAX(COUNT_SL) AS priority
  FROM rg_dgfi_approval
  GROUP BY APPLICANT_ID) AS s2
  ON s1.APPLICANT_ID = s2.APPLICANT_ID AND s1.COUNT_SL = s2.priority) as b
 LEFT JOIN rg_applicant_info as ri using (APPLICANT_ID) WHERE b.WF_ID=$wfId and ri.STEP_TLSL=$step and b.SEND_TO=$sendTo")->result();
    }
    public function supplierHistoryModel($applicantId,$wfId)
    {
        return $this->db->query("SELECT DESIG_FROM,c.DESIG_NAME,FULL_NAME,VC_FLAG,COMMENTS,date(CRE_DT) as CREATE_DATE,FLD_USER_ID
FROM
(SELECT APPROVAL_ID,VC_FLAG,FLD_USER_ID,COMMENTS,SEND_TO,m.DESIG_NAME as DESIG_FROM,DESIG_NAME,u.FULL_NAME from rg_applicant_approval
LEFT JOIN sa_designation as m USING (DESIG_ID) LEFT JOIN sa_users as u using (FLD_USER_ID) WHERE APPLICANT_ID=$applicantId
and WF_ID=$wfId) as b LEFT JOIN sa_designation as c ON b.SEND_TO = c.DESIG_ID ORDER BY APPROVAL_ID ASC")->result();
    }
    public function supplierHistoryModelDgfi($applicantId,$wfId)
    {
        return $this->db->query("SELECT DESIG_FROM,c.DESIG_NAME,FULL_NAME,VC_FLAG,COMMENTS,date(b.CRE_DT) as CREATE_DATE,FLD_USER_ID FROM
(SELECT APPROVAL_ID,VC_FLAG,dgfi.CRE_DT,FLD_USER_ID,COMMENTS,SEND_TO,m.DESIG_NAME as DESIG_FROM,DESIG_NAME,u.FULL_NAME from
rg_dgfi_approval as dgfi LEFT JOIN sa_designation as m USING (DESIG_ID) LEFT JOIN sa_users as u using (FLD_USER_ID)  WHERE APPLICANT_ID=$applicantId and WF_ID=$wfId) as b LEFT JOIN sa_designation as c ON b.SEND_TO = c.DESIG_ID ORDER BY APPROVAL_ID ASC")->result();
    }
    public function countDesignationId($DESIG_ID)
    {
         return $this->db->query("SELECT COUNT(SEND_TO) as TOTAL_COUNT from rg_applicant_approval WHERE SEND_TO=$DESIG_ID")->row();
    }
    public function myHistory($wfId,$finalFlag)
    {
        $userId=$this->user_session['FLD_USER_ID'];
          return $this->db->query("SELECT APPLICANT_ID,date(raa.CRE_DT) as CREATE_DATE,COMPANY_NAME,SEND_TO,VC_FLAG,COMMENTS,sd.DESIG_NAME as `TO` FROM rg_applicant_approval as raa
LEFT JOIN sa_designation sd ON raa.SEND_TO=sd.DESIG_ID
LEFT JOIN rg_applicant_info USING (APPLICANT_ID)
WHERE raa.CRE_BY=$userId AND WF_ID=$wfId AND FINAL_FLAG=$finalFlag ORDER BY raa.CRE_DT DESC")->result();
    }
     public function myHistoryDgfi($wfId)
    {
        $userId=$this->user_session['FLD_USER_ID'];
          return $this->db->query("SELECT APPLICANT_ID,date(raa.CRE_DT) as CREATE_DATE,COMPANY_NAME,SEND_TO,VC_FLAG,COMMENTS,sd.DESIG_NAME as `TO` FROM rg_dgfi_approval as raa
LEFT JOIN sa_designation sd ON raa.SEND_TO=sd.DESIG_ID
LEFT JOIN rg_applicant_info USING (APPLICANT_ID)
WHERE raa.CRE_BY=$userId AND WF_ID=$wfId ORDER BY raa.CRE_DT DESC")->result();
    }
    public function myOfDgfiClearence($wfId)
    {

          return $this->db->query("SELECT APPLICANT_ID,date(raa.CRE_DT) as CREATE_DATE,COMPANY_NAME,SEND_TO,VC_FLAG,COMMENTS,sd.DESIG_NAME as `TO` FROM rg_applicant_approval as raa
LEFT JOIN sa_designation sd ON raa.SEND_TO=sd.DESIG_ID
LEFT JOIN rg_applicant_info USING (APPLICANT_ID)
WHERE   WF_ID=$wfId ORDER BY raa.CRE_DT DESC")->result();
    }
    public function applicantProperty($appId)
    {
        return $this->db->query("SELECT APPLICANT_ID,CONCAT(APPLICANT_FNAME,' ',APPLICANT_MNAME,' ',APPLICANT_LNAME) as APPLICANT_FULL_NAME,EMAIL_ADRESS,COMPANY_NAME,BUSINESS_TYPE,COMPANY_TYPE,MOBILE_NO FROM rg_applicant_info WHERE APPLICANT_ID=$appId")->row();
    }
    public function dgfiPendingList($step)
    {
        return $this->db->query("SELECT ri.APPLICANT_ID,ri.COMPANY_NAME,CONCAT(APPLICANT_FNAME,' ',APPLICANT_MNAME,' ',APPLICANT_LNAME) as APPLICANT_FULL_NAME,ri.MOBILE_NO,ri.OFFICE_ADRESS,ri.NATIONAL_ID,ri.EMAIL_ADRESS
            FROM rg_applicant_info as ri where ri.STEP_TLSL=$step")->result();
    }
    public function dgfiApprovedList()
    {
        return $this->db->query("SELECT ri.APPLICANT_ID,ri.COMPANY_NAME,CONCAT(APPLICANT_FNAME,' ',APPLICANT_MNAME,' ',APPLICANT_LNAME) as APPLICANT_FULL_NAME,ri.MOBILE_NO,ri.OFFICE_ADRESS,ri.NATIONAL_ID,ri.EMAIL_ADRESS
            FROM rg_applicant_info as ri where ri.STEP_TLSL=6 and DGFI_FLAG='A'")->result();
    }
    public function dgfiCancelledList()
    {
        return $this->db->query("SELECT ri.APPLICANT_ID,ri.COMPANY_NAME,CONCAT(APPLICANT_FNAME,' ',APPLICANT_MNAME,' ',APPLICANT_LNAME) as APPLICANT_FULL_NAME,ri.MOBILE_NO,ri.OFFICE_ADRESS,ri.NATIONAL_ID,ri.EMAIL_ADRESS
            FROM rg_applicant_info as ri where ri.STEP_TLSL=6 and DGFI_FLAG='C'")->result();
    }
    /*
    public function afterDgfiClearenceModel($wfId)
    {
   return $this->db->query("SELECT rda.APPROVED_ID,ri.APPLICANT_ID,ri.NATIONAL_ID,ri.COMPANY_NAME,ri.MOBILE_NO,ri.EMAIL_ADRESS,se.FULL_NAME,rda.SEND_TO_DGDP,rda.FINAL_APR_FLAG,SEND_DT,rda.SEND_LTR_NO,COMMENTS
       FROM rg_dgfi_approved_list as rda
LEFT JOIN rg_applicant_info as ri USING(APPLICANT_ID)
LEFT JOIN sa_users as su ON su.FLD_USER_ID = rda.SEND_BY
LEFT JOIN sa_emp as se USING (EMP_ID) WHERE ri.APPLICANT_ID NOT IN (SELECT APPLICANT_ID FROM rg_applicant_interview ) and ri.STEP_TLSL=5")->result();
    }
     * 
     */
    public function applicantListByStep($step)
    {
        return $this->db->query("SELECT APPLICANT_ID,MOBILE_NO,EMAIL_ADRESS,COMPANY_NAME, CONCAT(APPLICANT_FNAME,' ',APPLICANT_MNAME,' ',APPLICANT_LNAME) as APPLICANT_FULL_NAME,NATIONAL_ID
FROM rg_applicant_info WHERE STEP_TLSL=$step")->result();
    }
    public function applicantListByStepInAndNotIn($step,$inOrNotIN,$tableName)
    {
        return $this->db->query("SELECT APPLICANT_ID,MOBILE_NO,EMAIL_ADRESS,COMPANY_NAME, CONCAT(APPLICANT_FNAME,' ',APPLICANT_MNAME,' ',APPLICANT_LNAME) as APPLICANT_FULL_NAME,NATIONAL_ID
FROM rg_applicant_info WHERE STEP_TLSL=$step AND APPLICANT_ID $inOrNotIN (SELECT APPLICANT_ID FROM $tableName)")->result();
    }
     public function applicantCurrentStatus($applicantId, $wfId, $step)
    {
        return $this->db->query("SELECT ri.APPLICANT_ID,ri.COMPANY_NAME,SEND_TO,UD_SL_NO
FROM (SELECT s1.APPLICANT_ID, s1.APPROVAL_ID,s1.WF_ID,s1.SEND_TO,s1.UD_SL_NO, s1.COUNT_SL
FROM rg_applicant_approval s1
JOIN (
  SELECT APPLICANT_ID, MAX(COUNT_SL) AS priority
  FROM rg_applicant_approval
  GROUP BY APPLICANT_ID) AS s2
  ON s1.APPLICANT_ID = s2.APPLICANT_ID AND s1.COUNT_SL = s2.priority) as b
 LEFT JOIN rg_applicant_info as ri using (APPLICANT_ID) WHERE b.WF_ID=$wfId and  APPLICANT_ID=$applicantId")->row();
    }
     public function applicantCurrentStatusDgfi($applicantId, $wfId, $step)
    {
        return $this->db->query("SELECT ri.APPLICANT_ID,ri.COMPANY_NAME,SEND_TO,UD_SL_NO
FROM (SELECT s1.APPLICANT_ID, s1.APPROVAL_ID,s1.WF_ID,s1.SEND_TO,s1.UD_SL_NO, s1.COUNT_SL
FROM rg_dgfi_approval s1
JOIN (
  SELECT APPLICANT_ID, MAX(COUNT_SL) AS priority
  FROM rg_dgfi_approval
  GROUP BY APPLICANT_ID) AS s2
  ON s1.APPLICANT_ID = s2.APPLICANT_ID AND s1.COUNT_SL = s2.priority) as b
 LEFT JOIN rg_applicant_info as ri using (APPLICANT_ID) WHERE b.WF_ID=$wfId and ri.STEP_TLSL=$step and APPLICANT_ID=$applicantId")->row();
    }
    public function dgfiFinalStageApplicantList()
    {
        return $this->db->query("SELECT ri.APPLICANT_ID,rda.VC_FLAG,ri.COMPANY_NAME,CONCAT(APPLICANT_FNAME,' ',APPLICANT_MNAME,' ',APPLICANT_LNAME) as
APPLICANT_EFNAME,ri.MOBILE_NO,ri.OFFICE_ADRESS,ri.NATIONAL_ID,ri.EMAIL_ADRESS FROM rg_dgfi_approval as rda
LEFT JOIN rg_applicant_info as ri USING(APPLICANT_ID)
WHERE ri.APPLICANT_ID NOT IN (SELECT APPLICANT_ID FROM rg_dgfi_approved_list ) and rda.SEND_TO=0 AND rda.UD_SL_NO=100")->result();
    }
    public function dgfiSentToDgdpApplicantList()
    {
        return $this->db->query("SELECT ri.APPLICANT_ID,ri.NATIONAL_ID,ri.COMPANY_NAME,ri.MOBILE_NO,ri.EMAIL_ADRESS,se.FULL_NAME,rda.FINAL_APR_FLAG,SEND_DT,rda.SEND_LTR_NO  FROM rg_dgfi_approved_list as rda
LEFT JOIN rg_applicant_info as ri USING(APPLICANT_ID)
LEFT JOIN sa_users as su ON su.FLD_USER_ID = rda.SEND_BY
LEFT JOIN sa_emp as se USING (EMP_ID)")->result();
    }
    public function applicantInterviewer($Stat)
    {
        return $this->db->query("SELECT INTERVIEW_ID,COMMENTS,INTRV_STATUS,APPLICANT_ID,MOBILE_NO,EMAIL_ADRESS,COMPANY_NAME,ATTEND_DATE, CONCAT(INTRV_DATE,'-',INTRV_TIME) as INTRV_DT_TIME,ATTEND_FLAG, CONCAT(APPLICANT_FNAME,' ',APPLICANT_MNAME,' ',APPLICANT_LNAME) as APPLICANT_FULL_NAME,NATIONAL_ID
FROM rg_applicant_interview LEFT JOIN rg_applicant_info USING(APPLICANT_ID) WHERE ATTEND_FLAG='$Stat'")->result();
    }
    public function interViewAttendedStatus($appId)
    {
        return $this->db->query("SELECT COUNT(APPLICANT_ID) as INTRV_STAT FROM rg_applicant_interview WHERE APPLICANT_ID=$appId")->row();
    }
    public function documentsByApplicant($appId)
    {
        return $this->db->query("SELECT APP_LORC_ID,LOOKUP_DATA_ID,APPLICANT_ID,LOOKUP_DATA_NAME,ISSUE_AUTHORITY,DTOF_FISSUE,DTOF_LRENEWAL,DTOF_EXPIRE,LICENSE_CATEGORY,CRE_DT FROM rg_license_certificate as rlc
LEFT JOIN sav_license_types as slt  ON rlc.LICENSE_TYPE=slt.CHAR_LOOKUP WHERE rlc.APPLICANT_ID=$appId")->result();
    }
    public function attachmentByApplicant($appId)
    {
        return $this->db->query("SELECT ATTACHMENT_TYPE,ATTACHMENT_ID,APPLICANT_ID,date(CRE_DT) as SUB_DATE FROM rg_attachment_info
            LEFT JOIN sav_attachment_types USING (ATTACHMENT_TYPE_ID) WHERE APPLICANT_ID=$appId")->result();
    }
     public function requestedAttachmentByApplicant($appId)
    {
        return $this->db->query("SELECT rrd.REQ_DOC_ID,sat.ATTACHMENT_TYPE,rrd.APP_LORC_ID,rrd.REQ_DOC_ID,rrd.APPLICANT_ID,rrd.REQ_STATUS,date(rrd.CRE_DT) as CRE_DT
            FROM rg_request_documents as rrd
LEFT JOIN rg_attachment_info as rai USING (ATTACHMENT_ID) LEFT JOIN sav_attachment_types as sat USING (ATTACHMENT_TYPE_ID)
LEFT JOIN rg_applicant_info as ri ON rrd.APPLICANT_ID=ri.APPLICANT_ID
WHERE rrd.APPLICANT_ID=$appId and ATTACHMENT_ID>0 and ri.STEP_TLSL=11")->result();
    }
    public function requestedDocumentsByApplicant($appId)
    {
        {
        return $this->db->query("SELECT rrd.REQ_DOC_ID,LOOKUP_DATA_NAME,rrd.APP_LORC_ID,APP_LORC_ID,rrd.REQ_DOC_ID,rrd.APPLICANT_ID,rrd.REQ_STATUS,date(rrd.CRE_DT) as CRE_DT
 FROM rg_request_documents as rrd LEFT JOIN rg_license_certificate as rlc USING (APP_LORC_ID) LEFT JOIN sav_license_types as slt
 ON rlc.LICENSE_TYPE=slt.CHAR_LOOKUP
LEFT JOIN rg_applicant_info as rai ON rrd.APPLICANT_ID=rai.APPLICANT_ID
  WHERE rlc.APPLICANT_ID=$appId and rai.STEP_TLSL=11")->result();
    }

    }
    public function findFirstFirstDesignation($wfId)
    {
         return $this->db->query("SELECT DESIG_ID FROM sa_workflow_level  WHERE WF_ID=$wfId and UD_SL_NO=1")->row();
    }
    public function finalTakeInitiative($wfId,$sendTo,$step)
    {
        return $this->db->query("SELECT ri.APPLICANT_ID,ri.COMPANY_NAME,CONCAT(APPLICANT_FNAME,' ',APPLICANT_MNAME,' ',APPLICANT_LNAME) as APPLICANT_EFNAME,ri.MOBILE_NO,ri.OFFICE_ADRESS,ri.NATIONAL_ID,ri.EMAIL_ADRESS FROM (SELECT s1.APPLICANT_ID, s1.APPROVAL_ID,s1.WF_ID,s1.SEND_TO,s1.FINAL_FLAG, s1.COUNT_SL
FROM rg_applicant_approval s1
JOIN (
  SELECT APPLICANT_ID, MAX(COUNT_SL) AS priority
  FROM rg_applicant_approval
  GROUP BY APPLICANT_ID) AS s2
  ON s1.APPLICANT_ID = s2.APPLICANT_ID AND s1.COUNT_SL = s2.priority) as b
 LEFT JOIN rg_applicant_info as ri using (APPLICANT_ID) WHERE  ri.STEP_TLSL=$step and b.FINAL_FLAG=2 and b.SEND_TO=$sendTo")->result();
    }
    public function finalTakeInitiativeAfterDgfi($wfId,$sendTo,$step)
    {
        return $this->db->query("SELECT rdal.FINAL_APR_FLAG,ri.APPLICANT_ID,ri.COMPANY_NAME,CONCAT(APPLICANT_FNAME,' ',APPLICANT_MNAME,' ',APPLICANT_LNAME) as APPLICANT_EFNAME,ri.MOBILE_NO,ri.OFFICE_ADRESS,ri.NATIONAL_ID,ri.EMAIL_ADRESS FROM (SELECT s1.APPLICANT_ID, s1.APPROVAL_ID,s1.WF_ID,s1.SEND_TO,s1.FINAL_FLAG, s1.COUNT_SL
FROM rg_applicant_approval s1
JOIN (
  SELECT APPLICANT_ID, MAX(COUNT_SL) AS priority
  FROM rg_applicant_approval
  GROUP BY APPLICANT_ID) AS s2
  ON s1.APPLICANT_ID = s2.APPLICANT_ID AND s1.COUNT_SL = s2.priority) as b
 LEFT JOIN rg_applicant_info as ri using (APPLICANT_ID) LEFT JOIN rg_dgfi_approved_list as rdal USING (APPLICANT_ID) WHERE  ri.STEP_TLSL=$step and b.FINAL_FLAG=2 and b.SEND_TO=$sendTo")->result();
    }
    public function applicantRegistrationLetter($applicantId)
    {
         return $this->db->query("SELECT RG_LETTER_ID,TEMPL_BODY,SEND_EMAIL,date(rarl.CRE_DT) as SEND_DT,TEMPL_SUB,FULL_NAME FROM
 rg_applicant_reg_letter as rarl LEFT JOIN sa_users as su ON su.FLD_USER_ID=rarl.SEND_BY  WHERE APPLICANT_ID=$applicantId")->row();
    }




    /*
     * Fahim End
     */

}

