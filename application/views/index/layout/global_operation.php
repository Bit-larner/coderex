<section id="global-map">
    <div class="container">
        <div class="row">
            <div class="col-md-12 text-center lp"><h3>Global Operation</h3></div>
        </div>
    </div>
</section>

<section id="global-opt">
    <script src="http://maps.google.com/maps/api/js?key=AIzaSyAbsKDTyrJOdItTD8nRVUb2mhfE2pHf7WE"
            type="text/javascript"></script>

    <div id="map" style="width: 100%; height: 500px;">

    </div>
    <p class="sal-txt">Contact Person: Md. Harun-Or-Rashid, Sales Manager (Export). Phone: +8801711339386. Email: harun077@yahoo.com</p>
    <script type="text/javascript">
        var locations = [
            ['Afganistan', 33.939110, 67.709953, 1],
            ['Combodia', 12.565679, 104.990963, 1],
            ['Ghana', 7.946527, -1.023194, 1],
            ['Georgia', 42.318364, 43.345454, 1],
            ['Honduras', 15.199999, -86.241905, 1],
            ['Malawi', -13.254308, 34.301525, 2],
            ['Myanmar', 21.916221, 95.955974, 1],
            ['Nicaragua', 12.865416, -85.207229, 1],
            ['Nigeria', 9.081999, 8.675277, 1],
            ['Phillipines', 12.879721, 121.774017, 8],
            ['Sierra Leone', 8.460555, -11.779889, 1],
            ['Sri Lanka', 7.873054, 80.771797, 6],
            ['Vietnam', 14.058324, 108.277199, 7],
            ['Yemen', 15.552727, 48.516388, 1],
            ['Thailand', 15.870032, 100.992541, 1],
            ['Bangladesh', 23.6850, 90.3563, 4],
            ['Somalia', 2.859716, 45.243805, 4],
            ['El Salvador', 13.544222, -88.724362, 4]
        ];
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 3,
            center: new google.maps.LatLng(15.454166, 18.732207),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
        var iconBase = '<?php echo base_url(); ?>r-marker.gif';
        var infowindow = new google.maps.InfoWindow();
        var marker, i;
        for (i = 0; i < locations.length; i++) {
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(locations[i][1], locations[i][2]),
                animation: google.maps.Animation.DROP,
                map: map,
                icon: iconBase, //+ 'parking_lot_maps.png',
                optimized: false
            });
            google.maps.event.addListener(marker, 'mouseover', (function(marker, i) {
                return function() {
                    infowindow.setContent(locations[i][0]);
                    infowindow.open(map, marker);
                }
            })(marker, i));
        }
    </script>

    <div class="container">

        <div class="row">
            <!-- <div class="col-sm-3"></div> -->
            <div class="col-sm-12 current-opt">
                <h3>Global Presence</h3>
                <p>
                    Today, Drug International Limited is exporting its world class pharmaceutical finished products to 17 countries.

                    At the age of globalization, the world has no boundaries. With the aim to cope with the challenges of globalization, the company began export operations in 2002.

                    Currently, Drug International Limited is exporting a wide range of pharmaceutical products under different therapeutic categories.
                    Drug International Limited has a portfolio that consists of different types of products such as antiulcerants, antibiotics, NSAIDs, antipyretics, vitamins and minerals, cardiovascular, anti-diabetics, antihistamines, antipsychotics, etc. Apart from usual tablets and capsules, DIL has technologically advanced dosage forms such as inhalers, lyophilized injections, pre-filled syringes and sophisticated world class life saving oncology products. DIL is also exporting different types of herbal products & supplements to many countries. Drug International Limited always thrives to introduce hi-tech & innovative dosage forms for the betterment of our patients. Its state of the art facility is planned and designed with fine tuned orientation to meet both local and international demands.

                    The mission of Drug International Limited has always been steered by its philosophy of promoting "better life through better medicine". Hence, its efforts to improve quality never stops. It continuously sets higher standards and has the passion to achieve it all. WHO approved cGMP guidelines are strictly followed at every step during production. Each and every member of the company is working persistently to uphold quality. The key purpose of Drug International Limited is to produce quality medication that receives respect, recognition and practicing reference from the medical practitioners of the country and now, abroad.
                    For its honest promise to society and the well-being of the global population, Drug International Limited never uses any harmful ingredients while manufacturing its products. This is manifested clearly in its inhaler manufacturing facility. It has established an ultra modern facility to manufacture inhaler products, which are completely CFC free.

                    Drug International Limited's built-in Effluent Treatment Plant (ETP) ensures environment-friendly pharmaceutical waste management practices.

                    To expedite its export mission, Drug International Limited conducted bioequivalence studies on a variety of its products. These bioequivalence reports have already been accepted by the regulatory bodies of several countries and thus, are helping export. Drug International Limited also conducted clinical trials on its products e.g. Gynomix Soft Capsule (Neomycin Sulphate BP 52mg, Polymyxin B Sulphate BP 5.50mg, Nystatin BP 23mg & Metronidazole BP 200mg). More trials are in progress.

                    Drug International Limited is moving forward vigorously to increase its market share in the operating countries and to explore new ones. A few African, Middle Eastern, and Central American countries are under active search.


                </p>


                <h4><span>Our Achievement</span></h4>



                <div id="mixedSlider" class="achievement-sl">
                    <div class="MS-content achievement-slider">
                        <?php
                        $i=0;
                        foreach
                        ($achivement as $ac) {
                            if($i==0)
                            {
                                $active="active";
                            }
                            else
                            {
                                $active="";
                            }
                            ?>

                            <div class="item <?php echo $active; ?>">

                                    <a href="<?php echo base_url(); ?><?php echo $ac->INSERTS_PDF; ?>" target="_blank">
                                        <img src="<?php echo base_url(); ?><?php echo $ac->INSERT_FILES; ?>"
                                             class="img-responsive" />
                                    </a>

                            </div>
                            <?php
                            $i++;
                        }
                        ?>


                    </div>
                    <div class="MS-controls">
                        <button class="MS-left"><i class="fa fa-angle-left" aria-hidden="true"></i></button>
                        <button class="MS-right"><i class="fa fa-angle-right" aria-hidden="true"></i></button>
                    </div>
                </div>

























                <table class="table table-striped table-bordered">

                    <tr>
                        <th colspan="4"><span>DRUG INTERNATIONAL LIMITED</span> has presence in the following countries</th>

                    </tr>
                    <tr>
                        <td><img src="<?php echo base_url(); ?>resource/img/flag/afghanistan.png"></br>Afghanistan</td>
                        <!-- <td><img src="<?php echo base_url(); ?>resource/img/flag/azerbaijan.png"></br>Azerbaijan</td> -->
                        <td><img src="<?php echo base_url(); ?>resource/img/flag/combodia.png"></br>Combodia</td>
                        <td><img src="<?php echo base_url(); ?>resource/img/flag/ghana.png"></br>Ghana</td>
                        <td><img src="<?php echo base_url(); ?>resource/img/flag/Georgia.png"></br>Georgia</td>

                    </tr>

                    <tr>
                        <td><img src="<?php echo base_url(); ?>resource/img/flag/honduras.png"></br>Honduras</td>
                        <td><img src="<?php echo base_url(); ?>resource/img/flag/malawi.png"></br>Malawi</td>
                        <td><img src="<?php echo base_url(); ?>resource/img/flag/Myanmar.png"></br>Myanmar</td>
                        <td><img src="<?php echo base_url(); ?>resource/img/flag/Nicaragua.png"></br>Nicaragua</td>

                    </tr>
                    <tr>
                        <td><img src="<?php echo base_url(); ?>resource/img/flag/nigeria.jpg"></br>Nigeria</td>
                        <td><img src="<?php echo base_url(); ?>resource/img/flag/phillipine.png"></br>Philippine</td>
                        <td><img src="<?php echo base_url(); ?>resource/img/flag/Sierra-Leone.png"></br>Sierra Leone
                        </td>
                        <td><img src="<?php echo base_url(); ?>resource/img/flag/srilanka.jpg"></br>Srilanka</td>
                        <!-- <td><img src="<?php echo base_url(); ?>resource/img/flag/sudan.png"></br>Sudan</td> -->


                    </tr>
                    <tr>

                        <!-- <td><img src="<?php echo base_url(); ?>resource/img/flag/ukraine.png"></br>Ukraine</td> -->
                        <td><img src="<?php echo base_url(); ?>resource/img/flag/Vietnam.png"></br>Vietnam</td>
                        <td><img src="<?php echo base_url(); ?>resource/img/flag/Yemen.png"></br>Yemen</td>
                        <td><img src="<?php echo base_url(); ?>resource/img/flag/thailand.png"></br>Thailand</td>
                        <td><img src="<?php echo base_url(); ?>resource/img/flag/somalia.jpg"></br>Somalia</td>

                    </tr>
                    <tr>

                        <!-- <td><img src="<?php echo base_url(); ?>resource/img/flag/ukraine.png"></br>Ukraine</td> -->
                        <td><img src="<?php echo base_url(); ?>resource/img/flag/El_salvador.jpg"></br>El Salvador</td>
                        <td></td>
                        <td></td>
                        <td></td>

                    </tr>


                </table>


            </div>
        </div>
    </div>
</section>
