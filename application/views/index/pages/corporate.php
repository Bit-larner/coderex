<?php

$this->load->view("index/portal/header.php");
$this->load->view("index/portal/banner.php");


?>

    <section id="company">
        <div class="container">
            <div class="row">
                <?php
                $this->load->view("index/portal/about_sidebar.php");

                ?>
                <div class="col-sm-9 corporate">
                    <h3>Corporate Social Responsibility</h3>
                    <p>

                        Out of social and business obligation, the group established the following institutes as
                        Corporate Social Responsibility (CSR) projects:<br><br></p>
                    <ul>
                        <li><span>1. </span>Khwaja Yunus Ali Medical College &amp; Hospital (KYAMCH); 586 bedded
                            tertiary hospital in rural area, having state of art multi disciplinary medical services
                            facility
                        </li>
                        <li><span>2. </span>Khwaja Yunus Ali Medical College (KYAMC)</li>
                        <li><span>3. </span>KYAMCH Nursing Institute</li>
                        <li><span>4. </span>Khwaja Yunus Ali University (KYAU)</li>
                        <li><span>5. </span>KYAMCH Laboratory School</li>
                    </ul>


                </div>
            </div>
        </div>
    </section>


<?php
$this->load->view("index/portal/footer.php");

?>