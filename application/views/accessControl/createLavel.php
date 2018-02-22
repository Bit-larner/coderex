<style>
    .gap{
        margin-bottom: 45px!important;

    }
    .control-label{
        text-align: right;
    }
</style>
<?php echo form_open('', 'id="amMainForm"', array('class' => 'form-horizontal')); ?>
<div class="modal-header">
    <h4 class="modal-title">Create group Level</h4>
</div>
<div class="modal-body">
    <div class="form-group gap">
        <label for="firstname" class="col-md-3 control-label"><?php echo $this->lang->line('group_lavel'); ?></label>
        <div class="col-md-7">
            <?php echo form_input(array('class' => 'form-control', 'placeholder' => $this->lang->line('group_lavel'), 'id' => 'txtLevelName', 'name' => 'txtLevelName', 'required' => 'required')); ?>
<?php echo form_hidden('txtGroupId',
    $user_group_id); ?>
            <input type="hidden" id="org_grp_id" name="org_grp" value="<?php echo $grp_org; ?>">
        </div>
    </div>
 <div class="form-group">
    <label class="col-sm-3 control-label"><?php echo $this->lang->line('is_active');?></label>
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
</div>
<br>
<div class="modal-footer">
    <span class="modal_msg pull-left"></span>
    <button type="submit" class="btn btn-sm btn-primary" id="createModule"><?php echo $this->lang->line('save'); ?></button>
    <button type="button" class="btn btn-sm btn-default" data-dismiss="modal"><?php echo $this->lang->line('close'); ?></button>
</div>
<?php echo form_close(); ?>

