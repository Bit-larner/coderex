
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

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
            ?>
            <div class="col-sm-9">
                <div class="product-area">
                    <h3 class="heading-txt">Product by Therapeutic Class</h3><br>



                    <h4>To view products by therapeutic class, please select an option below:</h4>
                    <!--     <?php
                    foreach
                    ($therapiticProduct as $tp) {
                        ?>
                        <div class="product-img">
                            <a href="<?php echo site_url(); ?>page_controller/single_product/<?php echo $tp->MEDICINE_ID; ?>">
                                <img src="<?php echo base_url(); ?><?php echo $tp->PRODUCT_FET_PHOTO; ?>"
                                     alt="product_name">
                                <a>
                        </div>
                    <?php }
                    ?> -->


                    <select name="users" class="form-control thGroup">

                        <option value="">Select a Product:</option>
                        <?php
                        foreach ($therapiticGroupProduct as $value) {
                            ?>

                            <option value="<?php echo $value->TH_GRP_ID; ?>"><?php echo $value->TH_GRP_NAME; ?></option>
                            <?php
                        }
                        ?>
                    </select>

                    <div class="product-area-thera" id="txtHint">
                    </div>

                </div>
            </div>
        </div>
</section>

<script>
    $(document).on("change", "select.thGroup", function () {
        var groupId = $(this).val();
        var destination = '<?php echo site_url('page_controller') ?>' + '/getProdByThGrp' + '/' + groupId;
//  alert(destination);
        //var destination='{{url($roleName.'/'.'show_employee_by_shift')}}'+'/'+shiftId;
        $.ajax({
            type: "GET",
            url: destination,
            success: function (data) {
                $("div.product-area-thera").html(data);
            }
        });
    })
</script>


 

















