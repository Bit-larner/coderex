<?php echo validation_errors(); ?>
<!-- form start -->
<?php echo form_open("", "id='amMainForm' class='form-horizontal'"); ?>
<div class="form-group">
    <label class="col-sm-4 control-label">Category Name</label>
    <div class="col-sm-7">
        <input type="text" class="form-control" id="CAT_NAME" name="CAT_NAME" required placeholder="Please Enter Category" value="<?php echo $Category_details->CAT_NAME ?>" />
    </div>
</div>
<div class="form-group">
    <label class="col-sm-4 control-label">Category Description</label>
    <a class="help-icon" data-container="body" data-toggle="popover" data-placement="right" data-content="">
        <i class="fa fa-question-circle"></i>
    </a>
    <div class="col-sm-7">
       
          <textarea  type="text" class="form-control" id="CAT_DESC" name="CAT_DESC" required placeholder="please Enter therapeutic Description" value=""><?php echo $Category_details->CAT_DESC ?></textarea>
    </div>
</div>


<div class="form-group">
    <label class="col-sm-4 control-label">Active</label>
    <a class="help-icon" data-container="body" data-toggle="popover" data-placement="right" data-content="">
        <i class="fa fa-question-circle"></i>
    </a>
    <div class="col-sm-1">
        <div class="checkbox checkbox-inline checkbox-primary">
            <?php echo form_checkbox('ACTIVE_STAT', '1', ($Category_details->ACTIVE_STAT == 1) ? TRUE : FALSE, 'class="styled"'); ?>
            <label for="is_active"></label>
        </div>
    </div>
</div>
<input type="hidden" name="CAT_ID" value="">
<div class="form-group">
    <div class="col-sm-offset-4">
        <button type="submit" class="btn btn-primary"><?php echo $this->lang->line('submit') ?></button>
    </div>
</div>
<?php echo form_close(); ?>