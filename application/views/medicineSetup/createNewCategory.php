<?php echo validation_errors(); ?>
<!-- form start -->
<?php echo form_open("", "id='amMainForm' class='form-horizontal'"); ?>



<div class="form-group">
    <label class="col-sm-3 control-label">Category Name</label>
    <div class="col-sm-8">
        <input type="text" class="form-control" name="CAT_NAME" required placeholder="please Enter Category Name" value="<?php echo set_value('module_name_bengali'); ?>" />
    </div>
</div>


<div class="form-group">
    <label class="col-sm-3 control-label">Category Description</label>
    <a class="help-icon" data-container="body" data-toggle="popover" data-placement="right" data-content="<?php echo $this->lang->line('link_name_bangla_help'); ?>">
        <i class="fa fa-question-circle"></i>
    </a>
    <div class="col-sm-8">
     
 
    <textarea  type="text" class="form-control" name="CAT_DESC"  placeholder="please Enter Category Description" value=""></textarea>
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
            <input id="is_active" type="checkbox" checked class="styled" name="ACTIVE_STAT" value="<?php echo set_value('sl_num'); ?>" />
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