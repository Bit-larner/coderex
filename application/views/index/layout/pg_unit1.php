<section id="pg-unit1">
    <div class="container">
        <div class="row">
            <?php
            $this->load->view("index/portal/sidebar2.php");
            ?>
            <div class="col-md-9">
                <h3 class="heading-txt"><?php echo $imgUnit3->TITTLE;?></h3>
                <div class="gallery">
                    <?php
                    $i=0;
                    foreach
                    ($imgUnit2 as $pi) {
                        $i++
                        ?>
                        <a href="<?php echo base_url($pi->INSERTS_FILES); ?>" class="big">
                        <img src="<?php echo base_url($pi->IMG_THUMB); ?>" alt="" title="" />
                        </a>
                    <?php }
                    ?>
                    <div class="clear"></div>
                </div>
            </div>
        </div>
    </div>
</section>














