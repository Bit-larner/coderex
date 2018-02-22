<?php echo form_open('', "id='amMainForm' class='form-horizontal'"); ?>
<div class="form-group">
    <label class="col-sm-3 control-label">Work Flow</label>
    <div class="col-sm-6">
        <?php echo form_dropdown('TEMPL_WF_ID', $workflow, '', 'onchange=""  id="" class="form-control" required'); ?>
    </div>
</div>
<div class="form-group">
    <label class="col-sm-3 control-label">Category</label>
    <div class="col-sm-6">
        <select class="form-control" name="TEMPL_CAT" required>
            <option value="E" selected>Email</option>
            <option value="L">Letter</option>
        </select>
    </div>
</div>
<div class="form-group">
    <label class="col-sm-3 control-label">Positive or Negative</label>
    <div class="col-sm-6">
        <select class="form-control" name="VC_FLAG" required>
            <option value="1" selected>Positive</option>
            <option value="0">Negative</option>
        </select>
    </div>
</div>
<div class="form-group">
    <label class="col-sm-3 control-label">Default ? </label>
    <div class="col-sm-6">
        <select class="form-control" name="VC_FLAG" required>
            <option value="1" >Yes</option>
            <option value="0" selected>No</option>
        </select>
    </div>
</div>
<div class="form-group">
    <label class="col-sm-3 control-label">Type</label>
    <div class="col-sm-6">
        <select class="form-control" name="TEMPL_TYPE" required>
            <option value="I" >Individual</option>
            <option value="G">Global</option>
        </select>
    </div>
</div>
<div class="form-group caste_name_input">
    <label class="col-sm-3 control-label">Template Name</label>

    <div class="col-sm-6">
        <?php echo form_input(array('name' => 'TEMPL_NAME', "class" => "form-control", 'required placeholder' => 'Please Type Email Subject')); ?>
    </div>
</div>
<div class="form-group caste_name_input">
    <label class="col-sm-3 control-label">Subject</label>

    <div class="col-sm-6">
        <?php echo form_input(array('name' => 'TEMPL_SUBJECT', "class" => "form-control", 'required placeholder' => 'Please Type Email Subject')); ?>
    </div>
</div>

<div class="form-group">
    <label class="col-sm-3 control-label">Email Body</label>
    <a class="help-icon" data-container="body" data-toggle="popover" data-placement="right" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus.">
        <i class="fa fa-question-circle"></i>
    </a>
    <div class="col-sm-8">
        <textarea class="form-control txtEditor" required name="TEMPL_BODY" rows="3"></textarea>
    </div>
</div>

<div class="form-group">
    <label class="col-sm-3 control-label"><?php echo $this->lang->line('is_active'); ?></label>
    <div class="col-sm-6">
        <div class="checkbox checkbox-inline checkbox-primary">
            <?php echo form_checkbox('ACTIVE_STATUS', '1', TRUE, 'class="styled"'); ?>
            <label for="ACTIVE_STATUS"></label>
        </div>
    </div>
</div>
<div class="form-group">
    <div class="col-sm-offset-3">
        <button type="submit" class="btn btn-primary">Submit</button>
    </div>
</div>
<?php echo form_close(); ?>

