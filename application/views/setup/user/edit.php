<style type="text/css">
    .second_column{ margin-top:53px;}
    p{ border-bottom: 1px solid #cfcfcf; padding-bottom: 8px;}
    .button_add{
        text-align: center;
    }
    #imagePreview {
        width: 130px;
        height: 130px;
        background-position: center center;
        background-size: cover;
        -webkit-box-shadow: 0 0 1px 1px rgba(0, 0, 0, .3);
        display: inline-block;
        display: block;
        float: left;
        margin-top: 10px;

    }
    .preview_div{
        padding: 5px !important;
    }
    #supplier_info{
        display: none;
    }
    #employee_info{
        display: none;
    }
    .org_name{
        padding-top: 6px !important;
        font-weight: bold;
    }
    #email_exist{
        color: red;
        display: none;
    }
    .app_des{ display: inline !important;}
    #message{ display: none; color: red;}

</style>

<?php echo validation_errors(); ?>
<!-- form start -->
<?php
$attributes = array('class' => 'form-horizontal', 'id' => 'amMainForm', 'method' => 'post', 'enctype' => 'multipart/form-data');
echo form_open('', $attributes);
?>
<div class="row">
    <!--    start basic information row-->
    <div class="col-sm-12">
        <div class="panel panel-base">
            <div class="panel-heading">
                <div class="row">
                    <div class="col-md-11 col-sm-10 col-xs-8">
                        <h3 class="panel-title">Basic Information</h3>
                    </div>
                </div>
                <span class="pull-right clickable">
                    <i class="glyphicon glyphicon-chevron-up"></i>
                </span>
            </div>
            <div class="panel-body">
                <div class="col-sm-6">
                    <div class="form-group">
                        <label class="col-sm-4 control-label">Full Name</label>
                        <a class="help-icon" data-container="body" data-toggle="popover" data-placement="right" data-content="Please enter first name.">
                            <i class="fa fa-question-circle"></i>
                        </a>
                        <div class="col-sm-7">
                            <input type="text" class="form-control" name="full_name" value="<?php echo $result->FULL_NAME; ?>" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-4 control-label"><?php echo $this->lang->line('designation') ?></label>
                        <a class="help-icon" data-container="body" data-toggle="popover" data-placement="right" data-content="Please select marital status.">
                            <i class="fa fa-question-circle"></i>
                        </a>
                        <div class="col-sm-7 in_des">
                            <?php
                            echo form_dropdown('degisnation', $degisnation, $result->DESIG_ID, 'id="designationDropDown" class="form-control"');
                            ?>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-4 control-label"><?php echo $this->lang->line('father_name') ?></label>
                        <a class="help-icon" data-container="body" data-toggle="popover" data-placement="right" data-content="Please enter father's name.">
                            <i class="fa fa-question-circle"></i>
                        </a>
                        <div class="col-sm-7">
                            <input type="text" class="form-control" name="father_name" required value="<?php echo $result->FATHER_NAME ?>">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-4 control-label"><?php echo $this->lang->line('mother_name') ?></label>
                        <a class="help-icon" data-container="body" data-toggle="popover" data-placement="right" data-content="Please enter mother's name.">
                            <i class="fa fa-question-circle"></i>
                        </a>
                        <div class="col-sm-7">
                            <input type="text" class="form-control" name="mother_name" required value="<?php echo $result->MOTHER_NAME ?>">
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="col-sm-4 control-label"><?php echo $this->lang->line('religion') ?></label>
                        <a class="help-icon" data-container="body" data-toggle="popover" data-placement="right" data-content="Please select religion.">
                            <i class="fa fa-question-circle"></i>
                        </a>
                        <div class="col-sm-5">
                            <?php
                            echo form_dropdown('religion', $religion, $result->RELIGION, 'id="office_district" class="form-control" required');
                            ?>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-4 control-label"><?php echo $this->lang->line('gender') ?></label>
                        <a class="help-icon" data-container="body" data-toggle="popover" data-placement="right" data-content="Please select gender.">
                            <i class="fa fa-question-circle"></i>
                        </a>
                        <div class="col-sm-5">
                            <?php
                            echo form_dropdown('gender', $gender, $result->GENDER, 'id="gender" class="form-control" required');
                            ?>
                        </div>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="form-group">
                        <label class="col-sm-4 control-label"><?php echo $this->lang->line('marital_status') ?></label>
                        <a class="help-icon" data-container="body" data-toggle="popover" data-placement="right" data-content="Please select marital status.">
                            <i class="fa fa-question-circle"></i>
                        </a>
                        <div class="col-sm-5">
                            <?php
                            echo form_dropdown('marital', $marital, $result->MARITAL_STATUS, 'id="office_district" class="form-control" required');
                            ?>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-4 control-label"><?php echo $this->lang->line('phone') ?></label>
                        <a class="help-icon" data-container="body" data-toggle="popover" data-placement="right" data-content="Please Enter Phone Number.">
                            <i class="fa fa-question-circle"></i>
                        </a>
                        <div class="col-sm-7">
                            <input type="text" class="form-control" required name="<?php echo $this->lang->line('phone') ?>" value="<?php echo $result->MOBILE; ?>">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-4 control-label"><?php echo $this->lang->line('nid') ?></label>
                        <a class="help-icon" data-container="body" data-toggle="popover" data-placement="right" data-content="Please Enter National ID Number.">
                            <i class="fa fa-question-circle"></i>
                        </a>
                        <div class="col-sm-7">
                            <input type="text" class="form-control" name="nationalId" required value="<?php echo $result->NID; ?>">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-4 control-label"><?php echo $this->lang->line('email') ?></label>
                        <a class="help-icon" data-container="body" data-toggle="popover" data-placement="right" data-content="Please enter email address.">
                            <i class="fa fa-question-circle"></i>
                        </a>
                        <div class="col-sm-7">
                            <input type="email" class="form-control uniqu_val" data-tbl="sa_users" data-column="EMAIL" required name="email" id="email" value="<?php echo $result->EMAIL; ?>">
                            <div id="already_exist"></div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-4 control-label"><?php echo $this->lang->line('image'); ?></label>
                        <a class="help-icon" data-container="body" data-toggle="popover" data-placement="right" data-content="Please Select Upload Image.">
                            <i class="fa fa-question-circle"></i>
                        </a>
                        <div class="col-sm-7">
                            <?php echo form_input(array('type' => 'file', 'name' => 'user_img', 'id' => 'upload_img')); ?>
                        </div>
                        <div class="form-group" >
                            <div class="col-sm-6 preview_div" id="imagePreview"><img width="130" height="130" src="<?php echo site_url('src/upload/user_image/' . $result->USERIMG) ?>"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--    end basic information row-->

    <!--    start Access information row-->
    <div class="col-sm-12">
        <div class="panel panel-base">
            <div class="panel-heading">
                <div class="row">
                    <div class="col-md-11 col-sm-10 col-xs-8">
                        <h3 class="panel-title">Access Information</h3>
                    </div>
                </div>
                <span class="pull-right clickable">
                    <i class="glyphicon glyphicon-chevron-up"></i>
                </span>
            </div>
            <div class="panel-body">
                <div class="col-sm-6">
                    <div class="form-group">
                        <label class="col-sm-4 control-label"><?php echo $this->lang->line('org') ?></label>
                        <a class="help-icon" data-container="body" data-toggle="popover" data-placement="right" data-content="Please select organization.">
                            <i class="fa fa-question-circle"></i>
                        </a>
                        <div class="col-sm-7">
                            <?php
                            echo form_dropdown('organization', $organization, $result->ORG_ID, 'id="orgIdDrop" class="form-control" required');
                            ?>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-4 control-label"><?php echo $this->lang->line('group'); ?></label>
                        <a class="help-icon" data-container="body" data-toggle="popover" data-placement="right" data-content="Please Select Grpup Name.">
                            <i class="fa fa-question-circle"></i>
                        </a>
                        <div class="col-sm-7">
                            <?php echo form_dropdown('group_name', $groups, $result->USERGRP_ID, 'id="group_name", class="form-control col-md-3", required'); ?>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-4 control-label"><?php echo $this->lang->line('is_active'); ?></label>
                        <div class="col-sm-6">
                            <div class="checkbox checkbox-inline checkbox-primary">

                                <input type="checkbox" name="ACTIVE_STATUS" id="ACTIVE_STATUS" class="checkBoxStatus" 
                                       <?php echo $result->ACTIVE_STATUS ? 'checked' : '' ?>>
                                <label for="ACTIVE_STATUS"></label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="form-group">
                        <label class="col-sm-4 control-label"><?php echo $this->lang->line('level'); ?></label>
                        <a class="help-icon" data-container="body" data-toggle="popover" data-placement="right" data-content="Please Select Level Name.">
                            <i class="fa fa-question-circle"></i>
                        </a>
                        <div class="col-sm-7">
                            <?php echo form_dropdown('level_name', $level, $result->USERLVL_ID, 'id="level_name" class="form-control col-md-3", required'); ?>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-4 control-label">User Name</label>
                        <a class="help-icon" data-container="body" data-toggle="popover" data-placement="right" data-content="Please enter User Name.">
                            <i class="fa fa-question-circle"></i>
                        </a>
                        <div class="col-sm-7">
                            <input type="text" class="form-control uniqu_val" data-tbl="sa_users" data-column="USERNAME" name="user_name" id="user_name" required value="<?php echo $result->USERNAME; ?>">
                        </div>
                    </div> 
                </div>
            </div>
        </div>
    </div>
    <!--    start Access information row-->
    <div class="col-sm-12 button_add">
        <button type="submit" class="btn btn-primary"><?php echo $this->lang->line('submit') ?></button>
    </div>
