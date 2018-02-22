<style type="text/css">
    #imagePreview {
        width: 130px;
        height: 130px;
        background-position: center center;
        background-size: cover;
        -webkit-box-shadow: 0 0 1px 1px rgba(0, 0, 0, .3);
        display: inline-block;
        display: none;
        border: 1px solid #002166;

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
</style>
<!-- form start -->
<?php
echo form_open_multipart('', array('class' => 'form-horizontal', 'id' => 'amMainForm'));
?>
<div class="row">
    <div class="col-md-6">
        <p class="btn btn-primary btn-block"><?php echo $this->lang->line('basic_info'); ?></p><br>
        <div class="form-group">
            <label class="col-sm-4 control-label"><?php echo $this->lang->line('group'); ?></label>
            <div class="col-sm-7">
                <?php
                echo form_dropdown('USERGRP_ID', $groups, '', 'id="group_name" class="form-control" required');
                ?>
            </div>
        </div>
        <input type="hidden" name="ORG_ID"  value="<?php echo $hid; ?>" />
        <div class="form-group">
            <label class="col-sm-4 control-label"><?php echo $this->lang->line('level'); ?></label>
            <a class="help-icon" data-container="body" data-toggle="popover" data-placement="right" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus.">
                <i class="fa fa-question-circle"></i>
            </a>
            <div class="col-sm-7">
                <?php echo form_dropdown('UG_LVL_ID', array('' => 'Select Level'), "", 'id="level_name" class="form-control col-md-3" required'); ?>
            </div>
        </div>
        <div class="form-group">
            <label class="col-sm-4 control-label"><?php echo $this->lang->line('effective_date'); ?></label>
            <a class="help-icon" data-container="body" data-toggle="popover" data-placement="right" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus.">
                <i class="fa fa-question-circle"></i>
            </a>
            <div class="col-sm-7 date">
                <div class="selectContainer">
                    <div class="input-group input-append date datePicker">
                        <input type="text" class="form-control" required name="EFECT_FROM_DT" />
                        <span class="input-group-addon add-on"><span class="glyphicon glyphicon-calendar"></span></span>
                    </div>
                </div>
            </div>
        </div>
        <div class="form-group">
            <label class="col-sm-4 control-label"><?php echo $this->lang->line('exp_date'); ?></label>
            <a class="help-icon" data-container="body" data-toggle="popover" data-placement="right" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus.">
                <i class="fa fa-question-circle"></i>
            </a>
            <div class="col-sm-7 date">
                <div class="selectContainer">
                    <div class="input-group input-append date datePicker">
                        <input type="text" class="form-control" required name="EXPIRE_DT" />
                        <span class="input-group-addon add-on"><span class="glyphicon glyphicon-calendar"></span></span>
                    </div>
                </div>
            </div>
        </div>
        <div class="form-group">
            <label class="col-sm-4 control-label"><?= $this->lang->line('is_active'); ?></label>
            <div class="col-sm-7">
                <div class="checkbox checkbox-inline checkbox-primary">
                    <?php echo form_checkbox(array('name' => 'ACTIVE_STATUS', 'id' => 'ACTIVE_STATUS', 'value' => 1, 'checked' => 'checked')); ?>
                    <label for="is_active"></label>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-6">
        <p class="btn btn-primary btn-block"><?php echo $this->lang->line('account_info'); ?></p><br>
        <div class="form-group">
            <label class="col-sm-4 control-label"><?php echo $this->lang->line('email'); ?></label>
            <a class="help-icon" data-container="body" data-toggle="popover" data-placement="right" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus.">
                <i class="fa fa-question-circle"></i>
            </a>
            <div class="col-sm-7">
                <?php echo form_input(array('name' => 'EMAIL', 'id' => 'email', 'class' => 'form-control', 'placeholder' => $this->lang->line('plz_email'), 'type' => "email", 'required' => 'required')); ?>
            </div>
        </div>
        <div class="form-group">
            <label class="col-sm-4 control-label"><?php echo $this->lang->line('username'); ?></label>
            <a class="help-icon" data-container="body" data-toggle="popover" data-placement="right" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus.">
                <i class="fa fa-question-circle"></i>
            </a>
            <div class="col-sm-7">
                <?php
                echo form_input(array('name' => 'USERNAME', 'id' => 'username', 'class' => 'form-control', 'placeholder' => $this->lang->line('plz_username'),
                    'required' => 'required', 'onkeypress' => 'return IsAlphaNumeric(event);', 'onpaste' => 'return false;', 'ondrop' => 'return false;'));
                ?>
                <span id="error" style="color: Red; display: none">* Special Characters not allowed</span>
                <span id="exist" style="color: Red; display: none">* This Username already exist</span>
                <span id="success" style="color: green; display: none">You can Use this Usename</span>
            </div>
        </div>
        <div class="form-group">
            <label class="col-sm-4 control-label"><?php echo $this->lang->line('password'); ?></label>
            <a class="help-icon" data-container="body" data-toggle="popover" data-placement="right" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus.">
                <i class="fa fa-question-circle"></i>
            </a>
            <div class="col-sm-7">
                <?php echo form_input(array('name' => 'password1', 'type' => 'password', 'id' => 'password1', 'class' => 'form-control', 'placeholder' => $this->lang->line('plz_password'), 'required' => 'required')); ?>
            </div>
        </div>
        <div class="form-group">
            <label class="col-sm-4 control-label"><?php echo $this->lang->line('confirm_password'); ?></label>
            <a class="help-icon" data-container="body" data-toggle="popover" data-placement="right" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus.">
                <i class="fa fa-question-circle"></i>
            </a>
            <div class="col-sm-7">
                <?php echo form_input(array('name' => 'password2', 'type' => 'password', 'id' => 'password2', 'class' => 'form-control', 'placeholder' => $this->lang->line('plz_re_password'), 'required' => 'required')); ?>
            </div>
        </div>
        <div class="form-group message_box" style="display:none; color: red; ">
            <label class="col-sm-4 control-label"></label>
            <div class="col-sm-7">
                <div id="pass-info"></div>
                <div id="divCheckPasswordMatch"></div>
            </div>
        </div>
        <div class="form-group">
            <label class="col-sm-4 control-label"><?php echo $this->lang->line('employee_name'); ?></label>
            <a class="help-icon" data-container="body" data-toggle="popover" data-placement="right" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus.">
                <i class="fa fa-question-circle"></i>
            </a>
            <div class="col-sm-7">
                <?php
                echo form_dropdown('EMP_ID', $empList, '', 'id="EMP_ID" class="form-control" required');
                ?>
            </div>
        </div>
        <div class="form-group">
            <div class="col-sm-offset-4">
                <button type="submit" class="btn btn-primary" id="saveUserInfo"><?php echo $this->lang->line('submit'); ?></button>
            </div>
        </div>
    </div>
