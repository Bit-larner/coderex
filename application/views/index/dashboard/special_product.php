<section id="special-product">
    <div class="container">
        <div class="row">

            <div class="col-sm-12 sp-product-area">
                <h3><?php echo $specialPdT->SUB_TITTLE; ?></h3>

                <p><?php echo $specialPdT->SPECIAL_DESC; ?></p>



                <ul class="atozlist">
                   
                        <?php
                    foreach
                    ($specializedP as $sp) {
                        ?>
                    <li class="ln-a"><a class="btn btn-block btn-default" data-toggle="tooltip" data-placement="top"
                                        title=""
                                        href="<?php echo base_url(); ?>page_controller/single_product/<?php echo $sp->MEDICINE_ID; ?>"><?php echo $sp->MEDICINE_NAME; ?></a>
                    </li>
                    <?php }
                    ?>


                  <!--   <li class="ln-a"><a class="btn btn-block btn-default" data-toggle="tooltip" data-placement="top"
                                        title="approved by the Singapore"
                                        href="<?php echo base_url(); ?>page_controller/single_product">Seraflo</a>
                    </li> -->
                    <!-- <li class="ln-a"><a class="btn btn-block btn-default" data-toggle="tooltip" data-placement="top"
                                        title="approved by the Singapore">Seraflo 25/125</a></li>
                    <li class="ln-a"><a class="btn btn-block btn-default" data-toggle="tooltip" data-placement="top"
                                        title="approved by the Singapore">Seravent</a></li>
                    <li class="ln-a"><a class="btn btn-block btn-default" data-toggle="tooltip" data-placement="top"
                                        title="approved by the Singapore">Ventil</a></li>
                    <li class="ln-a"><a class="btn btn-block btn-default" data-toggle="tooltip" data-placement="top"
                                        title="approved by the Singapore">Ventil Plus</a></li> -->
     
                </ul>
                <div class="clearfix"></div>
              

            </div>
        </div>
    </div>
</section>




