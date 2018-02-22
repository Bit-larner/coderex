<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class changeOwner_model extends CI_Model
{

    public function __construct()
    {
        parent::__construct();
        $n                  = $this->user_session = $this->session->userdata('logged_in');
    }
    public function applicantCurrentStatusDgfi($supplierId, $wfId, $step)
    {
        return $this->db->query("SELECT ri.APPLICANT_ID,ri.SUPPLIER_NAME,SEND_TO,UD_SL_NO FROM (SELECT s1.SUPPLIER_ID, s1.OW_CHNGE_ID,s1.WF_ID,s1.SEND_TO,s1.UD_SL_NO, s1.COUNT_SL
FROM pr_dgfi_supplier_owner_change s1 JOIN ( SELECT SUPPLIER_ID, MAX(COUNT_SL) AS priority FROM pr_dgfi_supplier_owner_change
GROUP BY SUPPLIER_ID) AS s2
ON s1.SUPPLIER_ID = s2.SUPPLIER_ID AND s1.COUNT_SL = s2.priority)
as b LEFT JOIN pr_supplier as ri using (SUPPLIER_ID) WHERE b.WF_ID=$wfId and ri.STEP_TLSL=$step and SUPPLIER_ID=$supplierId")->row();
    }
    public function maximumCountDgfi($supplierId)
    {
         return $this->db->query("SELECT max(COUNT_SL) as maxPriority FROM pr_dgfi_supplier_owner_change WHERE SUPPLIER_ID=$supplierId")->row();
    }

    public function currentUserProperty($wfId)
    {


        $org_id = $this->user_session['SES_ORG_ID'];
        $user_id = $this->user_session['FLD_USER_ID'];
        return $this->db->query("SELECT swl.DESIG_ID, swl.LEVEL_ID, swl.UD_SL_NO, swl.WF_ID FROM sa_workflow_level AS swl
LEFT JOIN sa_designation AS sd USING (DESIG_ID) LEFT JOIN sa_users AS se USING (DESIG_ID)
LEFT JOIN sa_workflow_org AS swo ON swl.WF_ORG_ID=swo.WF_ORG_ID WHERE se.FLD_USER_ID=$user_id AND swl.WF_ID=$wfId AND swo.ORG_ID_APP=$org_id")->row();
    }

    public function myHistory($wfId,$finalFlag)
    {
        $userId = $this->user_session['FLD_USER_ID'];
        return $this->db->query("SELECT APPLICANT_ID,ps.SUPPLIER_ID,date(psoc.CRE_DT) as CREATE_DATE,COMPANY_NAME,SEND_TO,VC_FLAG,COMMENTS,sd.DESIG_NAME as `TO`  FROM  pr_supplier_owner_change
as psoc LEFT JOIN sa_designation sd ON psoc.SEND_TO=sd.DESIG_ID LEFT JOIN pr_supplier as ps ON psoc.SUPPLIER_ID=ps.SUPPLIER_ID LEFT JOIN rg_applicant_info
USING (APPLICANT_ID) WHERE psoc.CRE_BY=$userId and psoc.FINAL_FLAG=$finalFlag  and psoc.WF_ID=$wfId and ps.SUPPLIER_FLAG=1 ORDER BY psoc.CRE_DT DESC")->result();
    }
    public function countDesignationId($DESIG_ID)
    {
         return $this->db->query("SELECT COUNT(SEND_TO) as TOTAL_COUNT from pr_supplier_owner_change WHERE SEND_TO=$DESIG_ID")->row();
    }
     public function pendingSupplierListOfThisDesignationFirst($step,$wfId,$columnName,$finalFlag)
    {
      // $org_id=$this->user_session['SES_ORG_ID'];
       $org_id=$this->user_session['SES_ORG_ID'];
        return $this->db->query("SELECT ps.SUPPLIER_ID,ri.APPLICANT_ID,ri.COMPANY_NAME,CONCAT(APPLICANT_FNAME,' ',APPLICANT_MNAME,' ',APPLICANT_LNAME) as APPLICANT_EFNAME,ri.MOBILE_NO,ri.OFFICE_ADRESS,ri.NATIONAL_ID,ri.EMAIL_ADRESS
FROM pr_supplier as ps  LEFT JOIN rg_applicant_info as ri USING (APPLICANT_ID)
WHERE ps.SUPPLIER_ID NOT IN (SELECT ra.SUPPLIER_ID FROM pr_supplier_owner_change as ra WHERE WF_ID=$wfId) and ps.$columnName=$step and ps.SUPPLIER_FLAG=1;")->result();
    }
    public function maximumCount($supplierId)
    {
         return $this->db->query("SELECT max(COUNT_SL) as maxPriority FROM pr_supplier_owner_change WHERE SUPPLIER_ID=$supplierId")->row();
    }
     public function dgfiFinalStageApplicantList()
    {
        return $this->db->query("SELECT sp.SUPPLIER_ID,ri.APPLICANT_ID,rda.VC_FLAG,ri.COMPANY_NAME,CONCAT(APPLICANT_FNAME,' ',APPLICANT_MNAME,' ',APPLICANT_LNAME)
as APPLICANT_EFNAME,ri.MOBILE_NO,ri.OFFICE_ADRESS,ri.NATIONAL_ID,ri.EMAIL_ADRESS FROM pr_dgfi_supplier_owner_change as rda
LEFT JOIN pr_supplier as sp using (SUPPLIER_ID) LEFT JOIN rg_applicant_info as ri USING(APPLICANT_ID) WHERE sp.SUPPLIER_ID
NOT IN (SELECT SUPPLIER_ID FROM pr_ow_chnge_dgfi_list ) and rda.SEND_TO=0 AND rda.UD_SL_NO=100")->result();
    }
     public function pendingSupplierListAfterDgfi($step,$wfId)
    {
      // $org_id=$this->user_session['SES_ORG_ID'];
       $org_id=$this->user_session['SES_ORG_ID'];
        return $this->db->query("SELECT ps.SUPPLIER_ID,rdal.FINAL_APR_FLAG,ri.APPLICANT_ID,ri.COMPANY_NAME,CONCAT(APPLICANT_FNAME,' ',APPLICANT_MNAME,' ',APPLICANT_LNAME) as
APPLICANT_EFNAME,ri.MOBILE_NO,ri.OFFICE_ADRESS,ri.NATIONAL_ID,ri.EMAIL_ADRESS FROM pr_ow_chnge_dgfi_list as rdal LEFT JOIN
pr_supplier as ps USING (SUPPLIER_ID) LEFT JOIN rg_applicant_info as ri
USING (APPLICANT_ID) WHERE ps.STEP_TLSL=$step and ps.SUPPLIER_ID NOT IN (SELECT ra.SUPPLIER_ID FROM pr_supplier_owner_change as ra
WHERE WF_ID=$wfId)")->result();
    }
    public function pendingApplicantListAfterDgfi($wfId,$sendTo,$step,$finalFlag,$orNot)
    {
        return $this->db->query("SELECT rdal.FINAL_APR_FLAG,ps.SUPPLIER_ID,ri.APPLICANT_ID,ri.COMPANY_NAME,CONCAT(APPLICANT_FNAME,' ',APPLICANT_MNAME,' ',
APPLICANT_LNAME) as APPLICANT_EFNAME,ri.MOBILE_NO,ri.OFFICE_ADRESS,ri.NATIONAL_ID,ri.EMAIL_ADRESS FROM
(SELECT s1.SUPPLIER_ID, s1.OW_CHNGE_ID,s1.WF_ID,s1.SEND_TO,s1.FINAL_FLAG, s1.COUNT_SL FROM
pr_supplier_owner_change s1 JOIN ( SELECT org.SUPPLIER_ID, MAX(COUNT_SL) AS priority FROM pr_supplier_owner_change as org
GROUP BY SUPPLIER_ID) AS s2 ON s1.SUPPLIER_ID = s2.SUPPLIER_ID AND s1.COUNT_SL = s2.priority) as b
LEFT JOIN pr_supplier as ps USING (SUPPLIER_ID) LEFT JOIN rg_applicant_info as ri USING (APPLICANT_ID)
LEFT JOIN pr_ow_chnge_dgfi_list as rdal ON rdal.SUPPLIER_ID=ps.SUPPLIER_ID
WHERE b.WF_ID=$wfId and b.FINAL_FLAG=$finalFlag and ps.STEP_TLSL=$step and b.SEND_TO $orNot $sendTo")->result();
    }
     public function dgfiSentToDgdpApplicantList()
    {
        return $this->db->query("SELECT sp.SUPPLIER_ID,ri.APPLICANT_ID,ri.NATIONAL_ID,ri.COMPANY_NAME,ri.MOBILE_NO,ri.EMAIL_ADRESS,se.FULL_NAME,rda.FINAL_APR_FLAG,SEND_DT,rda.SEND_LTR_NO
FROM pr_ow_chnge_dgfi_list as rda LEFT JOIN pr_supplier as sp USING (SUPPLIER_ID) LEFT JOIN rg_applicant_info as ri USING(APPLICANT_ID) LEFT JOIN sa_users as su
ON su.FLD_USER_ID = rda.SEND_BY LEFT JOIN sa_emp as se USING (EMP_ID)")->result();
    }






     public function applicantCurrentStatus($supplierId, $wfId, $step)
    {
        return $this->db->query("SELECT ps.SUPPLIER_ID,ri.APPLICANT_ID,ri.COMPANY_NAME,SEND_TO,UD_SL_NO
FROM (SELECT s1.SUPPLIER_ID, s1.OW_CHNGE_ID,s1.WF_ID,s1.SEND_TO,s1.UD_SL_NO, s1.COUNT_SL
FROM pr_supplier_owner_change s1
JOIN (
  SELECT SUPPLIER_ID, MAX(COUNT_SL) AS priority
  FROM pr_supplier_owner_change
  GROUP BY SUPPLIER_ID) AS s2
  ON s1.SUPPLIER_ID = s2.SUPPLIER_ID AND s1.COUNT_SL = s2.priority) as b
 LEFT JOIN pr_supplier as ps USING (SUPPLIER_ID) LEFT JOIN rg_applicant_info  as ri using (APPLICANT_ID) WHERE b.WF_ID=$wfId and  ps.SUPPLIER_ID=$supplierId")->row();
    }
    public function supplierStepsModel($wfId)
    {
       $org_id=$this->user_session['SES_ORG_ID'];
       return $this->db->query("SELECT DESIG_NAME,DESIG_ID,UD_SL_NO FROM sa_workflow_level LEFT JOIN sa_designation USING (DESIG_ID) WHERE sa_workflow_level.WF_ID=$wfId and sa_workflow_level.ORG_ID=$org_id ORDER BY UD_SL_NO ASC")->result();
    }
     public function supplierProperty($suppId)
    {
        return $this->db->query("SELECT APPLICANT_ID,ps.SUPPLIER_ID,CONCAT(APPLICANT_FNAME,' ',APPLICANT_MNAME,' ',APPLICANT_LNAME) as APPLICANT_FULL_NAME,rai.EMAIL_ADRESS
FROM pr_supplier as ps LEFT JOIN rg_applicant_info as rai  USING (APPLICANT_ID) WHERE ps.SUPPLIER_ID=$suppId")->row();
    }
    public function supplierHistoryModel($suppId,$wfId)
    {
        return $this->db->query("

            SELECT DESIG_FROM,c.DESIG_NAME,FULL_NAME,VC_FLAG,COMMENTS,date(CRE_DT) as CREATE_DATE,FLD_USER_ID
FROM (SELECT OW_CHNGE_ID,VC_FLAG,FLD_USER_ID,COMMENTS,SEND_TO,m.DESIG_NAME as DESIG_FROM,DESIG_NAME,u.FULL_NAME from pr_supplier_owner_change as psoc
LEFT JOIN sa_designation as m USING (DESIG_ID) LEFT JOIN sa_users as u using (FLD_USER_ID) WHERE psoc.SUPPLIER_ID=$suppId
and WF_ID=$wfId) as b
LEFT JOIN sa_designation as c ON b.SEND_TO = c.DESIG_ID ORDER BY OW_CHNGE_ID ASC")->result();

}
    public function nextUserProperty($serial,$wfId)
    {
       $org_id=$this->user_session['SES_ORG_ID'];
      $emp_id=$this->user_session['FLD_USER_ID'];
       return $this->db->query("SELECT DESIG_ID FROM sa_workflow_level WHERE WF_ID=$wfId and UD_SL_NO=$serial and ORG_ID=$org_id")->row();
    }
    public function prevUserProperty($serialNeg,$wfId)
    {
       $org_id=$this->user_session['SES_ORG_ID'];
       $emp_id=$this->user_session['FLD_USER_ID'];
       return $this->db->query("SELECT DESIG_ID FROM sa_workflow_level WHERE ORG_ID=$org_id and WF_ID=$wfId and UD_SL_NO=$serialNeg")->row();
    }
    public function applicantName($suppId)
    {
        return $this->db->query("SELECT CONCAT(APPLICANT_FNAME,' ',APPLICANT_MNAME,' ',APPLICANT_LNAME) as
APPLICANT_EFNAME,ri.EMAIL_ADRESS FROM pr_supplier as ps left join rg_applicant_info as ri USING(APPLICANT_ID) WHERE ps.SUPPLIER_ID=$suppId")->row();
    }
 public function applicantRegistrationLetter($supplierId)
    {
         return $this->db->query("SELECT PR_LETTER_ID,TEMPL_BODY,SEND_EMAIL,date(rarl.CRE_DT) as SEND_DT,TEMPL_SUB,FULL_NAME FROM pr_applicant_pr_letter as rarl
LEFT JOIN sa_users as su ON su.FLD_USER_ID=rarl.SEND_BY LEFT JOIN sa_emp USING(EMP_ID) WHERE rarl.SUPPLIER_ID=$supplierId")->row();
    }













    public function pendingSupplierListOfThisDesignationAfter($wfId,$sendTo,$step,$columnName,$finalFlag)
    {
        return $this->db->query("SELECT ps.SUPPLIER_ID,ri.APPLICANT_ID,ri.COMPANY_NAME,b.FINAL_FLAG,b.SEND_TO,b.WF_ID,CONCAT(APPLICANT_FNAME,' ',APPLICANT_MNAME,' ',APPLICANT_LNAME) as
APPLICANT_EFNAME,ri.MOBILE_NO,ri.OFFICE_ADRESS,ri.NATIONAL_ID,ri.EMAIL_ADRESS
FROM (SELECT s1.SUPPLIER_ID, s1.OW_CHNGE_ID,s1.WF_ID,s1.SEND_TO,s1.FINAL_FLAG, s1.COUNT_SL FROM pr_supplier_owner_change as s1
JOIN ( SELECT SUPPLIER_ID, MAX(COUNT_SL) AS priority FROM pr_supplier_owner_change GROUP BY SUPPLIER_ID) AS s2
ON s1.SUPPLIER_ID = s2.SUPPLIER_ID AND s1.COUNT_SL = s2.priority) as b LEFT JOIN pr_supplier as ps USING (SUPPLIER_ID)
LEFT JOIN rg_applicant_info as ri using (APPLICANT_ID) WHERE b.WF_ID=$wfId and ps.$columnName=$step and b.SEND_TO=$sendTo and b.FINAL_FLAG=$finalFlag")->result();
    }
    public function pendingSupplierLisFinalApp($wfId,$sendTo,$step,$columnName,$finalFlag)
    {
        return $this->db->query("SELECT ps.SUPPLIER_ID,ri.APPLICANT_ID,ri.COMPANY_NAME,b.FINAL_FLAG,b.SEND_TO,b.WF_ID,CONCAT(APPLICANT_FNAME,' ',APPLICANT_MNAME,' ',APPLICANT_LNAME) as
APPLICANT_EFNAME,ri.MOBILE_NO,ri.OFFICE_ADRESS,ri.NATIONAL_ID,ri.EMAIL_ADRESS
FROM (SELECT s1.SUPPLIER_ID, s1.OW_CHNGE_ID,s1.WF_ID,s1.SEND_TO,s1.FINAL_FLAG, s1.COUNT_SL FROM pr_supplier_owner_change as s1
JOIN ( SELECT SUPPLIER_ID, MAX(COUNT_SL) AS priority FROM pr_supplier_owner_change GROUP BY SUPPLIER_ID) AS s2
ON s1.SUPPLIER_ID = s2.SUPPLIER_ID AND s1.COUNT_SL = s2.priority) as b LEFT JOIN pr_supplier as ps USING (SUPPLIER_ID)
LEFT JOIN rg_applicant_info as ri using (APPLICANT_ID) WHERE ps.$columnName=$step and b.SEND_TO=$sendTo and b.FINAL_FLAG=$finalFlag")->result();
    }
    public function pendingSupplierListOfThisDesignation($wfId,$sendTo,$step,$columnName,$finalFlag)
    {
        return $this->db->query("SELECT ps.SUPPLIER_ID,ri.APPLICANT_ID,ri.COMPANY_NAME,b.SEND_TO,b.FINAL_FLAG,b.WF_ID,CONCAT(APPLICANT_FNAME,' ',APPLICANT_MNAME,' ',APPLICANT_LNAME) as
APPLICANT_EFNAME,ri.MOBILE_NO,ri.OFFICE_ADRESS,ri.NATIONAL_ID,ri.EMAIL_ADRESS
FROM (SELECT s1.SUPPLIER_ID, s1.OW_CHNGE_ID,s1.WF_ID,s1.SEND_TO,s1.FINAL_FLAG, s1.COUNT_SL FROM pr_supplier_owner_change as s1
JOIN ( SELECT SUPPLIER_ID, MAX(COUNT_SL) AS priority FROM pr_supplier_owner_change GROUP BY SUPPLIER_ID) AS s2
ON s1.SUPPLIER_ID = s2.SUPPLIER_ID AND s1.COUNT_SL = s2.priority) as b LEFT JOIN pr_supplier as ps USING (SUPPLIER_ID)
LEFT JOIN rg_applicant_info as ri using (APPLICANT_ID) WHERE b.WF_ID=$wfId and ps.$columnName=$step and FINAL_FLAG=$finalFlag and b.SEND_TO!=$sendTo")->result();
    }
    public function pendingSupplierListOfThisDesignationFirstDgfi($step,$wfId)
    {
      // $org_id=$this->user_session['SES_ORG_ID'];
       $org_id=$this->user_session['SES_ORG_ID'];
        return $this->db->query("SELECT ps.SUPPLIER_ID,ri.APPLICANT_ID,ri.COMPANY_NAME,CONCAT(APPLICANT_FNAME,' ',APPLICANT_MNAME,' ',APPLICANT_LNAME)
as APPLICANT_EFNAME,ri.MOBILE_NO,ri.OFFICE_ADRESS,ri.NATIONAL_ID,ri.EMAIL_ADRESS
FROM pr_supplier as ps  LEFT JOIN rg_applicant_info as ri USING (APPLICANT_ID)
WHERE ps.SUPPLIER_ID NOT IN (SELECT ra.SUPPLIER_ID FROM pr_dgfi_supplier_owner_change as ra
WHERE WF_ID=$wfId) and ps.STEP_TLSL=$step and ps.SUPPLIER_FLAG=1")->result();
    }
    public function pendingSupplierListOfThisDesignationDgfi($wfId,$sendTo,$step)
    {
        return $this->db->query("SELECT ps.SUPPLIER_ID,b.SEND_TO,ri.APPLICANT_ID,ri.COMPANY_NAME,CONCAT(APPLICANT_FNAME,' ',APPLICANT_MNAME,' ',APPLICANT_LNAME)
as APPLICANT_EFNAME,ri.MOBILE_NO,ri.OFFICE_ADRESS,ri.NATIONAL_ID,ri.EMAIL_ADRESS FROM (SELECT s1.SUPPLIER_ID, s1.OW_CHNGE_ID,s1.WF_ID,s1.SEND_TO,
s1.COUNT_SL FROM pr_dgfi_supplier_owner_change s1 JOIN ( SELECT SUPPLIER_ID, MAX(COUNT_SL) AS priority,SEND_TO FROM pr_dgfi_supplier_owner_change
 GROUP BY SUPPLIER_ID) AS s2
ON s1.SUPPLIER_ID = s2.SUPPLIER_ID AND s1.COUNT_SL = s2.priority) as b
LEFT JOIN pr_supplier as ps USING (SUPPLIER_ID) LEFT JOIN rg_applicant_info as ri using (APPLICANT_ID)  WHERE b.WF_ID=$wfId and ps.STEP_TLSL=$step and b.SEND_TO!=$sendTo")->result();
    }
    public function pendingSupplierListOfThisDesignationDgfiAfter($wfId,$sendTo,$step)
    {
        return $this->db->query("SELECT ps.SUPPLIER_ID,b.SEND_TO,ri.APPLICANT_ID,ri.COMPANY_NAME,CONCAT(APPLICANT_FNAME,' ',APPLICANT_MNAME,' ',APPLICANT_LNAME)
as APPLICANT_EFNAME,ri.MOBILE_NO,ri.OFFICE_ADRESS,ri.NATIONAL_ID,ri.EMAIL_ADRESS FROM (SELECT s1.SUPPLIER_ID, s1.OW_CHNGE_ID,s1.WF_ID,s1.SEND_TO,
s1.COUNT_SL FROM pr_dgfi_supplier_owner_change s1 JOIN ( SELECT SUPPLIER_ID, MAX(COUNT_SL) AS priority,SEND_TO FROM pr_dgfi_supplier_owner_change
 GROUP BY SUPPLIER_ID) AS s2
ON s1.SUPPLIER_ID = s2.SUPPLIER_ID AND s1.COUNT_SL = s2.priority) as b
LEFT JOIN pr_supplier as ps USING (SUPPLIER_ID) LEFT JOIN rg_applicant_info as ri using (APPLICANT_ID)  WHERE b.WF_ID=$wfId and ps.STEP_TLSL=$step and b.SEND_TO=$sendTo")->result();
    }
     public function supplierHistoryModelDgfi($applicantId,$wfId)
    {
        return $this->db->query("SELECT DESIG_FROM,c.DESIG_NAME,FULL_NAME,VC_FLAG,COMMENTS,date(b.CRE_DT) as CREATE_DATE,FLD_USER_ID
FROM (SELECT OW_CHNGE_ID,VC_FLAG,dgfi.CRE_DT,FLD_USER_ID,COMMENTS,SEND_TO,m.DESIG_NAME as DESIG_FROM,DESIG_NAME,u.FULL_NAME
from pr_dgfi_supplier_owner_change as dgfi LEFT JOIN sa_designation as m USING (DESIG_ID) LEFT JOIN sa_users as u using (FLD_USER_ID) WHERE dgfi.SUPPLIER_ID=$applicantId and WF_ID=$wfId) as b LEFT JOIN sa_designation as c
ON b.SEND_TO = c.DESIG_ID ORDER BY OW_CHNGE_ID DESC")->result();
    }
    public function myHistoryDgfi($wfId)
    {
        $userId=$this->user_session['FLD_USER_ID'];
          return $this->db->query("SELECT APPLICANT_ID,date(raa.CRE_DT) as CREATE_DATE,COMPANY_NAME,SEND_TO,VC_FLAG,COMMENTS,sd.DESIG_NAME as `TO` FROM rg_dgfi_approval as raa
LEFT JOIN sa_designation sd ON raa.SEND_TO=sd.DESIG_ID
LEFT JOIN rg_applicant_info USING (APPLICANT_ID)
WHERE raa.CRE_BY=$userId AND WF_ID=$wfId ORDER BY raa.CRE_DT DESC")->result();
    }
}