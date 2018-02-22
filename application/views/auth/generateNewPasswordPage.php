<style type="text/css">

    .modal-dialog{
        width: 400px !important;
    }

</style>
<?php
$randomCode = $this->uri->segment(3); // for get the random code
?>
<div id="login-overlay" class="modal-dialog">
    <div class="modal-content">
        <div class="modal-header">
            <img class="center-block img-responsive" src="<?php echo site_url('dist/img/logo_dgdp.png'); ?>" />
            <h4 class="modal-title text-center">Directorate General Defense Purchase</h4>
        </div>
        <div class="modal-body">
            <div class="row">
                <div class="col-sm-12">
                    <p style="text-align:center;" class="lead">Reset Your Password</p>
                    <div class="well">
                        <span class="error">
                            <?php echo validation_errors(); ?>
                        </span>
                        <?php echo form_open('auth/generateNewPassword', 'id="changePasswordForm"', array('class' => 'form-horizontal', 'method' => 'post')); ?>
                        <div class="form-group">
                            <label for="txtUserName" class="control-label">New Password</label>
                            <input type="hidden" name="randomCode" id="randomCode" value="<?php echo $randomCode ?>"/>
                            <input type="password" class="form-control" value="" id="password1" name="password1"
                                   title="Please enter you username" placeholder="Password" required="required">
                            <span class="help-block"></span>
                        </div>

                        <div class="form-group">
                            <label for="txtPassword" class="control-label">Confirm New Password</label>
                            <input type="password" class="form-control" id="password2" 
                                   name="password2"  title="Please enter your password" value="" placeholder="Confirm Password" required="required">
                            <span class="help-block"></span>
                        </div>
                        <div id="loginErrorMsg" class="alert alert-error hide">Wrong username or password</div>
                        <button class="btn btn-primary btn-block" id="submit" name="submit" type="submit" onclick="return Validate()">Change Password</button>
                        <?php echo form_close(); ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript">
    $( document ).ready(function() {
        $('#generate_new_password').formValidation({
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
    function Validate() {
        var password = document.getElementById("password1").value;
        var confirmPassword = document.getElementById("password2").value;
        if (password != confirmPassword) {
            alert("Passwords do not match.");
            $("#password2").focus();
            return false;
        }
    }
</script>




