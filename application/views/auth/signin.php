<style type="text/css">
    .pull-right{
        margin-bottom: 5px;
        margin-top: -8px;
    }
</style>
<div id="login-overlay" class="modal-dialog">
    <div class="modal-content">
        <div class="modal-header">
            <img class="center-block img-responsive" src="<?php echo site_url('dist/img/Thikana.jpg'); ?>" style="width: 100px;" />
            <h4 class="modal-title text-center">Access to Information</h4>
        </div>
        <div class="modal-body">
            <div class="row">
                <div class="col-sm-offset-3 col-sm-6">
                    <div class="well">
                        <?php echo form_open("", "id='formSignin' "); ?>

                        <span class="error">
                            <?php echo validation_errors(); ?>
                        </span>

                        <div class="form-group">
                            <label for="txtUserName" class="control-label">Username</label>
                            <input type="text" class="form-control" id="txtUserName" name="txtUserName" value="<?php echo set_value('txtUserName'); ?>" title="Please enter you username" placeholder="Username" required autofocus>
                            <span class="help-block"></span>
                        </div>

                        <div class="form-group">
                            <label for="txtPassword" class="control-label">Password</label>
                            <input type="password" autocomplete="off" class="form-control" id="inputPassword" name="txtPassword" value="<?php echo set_value('txtPassword'); ?>" title="Please enter your password" placeholder="Password" required>
                            <span class="help-block"></span>
                        </div>
                        <div id="loginErrorMsg" class="alert alert-error hide">Wrong username or password</div>

                        <div class="checkbox checkbox-inline checkbox-primary">
                            <input type="checkbox" class="styled styled-primary" id="remember_me" value="option1">
                            <!--<label for="remember_me"> Remember me </label>
                            <p class="help-block pricom">(if this is a private computer)</p>-->
                            <a class ="pull-right" href="<?php echo site_url('auth/forgetPasswordView'); ?>">Forgotten Password?</a>
                            <p class="help-block pricom">&nbsp;</p>
                        </div>
                        <button class="btn btn-primary btn-block" type="submit">Sign in</button>
                        <?php echo form_close(); ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript">
    $(document).ready(function() {
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