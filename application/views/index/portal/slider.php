



<div id="carousel-example-generic" class="carousel slide" data-ride="carousel" data-pause="null">

    <ol class="carousel-indicators">
        <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
        <li data-target="#carousel-example-generic" data-slide-to="1"></li>
        <li data-target="#carousel-example-generic" data-slide-to="2"></li>
        <li data-target="#carousel-example-generic" data-slide-to="3"></li>
        <li data-target="#carousel-example-generic" data-slide-to="4"></li>
        <li data-target="#carousel-example-generic" data-slide-to="5"></li>
        <li data-target="#carousel-example-generic" data-slide-to="6"></li>
        <li data-target="#carousel-example-generic" data-slide-to="7"></li>
        <li data-target="#carousel-example-generic" data-slide-to="8"></li>



    </ol>

    <div class="carousel-inner" >

        <?php
        $i = 0;
        foreach ($Slider

        as $ps) {
        if ($i == 0) {
            $active = 'active';
        } else {
            $active = '';
        }
        ?>
        <div class="item <?php echo $active; ?>">
            <img src="<?php echo base_url(); ?><?php echo $ps->INSERT_FILES; ?>" class="img-responsive">
            <div class="carousel-caption">
            </div>
        </div>
            <?php
            $i++;
        }
        ?>
        <?php
        $i = 0;
        foreach ($Slider as $ps) {
        if ($i == 0) {
            $active = 'active';
        } else {
            $active = '';
        }
        ?>
        <div class="item">
            <img src="<?php echo base_url(); ?><?php echo $ps->INSERT_FILES; ?>" class="img-responsive">
            <div class="carousel-caption">

            </div>
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



