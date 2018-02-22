<?php
$this->load->view("index/portal/banner.php");
?>
<section id="single-product">
    <div class="container">
        <div class="row">
            <?php
            $alphas = range('A', 'Z');
            ?>
            <div class="col-sm-12 alphchar-area">
                <div class="alph">
                    <?php
                    foreach ($alphas as $key => $value) {
                        ?>
                        <a href="<?php echo site_url('page_controller/product_by_trade/' . $value) ?>"
                            <?php
                            if ($value == $param) {
                                echo "class='selectedLetter'";
                            }
                            ?>
                        > <input type="button" name="A" value='<?php echo $value; ?>' class="alphchar"></a>
                        <?php
                    }
                    ?></div>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-6">
                <?php
                $this->load->view("index/portal/child_product_slider.php");
                ?>
            </div>
            <div class="col-sm-6">
                <h3 class="heading-txt"><?php echo $medicine->MEDICINE_NAME; ?></h3>
                <p><?php echo $medicine->GN_NAME; ?></p>
                <p><?php echo $medicine->MEDICINE_DESC; ?></p>
                <a href="<?php echo base_url(); ?><?php echo $pdf->INSERT_FILE; ?>" target="blank" class="dwn-bbtn">
                    <div class="btn btn-success">Prescribing Description</div>
                </a>
            </div>
        </div>
    </div>
</section>
<section id="latest-product">
    <div class="container">
        <div class="row ">
            <h3 class="rt-txt">Related Products</h3>

            <div class="col-md-12 ">

                <?php
                $i = 0;
                foreach
                ($relatedProduct as $rp) {
                    if ($i == 0) {
                        $active = "active";
                    } else {
                        $active = "";
                    }
                    ?>
                    <div class="item<?php echo $active; ?>">
                        <div class="col-md-3 col-sm-6 col-xs-12">

                            <a href="<?php echo site_url(); ?>page_controller/child_product/<?php echo $rp->MS_ID; ?>"
                               class="single-pro-border">
                                <img src="<?php echo base_url(); ?><?php echo $rp->MEDICINE_IMG; ?>"
                                     class="img-responsive"/>
                            </a>
<!--                            <h5 style="text-align: center">--><?php //echo $rp->MEDICINE_NAME; ?>
<!--                                --><?php //echo $rp->STRENGTH; ?><!--</h5>-->
                        </div>
                    </div>
                    <?php
                    $i++;
                }
                ?>

            </div>
        </div>
    </div>
    </div>
</section>


