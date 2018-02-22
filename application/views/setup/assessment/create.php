<?php echo form_open('setup/assessment/saveAssessment', array('class' => 'form-horizontal', 'id' => 'amMainForm')); ?>
<div class="form-group">
    <label class="col-sm-3 control-label"><?php echo $this->lang->line('assess_type'); ?></label>
    <a class="help-icon" data-container="body" data-toggle="popover" data-placement="right" data-content="Please Select Assessment Type">
        <i class="fa fa-question-circle"></i>
    </a>
    <div class="col-sm-6">
        <?php echo form_dropdown('asses_type', $asses_type, '', 'id="asses_type" class="form-control select2",  required = "required" '); ?>
    </div>
</div>
<div class="form-group">
    <label class="col-sm-3 control-label"><?php echo $this->lang->line('assessment'); ?></label>
    <a class="help-icon" data-container="body" data-toggle="popover" data-placement="right" data-content="Please Enter Assessment  Name">
        <i class="fa fa-question-circle"></i>
    </a>
    <div class="col-sm-6">
        <?php echo form_input(array('name' => 'assessment_name', "class" => "form-control caste_name", 'required' => 'required', 'placeholder' => $this->lang->line('assessment'))); ?>
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
    <label class="col-sm-3 control-label">&nbsp;</label>
    <div class="col-sm-6">
        <?php echo form_submit(array('class' => 'btn btn-primary', 'value' => $this->lang->line('submit'))); ?> 
    </div>
</div>
<?php echo form_close(); ?>