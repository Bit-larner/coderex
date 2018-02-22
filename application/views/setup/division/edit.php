<?php echo form_open('setup/division/updateDivision', array('class' => 'form-horizontal', 'id'=>'amMainForm' )); ?>
<div class="form-group">
    <label class="col-sm-3 control-label"><?php echo $this->lang->line('country_name');?></label>
    <a class="help-icon" data-container="body" data-toggle="popover" data-placement="right" data-content="Please Select Country Name">
        <i class="fa fa-question-circle"></i>
    </a>
    <div class="col-sm-6">
      <?php echo form_dropdown('country', $country, $result->COUNTRY_ID, 'id="division office_district" class="form-control select2"'); ?>
        <input type="hidden" value="<?php echo $result->DIVISION_ID; ?>" name="division_id">
    </div>
</div>
<div class="form-group">
    <label class="col-sm-3 control-label"><?php echo $this->lang->line('division_name');?></label>
    <a class="help-icon" data-container="body" data-toggle="popover" data-placement="right" data-content="Please Enter Division Name">
        <i class="fa fa-question-circle"></i>
    </a>
    <div class="col-sm-6">
       <?php echo form_input(array('name' => 'division_name', 'value'=>$result->DIVISION_ENAME, "class" => "form-control caste_name",'required'=>'required', 'placeholder' => $this->lang->line('division_name'))); ?>
    </div>
</div>
<div class="form-group">
    <label class="col-sm-3 control-label">Division Code</label>
    <a class="help-icon" data-container="body" data-toggle="popover" data-placement="right" data-content="Please Enter Division Code">
        <i class="fa fa-question-circle"></i>
    </a>
    <div class="col-sm-6">
       <?php echo form_input(array('name' => 'division_code', 'value'=>$result->UD_DIVISION_CODE, 'maxlength'=>'2', 'minlength'=>'1', 'type'=>'number', "class" => "form-control caste_name", 'required'=>'required', 'placeholder' => 'Division Code')); ?>
    </div>
</div>
<div class="form-group">
    <label class="col-sm-3 control-label">Serial/Order</label>
    <a class="help-icon" data-container="body" data-toggle="popover" data-placement="right" data-content="Please Enter Division Serial/Order">
        <i class="fa fa-question-circle"></i>
    </a>
    <div class="col-sm-2">
       <?php echo form_input(array('name' => 'ORDER_SL', 'value'=>$result->ORDER_SL, 'maxlength'=>'1', 'type'=>'number', "class" => "form-control caste_name",  'placeholder' => 'Serial/Order')); ?>
    </div>
</div>
<div class="form-group">
    <label class="col-sm-3 control-label"><?php echo $this->lang->line('is_active'); ?></label>
    <div class="col-sm-6">
        <div class="checkbox checkbox-inline checkbox-primary">
            <?php echo form_checkbox('ACTIVE_STATUS', '1', ($result->ACTIVE_STATUS == 1)? TRUE:FALSE, 'class="styled"'); ?>
            <label for="ACTIVE_STATUS"></label>
        </div>
    </div>
</div>
<div class="form-group">
    <label class="col-sm-3 control-label">&nbsp;</label>
    <div class="col-sm-6">
         <?php echo form_submit( array('class' => 'btn btn-primary','value' => $this->lang->line('submit')));?> 
    </div>
</div>
<?php echo form_close(); ?>
