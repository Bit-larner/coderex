<style type="text/css">

    .modal-dialog{
        width: 400px !important;
    }

</style>
<div id="login-overlay" class="modal-dialog">
    <div class="modal-content">
        <div class="modal-header">
            <img class="center-block img-responsive" src="<?php echo site_url('dist/img/logo_dgdp.png'); ?>" />
            <h4 class="modal-title text-center">Directorate General Defense Purchase</h4>
        </div>
        <div class="modal-body">
            <div class="row">
                <div class="col-sm-12">
                    <p>Success - you've reset your password. Now, review your account recovery information.</p>
                    <div class="well">
                      <?php echo form_open("", "id='recovery_info' method='post'"); ?>
                        <a class="btn btn-primary btn-block" type="submit" href="<?php echo site_url('auth/index'); ?>">Back to Login</a>
                      <?php echo form_close(); ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


