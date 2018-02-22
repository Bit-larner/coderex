<?php
$userSessonData = $this->session->userdata('logged_in');
$session_org_id = $userSessonData['SES_ORG_ID'];
?>

<!-- form start -->
<?php echo form_open_multipart('', array('class' => 'form-horizontal', 'id' => 'amMainForm'));
?>
<?php
$id_length = 10;
$sPass = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-=+;:,.?";
$pass = substr(str_shuffle($sPass), 0, $id_length);

$length = 10;
$chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
$userName = substr(str_shuffle($chars), 0, $length)
?>
<div class="row"> 
    <div class="col-md-6">
        <p class="btn btn-primary btn-block"><?php echo $this->lang->line('basic_info'); ?></p><br>
        <div class="form-group">
            <input type="hidden" name="createPass" value="<?php echo $pass; ?>"/>
            <input type="hidden" name="createUsername" value="<?php echo $userName; ?>"/>
            <label class="col-sm-4 control-label"><?php echo $this->lang->line('org'); ?></label>
            <a class="help-icon" data-container="body" data-toggle="popover" data-placement="right" data-content="Please Select Organization Name.">
                <i class="fa fa-question-circle"></i>
            </a>
<?php if ($session_org_id == 1) { ?>
                <div class="col-sm-7">
                <?php echo form_dropdown('organzations', $organizations, '', 'id="organzations" class="form-control" required'); ?>
                </div>
                <?php } else { ?>
                <div class="col-sm-7 org_name">
                <?php
                echo $orgList->ORG_NAME;
                ?>
                    <input type="hidden" name="organzations" value="<?php echo $orgList->ORG_ID ?>"/>
                </div>
<?php } ?>
        </div>
        <div class="form-group">
            <label class="col-sm-4 control-label">Employee<?php //echo $this->lang->line('emp');       ?></label>
            <a class="help-icon" data-container="body" data-toggle="popover" data-placement="right" data-content="Please Select Employee Name.">
                <i class="fa fa-question-circle"></i>
            </a>
            <div class="col-sm-7">
<?php echo form_dropdown('emp_name', array('' => 'Select Level'), "", 'id="emp_name" class="form-control col-md-3", required'); ?>
            </div>
        </div>
<?php if ($session_org_id == 1) { ?>
            <div class="form-group">
                <label class="col-sm-4 control-label"><?php echo $this->lang->line('group'); ?></label>
                <a class="help-icon" data-container="body" data-toggle="popover" data-placement="right" data-content="Please Select Grpup Name.">
                    <i class="fa fa-question-circle"></i>
                </a>
                <div class="col-sm-7">
    <?php echo form_dropdown('group_name', array('' => 'Select Group'), "", 'id="group_name", class="form-control col-md-3", required'); ?>
                </div>
            </div>
<?php } else { ?>
            <div class="form-group">
                <label class="col-sm-4 control-label"><?php echo $this->lang->line('group'); ?></label>
                <a class="help-icon" data-container="body" data-toggle="popover" data-placement="right" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus.">
                    <i class="fa fa-question-circle"></i>
                </a>
                <div class="col-sm-7">
    <?php echo form_dropdown('group_name', $user_groups_data, "", 'id="org_group_name", class="form-control col-md-3", required'); ?>
                </div>
            </div>
<?php } ?>
        <div class="form-group">
            <label class="col-sm-4 control-label"><?php echo $this->lang->line('level'); ?></label>
            <a class="help-icon" data-container="body" data-toggle="popover" data-placement="right" data-content="Please Select Level Name.">
                <i class="fa fa-question-circle"></i>
            </a>
            <div class="col-sm-7">
<?php echo form_dropdown('level_name', array('' => 'Select Level'), "", 'id="level_name" class="form-control col-md-3", required'); ?>
            </div>
        </div>
        <div class="form-group">
            <label class="col-sm-4 control-label"><?php echo $this->lang->line('effective_date'); ?></label>
            <a class="help-icon" data-container="body" data-toggle="popover" data-placement="right" data-content="Please Select Effective Date.">
                <i class="fa fa-question-circle"></i>
            </a>
            <div class="col-sm-7">
                <div class="selectContainer">
                    <div class="input-group input-append date datePicker">
                        <input type="text" class="form-control" name="effective_date" />
                        <span class="input-group-addon add-on"><span class="glyphicon glyphicon-calendar"></span></span>
                    </div>
                </div>
            </div>
        </div>
        <div class="form-group">
            <label class="col-sm-4 control-label"><?php echo $this->lang->line('exp_date'); ?></label>
            <a class="help-icon" data-container="body" data-toggle="popover" data-placement="right" data-content="Please Select Expire Date.">
                <i class="fa fa-question-circle"></i>
            </a>
            <div class="col-sm-7">
                <div class="selectContainer">
                    <div class="input-group input-append date datePicker">
                        <input type="text" class="form-control" name="expired_date" />
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
        <div class="form-group">
            <div class="col-sm-offset-4">
                <button type="submit" class="btn btn-primary" id="saveUserInfo"><?php echo $this->lang->line('submit'); ?></button>
            </div>
        </div>
    </div>    
</div>
<?php echo form_close(); ?>

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
    // check if email is exist ?
    $("#email").blur(function(){
        var email = $("#email").val();
        $.ajax({
            type: 'POST',
            url: '<?php echo site_url('setup/userSetup/checkEmailExist'); ?>',
            data: {email: email },
            success: function (data) {
                if(data>0){
                    $("#email_exist").show(); 
                    $("#email").focus();
                }
                else{
                    $("#email_exist").hide();
                }
               
            }
            //complete: function (data) {
            //$("#showDetaildModal").modal("hide");
            //}
        });
    });
    
    $("#username").blur(function(){
        var username = $("#username").val();
        $.ajax({
            type: 'POST',
            url: '<?php echo site_url('setup/userSetup/checkUsernameExist'); ?>',
            data: {username: username },
            success: function (data) {
                if (data > 0){
                    $("#exist").show();
                    $("#error").hide();
                    $("#username").focus();
                }
                else{
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
    $(document).ready(function(){
        $(document).on("change","#organzations",function(){
            $("#supplier_info").hide();
            $("#employee_info").hide();
            $("select#user_type").val('');
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
            var ORG= $("select#organzations").val();
           
            if(ORG!='')
            {
           
                if(user_type_id == 1){
                    $("#employee_info").show();
                    $("#supplier_info").hide();
                    $.ajax({
                        type: "POST",
                        url:"<?php echo site_url('setup/userSetup/getEmpByOrg'); ?>",
                        data: {ORG_ID:ORG},

                        success: function(result) {
                            $("#emp_name").html(result).change();
                        }

                    });
                }
                if(user_type_id == 2){
                    $("#supplier_info").show();
                    $("#employee_info").hide();
                }
                if(user_type_id == ''){
                    $("#supplier_info").hide();
                    $("#employee_info").hide();
                }
            }
            else
            {
                alert('Select Organization From The Drop Down First');
                $(this).val('');
            }
        });
        
        $( "#effective_date" ).datepicker( "option", "dateFormat", 'yy-mm-dd');
        $( "#expired_date" ).datepicker( "option", "dateFormat", 'yy-mm-dd');
    });
    $(document).on("change","#organzations",function(){
        var org_id = $(this).val();
        $.ajax({
            type: "POST",
            url:"<?php echo site_url('setup/userSetup/getEmployee'); ?>",
            data: {org_id:org_id},               
            success: function(result) {
                $("#emp_name").html(result).change();
            }
        });
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