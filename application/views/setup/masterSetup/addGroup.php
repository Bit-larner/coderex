<!-- form start -->
<?php echo form_open('setup/MasterSetup/saveGroup', array('class' => 'form-horizontal', 'id'=>'amMainForm' )); ?>
<div class="form-group">
    <label class="col-sm-3 control-label"><?php echo $this->lang->line('group_name'); ?></label>
    <a class="help-icon" data-container="body" data-toggle="popover" data-placement="right" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus.">
        <i class="fa fa-question-circle"></i>
    </a>
    <div class="col-sm-6">
        <?php echo form_input(array('name' => 'LOOKUP_GRP_NAME', 'id' => 'LOOKUP_GRP_NAME', 'class' => 'form-control', 'placeholder' => "Group Name", 'required' => 'required')); ?>
    </div>
</div>
<div class="form-group">
    <label class="col-sm-3 control-label"><?php echo $this->lang->line('short_name_type'); ?></label>
    <a class="help-icon" data-container="body" data-toggle="popover" data-placement="right" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus.">
        <i class="fa fa-question-circle"></i>
    </a>
    <div class="col-sm-6">
       <?php 
       $options = array('' => '-- Select One --', 'C' => 'Character' , 'N' => 'Number');
       echo form_dropdown('short_name', $options , '', 'id="short_name" class="form-control" required'); ?>
    </div>
</div>
<div class="form-group">
    <label class="col-sm-3 control-label"><?= $this->lang->line('is_active'); ?></label>
    <div class="col-sm-6">
        <div class="checkbox checkbox-inline checkbox-primary">
            <?php echo form_checkbox('styled', 'ACTIVE_FLAG', 1, TRUE); ?>
            <label for="is_active"></label>
        </div>
    </div>
</div>
<div class="form-group">
    <div class="col-sm-offset-3">
        <button type="submit" class="btn btn-primary ">Submit</button>
    </div>
</div>
<?php echo form_close(); ?>