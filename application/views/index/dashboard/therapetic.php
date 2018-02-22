<div class="product-area-thera">
    <h2>Now showing products from Alimentary Preparations :</h2>
    <?php
    foreach ($tRpTn as $tPt) {
    ?>
                        <h3><?php echo $tPt->TH_GRP_NAME;?></h3>
        <?php
    }
    ?>
    <div class="row">

        <?php
        foreach ($therapeticPd as $tPd) {
            ?>
            <div class="col-sm-4">
                <div class="thera-pro">
                    <img src="<?php echo base_url($tPd->PRODUCT_FET_PHOTO); ?>" class="img-responsive">
                    <div class="thera-pro-des">
<!--                        <h3>--><?php //echo $tPd->MEDICINE_NAME; ?><!--<sup>&reg;</sup></h3>-->
                        <p></p>
                        <a href="<?php echo site_url(); ?>page_controller/single_product/<?php echo $tPd->MEDICINE_ID; ?>">View Details<i class="fa fa-angle-right" aria-hidden="true"></i></a>
                    </div>
                </div>
            </div>

            <?php
        }
        ?>
    </div>
</div>
