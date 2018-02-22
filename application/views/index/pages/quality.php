
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
                <div class="col-sm-9 quality">

                    <h3>Quality Policy</h3>
                    <p>
                        We at DRUG INTERNATIONAL LIMITED believe that our mission is to promote
                        better life through better medicine. We approach this challenge with
                        excitement, determination and optimism.<br>
                        It is the vision of DRUG INTERNATIONAL LIMITED to be committed to
                        produce high quality drug products, with the heighest standard of quality,
                        safety, identity and purity while facilitating innovation in improvement and
                        adding value to our products and processes. This Vision will be met by:
                        <br><br>
                    <ul class="right-arrow">
                        <li>Providing consistent products and services that exceed
                            exceptations and satisfy our customers.
                        </li>
                        <li>Ensuring that quality products and services are extended to our esteemed customers.</li>
                        <li>Integrating a Quality Management System that ensures product quality and allows for
                            improvement of personal skills.
                        </li>
                        <li>Enabling our workforce to bulild a stronger partnership with all our customers.</li>
                    </ul>
                    <br><br>
                    We are also committed to meet National and International standards in
                    accordance with legislative and regulatory requirements by producing
                    consistent Quality Finished Pharmaceutical Products.
                    This policy will be routinely reviewed to ensure that it reflects the evolving
                    needs of our company and that they continue to satisfy our customer’s requirement.


                    </p>
                </div>
            </div>
        </div>
    </section>


<?php
$this->load->view("index/portal/footer.php");

?>