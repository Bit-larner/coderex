<?php

$this->load->view("portal/header.php");
$this->load->view("portal/banner.php");

?>

    <section id="company">
        <div class="container">
            <div class="row">
                <?php

                $this->load->view("portal/about_sidebar.php");

                ?>
                <div class="col-sm-9 people">
                    <h3>Our People</h3>
                    <div class="container-fluid main-container">
                        <div id="carousel-example-generic" class="carousel slide" data-ride="carousel"
                             data-pause="null">
                            <!-- Indicators -->
                            <ol class="carousel-indicators">
                                <li data-target="#carousel-example-generic" data-slide-to="0" class=""></li>
                                <li data-target="#carousel-example-generic" data-slide-to="1" class=""></li>
                                <li data-target="#carousel-example-generic" data-slide-to="2" class=""></li>
                                <li data-target="#carousel-example-generic" data-slide-to="3" ></li>
                                <li data-target="#carousel-example-generic" data-slide-to="4" class="active"></li>
                            </ol>
                            <!-- Wrapper for slides -->
                            <div class="carousel-inner" role="listbox">
                                <!-- First slide -->
                                <div class="item people-item01">
                                    <div class="blur"></div>
                                    <div class="carousel-caption">
                                        <h3 data-animation="animated bounceInLeft" class="">
                                            Drug International Limited
                                        </h3>
                                        <!-- <p data-animation="animated bounceInRight">
                                          Nunc accumsan metus quis metus. Sed luctus. Mauris eu <br>enim quisque dignissim nequesudm <br>consectetuer dapibus wn eu leo integer varius erat.
                                        </p> -->
                                        <!-- <button class="btn btn-success" data-animation="animated zoomInUp">CONTACT NOW</button> -->
                                    </div>
                                </div> <!-- /.item -->

                                <!-- Second slide -->
                                <div class="item people-item02">
                                    <div class="blur"></div>
                                    <div class="carousel-caption">
                                        <!-- <img src="img/slider/container.png" class="img-responsive" data-animation="animated zoomInLeft"/> -->
                                        <!-- <h3 data-animation="animated bounceInUp" class="">Nunc accumsan metus quis metus<br>accumsan metus quis metus.</h3>
                                        <button class="btn btn-success" data-animation="animated zoomInRight">REQUEST A QUOTE</button> -->
                                    </div>
                                </div><!-- /.item -->

                                <!-- Third slide -->
                                <div class="item people-item03">
                                    <div class="blur"></div>
                                    <div class="carousel-caption">

                                        <!-- <h3 data-animation="animated bounceInLeft" class="">
                                          Drug International Limited<br>Nunc accumsan metus
                                        </h3> -->
                                        <!-- <p data-animation="animated bounceInRight">
                                          Nunc accumsan metus quis metus. Sed luctus. Mauris eu <br>enim quisque dignissim nequesudm <br>consectetuer dapibus wn eu leo integer varius erat.
                                        </p> -->
                                        <!-- <button class="btn btn-success" data-animation="animated lightSpeedIn">CONTACT NOW</button> -->
                                    </div>
                                </div><!-- /.item -->
                                <!-- Fourth slide -->
                                <div class="item people-item04">
                                    <div class="blur"></div>
                                    <div class="carousel-caption">
                                        <h3 data-animation="animated bounceInLeft" class="">
                                            Drug International Limited
                                        </h3>
                                        <!--  <p data-animation="animated bounceInRight">
                                           Nunc accumsan metus quis metus. Sed luctus. Mauris eu <br>enim quisque dignissim nequesudm <br>consectetuer dapibus wn eu leo integer varius erat.
                                         </p> -->
                                        <!-- <button class="btn btn-success animated zoomInRight" data-animation="animated zoomInRight">REQUEST A QUOTE</button> -->
                                    </div>
                                </div><!-- /.item -->

                                <div class="item people-item05  active">
                                    <div class="blur"></div>
                                    <div class="carousel-caption">
                                        <h3 data-animation="animated bounceInLeft" class="">
                                            Drug International Limited
                                        </h3>
                                        <!--  <p data-animation="animated bounceInRight">
                                           Nunc accumsan metus quis metus. Sed luctus. Mauris eu <br>enim quisque dignissim nequesudm <br>consectetuer dapibus wn eu leo integer varius erat.
                                         </p> -->
                                        <!-- <button class="btn btn-success animated zoomInRight" data-animation="animated zoomInRight">REQUEST A QUOTE</button> -->
                                    </div>
                                </div><!-- /.item -->
                            </div><!-- /.carousel-inner -->

                            <!-- Controls -->
                            <a class="left carousel-control" href="#carousel-example-generic" role="button"
                               data-slide="prev">
                                <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                                <span class="sr-only">Previous</span>
                            </a>
                            <a class="right carousel-control" href="#carousel-example-generic" role="button"
                               data-slide="next">
                                <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                                <span class="sr-only">Next</span>
                            </a>
                        </div><!-- /.carousel -->

                    </div>
                    <br><br>
                    <p>Drug International attracts the most talented and dynamic individuals, looking for exciting
                        opportunities and new challenges, who develop skills and build career with us. We constantly
                        seek to attract and retain the best talent in the industry and always take initiatives to ensure
                        that our people are enabled and motivated and provided them with an environment that instills
                        pride, fosters growth and encourage innovation. The company currently employees more than 5000
                        professionals which include Doctors, Pharmacist, Chemist, Microbiologist, Engineers, Charted
                        accountants, MBAs, among others, but we share a passion to improve access to essential
                        medicines. Our office has a professional and open atmosphere, where employees can approaches
                        each other. We regularly invest in the training and development of our employees. While we work
                        hard, we also make time for outings and sporting events. Many colleagues are considered close
                        friends and making a great place to work. As we look ahead to the future possibilities, our
                        focus remains on buildings leadership skills at different levels, which is the best for
                        company’s future growth.</p>

                </div>
            </div>
        </div>
    </section>


<?php

$this->load->view("portal/footer.php");

?>