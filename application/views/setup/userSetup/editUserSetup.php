
<!-- form start -->
<?php echo form_open_multipart('setup/userSetup/updateUserData', array('class' => 'form-horizontal', 'id' => 'amMainForm', 'method' => 'post'));
?>


<div class="row">
    <div class="col-md-6">
        <p class="btn btn-primary btn-block"><?php echo $this->lang->line('basic_info'); ?></p><br>
        <div class="form-group">
            <label class="col-sm-4 control-label"><?php echo $this->lang->line('org'); ?></label>
            <a class="help-icon" data-container="body" data-toggle="popover" data-placement="right" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus.">
                <i class="fa fa-question-circle"></i>
            </a>
            <div class="col-sm-7">
                <?php
                echo form_dropdown('organzations', $organizations, $result_from_view_table->ORG_ID, 'id="organzations" class="form-control" required');
                ?>
                <input type="hidden" id="FLD_USER_ID" name="FLD_USER_ID" value="<?php echo $result_from_view_table->FLD_USER_ID; ?>"/>
            </div>
        </div>
        <div class="form-group">
            <label class="col-sm-4 control-label"><?php echo $this->lang->line('group'); ?></label>
            <a class="help-icon" data-container="body" data-toggle="popover" data-placement="right" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus.">
                <i class="fa fa-question-circle"></i>
            </a>
            <div class="col-sm-7">
<?php
echo form_dropdown('group_name', $groups, $result_from_view_table->USERGRP_ID, 'id="group_name", class="form-control col-md-3"');
?>
            </div>
        </div>
        <div class="form-group">
            <label class="col-sm-4 control-label"><?php echo $this->lang->line('level'); ?></label>
            <a class="help-icon" data-container="body" data-toggle="popover" data-placement="right" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus.">
                <i class="fa fa-question-circle"></i>
            </a>
            <div class="col-sm-7">
<?php
echo form_dropdown('level_name', $level, $result_from_view_table->USERLVL_ID, 'id="level_name" class="form-control col-md-3"');
?>
            </div>
        </div>
        <div class="form-group">
            <label class="col-sm-4 control-label"><?php echo $this->lang->line('effective_date'); ?></label>
            <a class="help-icon" data-container="body" data-toggle="popover" data-placement="right" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus.">
                <i class="fa fa-question-circle"></i>
            </a>
            <div class="col-sm-7">
<?php
$effective_date1 = date("m/d/Y", strtotime($result_from_view_table->EFECT_FROM_DT));
echo form_input(array('value' => $effective_date1, 'name' => 'effective_date', 'id' => 'effective_date', 'class' => 'form-control', 'placeholder' => $this->lang->line('y-m-d'), 'required' => 'required'));
?>
            </div>
        </div>
        <div class="form-group">
            <label class="col-sm-4 control-label"><?php echo $this->lang->line('exp_date'); ?></label>
            <a class="help-icon" data-container="body" data-toggle="popover" data-placement="right" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus.">
                <i class="fa fa-question-circle"></i>
            </a>
            <div class="col-sm-7">
<?php
$EXPR_DT1 = date("m/d/Y", strtotime($result_from_view_table->EXPR_DT));
echo form_input(array('value' => $EXPR_DT1, 'name' => 'expired_date', 'id' => 'expired_date', 'class' => 'form-control', 'placeholder' => $this->lang->line('y-m-d'), 'required' => 'required'));
?>
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
<?php echo form_input(array('value' => $result_from_view_table->EMAIL, 'name' => 'email', 'id' => 'email', 'class' => 'form-control', 'type' => "email", 'placeholder' => $this->lang->line('plz_email'), 'required' => 'required')); ?>
            </div>
        </div>
        <div class="form-group">
            <label class="col-sm-4 control-label"><?php echo $this->lang->line('username'); ?></label>
            <a class="help-icon" data-container="body" data-toggle="popover" data-placement="right" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus.">
                <i class="fa fa-question-circle"></i>
            </a>
            <div class="col-sm-7">
<?php
if ($result_from_view_table->USERTYPE == 1) {
    echo form_input(array('name' => 'username', 'value' => $result_from_view_table->USERNAME, 'id' => 'username', 'placeholder' => $this->lang->line('plz_username'), 'class' => 'form-control', 'required' => ''));
} else {
    echo form_input(array('name' => 'username', 'value' => $result_from_view_table->USERNAME, 'id' => 'username', 'class' => 'form-control', 'placeholder' => $this->lang->line('plz_username'), 'required' => ''));
}
?>
            </div>
        </div>
        <div class="form-group">
            <label class="col-sm-4 control-label"><?php echo $this->lang->line('password'); ?></label>
            <a class="help-icon" data-container="body" data-toggle="popover" data-placement="right" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus.">
                <i class="fa fa-question-circle"></i>
            </a>
            <div class="col-sm-7">
