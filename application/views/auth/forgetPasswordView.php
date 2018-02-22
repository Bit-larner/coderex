<style type="text/css">
    #exist_email, #exist_email_2{
        display:none;
        color: red;
    }
    #link_sent, #link_sent_2{
        display:none;
        color: green;
    }
    #for_password, #for_username{
        display: none;
    }
    .pull-right{
        margin-bottom: 5px;
        margin-top: -8px;
    }
    #loading, #loading2{
        display: none;
        color: blue;
    }
    .not_registered{
        color:red;
    }
    .modal-dialog{
        width: 420px !important;
    }

    .lead{
        text-align: center;
        margin-bottom: -5px;
    }
    .close_btn{
        margin-top: 22px;
    }
    .control-label{
        font-weight: 100;
    }
    
</style>
<div id="login-overlay" class="modal-dialog">
    <div class="modal-content">
        <div class="modal-header">
            <img class="center-block img-responsive" src="<?php echo site_url('dist/img/Thikana.jpg'); ?>" style="width: 100px;" />
            <h4 class="modal-title text-center"></h4>
        </div>
        <div class="modal-body">
            <div class="row">
                <div class="col-sm-12">
                    <p class="lead text-success">HAVING TROUBLE SIGNING IN? </p>
                    <div class="modal-body">
                        <?php echo form_open('', array('class' => 'form-horizontal', 'id' => 'frmUserInfo')); ?>
                        <div class="col-sm-12">
                            <input type="radio" name="recovery" id="recovey_password" required="required"/> <label for="recovey_password">I don't know my Password</label>
                        </div>
                        <div id="for_password" class="col-sm-12">
                            <div class="form-group">
                                <label class="col-sm-6 control-label">User Name/Email</label>
                                <div class="col-sm-6">
                                    <?php echo form_input(array('name' => 'username_email', 'id' => 'username_email', 'class' => 'form-control', 'placeholder' => "User Name / Email", 'type' => 'text', 'required')); ?>
                                    <div id="exist_email"> Please Enter a Valid Email Address</div> 
                                    <div id="loading">Please wait......</div>
                                    <div id ="not_registered"></div>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-sm-offset-5">
                                    <a class="btn btn-primary" id="get_password">Submit</a>
                                </div>
                            </div>
                        </div>
                        
                        <div class="col-sm-12">
                            <input type="radio" name="recovery" id="recovery_username" required="required"/> <label for="recovery_username">I don't know my Username</label>
                        </div>
                        <?php echo form_open('', array('class' => 'form-horizontal', 'id' => '')); ?>
                        <div class="form-group" id="for_username">    
                            <div class="form-group">
                                <label class="col-sm-3 control-label">Email</label>
                                <div class="col-sm-6">
                                    <?php echo form_input(array('name' => 'email_2', 'id' => 'email_2', 'class' => 'form-control', 'placeholder' => "Email", 'type' => "email", 'required' => 'required')); ?>
                                    <div id="messeage"> </div> 
                                    <div id="loading2">Please wait.....</div>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-sm-offset-3">
                                    <a class="btn btn-primary" id="getUsername">Submit</a>
                                </div>
                            </div>
                        </div>
                        <?php echo form_close(); ?>
                        <?php echo form_close(); ?>
                    </div>
                    <div class="col-sm-12 close_btn">
                        <a href="<?php echo site_url('auth/index'); ?>" type="submit" class=" close_close btn btn-block btn-primary">Close</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript">
    $( document ).ready(function() {
        $('#formSignin').formValidation({
            framework: 'bootstrap',
            excluded: ':disabled',
            icon: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            addOns: {
                mandatoryIcon: {
                    icon: 'glyphicon glyphicon-asterisk'
                }
            }
        });
     
    });
</script>

<script type="text/javascript">
    $(document).ready(function(){
        $("#recovey_password").click(function(){
            $("#for_password").slideToggle("slow");
            $("#for_username").slideUp();
        });
        
        $("#recovery_username").click(function(){
            $("#for_username").slideToggle("slow");
            $("#for_password").slideUp();
        });
        
        // forget password
        $(document).on("click","#get_password",function(){
            var username_email = $("#username_email").val();
            if(username_email == null || username_email == ""){
                $("#username_email").focus();
            } else{
                $("#not_registered").hide();
                $("#loading").show();
                $.ajax({
                    type: "POST",
                    url:"<?php echo site_url('auth/forgetPassword'); ?>",
                    data: {username_email:username_email},
                    success: function(result) {
                        $("#loading").hide();
                        $("#not_registered").html(result);
                        $("#not_registered").show();
                    }
                });
            }
        });
        
        $(document).on("click","#getUsername",function(){
            var email = $("#email_2").val();
            if(email == null || email == ""){
                $("#email_2").focus();
            } else{
                $("#not_registered").hide();
                $("#loading2").show();
                $.ajax({
                    type: "POST",
                    url:"<?php echo site_url('auth/forgrtUsername'); ?>",
                    data: {email:email},
                    success: function(result) {
                        $("#loading2").hide();
                        $("#messeage").html(result);
                    }
                });
            }
        });
    });
</script>



