<?php echo validation_errors(); ?>
<!-- form start -->
<?php //echo form_open_multipart("", "id='amMainForm' class='form-horizontal'"); ?>
<?php echo form_open(base_url( 'medicineSetup/createNewGeneric' ), array( 'id' => 'amMainForm', 'class' => 'form-horizontal' ));?>

<div class="form-group">
    <label class="col-sm-3 control-label">Therapeutic Name</label>
    <a class="help-icon" data-container="body" data-toggle="popover" data-placement="right" data-content="<?php echo $this->lang->line('dropdown_module_link_help'); ?> ">
        <i class="fa fa-question-circle"></i>
    </a>
    <div class="col-sm-8">
        <?php echo form_dropdown('TH_GRP_ID', $Therapeutic_list, '', 'id="office_district" class="form-control" required');
        ?>
    </div>
</div>
<div class="form-group">
    <label class="col-sm-3 control-label">Generic Name</label>
    <div class="col-sm-8">
        <input type="text" class="form-control" name="GN_NAME" required placeholder="please Enter Generic Name" value="<?php echo set_value('module_name_bengali'); ?>" />
    </div>
</div>


<div class="form-group">
    <label class="col-sm-3 control-label">Generic Description</label>
    <a class="help-icon" data-container="body" data-toggle="popover" data-placement="right" data-content="<?php echo $this->lang->line('link_name_bangla_help'); ?>">
        <i class="fa fa-question-circle"></i>
    </a>
    <div class="col-sm-8">
     
 
    <textarea  type="text" class="form-control" name="GN_DESC"  placeholder="please Enter Generic Description" value=""></textarea>
    </div>
</div>



</div>
<div class="form-group">
    <label class="col-sm-3 control-label"><?php echo $this->lang->line('is_active'); ?></label>
    <a class="help-icon" data-container="body" data-toggle="popover" data-placement="right" data-content="<?php echo $this->lang->line('status_help'); ?>">
        <i class="fa fa-question-circle"></i>
    </a>
    <div class="col-sm-1">
        <div class="checkbox checkbox-inline checkbox-primary">
            <input id="is_active" type="checkbox" checked class="styled" name="ACTIVE_STATUS" value="<?php echo set_value('sl_num'); ?>" />
            <label for="is_active"></label>
        </div>
    </div>
</div>
<div class="form-group">
    <div class="col-sm-offset-3">
        <button type="submit" class="btn btn-primary"><?php echo $this->lang->line('submit'); ?></button>
    </div>
</div>
<?php echo form_close(); ?>

