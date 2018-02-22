<style>
    .selectedLetter {
        color: #990000;
    }
</style>
<section class="header-banner6">
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
            $alphas = range('A', 'Z');
            ?>
            <div class="col-sm-9">


                <div class="product-area">
                    <h3 class="heading-txt">Product by Brand Name</h3>
                    <div class="alph">
                     <?php
                    foreach ($alphas as $key => $value) {
                        ?>
                        <a href="<?php echo site_url('page_controller/product_by_trade/'. $value)?>"
                            <?php
                            if ($value == $param) {
                                echo "class='selectedLetter'";
                            }
                            ?>
                        > <input type="button" name="B" value='<?php echo $value; ?>' class="alphchar"></a>
                        <?php
                    }
                    ?>
                    </div>
                    <?php
                    foreach
                    ($products as $pi) {
                        ?>
                        <div class="product-img">
                            <a href="<?php echo site_url(); ?>page_controller/single_product/<?php echo $pi->MEDICINE_ID; ?>">

                                <img src="<?php echo base_url(); ?><?php echo $pi->PRODUCT_FET_PHOTO; ?>"
                                     alt="product_name">
                                </a>
                        </div>
                    <?php }
                    ?>
                </div>
            </div>
        </div>
</section>


