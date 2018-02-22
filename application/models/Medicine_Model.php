<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Medicine_Model extends CI_Model
{

    public function __construct()
    {
        parent::__construct();
    }


    public function categorylist($data)


    {
        $this->db->insert('drg_medicine_cat', $data);
    }

    public function getTherapeutic()
    {
//        return $this->db->query("SELECT m.TH_GRP_ID, m.TH_GRP_NAME,  m.TH_GRP_DESC, m.CAT_ID,
//                    (SELECT CAT_NAME FROM drg_medicine_cat WHERE CAT_ID = m.CAT_ID)CAT_NAME,
//                     m.TH_GRP_DESC,  m.ACTIVE_STATUS
//                    FROM drg_therapeutic_group m;")->result();


        return $this->db->query("SELECT * FROM drg_medicine_cat dmc LEFT JOIN drg_therapeutic_group dtg ON dmc.CAT_ID=dtg.CAT_ID")->result();
    }

    public function getGeneric()
    {
        return $this->db->query("SELECT m.GN_GRP_ID, m.GN_NAME, m.GN_DESC, m.TH_GRP_ID,
                    (SELECT TH_GRP_NAME FROM drg_therapeutic_group WHERE TH_GRP_ID LIKE m.TH_GRP_ID)TH_GRP_NAME,
                     m.GN_DESC,  m.ACTIVE_STATUS
                    FROM drg_generic_group m;")->result();

    }

    public function getMedicine()
    {
        //  return $this->db->query("SELECT * FROM drg_medicine_info ORDER BY MEDICINE_ID DESC")->result();
        return $this->db->query("SELECT m.MEDICINE_ID, m.MEDICINE_NAME,m.MEDICINE_DESC,m.PRODUCT_FET_PHOTO,m.INSERT_FILE,m.CAT_ID,m.GN_GRP_ID,
                    (SELECT GN_NAME FROM drg_generic_group WHERE GN_GRP_ID LIKE m.GN_GRP_ID)GN_NAME, (SELECT CAT_NAME FROM drg_medicine_cat WHERE CAT_ID LIKE m.CAT_ID)CAT_NAME,
                     m.MEDICINE_DESC,m.IS_LATEST,  m.ACTIVE_STATUS
                    FROM drg_medicine_info m;")->result();
    }

    public function getMedicineStrength()
    {
        return $this->db->query("SELECT m.TYPE_ID,m.STRENGTH,m.UOM_ID,m.MEDICINE_ID,
                    (SELECT TYPE_NAME FROM drg_medicine_type WHERE TYPE_ID LIKE m.TYPE_ID)TYPE_NAME, (SELECT UOM_NAME FROM drg_uom WHERE UOM_ID LIKE m.UOM_ID)UOM_NAME,
                  m.ACTIVE_STATUS
                    FROM drg_medicine_strength m WHERE MEDICINE_ID LIKE m.MEDICINE_ID;")->result();
    }

    public function getMedicineStrengthId($MEDICINE_ID)

    {
        return $this->db->query("SELECT m.MEDICINE_ID,m.GN_GRP_ID,

                   (SELECT GN_NAME FROM drg_generic_group WHERE GN_GRP_ID LIKE m.GN_GRP_ID)
                    GN_NAME,
                    (SELECT MEDICINE_DESC FROM drg_medicine_info WHERE MEDICINE_ID LIKE m.MEDICINE_ID)
                    MEDICINE_DESC,(SELECT MEDICINE_NAME FROM drg_medicine_info WHERE MEDICINE_ID LIKE m.MEDICINE_ID)
                    MEDICINE_NAME,m.ACTIVE_STATUS
                    FROM drg_medicine_info m WHERE m.MEDICINE_ID LIKE $MEDICINE_ID;")->row();
    }
    public function getMSId($MS_ID)
    {
        return $this->db->query("SELECT dms.MS_ID,dgg.GN_NAME,dmi.MEDICINE_DESC,dmi.MEDICINE_ID,dmi.MEDICINE_NAME,dmi.ACTIVE_STATUS FROM drg_medicine_info dmi LEFT JOIN drg_generic_group dgg ON dmi.GN_GRP_ID=dgg.GN_GRP_ID
        LEFT JOIN drg_medicine_strength dms ON dmi.MEDICINE_ID=dms.MEDICINE_ID WHERE dms.MS_ID = $MS_ID;")->row();
    }


    public function therapiticProduct()
    {
        return $this->db->query("SELECT TH_GRP_NAME,MEDICINE_NAME,MEDICINE_ID,PRODUCT_FET_PHOTO FROM drg_medicine_info dmi LEFT JOIN drg_generic_group dgg ON dmi.GN_GRP_ID=dgg.GN_GRP_ID
LEFT JOIN drg_therapeutic_group dtg ON dgg.TH_GRP_ID=dtg.TH_GRP_ID WHERE dtg.TH_GRP_NAME LIKE 'A%'")->row();
    }


    public function herbalProduct()
    {
        return $this->db->query("select dgg.TH_GRP_NAME,dmi.GN_GRP_ID,dmi.GN_NAME from drg_generic_group dmi left join drg_therapeutic_group dgg ON dmi.GN_GRP_ID=dgg.TH_GRP_ID WHERE TH_GRP_NAME LIKE 'o%'")->result();
    }


    public function search($MEDICINE_ID)
    {
        $this->db->select('dmi.*,dgg.*');
        $this->db->from('drg_medicine_info as dmi');
        $this->db->join('drg_generic_group as dgg', 'dmi.GN_GRP_ID = dgg.GN_GRP_ID', 'left join');
        $this->db->like('dgg.GN_NAME', $MEDICINE_ID);
        // $this->db->query("select dgg.GN_NAME,dmi.MEDICINE_ID,dmi.MEDICINE_NAME,dmi.PRODUCT_FET_PHOTO from drg_medicine_info dmi left join drg_generic_group dgg ON dmi.GN_GRP_ID=dgg.GN_GRP_ID WHERE MEDICINE_NAME = $MEDICINE_ID")->result();

        $query = $this->db->get();
        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return $query->result();

        }

    }


}





