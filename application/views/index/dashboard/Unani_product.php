
<section class="header-banner7">
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-6">
                <div class="banner-box">

                </div>
            </div>
            <div class="col-sm-6">

            </div>
        </div>
    </div>
</section>
<section id="management">
    <div class="container">
        <div class="row">


            <?php
            $this->load->view("index/portal/product_sidebar.php");

            ?>

            <div class="col-sm-9">


                <div class="product-area">
                    <h3 class="heading-txt">Unani Products</h3>



                    <?php
                    foreach
                    ($unaniProduct as $hp) {
                        ?>


                        <div class="product-img">
                            <a href="<?php echo site_url(); ?>page_controller/single_product/<?php echo $hp->MEDICINE_ID; ?>">

                                <img src="<?php echo base_url(); ?><?php echo $hp->PRODUCT_FET_PHOTO; ?>"
                                     alt="product_name">
                                 <p><?php echo $hp->TH_GRP_NAME; ?></p>
                                </a>
                        </div>
                    <?php }
                    ?>


                    <!-- <div class="product-img">
                            <a href="single-product.php">
                                <img src="<?php echo base_url(); ?>resource/img/products/aeron.jpg">
                            <a>
                        </div> -->
                </div>


            </div>
        </div>
</section>


