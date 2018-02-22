<div class="col-sm-3 sidebar">
	<div class="list-group">
        <a href="<?php echo base_url(); ?>page_controller/formulation" class="list-group-item"><i class="fa fa-angle-right" aria-hidden="true"></i>Factory Unit - 1</a>
        <a href="<?php echo base_url(); ?>page_controller/formulation2" class="list-group-item"><i class="fa fa-angle-right" aria-hidden="true"></i>Factory Unit - 2</a>
        <a href="<?php echo base_url(); ?>page_controller/unit_3" class="list-group-item"><i class="fa fa-angle-right" aria-hidden="true"></i>Factory Unit - 3</a>
	  	<a href="<?php echo base_url();?>page_controller/production_facility" class="list-group-item"><i class="fa fa-angle-right" aria-hidden="true"></i>Production Facility</a>
	  	<a href="<?php echo base_url();?>page_controller/oncology" class="list-group-item"><i class="fa fa-angle-right" aria-hidden="true"></i>Oncology Unit</a>
	  	<a href="<?php echo base_url(); ?>page_controller/hu" class="list-group-item"><i class="fa fa-angle-right" aria-hidden="true"></i>Herbal &amp; Unani Unit</a>
	  	<a href="<?php echo base_url();?>page_controller/research" class="list-group-item"><i class="fa fa-angle-right" aria-hidden="true"></i>Research and Development</a>
	  	<a href="<?php echo base_url();?>page_controller/ware_house" class="list-group-item"><i class="fa fa-angle-right" aria-hidden="true"></i>Ware House</a>
	  	<a href="<?php echo base_url();?>page_controller/virtual" class="list-group-item"><i class="fa fa-angle-right" aria-hidden="true"></i>Virtual Tour</a>
	 <?php
        $imgUnit = $this->db->query("SELECT PHOTO_GALLERY_ID,DEPARTMENT_NAME FROM image_department i WHERE ACTIVE_STATUS='Y';")->result();
        foreach
        ($imgUnit as $pi) {
            ?>
            <a href="<?php echo base_url(); ?>page_controller/pg_unit1/<?php echo $pi->PHOTO_GALLERY_ID?>" class="list-group-item"><i class="fa fa-angle-right" aria-hidden="true"></i><?php echo $pi->DEPARTMENT_NAME;?></a>

        <?php }
        ?>
	</div>
</div>