<?php echo form_input(array('name' => 'password1', 'type' => 'password', 'id' => 'password1', 'class' => 'form-control', 'placeholder' => $this->lang->line('plz_password'))); ?>
            </div>
        </div>
        <div class="form-group">
            <label class="col-sm-4 control-label"><?php echo $this->lang->line('confirm_password'); ?></label>
            <a class="help-icon" data-container="body" data-toggle="popover" data-placement="right" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus.">
                <i class="fa fa-question-circle"></i>
            </a>
            <div class="col-sm-7">
<?php echo form_input(array('name' => 'password2', 'type' => 'password', 'id' => 'password2', 'class' => 'form-control', 'placeholder' => $this->lang->line('plz_re_password'))); ?>
            </div>
        </div>
        <div class="form-group message_box" style="display:none; color: red; ">
            <label class="col-sm-4 control-label"></label>

            <div class="col-sm-7">
                <div id="pass-info"></div>
                <div id="divCheckPasswordMatch"></div>
            </div>
        </div>        
        <div class="form-group" id="employee_info">
            <label class="col-sm-4 control-label"><?php echo $this->lang->line('employee_name'); ?></label>
            <a class="help-icon" data-container="body" data-toggle="popover" data-placement="right" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus.">
                <i class="fa fa-question-circle"></i>
            </a>
            <div class="col-sm-7">
<?php
$options = array('' => '-- Select One --', '1' => 'Employee', '2' => 'Supplier');
echo form_dropdown('employee', $employee, '', 'id="employee" class="form-control"');
?>
            </div>
        </div>

        <div class="form-group" id="supplier_info">
            <label class="col-sm-4 control-label"><?php echo $this->lang->line('supplier_name'); ?></label>
            <a class="help-icon" data-container="body" data-toggle="popover" data-placement="right" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus.">
                <i class="fa fa-question-circle"></i>
            </a>
            <div class="col-sm-7">
<?php
$options = array('' => '-- Select One --', '1' => 'Employee', '2' => 'Supplier');
echo form_dropdown('supplier', $suppliers, '', 'id="supplier" class="form-control"');
?>
            </div>
        </div>
        <div class="form-group">
            <label class="col-sm-4 control-label"><?= $this->lang->line('is_active'); ?></label>
            <div class="col-sm-7">
                <div class="checkbox checkbox-inline checkbox-primary">
                    <input  type="checkbox" name="ACTIVE_STATUS" id="ACTIVE_STATUS"  class="checkBoxStatus" <?php echo $result_from_view_table->ACTIVE_STATUS == 1 ? 'checked' : '';
?>>
                    <label for="is_active"></label>
                </div>
            </div>
        </div>
        <div class="form-group">
            <div class="col-sm-offset-3">
                <button type="submit" class="btn btn-primary" id="saveUserInfo"><?php echo $this->lang->line('submit') ?></button>
            </div>
        </div>
    </div>
</div>
<?php echo form_close(); ?>
<script type="text/javascript">
    $(document).ready(function(){
        $(document).on("change","#organzations",function(){
            var ORG_ID = $(this).val();
            //alert(ORG_ID);
            $.ajax({
                type: "POST",
                url:"<?php echo site_url('setup/userSetup/getUserGroup'); ?>",
                data: {ORG_ID:ORG_ID},
               
                success: function(result) {
                    $("#group_name").html(result).change();
                }
            });
        });
        $(document).on("change","#group_name",function(){
            var group_id = $(this).val();
            //alert(ORG_ID);
            $.ajax({
                type: "POST",
                url:"<?php echo site_url('setup/userSetup/getGroupLevel'); ?>",
                data: {group_id:group_id},
                success: function(result) {
                    $("#level_name").html(result).change();
                }
            });
        });    
        $(document).on("change","#user_type",function(){
            var user_type_id = $(this).val();
            if(user_type_id == 1){
                $("#employee_info").show();
                $("#supplier_info").hide();
            }
            if(user_type_id == 2){
                $("#supplier_info").show();
                $("#employee_info").hide();
            }
            if(user_type_id == ''){
                $("#supplier_info").hide();
                $("#employee_info").hide();
            }
        });      
        $( "#effective_date" ).datepicker( "option", "dateFormat", 'yy-mm-dd');
        $( "#expired_date" ).datepicker( "option", "dateFormat", 'yy-mm-dd');
    });
</script>

<script type="text/javascript">
    // This function is used for preview image before Upload
    $(function() {
        $("#upload_img").on("change", function()
        {
            var files = !!this.files ? this.files : [];
            if (!files.length || !window.FileReader) return; // no file selected, or no FileReader support
 
            if (/^image/.test( files[0].type)){ // only image file
                var reader = new FileReader(); // instance of the FileReader
                reader.readAsDataURL(files[0]); // read the local file
 
                reader.onloadend = function(){ // set image data as background of div
                    $("#imagePreview").css("background-image", "url("+this.result+")");
                    $("#imagePreview").show();
                    $('#imagePreview_edit').hide();
                }
            }
        });
    });
</script>
<script>
    $(document).on('click', '.checkBoxStatus', function () {
        var active_flag = ($(this).is(':checked')) ? 1 : 0;
        $("#ACTIVE_STATUS").val(active_flag);
    });
</script>
<script type="text/javascript">
    $(function () {
        $("#saveUserInfo").click(function () {
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