<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Page_controller extends CI_Controller
{

    public function __construct()
    {
        parent::__construct();
        $this->load->model('Medicine_Model');
        $this->load->helper('security');
        $this->load->model('file');

    }

    public function index()
    {

        $data['specializedPd'] = $this->db->query("SELECT * FROM drg_special_prod_cat d;")->result();
        //$data['imgUnit'] = $this->db->query("SELECT PHOTO_GALLERY_ID FROM image_department i;")->result();
        //var_dump( $data['imgUnit']);
        //exit();

        $data['latestProduct'] = $this->db->query("SELECT dms.MEDICINE_IMG,dgg.GN_NAME,dtg.TH_GRP_NAME,dmi.MEDICINE_ID,dmi.MEDICINE_NAME,dmi.IS_LATEST from drg_medicine_info dmi left join drg_generic_group dgg ON dmi.GN_GRP_ID=dgg.GN_GRP_ID left join drg_therapeutic_group dtg ON dtg.TH_GRP_ID=dgg.TH_GRP_ID left join drg_medicine_strength dms ON dmi.MEDICINE_ID=dms.MEDICINE_ID WHERE  dmi.IS_LATEST LIKE 'y'  GROUP BY MEDICINE_ID")->result();
        $data['metaTitle'] = 'Dashboard';
        $data['breadcrumbs'] = array(
            'Dashboard' => '#'
        );
        $data['Slider'] = $this->db->query("SELECT * FROM home_slider WHERE HOME_SLIDER_ID")->result();
        $data['pageTitle'] = 'Welcome to Admin Dashboard';
        $data['content_view_page'] = 'index/dashboard/index';
        $this->template_drug->display($data);


    }


    public function company_profile()
    {
        // echo 'dfsdfsdf';exit;
        $data['metaTitle'] = 'Dashboard';
        $data['breadcrumbs'] = array(
            'Dashboard' => '#'
        );
        $data['pageTitle'] = 'Welcome to Admin Dashboard';
        $data['content_view_page'] = 'index/dashboard/company_profile';
        $this->template_applicant_drug->display($data);
    }


    public function founder()
    {
        $data['content_view_page'] = 'index/dashboard/founder';
        $this->template_applicant_drug->display($data);
    }

    public function md()
    {
        $data['content_view_page'] = 'index/dashboard/md';
        $this->template_applicant_drug->display($data);
    }

    public function hu()
    {
        $data['content_view_page'] = 'index/pages/hu';
        $this->template_applicant_drug->display($data);
    }

    public function unit03()
    {
        $data['content_view_page'] = 'index/pages/unit03';
        $this->template_applicant_drug->display($data);
    }

    public function mission()
    {
        $data['content_view_page'] = 'index/dashboard/mission';
        $this->template_applicant_drug->display($data);
    }

    public function our_people()
    {
        $data['content_view_page'] = 'index/dashboard/our_people';
        $this->template_applicant_drug->display($data);
    }

    public function quality()
    {
        $data['content_view_page'] = 'index/dashboard/quality';
        $this->template_applicant_drug->display($data);
    }

    public function environment()
    {
        $data['content_view_page'] = 'index/dashboard/environment';
        $this->template_applicant_drug->display($data);
    }

    public function corporate()
    {
        $data['content_view_page'] = 'index/dashboard/corporate';
        $this->template_applicant_drug->display($data);
    }

    public function sister_concerns()
    {
        $data['content_view_page'] = 'index/dashboard/sister_concerns';
        $this->template_applicant_drug->display($data);
    }

    public function product_by_trade($param = 'A')
    {

        $data['param'] = $param;
        $data['products'] = $this->db->query("SELECT MEDICINE_ID,MEDICINE_NAME,PRODUCT_FET_PHOTO FROM drg_medicine_info WHERE MEDICINE_NAME LIKE '$param%' AND CAT_ID=4")->result();
        $data['content_view_page'] = 'index/dashboard/product_by_trade';
        $this->template_applicant_drug->display($data);
    }

    public function product_by_generic($param = 'A')
    {
        $data['param'] = $param;
        $data['genericProduct'] = $this->db->query("select dgg.GN_NAME,dmi.MEDICINE_ID,dmi.MEDICINE_NAME,dmi.PRODUCT_FET_PHOTO from drg_medicine_info dmi left join drg_generic_group dgg ON dmi.GN_GRP_ID=dgg.GN_GRP_ID WHERE GN_NAME LIKE '$param%' AND CAT_ID=4")->result();
        $data['content_view_page'] = 'index/dashboard/product_by_generic';
        $this->template_applicant_drug->display($data);
    }

    public function product_by_therapetic()
    {

        $data['therapiticGroupProduct'] = $this->db->query("SELECT dtg.TH_GRP_ID,TH_GRP_NAME,dgg.GN_NAME,MEDICINE_NAME,MEDICINE_ID,PRODUCT_FET_PHOTO,dmc.CAT_NAME FROM drg_medicine_info dmi LEFT JOIN drg_generic_group dgg ON dmi.GN_GRP_ID=dgg.GN_GRP_ID
        LEFT JOIN drg_therapeutic_group dtg ON dgg.TH_GRP_ID=dtg.TH_GRP_ID LEFT JOIN drg_medicine_cat dmc ON dmc.CAT_ID=dtg.CAT_ID WHERE dmc.CAT_NAME LIKE 'p%' GROUP BY TH_GRP_NAME;")->result();

        $data['therapiticProduct'] = $this->db->query("SELECT TH_GRP_NAME,MEDICINE_NAME,MEDICINE_ID,PRODUCT_FET_PHOTO FROM drg_medicine_info dmi LEFT JOIN drg_generic_group dgg ON dmi.GN_GRP_ID=dgg.GN_GRP_ID
        LEFT JOIN drg_therapeutic_group dtg ON dgg.TH_GRP_ID=dtg.TH_GRP_ID WHERE dtg.TH_GRP_NAME LIKE '%'")->result();

        $data['content_view_page'] = 'index/dashboard/product_by_therapetic';
        $this->template_applicant_drug->display($data);
    }

    public function herbal_product()
    {
        // $data['herbalProduct'] = $this->Medicine_Model->herbalProduct();
        $data['herbalProduct'] = $this->harbalUnaniProd(6);
        $data['content_view_page'] = 'index/dashboard/herbal_product';
        $this->template_applicant_drug->display($data);
    }

    private function harbalUnaniProd($type)
    {
        $data = $this->db->query("SELECT MEDICINE_ID,MEDICINE_NAME,PRODUCT_FET_PHOTO,TH_GRP_NAME
                                FROM drg_medicine_info dmi
                                LEFT JOIN drg_generic_group USING(GN_GRP_ID)
                                LEFT JOIN drg_therapeutic_group USING(TH_GRP_ID)
                                WHERE dmi.CAT_ID=$type")->result();
        return $data;
    }

    public function Unani_product()
    {
        $data['unaniProduct'] = $this->harbalUnaniProd(5);
        $data['content_view_page'] = 'index/dashboard/Unani_product';
        $this->template_applicant_drug->display($data);

    }

    public function Oncology_product()
    {
        // $data['herbalProduct'] = $this->Medicine_Model->herbalProduct();
        $data['oncologyProduct'] = $this->db->query("SELECT TH_GRP_NAME,MEDICINE_NAME,MEDICINE_ID,PRODUCT_FET_PHOTO FROM drg_medicine_info dmi LEFT JOIN drg_generic_group dgg ON dmi.GN_GRP_ID=dgg.GN_GRP_ID
        LEFT JOIN drg_therapeutic_group dtg ON dgg.TH_GRP_ID=dtg.TH_GRP_ID WHERE dtg.TH_GRP_NAME LIKE 'ON%'")->result();
        $data['content_view_page'] = 'index/dashboard/Oncology_product';
        $this->template_applicant_drug->display($data);
    }

    public function single_product($MEDICINE_ID, $param = 'A', $param1 = '')
    {
        $data['param'] = $param;
        $data['param1'] = $param1;
        $data['genericProduct'] = $this->db->query("select dgg.GN_NAME,dmi.MEDICINE_ID,dmi.MEDICINE_NAME,dmi.PRODUCT_FET_PHOTO from drg_medicine_info dmi left join drg_generic_group dgg ON dmi.GN_GRP_ID=dgg.GN_GRP_ID WHERE GN_NAME LIKE '$param%'")->result();
        $data['category'] = $this->db->query("SELECT * FROM drg_medicine_cat ORDER BY CAT_ID DESC")->row();
        $data['productSlider'] = $this->db->query("SELECT MS_ID,MEDICINE_IMG,MEDICINE_ID FROM drg_medicine_strength WHERE MEDICINE_ID = $MEDICINE_ID")->result();
        $data['pdf'] = $this->db->query("SELECT INSERT_FILE,MEDICINE_ID FROM drg_medicine_strength WHERE MEDICINE_ID = $MEDICINE_ID")->row();
        //$data['relatedProduct'] = $this->db->query("select dms.MS_ID,dms.MEDICINE_IMG,dmi.MEDICINE_ID,dmi.MEDICINE_NAME from drg_medicine_info dmi left join drg_medicine_strength dms ON dmi.MEDICINE_ID=dms.MEDICINE_ID WHERE  dms.MEDICINE_ID=$MEDICINE_ID")->result();
        $data['medicine'] = $this->Medicine_Model->getMedicineStrengthId($MEDICINE_ID);
        $medicineName = $data['medicine']->MEDICINE_NAME;
        //$medicineName = str_replace("-", " ", $medicineName);
        $pizza = $medicineName;
        $pieces = explode(" ", $pizza);
        $medName = $pieces[0];
        $data['relatedProduct'] = $this->db->query("SELECT * FROM (SELECT dms.MS_ID,dms.STRENGTH,dms.MEDICINE_IMG, dgg2.TH_GRP_ID,dmi2.MEDICINE_NAME,du.UOM_NAME
                                                    FROM(select MEDICINE_ID,dmi.MEDICINE_NAME,dgg.TH_GRP_ID
                                                    from drg_medicine_info dmi LEFT JOIN drg_generic_group dgg using(GN_GRP_ID)
                                                    where MEDICINE_ID=$MEDICINE_ID) k LEFT JOIN drg_medicine_info dmi2 ON dmi2.MEDICINE_NAME
                                                    LIKE concat('$medName',\"%\") LEFT JOIN drg_generic_group dgg2 ON (dmi2.GN_GRP_ID=dgg2.GN_GRP_ID
                                                    AND k.TH_GRP_ID=dgg2.TH_GRP_ID) LEFT JOIN drg_medicine_strength dms ON dmi2.MEDICINE_ID=dms.MEDICINE_ID LEFT JOIN drg_uom du ON dms.UOM_ID=du.UOM_ID) l
                                                    WHERE l.TH_GRP_ID>0")->result();
        $data['content_view_page'] = 'index/dashboard/single_product';
        $this->template_applicant_drug->display($data);


    }

    public function child_product($MS_ID, $param = 'A', $param1 = '')
    {

        $data['param'] = $param;
        $data['param1'] = $param1;
        $data['medicine'] = $this->Medicine_Model->getMSId($MS_ID);
        $medicine_ID = $data['medicine']->MEDICINE_ID;
        $data['genericProduct'] = $this->db->query("select dgg.GN_NAME,dmi.MEDICINE_ID,dmi.MEDICINE_NAME,dmi.PRODUCT_FET_PHOTO from drg_medicine_info dmi left join drg_generic_group dgg ON dmi.GN_GRP_ID=dgg.GN_GRP_ID WHERE GN_NAME LIKE '$param%'")->result();
        $data['category'] = $this->db->query("SELECT * FROM drg_medicine_cat ORDER BY CAT_ID DESC")->row();
        $medicineName = $data['medicine']->MEDICINE_NAME;
        //$medicineName = str_replace("-", " ", $medicineName);
        $pizza = $medicineName;
        $pieces = explode(" ", $pizza);
        $medName = $pieces[0];






        $data['childproductSlider'] = $this->db->query("SELECT * FROM (SELECT dms.MS_ID,dms.MEDICINE_IMG, dgg2.TH_GRP_ID
                                                    FROM(select MEDICINE_ID,dmi.MEDICINE_NAME,dgg.TH_GRP_ID
                                                    from drg_medicine_info dmi LEFT JOIN drg_generic_group dgg using(GN_GRP_ID)
                                                    where MEDICINE_ID=$medicine_ID) k LEFT JOIN drg_medicine_info dmi2 ON dmi2.MEDICINE_NAME
                                                    LIKE concat('$medName',\"%\") LEFT JOIN drg_generic_group dgg2 ON (dmi2.GN_GRP_ID=dgg2.GN_GRP_ID
                                                    AND k.TH_GRP_ID=dgg2.TH_GRP_ID) LEFT JOIN drg_medicine_strength dms ON dmi2.MEDICINE_ID=dms.MEDICINE_ID) l
                                                    WHERE l.MS_ID = $MS_ID")->result();
        $data['pdf'] = $this->db->query("SELECT INSERT_FILE,MS_ID FROM drg_medicine_strength WHERE MS_ID = $MS_ID")->row();
        $medicineName = $data['medicine']->MEDICINE_NAME;
        //$medicineName = str_replace("-", " ", $medicineName);
        $pizza = $medicineName;
        $pieces = explode(" ", $pizza);
        $medName = $pieces[0];
        $data['relatedProduct'] = $this->db->query("SELECT * FROM (SELECT dms.MS_ID,dms.STRENGTH,dms.MEDICINE_IMG, dgg2.TH_GRP_ID,dmi2.MEDICINE_NAME,du.UOM_NAME
                                                    FROM(select MEDICINE_ID,dmi.MEDICINE_NAME,dgg.TH_GRP_ID
                                                    from drg_medicine_info dmi LEFT JOIN drg_generic_group dgg using(GN_GRP_ID)
                                                    where MEDICINE_ID=$medicine_ID) k LEFT JOIN drg_medicine_info dmi2 ON dmi2.MEDICINE_NAME
                                                    LIKE concat('$medName',\"%\") LEFT JOIN drg_generic_group dgg2 ON (dmi2.GN_GRP_ID=dgg2.GN_GRP_ID
                                                    AND k.TH_GRP_ID=dgg2.TH_GRP_ID) LEFT JOIN drg_medicine_strength dms ON dmi2.MEDICINE_ID=dms.MEDICINE_ID LEFT JOIN drg_uom du ON dms.UOM_ID=du.UOM_ID) l
                                                    WHERE l.TH_GRP_ID>0 AND l.MS_ID != $MS_ID")->result();

        $data['content_view_page'] = 'index/dashboard/child_product';
        $this->template_applicant_drug->display($data);


    }


    public function special_product($spID)
    {

        $data['specialPdT'] = $this->db->query("SELECT * FROM drg_special_prod_cat WHERE SPECIAL_ID=$spID;")->row();

        $data['specializedP'] = $this->db->query("SELECT SP_MED_ID,dsm.SPECIAL_ID,dspc.SPECIAL_DESC,SPECIAL_NAME,dmi.MEDICINE_ID,MEDICINE_NAME,PRODUCT_FET_PHOTO FROM drg_medicine_info dmi LEFT JOIN drg_special_medicine dsm ON dmi.MEDICINE_ID=dsm.MEDICINE_ID
    LEFT JOIN drg_special_prod_cat dspc ON dsm.SPECIAL_ID=dspc.SPECIAL_ID WHERE dsm.SPECIAL_ID LIKE $spID")->result();


        $data['content_view_page'] = 'index/dashboard/special_product';
        $this->template_applicant_drug->display($data);
    }


    public function formulation()
    {
        $data['content_view_page'] = 'index/layout/formulation';
        $this->template_applicant_drug->display($data);
    }
    public function formulation2()
    {
        $data['content_view_page'] = 'index/layout/formulation2';
        $this->template_applicant_drug->display($data);
    }

    public function unit_3()
    {
        $data['content_view_page'] = 'index/layout/unit_3';
        $this->template_applicant_drug->display($data);
    }

    public function production_facility()
    {
        $data['content_view_page'] = 'index/layout/production_facility';
        $this->template_applicant_drug->display($data);
    }


    public function oncology()
    {
        $data['oncologyImage'] = $this->db->query("SELECT * FROM oncology_unit ORDER BY ONCOLOGY_ID DESC")->result();
        $data['content_view_page'] = 'index/layout/oncology';
        $this->template_applicant_drug->display($data);
    }

    public function research()
    {
        $data['content_view_page'] = 'index/layout/research';
        $this->template_applicant_drug->display($data);
    }

    public function ware_house()
    {
        $data['content_view_page'] = 'index/layout/ware_house';
        $this->template_applicant_drug->display($data);
    }

    public function virtual()
    {
        $data['content_view_page'] = 'index/layout/virtual';
        $this->template_applicant_drug->display($data);
    }


    public function pg_unit1($sddtID)
    {

        $data['galleryImage'] = $this->db->query("SELECT * FROM image_department i")->result();
        $data['imgUnit2'] = $this->db->query("SELECT id.PHOTO_GALLERY_ID,IMG_ID,IMG_THUMB,INSERTS_FILES FROM image_gallery ig left join image_department id ON ig.PHOTO_GALLERY_ID=id.PHOTO_GALLERY_ID WHERE id.PHOTO_GALLERY_ID
        LIKE $sddtID;")->result();
        $data['imgUnit3'] = $this->db->query("SELECT id.PHOTO_GALLERY_ID,TITTLE FROM image_gallery ig left join image_department id ON ig.PHOTO_GALLERY_ID=id.PHOTO_GALLERY_ID WHERE id.PHOTO_GALLERY_ID
        LIKE $sddtID;")->row();
        $data['content_view_page'] = 'index/layout/pg_unit1';
        $this->template_applicant_drug->display($data);
    }

    public function global_operation()
    {
        $data['achivement'] = $this->db->query("SELECT * FROM drg_global_achivement ORDER BY ACHIVEMENT_ID DESC")->result();
        $data['content_view_page'] = 'index/layout/global_operation';
        $this->template_applicant_drug->display($data);
    }

    public function contact()
    {
        $data['content_view_page'] = 'index/layout/contact';
        $this->template_applicant_drug->display($data);
    }

    public function save_contact()
    {

        $this->load->model('contact_mail_model');


        $cusName = $this->input->get('name');
        $cusEmail = $this->input->get('email');
        $message = $this->input->get('message');

        $email = $this->input->get('optionsRadios');

        $send = $this->contact_mail_model->send_mail($cusName, $cusEmail, $message, $email);

        $data['content_view_page'] = 'index/layout/contact';
        $this->template_applicant_drug->display($data);

    }


    public function getProdByThGrp($thId)
    {
        $data['therapeticPd'] = $this->db->query("SELECT dtg.TH_GRP_ID,TH_GRP_NAME,MEDICINE_NAME,MEDICINE_ID,PRODUCT_FET_PHOTO FROM drg_medicine_info dmi LEFT JOIN drg_generic_group dgg ON dmi.GN_GRP_ID=dgg.GN_GRP_ID
          LEFT JOIN drg_therapeutic_group dtg ON dtg.TH_GRP_ID=dgg.TH_GRP_ID WHERE dtg.TH_GRP_ID LIKE $thId")->result();
        $data['tRpTn'] = $this->db->query("SELECT dtg.TH_GRP_ID,TH_GRP_NAME,MEDICINE_NAME,MEDICINE_ID,PRODUCT_FET_PHOTO FROM drg_medicine_info dmi LEFT JOIN drg_generic_group dgg ON dmi.GN_GRP_ID=dgg.GN_GRP_ID
          LEFT JOIN drg_therapeutic_group dtg ON dtg.TH_GRP_ID=dgg.TH_GRP_ID WHERE dtg.TH_GRP_ID LIKE $thId  GROUP BY dtg.TH_GRP_ID")->result();


        $data['content_view_page'] = 'index/dashboard/therapetic';
        $this->template_applicant_drug1->display($data);
    }


    public function search()
    {

        if (!empty($_POST)) {
            $this->load->model('Medicine_Model');
            $MEDICINE_ID = $this->input->post('productname');
        }
        if (isset($MEDICINE_ID) and !empty($MEDICINE_ID)) {
            $data['search'] = $this->Medicine_Model->search($MEDICINE_ID);
            //   $this->load->views('index',$data);
            $data['content_view_page'] = 'index/dashboard/result_view';
            $this->template_applicant_drug->display($data);
        } else {
            redirect($this->index());
        }
    }

    public function career()
    {
        $data['content_view_page'] = 'index/dashboard/career';
        $this->template_applicant_drug->display($data);
    }

    public function news()
    {
        $data['content_view_page'] = 'index/dashboard/news';
        $this->template_applicant_drug->display($data);
    }

}
