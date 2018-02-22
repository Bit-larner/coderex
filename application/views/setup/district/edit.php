<?php echo validation_errors(); ?>
<!-- form start -->
<?php echo form_open('', "id='amMainForm' class='form-horizontal'"); ?>
<div class="form-group">
    <label class="col-sm-3 control-label"><?php echo $this->lang->line('division'); ?></label>
    <a class="help-icon" data-container="body" data-toggle="popover" data-placement="right" data-content="Please Select Division Name">
        <i class="fa fa-question-circle"></i>
    </a>
    <div class="col-sm-6">
        <?php echo form_dropdown('DIVISION_ID', $divisions, $row->DIVISION_ID, 'id="office_district" class="form-control select2"'); ?>
    </div>
</div>
<div class="form-group caste_name_input">
    <label class="col-sm-3 control-label"><?php echo $this->lang->line('district'); ?></label>
    <a class="help-icon" data-container="body" data-toggle="popover" data-placement="right" data-content="Please Enter District Name">
        <i class="fa fa-question-circle"></i>
    </a>
    <div class="col-sm-6">
        <?php echo form_input(array('name' => 'DISTRICT_ENAME', 'value'=>$row->DISTRICT_ENAME, 'required' => 'required', "class" => "form-control caste_name", 'placeholder' => $this->lang->line('district_name'))); ?>
    </div>
</div>
<div class="form-group caste_name_input">
    <label class="col-sm-3 control-label">District Code</label>
    <a class="help-icon" data-container="body" data-toggle="popover" data-placement="right" data-content="Please Enter District Code">
        <i class="fa fa-question-circle"></i>
    </a>
    <div class="col-sm-2">
        <?php echo form_input(array('name' => 'UD_DISTRICT_CODE', 'value'=>$row->UD_DISTRICT_CODE, 'maxlength'=>'5',  "class" => "form-control caste_name", 'placeholder' => 'District Code')); ?>
    </div>
</div>
<div class="form-group">
    <label class="col-sm-3 control-label"><?php echo $this->lang->line('is_active'); ?></label>
    <div class="col-sm-6">
        <div class="checkbox checkbox-inline checkbox-primary">
            <?php echo form_checkbox('ACTIVE_STATUS', '1', ($row->ACTIVE_STATUS == 1)?TRUE:FALSE, 'class="styled"'); ?>
            <label for="ACTIVE_STATUS"></label>
        </div>
    </div>
</div>

<div class="form-group">
    <label class="col-sm-3 control-label">&nbsp;</label>
    <div class="col-sm-6">
        <button type="submit" class="btn btn-primary"><?php echo $this->lang->line('submit'); ?></button>
    </div>
</div>
<?php echo form_close(); ?>