<?php

$this->load->view("portal/header.php");

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

                $this->load->view("portal/about_sidebar.php");

                ?>
                <div class="col-sm-9 mission-content">
                    <h2>Mission Statement of Drug International Limited</h2>
                    <p>Drug international Ltd. believes their mission is to ensure better life through better medicine
                        and the patients to lead a healthier life.</p>

                    <h4>Mission Statement &amp; Vision</h4>
                    <ul class="right-arrow">
                        <li>Adherence to the GMP regulations</li>
                        <li>Quality Assurance medicines throughout manufacturing operations</li>
                        <li>To Have strict SOP for assurance of the identity, strength, quality, and purity of drug
                            products
                        </li>
                        <li>To deliver medicine to patients in best form of dose and efficacy</li>
                    </ul>

                    <h4>Strategies</h4>
                    <p>Drug International Limited since its inception adopted and established strong quality management
                        systems, from procuring raw material to delivery. The management of the company has always
                        emphasized on procurement of the raw material from the best source with appropriate quality. The
                        managements’ top priority was to establish robust SOP in order to detect and investigate product
                        quality and maintaining reliability by testing in its laboratory for any quality deviations.</p>

                    <p>For continuous improvement, the company had been vigilant and proactive in adopting modern
                        technologies, scientifically sound design, processing methods, and testing procedures in order
                        to achieve higher quality.</p>

                    <h4>Marketing strategies of Drug International Limited</h4>
                    <ul class="right-arrow">
                        <li>Identifying effective products for local markets</li>
                        <li>Development of the product and service portfolio</li>
                        <li>Ensuring timely and targeted communication by using modern information technology</li>
                        <li>Providing quality medicine to the remotest corners of the country</li>
                    </ul>

                    <p>DIL has created full time employment for Doctors, Chemists, Pharmacists, Engineers, Technicians
                        and others professionals. </p>

                    <p>Drug international Limited is committed to bring together qualified personnel to build an
                        effective organization for delivering quality service and products to its customers and
                        patients.</p>
                </div>
            </div>
        </div>
    </section>


<?php

$this->load->view("portal/footer.php");

?>