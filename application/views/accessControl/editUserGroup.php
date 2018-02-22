<style>
    .gap{
        margin-bottom:30px;
    }
</style>
<?php echo form_open('', 'id="amMainForm"', array('class' => 'form-horizontal')); ?>
<div class="modal-header">
    <h4 class="modal-title">Edit User Group</h4>
</div>
<div class="modal-body">
    <div class="form-group gap">
        <label class="col-sm-3 control-label"><?php echo $this->lang->line('org'); ?></label>
        <a class="help-icon" data-container="body" data-toggle="popover" data-placement="right" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus.">
            <i class="fa fa-question-circle"></i>
        </a>
        <div class="col-sm-8">
            <?php
            echo form_dropdown('ORG_ID', $org_list, $group_info->ORG_ID, 'id="office_district" class="form-control" required');
            ?>
        </div>
    </div>
    <input type="hidden"  id="org_id" value="<?php echo $group_info->ORG_ID; ?>" />
    <input type="hidden" name="grpId" value="<?php echo $user_group_id; ?>" />
    <div class="form-group gap">
        <label class="col-sm-3 control-label"><?php echo $this->lang->line('group_name'); ?></label>
        <a class="help-icon" data-container="body" data-toggle="popover" data-placement="right" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus.">
            <i class="fa fa-question-circle"></i>
        </a>
        <div class="col-sm-8">
            <input type="text" class="form-control" name="USERGRP_NAME" required placeholder="<?php echo $this->lang->line('group_name'); ?>" value="<?php echo $group_info->USERGRP_NAME ?>" />
        </div>
    </div>
    <div class="form-group gap">
        <label class="col-sm-3 control-label"><?php echo $this->lang->line('is_active'); ?></label>
        <div class="col-sm-8">
            <div class="checkbox checkbox-inline checkbox-primary">
                <?php echo form_checkbox('ACTIVE_STATUS', '1', ($group_info->ACTIVE_STATUS == 1) ? TRUE : FALSE, 'class="styled"'); ?>
                <label for="is_active"></label>
            </div>
        </div>
    </div>
</div>
<br>
<div class="modal-footer">
    <span class="modal_msg pull-left"></span>
    <button type="submit" class="btn btn-sm btn-primary" id="createModule">Save</button>
    <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">Close</button>
</div>
<?php echo form_close(); ?>