</div>

<div class="modal-footer">
    <span class="modal_msg pull-left"></span>
    <button type="button" class="btn btn-sm btn-default" data-dismiss="modal"><?php echo $this->lang->line('close'); ?></button>
</div>
<?php echo form_close(); ?>
<script>
    $(document).on("change", "#group_name", function() {
        var group_id = $(this).val();
        $.ajax({
            type: "POST",
            url: "<?php echo site_url('setup/userSetup/getGroupLevel'); ?>",
            data: {group_id: group_id},
            success: function(result) {
                $("#level_name").html(result).change();
            }
        });
    });
</script>
<script type="text/javascript">
    var specialKeys = new Array();
    specialKeys.push(8); //Backspace
    specialKeys.push(9); //Tab
    specialKeys.push(46); //Delete
    specialKeys.push(36); //Home
    specialKeys.push(35); //End
    specialKeys.push(37); //Left
    specialKeys.push(39); //Right
    function IsAlphaNumeric(e) {

        var keyCode = e.keyCode == 0 ? e.charCode : e.keyCode;
        var ret = ((keyCode >= 48 && keyCode <= 57) || (keyCode >= 65 && keyCode <= 90) || (keyCode >= 97 && keyCode <= 122) || (specialKeys.indexOf(e.keyCode) != -1 && e.charCode != e.keyCode));
        document.getElementById("error").style.display = ret ? "none" : "inline";
        return ret;

    }

    $("#username").blur(function() {
        var username = $("#username").val();
        $.ajax({
            type: 'POST',
            url: '<?php echo site_url('setup/userSetup/checkUsernameExist'); ?>',
            data: {username: username},
            success: function(data) {
                if (data > 0) {
                    $("#exist").show();
                    $("#error").hide();
                    $("#username").focus();
                }
                else {
                    //$("#success").show().delay(10000).hide();
                    $("#success").delay(3200).fadeOut(300);
                    $("#exist").hide();
                    $("#error").hide();
                }

            }
            //complete: function (data) {
            //$("#showDetaildModal").modal("hide");
            //}
        });
    });

</script>

<script type="text/javascript">
    $(function() {
//        $('#effective_date').datepicker({format: 'mm-dd-yyyy'});
//        $('#exp_date').datapicker({format: 'mm-dd-yyyy'});

        $("#saveUserInfo").click(function() {
            var password = $("#password1").val();
            var confirmPassword = $("#password2").val();
            if (password != confirmPassword) {
                alert("Passwords does not match.");
                $("#password2").focus();
                return false;
            }
            return true;
        });
    });
</script>
