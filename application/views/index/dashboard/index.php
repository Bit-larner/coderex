




<section id="home-content">
    <div class="container">
        <div class="row">
            <div class="col-sm-offset-1 col-sm-10">
                <h1>Drug International Limited</h1>
                <hr class="brace2">
                <p class="sub-heading">Better Life Through Better Medicine</p>
                <p>Drug International Limited was incorporated under the Registrar of Joint Stock Companies in 1974 as a Private Limited Company. The company commenced formulation and production in 1983 and emerged as a pioneer in Bangladesh for adding a state of the art oral solid dosage plant. Since inception, Drug International Limited’s primary objective has been to meet guidelines provided by major global regulatory bodies such as the World Health Organization Good Manufacturing Practices (WHO GMP) guidelines.  </p>
            </div>

        </div>
    </div>
</section>
<section class="hm-bg">
    <div class="container">
        <div class="row ">
            <div class="col-sm-6 col-md-6">
                <div class="pane panel-default">
                    <h2 class="p-heading">Who we are</h2>
                    <p class="p-body">We were the first company in Bangladesh to formulate medicines in soft capsule form for the purpose of maximizing absorption and retention properties of some particular medicines such as vitamins. We continue to lead in the field of soft gelatin capsule manufacture in Bangladesh. <span>We were also the first in the country to produce a soft gelatin capsule vaginal suppository with anti-bacterial and anti-fungal properties branded under the name of <span class="gynomix">GYNOMIX</span>. Presently, we use our refined and modern production processes to export pharmaceutical products to many countries around the world. </span></p>
                </div>
            </div>
            <div class="col-sm-6 col-md-6">
                <div class="pane panel-default">
                    <h2 class="p-heading">What we do</h2>
                    <p class="p-body"> We formulate drugs for all age groups and genders in different dosage forms including capsules, tablets, syrups, suspensions, injectables, soft gelatin capsules, suppositories, creams, and ointments. We maintain two principles of unique supply chain management: formulating optimized versions of medicines for specific patient groups and adopting policies for market release immediately after production. These policies benefit both the patients and the pharmacies as the medicine delivery system extends the product’s lifecycle.
                        Our formulating principles have always revolved around the health and welfare of patients. We constantly strive to improve the quality of life of our patients and customers.
                    </p>
                </div>
            </div>
        </div>

    </div>

</section>
<section class="lt-pro">
    <div class="container">
        <div class="row">
            <div class="col-md-12 text-center lp"><h3>Latest Products</h3></div>
        </div>
    </div>

    <div id="mixedSlider">
        <div class="MS-content">
            <?php
            $i = 0;
            foreach ($latestProduct

                     as $lp) {
                if ($i == 0) {
                    $active = 'active';
                } else {
                    $active = '';
                }
                ?>
                <div class="item <?php echo $active; ?>">
                    <a href="<?php echo base_url(); ?>page_controller/single_product/<?php echo $lp->MEDICINE_ID; ?>">
                        <div class="imgTitle  frame">
                            <span class="helper">
                                <img src="<?php echo base_url(); ?><?php echo $lp->MEDICINE_IMG; ?>" class="img-responsive" />
                            </span>

                        </div>
                        <h2 class="blogTitle"><?php echo $lp->MEDICINE_NAME; ?></h2>
                        <div class="prodesc">
                        <p><b>Generic Name:</b>&nbsp<?php echo $lp->GN_NAME; ?></p>
                        <p><b>Theraputic Name:</b>&nbsp<?php echo $lp->TH_GRP_NAME; ?></p></div>
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
</section>



<section id="specialized-product">
    <div class="container">
        <div class="row">
            <div class="col-sm-offset-2 col-sm-8">
                <h3>Specialized Products</h3>
                <hr class="brace">
            </div>
        </div>
        <div class="row">
            <?php
            foreach
            ($specializedPd as $pd) {
                ?>
                <div class="col-sm-3">
                    <div class="specilized-products">
                        <a href="<?php echo site_url(); ?>page_controller/special_product/<?php echo $pd->SPECIAL_ID; ?>" class="info">
                            <div class="view view-first">
                                <img src="<?php echo base_url(); ?><?php echo $pd->INSERT_FILES; ?>" class="img-responsive">
                                <h4><?php echo $pd->SPECIAL_NAME; ?></h4>
                            </div>
                        </a>
                    </div>
                </div>
            <?php }
            ?>



        </div>

    </div>
</section>


<section id="global-map">
    <div class="container">
        <div class="row">
            <div class="col-md-12 text-center lp"><h3>Global Presence</h3></div>
        </div>
    </div>
</section>


<script src="http://maps.google.com/maps/api/js?key=AIzaSyAbsKDTyrJOdItTD8nRVUb2mhfE2pHf7WE"
        type="text/javascript"></script>

<div id="map" style="width: 100%; height: 500px;"></div>

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






