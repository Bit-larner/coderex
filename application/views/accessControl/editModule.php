<?php echo validation_errors(); ?>
<!-- form start -->
<?php echo form_open("", "id='amMainForm' class='form-horizontal'"); ?>
<div class="form-group">
    <label class="col-sm-4 control-label"><?php echo $this->lang->line('module_name'); ?></label>
    <div class="col-sm-7">
        <input type="text" class="form-control" id="txtModuleName" name="txtModuleName" required placeholder="<?php echo $this->lang->line('plz_module_name'); ?>" value="<?php echo $module_details->MODULE_NAME ?>" />
    </div>
</div>
<div class="form-group">
    <label class="col-sm-4 control-label"><?php echo $this->lang->line('module_name_bengali'); ?></label>
    <a class="help-icon" data-container="body" data-toggle="popover" data-placement="right" data-content="<?php echo $this->lang->line('module_name_bengali_help'); ?>">
        <i class="fa fa-question-circle"></i>
    </a>
    <div class="col-sm-7">
        <input type="text" class="form-control" name="txtModuleNameBn" placeholder="<?php echo $this->lang->line('plz_module_name_bengali'); ?>" value="<?php echo $module_details->MODULE_NAME_BN; ?>" />
    </div>
</div>
<div class="form-group">
    <label class="col-sm-4 control-label"><?php echo $this->lang->line('short_name'); ?></label>
    <div class="col-sm-7">
        <input type="text" class="form-control" name="txtModuleShortName" required placeholder="<?php echo $this->lang->line('plz_short_name'); ?>" value="<?php echo $module_details->SHORT_NAME; ?>" />
    </div>
</div>
<div class="form-group">
    <label class="col-sm-4 control-label"><?php echo $this->lang->line('sl'); ?></label>
    <a class="help-icon" data-container="body" data-toggle="popover" data-placement="right" data-content="<?php echo $this->lang->line('order_help'); ?>">
        <i class="fa fa-question-circle"></i>
    </a>
    <div class="col-sm-2">
        <input type="number" class="form-control" name="SL_NO" required placeholder="<?php echo $this->lang->line('plz_sl_num'); ?>" value="<?php echo $module_details->SL_NO; ?>" />
    </div>
</div>
<div class="form-group">
    <label class="col-sm-4 control-label"><?php echo $this->lang->line('is_active'); ?></label>
    <a class="help-icon" data-container="body" data-toggle="popover" data-placement="right" data-content="<?php echo $this->lang->line('status_help'); ?>">
        <i class="fa fa-question-circle"></i>
    </a>
    <div class="col-sm-1">
        <div class="checkbox checkbox-inline checkbox-primary">
            <?php echo form_checkbox('ACTIVE_STATUS', '1', ($module_details->ACTIVE_STATUS == 1) ? TRUE : FALSE, 'class="styled"'); ?>
            <label for="is_active"></label>
        </div>
    </div>
</div>
<input type="hidden" name="MODULE_ID" value="<?php echo $module_details->MODULE_ID; ?>">
<div class="form-group">
    <div class="col-sm-offset-4">
        <button type="submit" class="btn btn-primary"><?php echo $this->lang->line('submit') ?></button>
    </div>
</div>
<?php echo form_close(); ?>