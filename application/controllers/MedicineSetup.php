<?php
/**
 * This file is part of the DGDP\e-DP System package
 *
 * (c) ATI Limited. <info@atilimited.net>
 *
 * PHP version 5 (5.6.25)
 *
 * @package     a2i\ashokti Mukti
 * @author      ATI Limited Dev Team
 * @copyright   2017 atilimited.net
 */
/**
 * Class AccessControl
 *
 * AccessControl is the extended class of EXT_Controller.
 *
 * This class implements all methods related to Role Based
 * Access Control for User of ashokti Mukti System.
 *
 * @package     a2i\ashokti Mukti
 * @author      Nurullah <nurullah@atilimited.net>
 * @copyright   2017 atilimited.net
 * @version     GIT: $Id$ In development. 1.0.0
 */
defined('BASEPATH') OR exit('No direct script access allowed');

class MedicineSetup extends EXT_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->user_session = $this->session->userdata('logged_in');
        if (!$this->user_session) {
            redirect('auth/index');
        }
        $this->form_validation->set_error_delimiters('<div class="alert alert-danger">', '</div>');
        $this->load->model('Medicine_Model');
        $this->load->helper('security');
        $this->load->model('file');
    }


    public function categories()
    {

        $data['categories'] = $this->db->query("SELECT * FROM drg_medicine_cat ORDER BY CAT_ID DESC")->result();
        $data['content_view_page'] = ('medicineSetup/category');
        $this->template->display($data);
    }


    public function createNewCategory()
    {
        if (!empty($_POST)) {
            $insertData = array(
                'CAT_NAME' => $this->input->post('CAT_NAME'),
                'CAT_DESC' => $this->input->post('CAT_DESC'),
                'ACTIVE_STAT' => isset($_POST['ACTIVE_STAT']) ? 1 : 0,
                'CRE_BY' => $this->user_session["FLD_USER_ID"],
                'CRE_DT' => date("Y-m-d h:i:s"),
            );
            $insertData = $this->security->xss_clean($insertData);

            if ($this->utilities->insertData($insertData, 'drg_medicine_cat')) {
                $this->session->set_flashdata('success', 'Category Created Successfully');
                redirect('MedicineSetup/categories');
            }
        }


        $this->load->view("medicineSetup/createNewCategory");
    }


    public function viewCategory($categoriesId)
    {
        $data['categoriesDetails'] = $this->utilities->findByAttribute('drg_medicine_cat', array('CAT_ID' => $categoriesId)); // all data comes form view table
        $this->load->view('medicineSetup/viewCategory', $data);
    }


    public function editCategory($CAT_ID)
    {

        if (isset($_POST['CAT_ID'])) {
            $Category = array(
                'CAT_NAME' => $this->input->post('CAT_NAME'),
                'CAT_DESC' => $this->input->post('CAT_DESC'),
                'ACTIVE_STAT' => isset($_POST['ACTIVE_STAT']) ? 1 : 0,
                'UPD_BY' => $this->user_session["FLD_USER_ID"],
                'UPD_DT' => date("Y-m-d:H-i-s"),
            );


            $Category = $this->security->xss_clean($Category);
            if ($this->utilities->updateData('drg_medicine_cat', $Category, array('CAT_ID' => $CAT_ID))) {
                $this->session->set_flashdata('success', $this->lang->line('Category') . ' ' . $this->lang->line('upd_success'));
                redirect('medicineSetup/categories');
            }
        }
        $data['Category_details'] = $this->utilities->findByAttribute('drg_medicine_cat', array('CAT_ID' => $CAT_ID));
        $this->load->view("medicineSetup/editCategory", $data);

    }


    public function deleteCategory($id)
    {
        if ($this->utilities->deleteRowByAttribute(
            'drg_medicine_cat', array('CAT_ID' => $id))
        ) {
            $this->util->resultObject(1, 'Category Deleted Successfully!');
        }
    }

    public function therapeutic()
    {


        $data['therapeutic'] = $this->Medicine_Model->getTherapeutic();

        $data['content_view_page'] = ('medicineSetup/therapeutic');
        $this->template->display($data);
    }


    public function createNewTherapeutic()
    {
        if (!empty($_POST)) {
            $insertData = array(
                'CAT_ID' => $this->input->post('CAT_ID'),
                'TH_GRP_NAME' => $this->input->post('TH_GRP_NAME'),
                'TH_GRP_DESC' => $this->input->post('TH_GRP_DESC'),
                'ACTIVE_STATUS' => isset($_POST['ACTIVE_STATUS']) ? 1 : 0,
                'CRE_BY' => $this->user_session["FLD_USER_ID"],
                'CRE_DT' => date("Y-m-d h:i:s"),
            );
            $insertData = $this->security->xss_clean($insertData);

            if ($this->utilities->insertData($insertData, 'drg_therapeutic_group')) {
                $this->session->set_flashdata('success', 'Generic Created Successfully');
                redirect('MedicineSetup/therapeutic');
            }
        }

        $data['category_list'] = $this->utilities->dropdownFromTableWithCondition('drg_medicine_cat', '', 'CAT_ID', 'CAT_NAME');
        $this->load->view("medicineSetup/createNewTherapeutic", $data);
    }


    public function viewTherapeutic($therapeuticId)
    {
        $data['therapeuticDetails'] = $this->utilities->findByAttribute('drg_therapeutic_group', array('TH_GRP_ID' => $therapeuticId)); // all data comes form view table
        $this->load->view('medicineSetup/viewTherapeutic', $data);
    }


    public function editTherapeutic($TH_GRP_ID)
    {
        if (isset($_POST['TH_GRP_ID'])) {
            $Therapeutic = array(
                'CAT_ID' => $this->input->post('CAT_ID'),
                'TH_GRP_NAME' => $this->input->post('TH_GRP_NAME'),
                'TH_GRP_DESC' => $this->input->post('TH_GRP_DESC'),
                'ACTIVE_STATUS' => isset($_POST['ACTIVE_STATUS']) ? 1 : 0,
                'UPD_BY' => $this->user_session["FLD_USER_ID"],
                'UPD_DT' => date("Y-m-d:H-i-s"),
            );
            $Therapeutic = $this->security->xss_clean($Therapeutic);

            if ($this->utilities->updateData('drg_therapeutic_group', $Therapeutic, array('TH_GRP_ID' => $TH_GRP_ID))) {
                $this->session->set_flashdata('success', $this->lang->line('Therapeutic') . ' ' . $this->lang->line('upd_success'));
                redirect('medicineSetup/therapeutic');
            }
        }
        $m = $data['categoryDropdown'] = $this->db->query("SELECT * FROM drg_medicine_cat")->result();
        $data['Therapeutic_details'] = $this->utilities->findByAttribute('drg_therapeutic_group', array('TH_GRP_ID' => $TH_GRP_ID));
        $this->load->view("medicineSetup/editTherapeutic", $data);

    }


    public function deleteTherapeutic($thid)
    {
        if ($this->utilities->deleteRowByAttribute(
            'drg_therapeutic_group', array('TH_GRP_ID' => $thid))
        ) {
            $this->util->resultObject(1, 'Therapeutic Deleted Successfully!');
        }
    }


    public function generic()
    {
        // $data['generic']=$this->db->query("SELECT * FROM drg_generic_group ORDER BY GN_GRP_ID DESC")->result();
        $data['generic'] = $this->Medicine_Model->getGeneric();
        $data['content_view_page'] = ('medicineSetup/generic');
        $this->template->display($data);
    }


    public function createNewGeneric()
    {
        if (!empty($_POST)) {
            $insertData = array(
                'TH_GRP_ID' => $this->input->post('TH_GRP_ID'),
                'GN_NAME' => $this->input->post('GN_NAME'),
                'GN_DESC' => $this->input->post('GN_DESC'),
                'CRE_BY' => $this->user_session["FLD_USER_ID"],
                'CRE_DT' => date("Y-m-d h:i:s"),
            );
            $insertData = $this->security->xss_clean($insertData);

            if ($this->utilities->insertData($insertData, 'drg_generic_group')) {
                $this->session->set_flashdata('success', 'Generic Created Successfully');
                redirect('MedicineSetup/generic');
            }
        }
        $data['Therapeutic_list'] = $this->utilities->dropdownFromTableWithCondition('drg_therapeutic_group', '', 'TH_GRP_ID', 'TH_GRP_NAME');
        $this->load->view("medicineSetup/createNewGeneric", $data);
    }


    public function viewGeneric($genericId)
    {
        $data['genericDetails'] = $this->utilities->findByAttribute('drg_generic_group', array('GN_GRP_ID' => $genericId)); // all data comes form view table
        $this->load->view('medicineSetup/viewGeneric', $data);
    }


    public function editGeneric($GN_GRP_ID)
    {


        if (isset($_POST['GN_GRP_ID'])) {
            $Generic = array(

                'TH_GRP_ID' => $this->input->post('TH_GRP_ID'),
                'GN_NAME' => $this->input->post('GN_NAME'),
                'GN_DESC' => $this->input->post('GN_DESC'),
                'ACTIVE_STATUS' => isset($_POST['ACTIVE_STATUS']) ? 1 : 0,
                'UPD_BY' => $this->user_session["FLD_USER_ID"],
                'UPD_DT' => date("Y-m-d:H-i-s"),
            );
            $Generic = $this->security->xss_clean($Generic);


            if ($this->utilities->updateData('drg_generic_group', $Generic, array('GN_GRP_ID' => $GN_GRP_ID))) {
                $this->session->set_flashdata('success', $this->lang->line('Generic') . ' ' . $this->lang->line('upd_success'));
                redirect('medicineSetup/generic');
            }
        }

        $m = $data['therapeuticDropdown'] = $this->db->query("SELECT * FROM drg_therapeutic_group")->result();
        $data['Generic_details'] = $this->utilities->findByAttribute('drg_generic_group', array('GN_GRP_ID' => $GN_GRP_ID));
        $this->load->view("medicineSetup/editGeneric", $data);

    }


    public function deleteGeneric($id)
    {
        if ($this->utilities->deleteRowByAttribute(
            'drg_generic_group', array('GN_GRP_ID' => $id))
        ) {
            $this->util->resultObject(1, 'Generic Deleted Successfully!');
        }
    }


    public function medicine()
    {
        $data['medicine'] = $this->Medicine_Model->getMedicine();

        //  $data['medicine'] = $this->db->query("SELECT * FROM drg_medicine_info ORDER BY MEDICINE_ID DESC")->result();
        //$data['medicine'] = $this->db->query("SELECT * FROM drg_medicine_cat ORDER BY CAT_ID DESC")->result();
        $data['content_view_page'] = ('medicineSetup/medicine');
        $this->template->display($data);
    }

    public function createNewMedicine()
    {
        //$this->pr($_POST);
        if (!empty($_POST)) {
            // $this->pr($_POST);
            // $this->pr($_FILES['insertFileData']);
            if ($this->input->post('fileSubmit') && !empty($_FILES['INSERT_FILE']['name'])) {

                {
                    $_FILES['INSERT_FILE']['name'] = $name = time() . $_FILES['INSERT_FILE']['name'];
                    $_FILES['INSERT_FILE']['type'] = $_FILES['INSERT_FILE']['type'];
                    $_FILES['INSERT_FILE']['tmp_name'] = $_FILES['INSERT_FILE']['tmp_name'];
                    $_FILES['INSERT_FILE']['error'] = $_FILES['INSERT_FILE']['error'];
                    $_FILES['INSERT_FILE']['size'] = $_FILES['INSERT_FILE']['size'];
                    $uploadPath = 'uploads/IMG/';
                    $filePath = $uploadPath . $name;
                    $config['upload_path'] = $uploadPath;
                    $config['allowed_types'] = 'gif|jpg|png';
                    $this->load->library('upload', $config);
                    $this->upload->initialize($config);
                    if ($this->upload->do_upload('INSERT_FILE')) {
                        $fileData = $this->upload->data();
                        $uploadData['file_name'] = $fileData['file_name'];
                        $uploadData['created'] = date("Y-m-d H:i:s");
                        $uploadData['modified'] = date("Y-m-d H:i:s");
                    }

                }

            }
            $insertData = array(
                'MEDICINE_NAME' => $this->input->post('MEDICINE_NAME'),
                'CAT_ID' => $this->input->post('CAT_ID'),
                'GN_GRP_ID' => $this->input->post('GN_GRP_ID'),
                'MEDICINE_DESC' => $this->input->post('MEDICINE_DESC'),
                'INSERT_FILE' => $filePath,
                'PRODUCT_FET_PHOTO' => $filePath,
                'IS_LATEST' => isset($_POST['IS_LATEST']) ? 1 : 0,
                'ACTIVE_STATUS' => isset($_POST['ACTIVE_STATUS']) ? 1 : 0,
                'CAT_ID' => $this->input->post('CAT_ID'),
                'CRE_BY' => $this->user_session["FLD_USER_ID"],
                'CRE_DT' => date("Y-m-d h:i:s"),
                'CRE_VISITOR_IP' => $_SERVER['REMOTE_ADDR']
            );
            $insertData = $this->security->xss_clean($insertData);


            if ($this->utilities->insertData($insertData, 'drg_medicine_info')) ;
            $maxId = $this->db->query("SELECT MAX(MEDICINE_ID) MAX_ID FROM drg_medicine_info")->row();
            $lastKey = $maxId->MAX_ID;
            $UOM_ID = $this->input->post('STRENGTH');
            $count = count($UOM_ID);
            $this->input->post('fileSubmit');


            if ($count > 0) {
                for ($i = 0; $i < $count; $i++) {
                    if (!empty($UOM_ID[$i])) {
//                        $total = count($_FILES['upload']['name']);
//                        for ($i = 0; $i < $total; $i++) {
                        //Get the temp file path
                        $tmpFilePath = $_FILES['upload']['tmp_name'][$i];
                        $usertmpFilePath = $_FILES['userfiles']['tmp_name'][$i];
                        //Make sure we have a filepath
                        if ($tmpFilePath != "") {
                            //Setup our new file path
                            $newFilePath[$i] = "uploads/product_images/" . time() . $_FILES['upload']['name'][$i];
                            $test2newFilePath[$i] = "uploads/product_pdf/" . time() . $_FILES['userfiles']['name'][$i];
                            //Upload the file into the temp dir
                            if (move_uploaded_file($tmpFilePath, $newFilePath[$i])) {
                                //Handle other code here
                            }
                            if (move_uploaded_file($usertmpFilePath, $test2newFilePath[$i])) {
                                //Handle other code here
                            }
                        }
                        // }


                        $strangthData = array(
                            'MEDICINE_IMG' => $newFilePath[$i],
                            'INSERT_FILE' => $test2newFilePath[$i],
                            'STRENGTH' => $this->input->post('STRENGTH')[$i],
                            'UOM_ID' => $this->input->post('UOM_ID')[$i],
                            'TYPE_ID' => $this->input->post('TYPE_ID')[$i],
                            'ACTIVE_STATUS' => isset($_POST['ACTIVE_STATUS']) ? 1 : 0,
                            'CRE_BY' => $this->user_session["FLD_USER_ID"],
                            'CRE_DT' => date("Y-m-d h:i:s"),
                            'MEDICINE_ID' => $lastKey,
                            'CRE_VISITOR_IP' => $_SERVER['REMOTE_ADDR']
                        );
                        $strangthData = $this->security->xss_clean($strangthData);

                        $insert = $this->utilities->insertData($strangthData, 'drg_medicine_strength');


                    }

                }

            }
//            $this->load->view('medicineSetup/createNewMedicine');
            redirect('MedicineSetup/medicine');

        }
        $data['uom'] = $this->db->query("SELECT * FROM drg_uom WHERE ACTIVE_STATUS LIKE 'Y'")->result();
        $data['medicineType'] = $this->db->query("SELECT * FROM drg_medicine_type WHERE ACTIVE_STATUS LIKE 'Y'")->result();
        $data['generic_list'] = $this->db->query("select GN_GRP_ID,GN_NAME,TH_GRP_NAME from drg_generic_group
                                                left join drg_therapeutic_group USING(TH_GRP_ID)")->result();
        $data['theraputic_list'] = $this->utilities->dropdownFromTableWithCondition('drg_therapeutic_group', '', 'TH_GRP_ID', 'TH_GRP_NAME');
        $data['category_list'] = $this->utilities->dropdownFromTableWithCondition('drg_medicine_cat', '', 'CAT_ID', 'CAT_NAME');

        $this->load->view("medicineSetup/createNewMedicine", $data);
    }


    public function editMedicine($msId)

    {
        // $this->pr($_POST);
        if (!empty($_POST)) {
            $FilePath = $_FILES['INSERT_FILE']['tmp_name'];
            if ($FilePath != "") {
                $filePath = "uploads/IMG/" . time() . $_FILES['INSERT_FILE']['name'];
                if (move_uploaded_file($FilePath, $filePath)) {
                }
            }


            $insertID = $this->db->query("SELECT PRODUCT_FET_PHOTO FROM drg_medicine_info WHERE MEDICINE_ID = $msId;")->row()->PRODUCT_FET_PHOTO;

            if (empty($filePath)) {
                $filePath = $insertID;

            }

            $insertData = array(
                'MEDICINE_NAME' => $this->input->post('MEDICINE_NAME'),
                'CAT_ID' => $this->input->post('CAT_ID'),
                'GN_GRP_ID' => $this->input->post('GN_GRP_ID'),
                'MEDICINE_DESC' => $this->input->post('MEDICINE_DESC'),
                'INSERT_FILE' => $filePath,
                'PRODUCT_FET_PHOTO' => $filePath,
                'IS_LATEST' => isset($_POST['IS_LATEST']) ? 1 : 0,
                'ACTIVE_STATUS' => isset($_POST['ACTIVE_STATUS']) ? 1 : 0,
                'CAT_ID' => $this->input->post('CAT_ID'),
                'UPD_BY' => $this->user_session["FLD_USER_ID"],
                'UPD_DT' => date("Y-m-d h:i:s"),
                'UPD_VISITOR_IP' => $_SERVER['REMOTE_ADDR']

            );


            $insertData = $this->security->xss_clean($insertData);

            if ($this->utilities->updateData('drg_medicine_info', $insertData, array('MEDICINE_ID' => $msId))) ;

            //$maxId = $this->db->query("SELECT MAX(MEDICINE_ID) MAX_ID FROM drg_medicine_info")->row();
//            $lastKey = $maxId->MAX_ID;
            $UOM_ID = $this->input->post('STRENGTH');
            $strengthId = $this->input->post('MS_ID');
            $output = count($UOM_ID);
            $output = print_r($UOM_ID, true);
            //print $output;
            $count = count($UOM_ID);


            if ($count > 0) {
                for ($i = 0; $i < $count; $i++) {
                    if (!empty($UOM_ID[$i])) {
                        $tmpFilePath = $_FILES['upload']['tmp_name'][$i];
                        $usertmpFilePath = $_FILES['userfiles']['tmp_name'][$i];
                        if ($tmpFilePath != "") {
                            $newFilePath[$i] = "uploads/product_images/" . time() . $_FILES['upload']['name'][$i];
                            //  $test2newFilePath[$i] = "uploads/test2/" . $_FILES['userfiles']['name'][$i];
                            if (move_uploaded_file($tmpFilePath, $newFilePath[$i])) {
                            }
                        }
                        if ($usertmpFilePath != "") {
//                            $newFilePath[$i] = "uploads/test/" . $_FILES['upload']['name'][$i];
                            $test2newFilePath[$i] = "uploads/product_pdf/" . time() . $_FILES['userfiles']['name'][$i];
//                            if (move_uploaded_file($tmpFilePath, $newFilePath[$i])) {
//                            }
                            if (move_uploaded_file($usertmpFilePath, $test2newFilePath[$i])) {
                                //Handle other code here
                            }
                        }
                        // }


//                        if ($output[$i] > 0) {
//                            echo"ok";
//                            var_dump($output);
//                            var_dump($strengthId);
//                            exit();
//                        }else{
//                            echo "jamela ahce";
//                            var_dump($output);
//                            var_dump($strengthId);
//                            exit();
//                        }



                        if ($strengthId[$i] > 0) {

                            $row = $this->db->query("SELECT MEDICINE_IMG FROM drg_medicine_strength WHERE MS_ID = $strengthId[$i]")->row();
                            if (!empty($row)) {
                                $newFilePathID[$i] = $row->MEDICINE_IMG;
                            } else {
                                $newFilePathID[$i] = '';
                            }
                        }


                        if ($strengthId[$i] > 0) {
                            $row = $this->db->query("SELECT INSERT_FILE FROM drg_medicine_strength WHERE MS_ID = $strengthId[$i]")->row();
                            if (!empty($row)) {
                                $test2newFilePathID[$i] = $row->INSERT_FILE;
                            } else {
                                $test2newFilePathID[$i] = '';
                            }

                        }

                        if (empty($newFilePath[$i])) {
                            $newFilePath[$i] = $newFilePathID[$i];
                        }

                        if (empty($test2newFilePath[$i])) {
                            $test2newFilePath[$i] = $test2newFilePathID[$i];
                        }
                        $strangthData = array(
                            'MEDICINE_IMG' => $newFilePath[$i],
                            'INSERT_FILE' => $test2newFilePath[$i],
                            'STRENGTH' => $this->input->post('STRENGTH')[$i],
                            'UOM_ID' => $this->input->post('UOM_ID')[$i],
                            'TYPE_ID' => $this->input->post('TYPE_ID')[$i],
                            'ACTIVE_STATUS' => isset($_POST['ACTIVE_STATUS']) ? 1 : 0,
                            'UPD_BY' => $this->user_session["FLD_USER_ID"],
                            'UPD_DT' => date("Y-m-d h:i:s"),
                            'MEDICINE_ID' => $msId,
                            'UPD_VISITOR_IP' => $_SERVER['REMOTE_ADDR']
                        );

                        $strangthData = $this->security->xss_clean($strangthData);

                        $esist_result = $this->utilities->hasInformationByThisId('drg_medicine_strength', array('MS_ID' => $this->input->post('medicine_prob_id')[$i]));
                        if ($esist_result == TRUE) {
                            $this->utilities->updateData('drg_medicine_strength', $strangthData, array('MS_ID' => $this->input->post('medicine_prob_id')[$i]));
                        } else {
                            $insert = $this->utilities->insertData($strangthData, 'drg_medicine_strength');
                        }


                    }
                    //var_dump($strangthData);

                }

            }

            redirect('MedicineSetup/medicine');

        }


        $data['uom'] = $this->db->query("SELECT * FROM drg_uom WHERE ACTIVE_STATUS = 'Y'")->result();
        $data['medicineType'] = $this->db->query("SELECT * FROM drg_medicine_type WHERE ACTIVE_STATUS = 'Y'")->result();
        //$data['genericList'] = $this->utilities->dropdownFromTableWithCondition('drg_generic_group', '', 'GN_GRP_ID', 'GN_NAME');
        $data['genericList'] = $this->db->query("select GN_GRP_ID,GN_NAME,TH_GRP_NAME from drg_generic_group
          left join drg_therapeutic_group USING(TH_GRP_ID)")->result();
        //$this->pr($data['genericList']);
        $data['categoryList'] = $this->utilities->dropdownFromTableWithCondition('drg_medicine_cat', '', 'CAT_ID', 'CAT_NAME');
        $data['medicineList'] = $this->utilities->dropdownFromTableWithCondition('drg_medicine_info', '', 'MEDICINE_ID', 'MEDICINE_NAME');
        $data['medicineInfo'] = $this->db->query("SELECT * FROM drg_medicine_info WHERE MEDICINE_ID = $msId")->row();
        $data['medicineStrength'] = $this->db->query("SELECT * FROM drg_medicine_strength WHERE MEDICINE_ID = $msId")->result();
        $msSID['medicinST'] = $this->db->query("SELECT * FROM drg_medicine_strength WHERE MS_ID = MS_ID")->result();
        $this->load->view("medicineSetup/editMedicine", $data);
    }
    private function imageSaveIntoDirectory($imageName,$tmpFilePath,$directory)
    {
        $newFilePath=$directory.time().$imageName;
        //$tmpFilePath = $_FILES['image']['tmp_name'];
        move_uploaded_file($tmpFilePath, $newFilePath);
        $newFilePath;
        return($newFilePath);
    }
    public  function editMedicineById($msId)
    {
      if($_POST)
      {

        $insertData2=array();
        $fetPhotoName=$_FILES['featuredImg']['name'];
        if($fetPhotoName!='')
        {
          $tempName=$_FILES['featuredImg']['tmp_name'];
          $directory='uploads/IMG/';
          $filePath=$this->imageSaveIntoDirectory($fetPhotoName,$tempName,$directory);
          $insertData2=array(
            'INSERT_FILE' => $filePath,
            'PRODUCT_FET_PHOTO' => $filePath,
          );
        }
        $insertData = array(
            'MEDICINE_NAME' => $this->input->post('MEDICINE_NAME'),
            'CAT_ID' => $this->input->post('CAT_ID'),
            'GN_GRP_ID' => $this->input->post('GN_GRP_ID'),
            'MEDICINE_DESC' => $this->input->post('MEDICINE_DESC'),
            'IS_LATEST' =>$this->input->post('IS_LATEST'),
            'ACTIVE_STATUS' => $this->input->post('ACTIVE_STATUS'),
            'CAT_ID' => $this->input->post('CAT_ID'),
            'UPD_BY' => $this->user_session["FLD_USER_ID"],
            'UPD_DT' => date("Y-m-d h:i:s"),
            'UPD_VISITOR_IP' => $_SERVER['REMOTE_ADDR']
        );
        $updateData=array_merge($insertData,$insertData2);
        $insertData = $this->security->xss_clean($updateData);
        if ($this->utilities->updateData('drg_medicine_info', $updateData, array('MEDICINE_ID' => $msId))) ;

        $medicineTypeUpd=$this->input->post('medicineTypeUpd');
        $strengthUpd=$this->input->post('strengthUpd');
        $uomUpd=$this->input->post('uom');
        $msid=$this->input->post('MSID');

        $imageNameUpd=$_FILES['imageUpd']['name'];
        $tempNameUpd=$_FILES['imageUpd']['tmp_name'];
        //$this->pr($imageNameUpd);

        $insertNameUpd=$_FILES['insertUpd']['name'];
        $tempInsertUpd=$_FILES['insertUpd']['tmp_name'];

        $updImgArray=array();
        $updInsertrray=array();
        $n=count($medicineTypeUpd);
        for($i=0;$i<$n;$i++)
        {
          $updStrngth=array();

          $filePath='';
          $updImgName='';
          $updImgName=$imageNameUpd[$i];


          if(!empty($updImgName))
          {

            $updImgTmpName=$tempNameUpd[$i];
            $directory='uploads/product_images/';
            $filePath=$this->imageSaveIntoDirectory($updImgName,$updImgTmpName,$directory);
            $updImgArray=array(
              'MEDICINE_IMG'=>$filePath
            );
          }
          $updInsertName=$insertNameUpd[$i];
          if($updInsertName!='')
          {
            $updInsertTmpName=$tempInsertUpd[$i];
            $directory='uploads/product_pdf/';
            $filePath=$this->imageSaveIntoDirectory($updInsertName,$updInsertTmpName,$directory);
            $updInsertrray=array(
              'INSERT_FILE'=>$filePath
            );
          }
          $rowVal=array(
            'UOM_ID'=>$uomUpd[$i],
            'STRENGTH'=>$strengthUpd[$i],
            'TYPE_ID'=>$medicineTypeUpd[$i]
          );
          $updStrngth=array_merge($updImgArray,$updInsertrray,$rowVal);
        //  $updStrngth=array_merge($insertData,$insertData2);
          $updStrngth = $this->security->xss_clean($updStrngth);
          if ($this->utilities->updateData('drg_medicine_strength', $updStrngth, array('MS_ID' => $msid[$i]))) ;
          $updImgArray=array();
          $updInsertrray=array();
        }
        $medicineType=$this->input->post('medicineType');
        $medicineStrength=$this->input->post('strength');
        $medicineUom=$this->input->post('uom');

        $imageName=$_FILES['image']['name'];
        $tempName=$_FILES['image']['tmp_name'];
        //$this->pr($imageNameUpd);
        $count=count($medicineType);

        $insertName=$_FILES['insert']['name'];
        $tempInsert=$_FILES['insert']['tmp_name'];

        for($j=0;$j<$count;$j++)
        {
          if($medicineType[$j]>0)
          {
            $updImgName=$imageName[$j];
            if(!empty($updImgName))
            {
              $updImgTmpName=$tempName[$j];
              $directory='uploads/product_images/';
              $filePath=$this->imageSaveIntoDirectory($updImgName,$updImgTmpName,$directory);
              $updImgArray=array(
                'MEDICINE_IMG'=>$filePath
              );
            }
            $updInsertName=$insertName[$j];
            if($updInsertName!='')
            {
              $updInsertTmpName=$tempInsert[$j];
              $directory='uploads/product_pdf/';
              $filePath=$this->imageSaveIntoDirectory($updInsertName,$updInsertTmpName,$directory);
              $updInsertrray=array(
                'INSERT_FILE'=>$filePath
              );
            }
            $rowVal=array(
              'UOM_ID'=>$medicineUom[$j],
              'MEDICINE_ID'=>$msId,
              'STRENGTH'=>$medicineStrength[$j],
              'TYPE_ID'=>$medicineType[$j]
            );

            $insertStrngth=array_merge($updImgArray,$updInsertrray,$rowVal);
            $insertData = $this->security->xss_clean($insertStrngth);
            $this->utilities->insertData($insertData, 'drg_medicine_strength');
            $updImgArray=array();
            $updInsertrray=array();

          }
        }
        redirect('MedicineSetup/medicine');


        // $this->pr($_POST);
        // $imageName=$_FILES['image']['name'];
        // $tempName=$_FILES['image']['tmp_name'];
        // $n=count($imageName);
        // for($i=0;$i<$n;$i++)
        // {
        //   $name=$imageName[$i];
        //   $tmpName=$tempName[$i];
        //   echo $this->imageSaveIntoDirectory($name,$tmpName);
        // }
        // echo "<pre>";
        //
        // $this->pr($_POST);
      }
      $data['medicineInfo']=$this->db->query("SELECT * FROM drg_medicine_info WHERE MEDICINE_ID=$msId")->row();
      $data['uom'] = $this->db->query("SELECT * FROM drg_uom WHERE ACTIVE_STATUS = 'Y'")->result();
      $data['categoryList']=$this->db->query("SELECT * FROM drg_medicine_cat")->result();
      $data['medicineType'] = $this->db->query("SELECT * FROM drg_medicine_type WHERE ACTIVE_STATUS = 'Y'")->result();
      $data['genericList'] = $this->db->query("select GN_GRP_ID,GN_NAME,TH_GRP_NAME from drg_generic_group
        left join drg_therapeutic_group USING(TH_GRP_ID)")->result();
      $data['categoryList'] = $this->db->query("SELECT * FROM drg_medicine_cat")->result();
      $data['medicineStrength'] = $this->db->query("SELECT * FROM drg_medicine_strength WHERE MEDICINE_ID = $msId")->result();
      $data['medicinST'] = $this->db->query("SELECT * FROM drg_medicine_strength WHERE MS_ID = MS_ID")->result();
      $this->load->view("medicineSetup/editMedicineById", $data);





    }

    public function viewMedicine($medicineId)
    {
        $data['medicineDetails'] = $this->db->query("SELECT dmt.TYPE_NAME,du.UOM_NAME,dgg.GN_NAME,dtg.TH_GRP_NAME,dms.TYPE_ID,dms.TYPE_ID,dms.STRENGTH,dms.MEDICINE_IMG,dms.INSERT_FILE,dmi.MEDICINE_ID,dmi.MEDICINE_NAME,dmi.MEDICINE_DESC,dmi.IS_LATEST,
dmi.PRODUCT_FET_PHOTO,dmi.ACTIVE_STATUS FROM drg_medicine_info dmi LEFT JOIN drg_generic_group dgg ON dmi.GN_GRP_ID=dgg.GN_GRP_ID
          LEFT JOIN drg_therapeutic_group dtg ON dtg.TH_GRP_ID=dgg.TH_GRP_ID LEFT JOIN drg_medicine_strength dms ON dms.MEDICINE_ID=dmi.MEDICINE_ID LEFT JOIN drg_medicine_type dmt ON dms.TYPE_ID=dmt.TYPE_ID LEFT JOIN drg_uom du ON dms.UOM_ID=du.UOM_ID WHERE dmi.MEDICINE_ID = $medicineId;")->row(); // all data comes form view table
        $this->load->view('medicineSetup/viewMedicine', $data);
    }


    private function pr($data)
    {
        echo "<pre>";
        print_r($data);
        exit;
    }


    public function deleteMedicine($mc)
    {
        if ($this->utilities->deleteRowByAttribute(
            'drg_medicine_info', array('MEDICINE_ID' => $mc))
        ) {
            $this->util->resultObject(1, 'Medicine Deleted Successfully!');
        }
    }

    public function deleteEditMedicine($ds)
    {
        if ($this->utilities->deleteRowByAttribute(
            'drg_medicine_strength', array('MS_ID' => $ds))
            // limit the user from removing all the fields
        ) {
            $this->util->resultObject(1, 'Medicine Deleted Successfully!');
        }
    }


    public function specializedDepartment()
    {


        $data['specializedDepartment'] = $this->db->query("SELECT * FROM drg_special_prod_cat ORDER BY SPECIAL_ID DESC")->result();

        $data['content_view_page'] = ('medicineSetup/specializedDepartment');
        $this->template->display($data);
    }

    public function createSpecializedDepartment()
    {
        if (!empty($_POST)) {

            // $this->pr($_POST);
            // $this->pr($_FILES['insertFileData']);

            if ($this->input->post('fileSubmit') && !empty($_FILES['INSERT_FILES']['name'])) {
                {
                    $_FILES['INSERT_FILES']['name'] = $name = time() . $_FILES['INSERT_FILES']['name'];
                    $_FILES['INSERT_FILES']['type'] = $_FILES['INSERT_FILES']['type'];
                    $_FILES['INSERT_FILES']['tmp_name'] = $_FILES['INSERT_FILES']['tmp_name'];
                    $_FILES['INSERT_FILES']['error'] = $_FILES['INSERT_FILES']['error'];
                    $_FILES['INSERT_FILES']['size'] = $_FILES['INSERT_FILES']['size'];
                    $uploadPath = 'uploads/special/';
                    $filePath = $uploadPath . $name;
                    $config['upload_path'] = $uploadPath;
                    $config['allowed_types'] = 'jpg';
                    $this->load->library('upload', $config);
                    $this->upload->initialize($config);
                    if ($this->upload->do_upload('INSERT_FILES')) {
                        $fileData = $this->upload->data();
                        $uploadData['file_name'] = $fileData['file_name'];
                        $uploadData['created'] = date("Y-m-d H:i:s");
                        $uploadData['modified'] = date("Y-m-d H:i:s");
                    }
                }
            }

            $insertData = array(
                'SPECIAL_NAME' => $this->input->post('SPECIAL_NAME'),
                'SUB_TITTLE' => $this->input->post('SUB_TITTLE'),
                'SPECIAL_DESC' => $this->input->post('SPECIAL_DESC'),
                'INSERT_FILES' => $filePath,
                'ACTIVE_STATUS' => isset($_POST['ACTIVE_STATUS']) ? 1 : 0,
                'CRE_BY' => $this->user_session["FLD_USER_ID"],
                'CRE_DT' => date("Y-m-d h:i:s"),
            );

            $insertData = $this->security->xss_clean($insertData);

            if ($this->utilities->insertData($insertData, 'drg_special_prod_cat')) ;
            redirect('MedicineSetup/specializedDepartment');
        }
        $this->load->view("medicineSetup/createSpecializedDepartment");
    }

    public function editSpecializedDepartment($specialD_Id)
    {
        if (!empty($_POST)) {

            // $this->pr($_POST);
            // $this->pr($_FILES['insertFileData']);

            if ($this->input->post('fileSubmit') && !empty($_FILES['INSERT_FILES']['name'])) {
                {
                    $_FILES['INSERT_FILES']['name'] = $name = time() . $_FILES['INSERT_FILES']['name'];
                    $_FILES['INSERT_FILES']['type'] = $_FILES['INSERT_FILES']['type'];
                    $_FILES['INSERT_FILES']['tmp_name'] = $_FILES['INSERT_FILES']['tmp_name'];
                    $_FILES['INSERT_FILES']['error'] = $_FILES['INSERT_FILES']['error'];
                    $_FILES['INSERT_FILES']['size'] = $_FILES['INSERT_FILES']['size'];
                    $uploadPath = 'uploads/special/';
                    $filePath = $uploadPath . $name;
                    $config['upload_path'] = $uploadPath;
                    $config['allowed_types'] = 'jpg';
                    $this->load->library('upload', $config);
                    $this->upload->initialize($config);
                    if ($this->upload->do_upload('INSERT_FILES')) {
                        $fileData = $this->upload->data();
                        $uploadData['file_name'] = $fileData['file_name'];
                        $uploadData['created'] = date("Y-m-d H:i:s");
                        $uploadData['modified'] = date("Y-m-d H:i:s");
                    }
                }
            }
            $fileID = $this->db->query("SELECT INSERT_FILES FROM drg_special_prod_cat WHERE SPECIAL_ID = $specialD_Id;")->row()->INSERT_FILES;

            if (empty($filePath)) {
                $filePath = $fileID;

            }

            $insertData = array(
                'SPECIAL_NAME' => $this->input->post('SPECIAL_NAME'),
                'SUB_TITTLE' => $this->input->post('SUB_TITTLE'),
                'SPECIAL_DESC' => $this->input->post('SPECIAL_DESC'),
                'INSERT_FILES' => $filePath,
                'ACTIVE_STATUS' => isset($_POST['ACTIVE_STATUS']) ? 1 : 0,
                'UPD_BY' => $this->user_session["FLD_USER_ID"],
                'UPD_DT' => date("Y-m-d h:i:s"),
            );
            $insertData = $this->security->xss_clean($insertData);

            if ($this->utilities->updateData('drg_special_prod_cat', $insertData, array('SPECIAL_ID' => $specialD_Id))) {
                $this->session->set_flashdata('success', $this->lang->line('Medicine') . ' ' . $this->lang->line('upd_success'));
            }
            redirect('MedicineSetup/specializedDepartment');
        }
        $data['specialDepartment'] = $this->utilities->findByAttribute('drg_special_prod_cat', array('SPECIAL_ID' => $specialD_Id));

        $this->load->view("medicineSetup/editSpecializedDepartment", $data);
    }

    public function viewSpecializedDepartment($spdId)
    {
        $data['spdDetails'] = $this->utilities->findByAttribute('drg_special_prod_cat', array('SPECIAL_ID' => $spdId)); // all data comes form view table

        $this->load->view('medicineSetup/viewSpecializedDepartment', $data);
    }

    public function deleteSpecializedDepartment($spid)
    {
        if ($this->utilities->deleteRowByAttribute(
            'drg_special_prod_cat', array('SPECIAL_ID' => $spid))
        ) {
            $this->util->resultObject(1, 'special product Deleted Successfully!');
        }
    }


    public function specializedProducts()
    {


        $data['specializedProducts'] = $this->db->query("SELECT SP_MED_ID,SPECIAL_NAME,MEDICINE_NAME,PRODUCT_FET_PHOTO FROM drg_medicine_info dmi LEFT JOIN drg_special_medicine dsm ON dmi.MEDICINE_ID=dsm.MEDICINE_ID
LEFT JOIN drg_special_prod_cat dspc ON dsm.SPECIAL_ID=dspc.SPECIAL_ID WHERE SP_MED_ID = SP_MED_ID")->result();

        $data['content_view_page'] = ('medicineSetup/specializedProducts');
        $this->template->display($data);
    }


    public function createNewSpecializedProducts()
    {
        if (!empty($_POST)) {
            $insertData = array(
                'SPECIAL_ID' => $this->input->post('SPECIAL_ID'),
                'MEDICINE_ID' => $this->input->post('MEDICINE_ID'),

            );
            $insertData = $this->security->xss_clean($insertData);

            if ($this->utilities->insertData($insertData, 'drg_special_medicine')) {
                $this->session->set_flashdata('success', 'Generic Created Successfully');
                redirect('MedicineSetup/specializedProducts');
            }
        }

        $data['special_department_list'] = $this->utilities->dropdownFromTableWithCondition('drg_special_prod_cat', '', 'SPECIAL_ID', 'SPECIAL_NAME');
        $data['special_product_list'] = $this->utilities->dropdownFromTableWithCondition('drg_medicine_info', '', 'MEDICINE_ID', 'MEDICINE_NAME');
        $this->load->view("medicineSetup/createNewSpecializedProducts", $data);
    }

    public function editSpecializedProducts($specialProduct_Id)
    {
        if (!empty($_POST)) {
            $insertData = array(
                'SPECIAL_ID' => $this->input->post('SPECIAL_ID'),
                'MEDICINE_ID' => $this->input->post('MEDICINE_ID'),

            );
            $insertData = $this->security->xss_clean($insertData);

            if ($this->utilities->updateData('drg_special_medicine', $insertData, array('SP_MED_ID' => $specialProduct_Id))) {
                $this->session->set_flashdata('success', $this->lang->line('Medicine') . ' ' . $this->lang->line('upd_success'));
            }
            redirect('MedicineSetup/specializedProducts');
        }
        $data['specialDepartment'] = $this->utilities->findByAttribute('drg_special_medicine', array('SP_MED_ID' => $specialProduct_Id));
        $data['special_department_list'] = $this->utilities->dropdownFromTableWithCondition('drg_special_prod_cat', '', 'SPECIAL_ID', 'SPECIAL_NAME');
        $data['special_product_list'] = $this->utilities->dropdownFromTableWithCondition('drg_medicine_info', '', 'MEDICINE_ID', 'MEDICINE_NAME');
        $this->load->view("medicineSetup/createNewSpecializedProducts", $data);
    }

    public function viewSpecializedProduct($spId)
    {
        // $data['sppDetails'] = $this->utilities->findByAttribute('drg_special_medicine', array('SP_MED_ID' => $spId)); // all data comes form view table

        $data['sppDetails'] = $this->db->query("SELECT SP_MED_ID,dmi.MEDICINE_NAME,dspc.SPECIAL_NAME,dspc.SPECIAL_DESC,dspc.INSERT_FILES,dspc.SUB_TITTLE FROM drg_special_medicine dsm LEFT JOIN drg_special_prod_cat dspc ON dsm.SPECIAL_ID=dspc.SPECIAL_ID
        LEFT JOIN drg_medicine_info dmi ON dsm.MEDICINE_ID=dmi.MEDICINE_ID WHERE dsm.SP_MED_ID = $spId")->row();

        $this->load->view('medicineSetup/viewSpecializedProduct', $data);
    }


    public function deleteSpecializedProduct($spdId)
    {
        if ($this->utilities->deleteRowByAttribute(
            'drg_special_medicine', array('SP_MED_ID' => $spdId))
        ) {
            $this->util->resultObject(1, 'special product Deleted Successfully!');
        }
    }


    public function photoGallery()
    {
        $data['photoGallery'] = $this->db->query("SELECT * FROM image_gallery ig left join image_department id ON ig.PHOTO_GALLERY_ID=id.PHOTO_GALLERY_ID WHERE ig.IMG_ID;")->result();
        $data['content_view_page'] = ('medicineSetup/photogallery');
        $this->template->display($data);
    }


    public function createNewPhoto()
    {
        if (!empty($_POST)) {
            // $this->pr($_POST);
            // $this->pr($_FILES['insertFileData']);
            if ($this->input->post('fileSubmit') && !empty($_FILES['INSERTS_FILES']['name'])) {

                {
                    $name = time() . $_FILES['INSERTS_FILES']['name'];
                    $_FILES['INSERTS_FILES']['name'] = $name;
                    $_FILES['INSERTS_FILES']['type'] = $_FILES['INSERTS_FILES']['type'];
                    $_FILES['INSERTS_FILES']['tmp_name'] = $_FILES['INSERTS_FILES']['tmp_name'];
                    $_FILES['INSERTS_FILES']['error'] = $_FILES['INSERTS_FILES']['error'];
                    $_FILES['INSERTS_FILES']['size'] = $_FILES['INSERTS_FILES']['size'];
                    $uploadPath = 'uploads/photogallery/';
                    $filePath1 = $uploadPath . $name;
                    $config['upload_path'] = $uploadPath;
                    $config['allowed_types'] = 'pdf|jpg|';
                    $this->load->library('upload', $config);
                    $this->upload->initialize($config);
                    if ($this->upload->do_upload('INSERTS_FILES')) {
                        $fileData = $this->upload->data();
                        $uploadData['file_name'] = $fileData['file_name'];
                        $uploadData['created'] = date("Y-m-d H:i:s");
                        $uploadData['modified'] = date("Y-m-d H:i:s");
                    }
                }
            }
            if ($this->input->post('fileSubmit') && !empty($_FILES['IMG_THUMB']['name'])) {

                {
                    $_FILES['IMG_THUMB']['name'] = $name = time() . $_FILES['IMG_THUMB']['name'];
                    $_FILES['IMG_THUMB']['type'] = $_FILES['IMG_THUMB']['type'];
                    $_FILES['IMG_THUMB']['tmp_name'] = $_FILES['IMG_THUMB']['tmp_name'];
                    $_FILES['IMG_THUMB']['error'] = $_FILES['IMG_THUMB']['error'];
                    $_FILES['IMG_THUMB']['size'] = $_FILES['IMG_THUMB']['size'];
                    $uploadPath = 'uploads/photogallery/upload/';
                    $filePath2 = $uploadPath . $name;
                    $config['upload_path'] = $uploadPath;
                    $config['allowed_types'] = 'pdf|jpg|';
                    $this->load->library('upload', $config);
                    $this->upload->initialize($config);
                    if ($this->upload->do_upload('IMG_THUMB')) {
                        $fileData = $this->upload->data();
                        $uploadData['file_name'] = $fileData['file_name'];
                        $uploadData['created'] = date("Y-m-d H:i:s");
                        $uploadData['modified'] = date("Y-m-d H:i:s");
                    }
                }
            }
            $insertData = array(
                'PHOTO_GALLERY_ID' => $this->input->post('PHOTO_GALLERY_ID'),
                'TITTLE' => $this->input->post('TITTLE'),
                'INSERTS_FILES' => $filePath1,
                'IMG_THUMB' => $filePath2,
                'PHOTO_DESC' => $this->input->post('PHOTO_DESC'),
                'ACTIVE_STATUS' => isset($_POST['ACTIVE_STATUS']) ? 1 : 0,
                'CRE_BY' => $this->user_session["FLD_USER_ID"],
                'CRE_DT' => date("Y-m-d h:i:s"),
            );

            $insertData = $this->security->xss_clean($insertData);


            if ($this->utilities->insertData($insertData, 'image_gallery')) ;
            redirect('MedicineSetup/photogallery');
        }
        $data['photogallery'] = $this->db->query("SELECT * FROM image_department WHERE ACTIVE_STATUS = 'Y'")->result();
        $data['Therapeutic_list'] = $this->utilities->dropdownFromTableWithCondition('drg_therapeutic_group', '', 'TH_GRP_ID', 'TH_GRP_NAME');
        $this->load->view("medicineSetup/createNewPhoto", $data);
    }

    public function viewPhotoGallery($pgId)
    {
        $data['pgDetails'] = $this->db->query("SELECT * FROM image_gallery ig LEFT JOIN image_department id ON ig.PHOTO_GALLERY_ID=id.PHOTO_GALLERY_ID WHERE ig.IMG_ID = $pgId;")->row(); // all data comes form view table
        $this->load->view('medicineSetup/viewPhotoGallery', $data);
    }

    public function editPhotoGallery($photoGellery_Id)
    {
        if (!empty($_POST)) {
            // $this->pr($_POST);
            // $this->pr($_FILES['insertFileData']);
            if ($this->input->post('fileSubmit') && !empty($_FILES['INSERTS_FILES']['name'])) {

                {
                    $_FILES['INSERTS_FILES']['name'] = $name = time() . $_FILES['INSERTS_FILES']['name'];
                    $_FILES['INSERTS_FILES']['type'] = $_FILES['INSERTS_FILES']['type'];
                    $_FILES['INSERTS_FILES']['tmp_name'] = $_FILES['INSERTS_FILES']['tmp_name'];
                    $_FILES['INSERTS_FILES']['error'] = $_FILES['INSERTS_FILES']['error'];
                    $_FILES['INSERTS_FILES']['size'] = $_FILES['INSERTS_FILES']['size'];
                    $uploadPath = 'uploads/photogallery/';
                    $filePath1 = $uploadPath . $name;
                    $config['upload_path'] = $uploadPath;
                    $config['allowed_types'] = 'pdf|jpg|';
                    $this->load->library('upload', $config);
                    $this->upload->initialize($config);
                    if ($this->upload->do_upload('INSERTS_FILES')) {
                        $fileData = $this->upload->data();
                        $uploadData['file_name'] = $fileData['file_name'];
                        $uploadData['created'] = date("Y-m-d H:i:s");
                        $uploadData['modified'] = date("Y-m-d H:i:s");
                    }
                }
            }

            if ($this->input->post('fileSubmit') && !empty($_FILES['IMG_THUMB']['name'])) {

                {
                    $_FILES['IMG_THUMB']['name'] = $name = time() . $_FILES['IMG_THUMB']['name'];
                    $_FILES['IMG_THUMB']['type'] = $_FILES['IMG_THUMB']['type'];
                    $_FILES['IMG_THUMB']['tmp_name'] = $_FILES['IMG_THUMB']['tmp_name'];
                    $_FILES['IMG_THUMB']['error'] = $_FILES['IMG_THUMB']['error'];
                    $_FILES['IMG_THUMB']['size'] = $_FILES['IMG_THUMB']['size'];
                    $uploadPath = 'uploads/photogallery/upload/';
                    $filePath2 = $uploadPath . $name;
                    $config['upload_path'] = $uploadPath;
                    $config['allowed_types'] = 'pdf|jpg|';
                    $this->load->library('upload', $config);
                    $this->upload->initialize($config);
                    if ($this->upload->do_upload('INSERTS_FILES')) {
                        $fileData = $this->upload->data();
                        $uploadData['file_name'] = $fileData['file_name'];
                        $uploadData['created'] = date("Y-m-d H:i:s");
                        $uploadData['modified'] = date("Y-m-d H:i:s");
                    }
                }
            }

            $filePath1ID = $this->db->query("SELECT INSERTS_FILES FROM image_gallery WHERE IMG_ID = $photoGellery_Id;")->row()->INSERTS_FILES;

            if (empty($filePath1)) {
                $filePath1 = $filePath1ID;

            }
            $filePath2ID = $this->db->query("SELECT IMG_THUMB FROM image_gallery WHERE IMG_ID = $photoGellery_Id;")->row()->IMG_THUMB;

            if (empty($filePath2)) {
                $filePath2 = $filePath2ID;

            }

            $insertData = array(
                'PHOTO_GALLERY_ID' => $this->input->post('PHOTO_GALLERY_ID'),
                'TITTLE' => $this->input->post('TITTLE'),
                'INSERTS_FILES' => $filePath1,
                'IMG_THUMB' => $filePath2,
                'PHOTO_DESC' => $this->input->post('PHOTO_DESC'),
                'ACTIVE_STATUS' => isset($_POST['ACTIVE_STATUS']) ? 1 : 0,
                'UPD_BY' => $this->user_session["FLD_USER_ID"],
                'UPD_DT' => date("Y-m-d h:i:s"),
            );
            $insertData = $this->security->xss_clean($insertData);

            if ($this->utilities->updateData('image_gallery', $insertData, array('IMG_ID' => $photoGellery_Id))) {
                $this->session->set_flashdata('success', $this->lang->line('Medicine') . ' ' . $this->lang->line('upd_success'));
            }
            redirect('MedicineSetup/photoGallery');

        }
        $data['photogallery'] = $this->utilities->findByAttribute('image_gallery', array('IMG_ID' => $photoGellery_Id));
        $data['photogallery1'] = $this->db->query("SELECT * FROM image_department WHERE ACTIVE_STATUS = 'Y'")->result();
        $data['Therapeutic_list'] = $this->utilities->dropdownFromTableWithCondition('drg_therapeutic_group', '', 'TH_GRP_ID', 'TH_GRP_NAME');

        $this->load->view("medicineSetup/editPhotoGallery", $data);

    }


    public function deletePhotoGallery($pg)
    {
        if ($this->utilities->deleteRowByAttribute(
            'image_gallery', array('IMG_ID' => $pg))
        ) {
            $this->util->resultObject(1, 'Medicine Deleted Successfully!');
        }
    }


    public function globalAchivement()
    {

        $data['achivement'] = $this->db->query("SELECT * FROM drg_global_achivement ORDER BY ACHIVEMENT_ID DESC")->result();
        $data['content_view_page'] = ('medicineSetup/globalAchivement');
        $this->template->display($data);
    }

    public function createNewAchivement()
    {

        if (!empty($_POST)) {

            // $this->pr($_POST);
            // $this->pr($_FILES['insertFileData']);

            if ($this->input->post('fileSubmit') && !empty($_FILES['INSERT_FILES']['name'])) {
                {
                    $_FILES['INSERT_FILES']['name'] = $name = time() . $_FILES['INSERT_FILES']['name'];
                    $_FILES['INSERT_FILES']['type'] = $_FILES['INSERT_FILES']['type'];
                    $_FILES['INSERT_FILES']['tmp_name'] = $_FILES['INSERT_FILES']['tmp_name'];
                    $_FILES['INSERT_FILES']['error'] = $_FILES['INSERT_FILES']['error'];
                    $_FILES['INSERT_FILES']['size'] = $_FILES['INSERT_FILES']['size'];
                    $uploadPath = 'uploads/achivement/';
                    $filePath = $uploadPath . $name;
                    $config['upload_path'] = $uploadPath;
                    $config['allowed_types'] = 'jpg';
                    $this->load->library('upload', $config);
                    $this->upload->initialize($config);
                    if ($this->upload->do_upload('INSERT_FILES')) {
                        $fileData = $this->upload->data();
                        $uploadData['file_name'] = $fileData['file_name'];
                        $uploadData['created'] = date("Y-m-d H:i:s");
                        $uploadData['modified'] = date("Y-m-d H:i:s");
                    }
                }
            }
            if ($this->input->post('fileSubmit') && !empty($_FILES['INSERTS_PDF']['name'])) {
                $_FILES['INSERTS_PDF']['name'] = $name2 = time() . $_FILES['INSERTS_PDF']['name'];
                $_FILES['INSERTS_PDF']['type'] = $_FILES['INSERTS_PDF']['type'];
                $_FILES['INSERTS_PDF']['tmp_name'] = $_FILES['INSERTS_PDF']['tmp_name'];
                $_FILES['INSERTS_PDF']['error'] = $_FILES['INSERTS_PDF']['error'];
                $_FILES['INSERTS_PDF']['size'] = $_FILES['INSERTS_PDF']['size'];
                $uploadPath = 'uploads/achivementpdf/';
                $insertpdffilePath = $uploadPath . $name2;
                $config['upload_path'] = $uploadPath;
                $config['allowed_types'] = 'pdf';
                $config['max_size'] = '100000';
                $this->load->library('upload', $config);
                $this->upload->initialize($config);
                if ($this->upload->do_upload('INSERTS_PDF')) {
                    $fileData3 = $this->upload->data();
                    $uploadData['file_name'] = $fileData3['file_name'];
                    $uploadData['created'] = date("Y-m-d H:i:s");
                    $uploadData['modified'] = date("Y-m-d H:i:s");
                }
            }
            $insertData = array(
                'ACHIVEMENT_DESC' => $this->input->post('ACHIVEMENT_DESC'),
                'INSERT_FILES' => $filePath,
                'INSERTS_PDF' => $insertpdffilePath,
                'ACTIVE_STATUS' => isset($_POST['ACTIVE_STATUS']) ? 1 : 0,
                'CRE_BY' => $this->user_session["FLD_USER_ID"],
                'CRE_DT' => date("Y-m-d h:i:s"),
            );
            $insertData = $this->security->xss_clean($insertData);

            if ($this->utilities->insertData($insertData, 'drg_global_achivement')) ;
            redirect('MedicineSetup/globalAchivement');
        }
        $this->load->view("medicineSetup/createNewAchivement");
    }

    public function editNewAchivement($achiment_Id)
    {
        if (!empty($_POST)) {
            // $this->pr($_POST);
            // $this->pr($_FILES['insertFileData']);

            if ($this->input->post('fileSubmit') && !empty($_FILES['INSERT_FILES']['name'])) {
                {
                    $_FILES['INSERT_FILES']['name'] = $name = time() . $_FILES['INSERT_FILES']['name'];
                    $_FILES['INSERT_FILES']['type'] = $_FILES['INSERT_FILES']['type'];
                    $_FILES['INSERT_FILES']['tmp_name'] = $_FILES['INSERT_FILES']['tmp_name'];
                    $_FILES['INSERT_FILES']['error'] = $_FILES['INSERT_FILES']['error'];
                    $_FILES['INSERT_FILES']['size'] = $_FILES['INSERT_FILES']['size'];
                    $uploadPath = 'uploads/achivement/';
                    $filePath = $uploadPath . $name;
                    $config['upload_path'] = $uploadPath;
                    $config['allowed_types'] = 'jpg';
                    $this->load->library('upload', $config);
                    $this->upload->initialize($config);
                    if ($this->upload->do_upload('INSERT_FILES')) {
                        $fileData = $this->upload->data();
                        $uploadData['file_name'] = $fileData['file_name'];
                        $uploadData['created'] = date("Y-m-d H:i:s");
                        $uploadData['modified'] = date("Y-m-d H:i:s");
                    }
                }
            }
            if ($this->input->post('fileSubmit') && !empty($_FILES['INSERTS_PDF']['name'])) {
                $_FILES['INSERTS_PDF']['name'] = $name2 = time() . $_FILES['INSERTS_PDF']['name'];
                $_FILES['INSERTS_PDF']['type'] = $_FILES['INSERTS_PDF']['type'];
                $_FILES['INSERTS_PDF']['tmp_name'] = $_FILES['INSERTS_PDF']['tmp_name'];
                $_FILES['INSERTS_PDF']['error'] = $_FILES['INSERTS_PDF']['error'];
                $_FILES['INSERTS_PDF']['size'] = $_FILES['INSERTS_PDF']['size'];
                $uploadPath = 'uploads/achivementpdf/';
                $insertpdffilePath = $uploadPath . $name2;
                $config['upload_path'] = $uploadPath;
                $config['allowed_types'] = 'pdf';
                $config['max_size'] = '100000000000';
                $this->load->library('upload', $config);
                $this->upload->initialize($config);
                if ($this->upload->do_upload('INSERTS_PDF')) {
                    $fileData3 = $this->upload->data();
                    $uploadData['file_name'] = $fileData3['file_name'];
                    $uploadData['created'] = date("Y-m-d H:i:s");
                    $uploadData['modified'] = date("Y-m-d H:i:s");
                }
            }

            $filepathID = $this->db->query("SELECT INSERT_FILES FROM drg_global_achivement WHERE ACHIVEMENT_ID = $achiment_Id;")->row()->INSERT_FILES;

            if (empty($filePath)) {
                $filePath = $filepathID;

            }
            $insertfileID = $this->db->query("SELECT INSERTS_PDF FROM drg_global_achivement WHERE ACHIVEMENT_ID = $achiment_Id;")->row()->INSERTS_PDF;

            if (empty($insertpdffilePath)) {
                $insertpdffilePath = $insertfileID;

            }
            $insertData = array(
                'ACHIVEMENT_DESC' => $this->input->post('ACHIVEMENT_DESC'),
                'INSERT_FILES' => $filePath,
                'INSERTS_PDF' => $insertpdffilePath,
                'ACTIVE_STATUS' => isset($_POST['ACTIVE_STATUS']) ? 1 : 0,
                'UPD_BY' => $this->user_session["FLD_USER_ID"],
                'UPD_DT' => date("Y-m-d h:i:s"),
            );
            $insertData = $this->security->xss_clean($insertData);

            if ($this->utilities->updateData('drg_global_achivement', $insertData, array('ACHIVEMENT_ID' => $achiment_Id))) {
                $this->session->set_flashdata('success', $this->lang->line('Medicine') . ' ' . $this->lang->line('upd_success'));
            }
            redirect('medicineSetup/globalAchivement');


        }
        $data['achiventDetails'] = $this->utilities->findByAttribute('drg_global_achivement', array('ACHIVEMENT_ID' => $achiment_Id));
        $this->load->view("medicineSetup/editNewAchivement", $data);
    }

    public function viewAchivement($AmId)
    {
        $data['achivementDetails'] = $this->utilities->findByAttribute('drg_global_achivement', array('ACHIVEMENT_ID' => $AmId)); // all data comes form view table
        $this->load->view('medicineSetup/viewAchivement', $data);
    }

    public function deleteAchivement($achivementId)
    {
        if ($this->utilities->deleteRowByAttribute(
            'drg_global_achivement', array('ACHIVEMENT_ID' => $achivementId))
        ) {
            $this->util->resultObject(1, 'Home Slider Deleted Successfully!');
        }
    }

    public function homeSlider()
    {


        $data['homeSlider'] = $this->db->query("SELECT * FROM home_slider ORDER BY HOME_SLIDER_ID DESC")->result();

        $data['content_view_page'] = ('medicineSetup/homeSlider');
        $this->template->display($data);
    }

    public function createNewHomeSlider()
    {
        if (!empty($_POST)) {
            // $this->pr($_POST);
            // $this->pr($_FILES['insertFileData']);

            if ($this->input->post('fileSubmit') && !empty($_FILES['INSERT_FILES']['name'])) {
                {
                    $_FILES['INSERT_FILES']['name'] = $name = time() . $_FILES['INSERT_FILES']['name'];
                    $_FILES['INSERT_FILES']['type'] = $_FILES['INSERT_FILES']['type'];
                    $_FILES['INSERT_FILES']['tmp_name'] = $_FILES['INSERT_FILES']['tmp_name'];
                    $_FILES['INSERT_FILES']['error'] = $_FILES['INSERT_FILES']['error'];
                    $_FILES['INSERT_FILES']['size'] = $_FILES['INSERT_FILES']['size'];
                    $uploadPath = 'uploads/slider/';
                    $filePath = $uploadPath . $name;
                    $config['upload_path'] = $uploadPath;
                    $config['allowed_types'] = 'jpg';
                    $this->load->library('upload', $config);
                    $this->upload->initialize($config);
                    if ($this->upload->do_upload('INSERT_FILES')) {
                        $fileData = $this->upload->data();
                        $uploadData['file_name'] = $fileData['file_name'];
                        $uploadData['created'] = date("Y-m-d H:i:s");
                        $uploadData['modified'] = date("Y-m-d H:i:s");
                    }
                }
            }

            $insertData = array(
                'SLIDER_DESC' => $this->input->post('SLIDER_DESC'),
                'INSERT_FILES' => $filePath,
                'ACTIVE_STATUS' => isset($_POST['ACTIVE_STATUS']) ? 1 : 0,
                'CRE_BY' => $this->user_session["FLD_USER_ID"],
                'CRE_DT' => date("Y-m-d h:i:s"),
            );

            $insertData = $this->security->xss_clean($insertData);

            if ($this->utilities->insertData($insertData, 'home_slider')) ;
            redirect('MedicineSetup/homeSlider');
        }
        $this->load->view("medicineSetup/createNewHomeSlider");
    }

    public function editHomeSlider($homeslider_Id)
    {
        if (!empty($_POST)) {

            // $this->pr($_POST);
            // $this->pr($_FILES['insertFileData']);

            if ($this->input->post('fileSubmit') && !empty($_FILES['INSERT_FILES']['name'])) {
                {
                    $_FILES['INSERT_FILES']['name'] = $name = time() . $_FILES['INSERT_FILES']['name'];
                    $_FILES['INSERT_FILES']['type'] = $_FILES['INSERT_FILES']['type'];
                    $_FILES['INSERT_FILES']['tmp_name'] = $_FILES['INSERT_FILES']['tmp_name'];
                    $_FILES['INSERT_FILES']['error'] = $_FILES['INSERT_FILES']['error'];
                    $_FILES['INSERT_FILES']['size'] = $_FILES['INSERT_FILES']['size'];
                    $uploadPath = 'uploads/slider/';
                    $filePath = $uploadPath . $name;
                    $config['upload_path'] = $uploadPath;
                    $config['allowed_types'] = 'jpg';
                    $this->load->library('upload', $config);
                    $this->upload->initialize($config);
                    if ($this->upload->do_upload('INSERT_FILES')) {
                        $fileData = $this->upload->data();
                        $uploadData['file_name'] = $fileData['file_name'];
                        $uploadData['created'] = date("Y-m-d H:i:s");
                        $uploadData['modified'] = date("Y-m-d H:i:s");
                    }
                }
            }

            $filePID = $this->db->query("SELECT INSERT_FILES FROM home_slider WHERE HOME_SLIDER_ID = $homeslider_Id;")->row()->INSERT_FILES;

            if (empty($filePath)) {
                $filePath = $filePID;

            }
            $insertData = array(
                'SLIDER_DESC' => $this->input->post('SLIDER_DESC'),
                'INSERT_FILES' => $filePath,
                'ACTIVE_STATUS' => isset($_POST['ACTIVE_STATUS']) ? 1 : 0,
                'UPD_BY' => $this->user_session["FLD_USER_ID"],
                'UPD_DT' => date("Y-m-d h:i:s"),
            );

            $insertData = $this->security->xss_clean($insertData);

            if ($this->utilities->updateData('home_slider', $insertData, array('HOME_SLIDER_ID' => $homeslider_Id))) {
                $this->session->set_flashdata('success', $this->lang->line('Medicine') . ' ' . $this->lang->line('upd_success'));
            }
            redirect('MedicineSetup/homeSlider');
        }
        $data['hsdetails'] = $this->utilities->findByAttribute('home_slider', array('HOME_SLIDER_ID' => $homeslider_Id));
        $this->load->view("medicineSetup/editHomeSlider", $data);
    }

    public function viewHomeSlider($hmId)
    {
        $data['homeSliderDetails'] = $this->utilities->findByAttribute('home_slider', array('HOME_SLIDER_ID' => $hmId)); // all data comes form view table
        $this->load->view('medicineSetup/viewHomeSlider', $data);
    }

    public function deleteHomeSlider($sliderid)
    {
        if ($this->utilities->deleteRowByAttribute(
            'home_slider', array('HOME_SLIDER_ID' => $sliderid))
        ) {
            $this->util->resultObject(1, 'Home Slider Deleted Successfully!');
        }
    }

    public function UnitofMeasurement()
    {

        $data['unitOM'] = $this->db->query("SELECT * FROM drg_uom ORDER BY UOM_ID DESC")->result();
        $data['content_view_page'] = ('medicineSetup/unitofMeasurment');
        $this->template->display($data);
    }

    public function createNewUom()
    {
        if (!empty($_POST)) {
            $uomData = array(
                'UOM_NAME' => $this->input->post('UOM_NAME'),
                'ACTIVE_STATUS' => isset($_POST['ACTIVE_STATUS']) ? 1 : 0,
                'CRE_BY' => $this->user_session["FLD_USER_ID"],
                'CRE_DT' => date("Y-m-d h:i:s"),
            );
            $uomData = $this->security->xss_clean($uomData);

            if ($this->utilities->insertData($uomData, 'drg_uom')) {
                $this->session->set_flashdata('success', 'Uom Created Successfully');
                redirect('MedicineSetup/UnitofMeasurement');
            }
        }
        $this->load->view("medicineSetup/createNewUOM");


    }

    public function editUom($UomID)
    {

        if (isset($_POST['UOM_ID'])) {
            $Uom = array(
                'UOM_NAME' => $this->input->post('UOM_NAME'),
                'ACTIVE_STATUS' => isset($_POST['ACTIVE_STATUS']) ? 1 : 0,
                'UPD_BY' => $this->user_session["FLD_USER_ID"],
                'UPD_DT' => date("Y-m-d:H-i-s"),
            );

            $Uom = $this->security->xss_clean($Uom);
            if ($this->utilities->updateData('drg_uom', $Uom, array('UOM_ID' => $UomID))) {
                $this->session->set_flashdata('success', $this->lang->line('Uom') . ' ' . $this->lang->line('upd_success'));
                redirect('medicineSetup/UnitofMeasurement');
            }
        }
        $data['Uom_details'] = $this->utilities->findByAttribute('drg_uom', array('UOM_ID' => $UomID));
        $this->load->view("medicineSetup/editUom", $data);


    }

    public function viewUom($uomId)
    {
        $data['uomDetails'] = $this->utilities->findByAttribute('drg_uom', array('UOM_ID' => $uomId)); // all data comes form view table
        $this->load->view('medicineSetup/viewUom', $data);
    }

    public function deleteUom($UomID)
    {
        if ($this->utilities->deleteRowByAttribute(
            'drg_uom', array('UOM_ID' => $UomID))
        ) {
            $this->util->resultObject(1, 'Uom Deleted Successfully!');
        }
    }

    public function MedicineType()
    {

        $data['mtDetails'] = $this->db->query("SELECT * FROM drg_medicine_type ORDER BY TYPE_ID DESC")->result();
        $data['content_view_page'] = ('medicineSetup/medicineType');
        $this->template->display($data);
    }

    public function createMedicineType()
    {
        if (!empty($_POST)) {
            $typeData = array(
                'TYPE_NAME' => $this->input->post('TYPE_NAME'),
                'ACTIVE_STATUS' => isset($_POST['ACTIVE_STATUS']) ? 1 : 0,
                'CRE_BY' => $this->user_session["FLD_USER_ID"],
                'CRE_DT' => date("Y-m-d h:i:s"),
            );
            $typeData = $this->security->xss_clean($typeData);

            if ($this->utilities->insertData($typeData, 'drg_medicine_type')) {
                $this->session->set_flashdata('success', 'Type Created Successfully');
                redirect('MedicineSetup/medicineType');
            }
        }
        $this->load->view("medicineSetup/createMedicineType");


    }

    public function editMedicineType($typeID)
    {

        if (isset($_POST['TYPE_ID'])) {
            $typeData = array(
                'TYPE_NAME' => $this->input->post('TYPE_NAME'),
                'ACTIVE_STATUS' => isset($_POST['ACTIVE_STATUS']) ? 1 : 0,
                'UPD_BY' => $this->user_session["FLD_USER_ID"],
                'UPD_DT' => date("Y-m-d:H-i-s"),
            );

            $typeData = $this->security->xss_clean($typeData);
            if ($this->utilities->updateData('drg_medicine_type', $typeData, array('TYPE_ID' => $typeID))) {
                $this->session->set_flashdata('success', $this->lang->line('Uom') . ' ' . $this->lang->line('upd_success'));
                redirect('medicineSetup/medicineType');
            }
        }
        $data['typeDetails'] = $this->utilities->findByAttribute('drg_medicine_type', array('TYPE_ID' => $typeID));
        $this->load->view("medicineSetup/editMedicineType", $data);


    }

    public function viewMedicineType($typeId)
    {
        $data['typeDetails'] = $this->utilities->findByAttribute('drg_medicine_type', array('TYPE_ID' => $typeId)); // all data comes form view table
        $this->load->view('medicineSetup/viewMedicineType', $data);
    }

    public function deleteMedicineType($typeID)
    {
        if ($this->utilities->deleteRowByAttribute(
            'drg_medicine_type', array('TYPE_ID' => $typeID))
        ) {
            $this->util->resultObject(1, 'TYPE Deleted Successfully!');
        }
    }


}
