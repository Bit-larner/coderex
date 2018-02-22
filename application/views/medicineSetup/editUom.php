<?php echo validation_errors(); ?>
    <!-- form start -->
<?php echo form_open("", "id='amMainForm' class='form-horizontal'"); ?>
    <div class="form-group">
        <label class="col-sm-4 control-label">Unit Of Measurement</label>
        <div class="col-sm-7">
            <input type="text" class="form-control" id="UOM_NAME" name="UOM_NAME" required placeholder="Enter Uom Name" value="<?php echo $Uom_details->UOM_NAME ?>" />
        </div>
    </div>

    <div class="form-group">
        <label class="col-sm-4 control-label">Active</label>
        <a class="help-icon" data-container="body" data-toggle="popover" data-placement="right" data-content="">
            <i class="fa fa-question-circle"></i>
        </a>
        <div class="col-sm-1">
            <div class="checkbox checkbox-inline checkbox-primary">
                <?php echo form_checkbox('ACTIVE_STATUS', '1', ($Uom_details->ACTIVE_STATUS == 1) ? TRUE : FALSE, 'class="styled"'); ?>
                <label for="is_active"></label>
            </div>
        </div>
    </div>
    <input type="hidden" name="UOM_ID" value="">
    <div class="form-group">
        <div class="col-sm-offset-4">
            <button type="submit" class="btn btn-primary"><?php echo $this->lang->line('submit') ?></button>
        </div>
    </div>
<?php echo form_close(); ?>