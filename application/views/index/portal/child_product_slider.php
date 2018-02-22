<section class="slider">
    <div id="carousel-example-generic" class="carousel slide" data-ride="carousel" data-pause="null">


        <ol class="carousel-indicators">
            <?php
            $i = 0;
            foreach ($childproductSlider

                     as $ps) {
                if ($i == 0) {
                    $active = 'active';
                } else {
                    $active = '';
                }
                ?>

                <li data-target="#carousel-example-generic" data-slide-to="<?php echo $i;?>" class="<?php echo $active; ?>"></li>

                <!--                <li data-target="#carousel-example-generic" data-slide-to="2"></li>-->
                <!--                <li data-target="#carousel-example-generic" data-slide-to="3"></li>-->
                <?php
                $i++;
            }
            ?>
        </ol>


        <div class="carousel-inner carousel-box-style">
            <?php
            $i = 0;
            foreach ($childproductSlider

                     as $ps) {
                if ($i == 0) {
                    $active = 'active';
                } else {
                    $active = '';
                }
                ?>
                <div class="item blue<?php echo $active; ?>">
                    <img src="<?php echo base_url(); ?><?php echo $ps->MEDICINE_IMG; ?>" class="img-responsive">
                </div>
                <!--      <div class="item">
                         <img src="img/slider/products/cardinex.jpg" class="img-responsive">

                     </div>
                     <div class="item">
                         <img src="img/slider/products/Mylostat.jpg" class="img-responsive">

                     </div> -->
                <?php
                $i++;
            }
            ?>
            <?php
            $i = 0;
            foreach ($childproductSlider as $ps) {
                if ($i == 0) {
                    $active = 'active';
                } else {
                    $active = '';
                }
                ?>
                <div class="item <?php echo $active; ?>">
                    <img src="<?php echo base_url(); ?><?php echo $ps->MEDICINE_IMG; ?>" class="img-responsive">

                </div>
                <?php
                $i++;
            }
            ?>

        </div>


        <a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
            <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
            <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </a>
    </div>


</section>