
<section id="management">
    <div class="container">
        <div class="row">
            <div class="col-sm-9">
                <div class="product-area">
                    <h3>Search Product</h3>

                    <?php
                    foreach
                    ($search as $sp) {
                    ?>

                    <div class="product-img">
                        <a href="<?php echo site_url(); ?>page_controller/single_product/<?php echo $sp->MEDICINE_ID; ?>">

                            <img src="<?php echo base_url(); ?><?php echo $sp->PRODUCT_FET_PHOTO; ?>"
                                 alt="product_name">
                            <a>
                    </div>

                    <?php }
                    ?>


                </div>
            </div>
        </div>
</section>