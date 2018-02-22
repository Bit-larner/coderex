
    <section class="contact-body sec-padding" id="contact__mail">
        <div class="container">

            <div class="row">
                <div class="col-sm-5">
                    <h3 class="contact-header">Head Office</h3>
                    <p>	KHWAJA ENAYETPURI (R) TOWER </br>
                        17, Bir Uttam K.M. Shafiullah Road (Green Road),</br>
                        Dhaka-1205, Bangladesh</br>
                        Tel: (+880) 2 9662611-4, (+880) 2 9670257, (+880) 2 9671283</br>
                        Fax: (880) 2 9671453</br>
                        E-mail: info@drug-international.com
                    </p>

                    <h3 class="contact-header">Factory (Unit-1) </h3>
                    <p>	252, Tongi Industrial Area</br>
                        Tongi, Gazipur, Bangladesh.</br>
                        Tel: (+880) 2 9810659</br>
                        Fax: (880) 2 9671453</br>
                        E-mail: info@drug-international.com
                    </p>
                    <h3 class="contact-header">Factory (Unit-2) </h3>
                    <p>	13A &amp; 14A, Tongi I/A, Squibb Road </br>
                        Tongi, Gazipur, Bangladesh</br>
                        Tel: (+880) 2 9801884</br>
                        Fax: (880) 2 9671453</br>
                        E-mail: info@drug-international.com
                    </p>
                    <h3 class="contact-header">Factory (Herbal &amp; Unani) </h3>
                    <p>Monipur Bazar, Bokran Monipur</br>
                        Gazipur, Bangladesh</br>
                        E-mail: info@drug-international.com
                    </p>

                </div>

                <div class="col-sm-7">
                    <h3 class="contact-header">Contact us</h3>
                    <p>
                        Please feel free to let us know if you have any question regarding our products and services by filling and sending the following form:

                    </p>

                    <form role="form" id="" method="get" action="<?php echo site_url('page_controller/save_contact'); ?>" class="contact__form">

                        <p>Select Contact<span>*</span></p>


                        <div class="radio">
                            <label>
                                <input type="radio" name="optionsRadios" id="optionsRadios1" value="sshimu7@gmail.com"
                                       checked>General
                                Query
                            </label>
                        </div>
                        <div class="radio">
                            <label>
                                <input type="radio" name="optionsRadios" id="optionsRadios1"
                                       value="Dpmallick.bd@gmail.com" checked>
                                Medical Information
                            </label>
                        </div>
                        <div class="radio">
                            <label>
                                <input type="radio" name="optionsRadios" id="optionsRadios1"
                                       value="hr@drug-international.com " checked> Career
                                Information
                            </label>
                        </div>
                        <div class="radio">
                            <label>
                                <input type="radio" name="optionsRadios" id="optionsRadios1"
                                       value="harun077@yahoo.com " checked> Export
                                Query
                            </label>
                        </div>


                        <div class="radio">
                            <label>
                                <input type="radio" name="optionsRadios" id="optionsRadios1"
                                       value="sshimu7@gmail.com" checked> Drug
                                Safety (ADEs) &amp; Product Complaints
                            </label>
                        </div>
                        <div class="form-group">
                            <label for="name">Your name<span>*</span></label>
                            <input type="text" name="name" class="form-control" id="name" placeholder="Full Name"
                                   data-original-title="" title="">

                            <span class="help-block"></span>
                        </div>
                        <div class="form-group">
                            <label for="email">Email address<span>*</span></label>
                            <input type="email" name="email" class="form-control" id="email" placeholder="E-mail"
                                   data-original-title="" title="">

                            <span class="help-block"></span>
                        </div>
                        <div class="form-group">
                            <label for="message">Your message<span>*</span></label>
                            <textarea name="message" class="form-control" rows="8" id="message"
                                      placeholder="Message"></textarea>

                            <span class="help-block"></span>
                        </div>
<!--                        <div class="g-recaptcha" data-sitekey="6LdWFEAUAAAAABhafoMKIbp9XvExxWCD1KITJ2JB"></div>-->

                        <button type="submit" class="btn btn-success" name="sendmail">Send</button>
                    </form>
                </div>


            </div> <!-- / .row -->
        </div> <!-- / .container -->
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
        ['Bangladesh', 23.6850, 90.3563, 4]
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



