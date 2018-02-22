<?php

$this->load->view("index/portal/header.php");

?>
    <section class="header-banner">
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-6">
                    <div class="banner-box">
                        <h1 class="">Management</h1>
                        <ul class="breadcumb">
                            <li><a href="index.php"><i class="fa fa-home fa-2x"></i> Home</a></li>
                            <li><a href="">About Us</a></li>
                            <li><span>Management</span></li>
                        </ul>
                    </div>
                </div>
                <div class="col-sm-6">

                </div>
            </div>
        </div>
    </section>
    <section id="management">
        <div class="container-fluid">
            <div class="row">

                <?php

                $this->load->view("index/portal/about_sidebar.php");

                ?>
                <div class="col-sm-9 sister-content">

                    <table class="table table-striped table-bordered">

                        <tbody>
                        <tr>
                            <th colspan="2">Sister Conserns</th>
                        </tr>
                        <tr>
                            <td><a href=""><img src="<?php echo base_url();?>resource/img/companies/dil.jpg" class="img-responsive"></a></td>
                            <td><a href=""><img src="<?php echo base_url();?>resource/img/companies/dihl.jpg" class="img-responsive"></a></td>

                        </tr>
                        <tr>
                            <td><a href="http://kyau.edu.bd/2017/" target="_blank"><img src="<?php echo base_url();?>resource/img/companies/kyau.jpg" class="img-responsive"></a></td>

                            <td><a href="http://kyamch.org/newsite/" target="_blank"><img src="<?php echo base_url();?>resource/img/companies/kyamch.jpg" class="img-responsive"></a></td>

                        </tr>
                        <tr>
                            <td><a href=""><img src="<?php echo base_url();?>resource/img/companies/dihl.jpg" class="img-responsive"></a></td>
                            <td><a href="http://atilimited.net/web/" target="_blank"><img src="<?php echo base_url();?>resource/img/companies/atil.jpg" class="img-responsive"></a></td>

                        </tr>
                        <tr>
                            <td><a href=""><img src="<?php echo base_url();?>resource/img/companies/mmte.jpg" class="img-responsive"></a></td>
                            <td><a href=""><img src="<?php echo base_url();?>resource/img/companies/atic.jpg" class="img-responsive"></a></td>
                        </tr>
                        <tr>

                            <td><a href=""><img src="<?php echo base_url();?>resource/img/companies/atic.jpg" class="img-responsive"></a></td>
                            <td><a href="" class="harnest">HARNEST LABEL INDUSTRIES LTD.</a></td>
                        </tr>



                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    </section>

<?php
$this->load->view("index/portal/footer.php");

?>