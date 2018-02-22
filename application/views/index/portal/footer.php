


<footer id="footer" class="sec-padding">
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-12 col-md-5">
                <div class="quick-link">
                    <h3><span>Quick links</span></h3>
                </div>
            </div>
        </div>
        <div class="row">

            <div class=" col-sm-6 col-md-2 footer-widget">
                <div class="pl-30">
                    <div class="title">
                        <h3><span>Facility</span></h3>
                    </div>
                    <ul class="link-list">
                        <li><a href="<?php echo base_url(); ?>page_controller/formulation">Factory (Unit - 01)</a></li>
                        <li><a href="<?php echo base_url(); ?>page_controller/formulation2">Factory (Unit - 02)</a></li>
                        <li><a href="<?php echo base_url(); ?>page_controller/unit_3">Factory (Unit - 03)</a></li>
                        <li><a href="<?php echo base_url(); ?>page_controller/production_facility">Production Facility</a></li>
                        <li><a href="<?php echo base_url(); ?>page_controller/oncology">Oncology Unit</a></li>
                        <li><a href="<?php echo base_url(); ?>page_controller/hu">Herbal &amp; Unani Unit</a></li>
                        <li><a href="<?php echo base_url(); ?>page_controller/virtual">Virtual Tour</a></li>
                        <?php
                        $imgUnit = $this->db->query("SELECT PHOTO_GALLERY_ID,DEPARTMENT_NAME FROM image_department i WHERE ACTIVE_STATUS='Y';;")->result();
                        foreach
                        ($imgUnit as $pi) {
                            ?>
                            <li>
                            <a href="<?php echo base_url(); ?>page_controller/pg_unit1/<?php echo $pi->PHOTO_GALLERY_ID?>"><?php echo $pi->DEPARTMENT_NAME;?></a>
                            </li>
                        <?php }
                            ?>
                    </ul>
                </div>
            </div>

                <div class=" col-sm-6 col-md-3 footer-widget">
                    <div class="title">
                        <h3><span>Products</span></h3>
                    </div>
                    <ul class="link-list">
                        <li><a href="<?php echo base_url(); ?>page_controller/product_by_trade">Product By Brand Name</a></li>
                        <li><a href="<?php echo base_url(); ?>page_controller/product_by_generic">Product By Generic Name</a></li>
                        <li><a href="<?php echo base_url(); ?>page_controller/product_by_therapetic">Product By Therapeutic Class</a></li>
                        <li><a href="<?php echo base_url(); ?>page_controller/herbal_product">Herbal</a></li>
                        <li><a href="<?php echo base_url(); ?>page_controller/herbal_product">Unani</a></li>
                        <li><a href="<?php echo base_url(); ?>page_controller/Oncology_product">Oncology Products</a></li>
                        <li><a href="<?php echo base_url(); ?>uploads\pdf\Product-list-drug.pdf" target="_blank">All Products List</a></li>
                    </ul>
                </div>

                <div class=" col-sm-6 col-md-3 footer-widget">
                    <div class="title">
                        <h3><span>Contact</span></h3>
                    </div>

                    <ul class="contact-infos">
                        <li>
                            <div class="text-box">
                                <p>Khwaja Enayetpuri (R) Tower <br>
                                    17, Bir Uttam K.M. Shafiullah Road (Green Road),<br>
                                    Dhaka-1205, Bangladesh<br>
                                    Tel: (880) 2 9662611-4, 9670257, 9671283<br>
                                    Fax: (880) 2 9671453<br>
                                    E-mail: info@drug-international.com<br>
                                    Web: www.drug-international.com
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>

            <div class=" col-sm-6 col-md-4 footer-widget">
                <div class="title">
                    <h3><span>Location</span></h3>
                </div>
                <div class="map2">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.1167504101704!2d90.38244416444594!3d23.74321573459287!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b9dc473895%3A0xe137ed4c358afb5a!2sKhwaja+Enayetpuri+(R)+Tower%2C+17+Green+Rd%2C+Dhaka+1205!5e0!3m2!1sbn!2sbd!4v1503474950962" width="100%" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>
                </div>
            </div>
        </div>
    </div>
</footer>

<section class="bottom-bar">
    <div class="container clearfix">
        <div class="pull-left">
            <p>Copyright © <span>Drug International Ltd.</span> <?php echo  date("Y")  ;?> <a href="http://atilimited.net">Designed and Developed by ATI Limited.</a> </p>
        </div>
    </div>
</section>
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
        <script>window.jQuery || document.write('<script src="<?php echo base_url();?>resource/js/vendor/jquery-1.11.2.min.js"><\/script>')</script>
        <script async defersrc ="https://maps.googleapis.com/maps/api/js?key=AIzaSyAuHTOYzw6B_kQ8hWriDnCkFXa3Y5L6LuU
            &callback=initMap"></script>
        <script src="<?php echo base_url();?>resource/js/contact.js"></script>
        <script src="<?php echo base_url();?>resource/js/vendor/bootstrap.min.js"></script>
        <script src='https://www.google.com/recaptcha/api.js'></script>
        <script src="<?php echo base_url();?>resource/js/bootstrap-dropdownhover.min.js"></script>
        <script src="<?php echo base_url();?>resource/js/jquery.fancybox.min.js"></script>
        <script src="<?php echo base_url();?>resource/js/multislider.min.js"></script>
        <script src="<?php echo base_url();?>resource/js/simple-lightbox.min.js"></script>
        <script src="<?php echo base_url();?>resource/js/plugins.js"></script>
        <script src="<?php echo base_url();?>resource/js/main.js"></script>
    </body>
</html>
