<span id="validationResult"></span>
<!-- form start -->
<?php echo form_open("", "id='amMainForm' class='form-horizontal'"); ?>

<div class="form-group">
    <label class="col-sm-4 control-label">User Define ID</label>
    <a class="help-icon" data-container="body" data-toggle="popover" data-placement="right" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus.">
        <i class="fa fa-question-circle"></i>
    </a>
    <div class="col-sm-7">
        <input type="text" class="form-control" id="udid" name="udid" required placeholder="User Define ID" value="<?php echo set_value('udid'); ?>" />
    </div>
</div>

<div class="form-group">
    <div class="col-sm-offset-3">
        <button type="submit" class="btn btn-primary">Submit</button>
    </div>
</div>

<?php echo form_close(); ?>

