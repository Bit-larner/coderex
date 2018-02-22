<?php echo form_open('setup/assessmentType/updateAssessmentType', array('class' => 'form-horizontal', 'id' => 'amMainForm')); ?>
<div class="form-group">
    <label class="col-sm-3 control-label"><?php echo $this->lang->line('assess_type'); ?></label>
    <a class="help-icon" data-container="body" data-toggle="popover" data-placement="right" data-content="Please Enter Division Name">
        <i class="fa fa-question-circle"></i>
    </a>
    <div class="col-sm-6">
        <?php echo form_input(array('name' => 'asses_name', 'value' => $result->TYPE_NAME, "class" => "form-control caste_name", 'required' => 'required', 'placeholder' => $this->lang->line('assess_type'))); ?>
        <input type="hidden" value="<?php echo $result->FLD_TYPE_ID; ?>" name="type_id">
    </div>
</div>
<div class="form-group">
    <label class="col-sm-3 control-label"><?php echo $this->lang->line('is_active'); ?></label>
    <div class="col-sm-6">
        <div class="checkbox checkbox-inline checkbox-primary">
            <?php echo form_checkbox('ACTIVE_STATUS', '1', ($result->ACTIVE_STATUS == 1) ? TRUE : FALSE, 'class="styled"'); ?>
            <label for="ACTIVE_STATUS"></label>
        </div>
    </div>
</div>
<div class="form-group">
    <label class="col-sm-3 control-label">&nbsp;</label>
    <div class="col-sm-6">
        <?php echo form_submit(array('class' => 'btn btn-primary', 'value' => $this->lang->line('submit'))); ?> 
    </div>
</div>
<?php echo form_close(); ?>