</div>
<?php echo form_close(); ?>
<script type="text/javascript">
    // This function is used for preview image before Upload
    $(function() {
        $("#upload_img").on("change", function()
        {
            $("#imagePreview").hide();
            var files = !!this.files ? this.files : [];
            if (!files.length || !window.FileReader)
                return; // no file selected, or no FileReader support

            if (/^image/.test(files[0].type)) { // only image file
                var reader = new FileReader(); // instance of the FileReader
                reader.readAsDataURL(files[0]); // read the local file

                reader.onloadend = function() { // set image data as background of div
                    $("#imagePreview").css("background-image", "url(" + this.result + ")");
                    $("#imagePreview").show();
                }
            }
        });
    });

    // check if email is exist ?
    $(document).on("blur", ".uniqu_val", function() {
        var thisValue = $(this).val();
        var thisValueTbl = $(this).attr("data-tbl");
        var thisValueColumn = $(this).attr("data-column");
        $.ajax({
            type: 'POST',
            url: '<?php echo site_url('setup/user/checkUnique'); ?>',
            data: {thisValue: thisValue, thisValueTbl: thisValueTbl, thisValueColumn: thisValueColumn},
            success: function(data) {
                if (data == "Y") {
                    $("#already_exist").html();
                } else {
                    $("#already_exist").html(data);
                }
            }
        });
    });

//    $("#user_name").blur(function() {
//        var username = $("#user_name").val();
//        $.ajax({
//            type: 'POST',
//            url: '<?php echo site_url('setup/userSetup/checkUsernameExist'); ?>',
//            data: {username: username},
//            success: function(data) {
//                if (data > 0) {
//                    $("#exist").show();
//                    $("#error").hide();
//                    $("#username").focus();
//                }
//                else {
//                    $("#success").delay(3200).fadeOut(300);
//                    $("#exist").hide();
//                    $("#error").hide();
//                }
//            }
//        });
//    });
</script>