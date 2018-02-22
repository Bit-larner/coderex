<style>
    .gap{
        margin-bottom: 45px!important;
        
    }
    .control-label{
        text-align: right;
    }
</style>
<?php echo form_open('', 'id="amMainForm"', array('class' => 'form-horizontal ')); ?>
<div class="modal-header">
    <h4 class="modal-title"><?php  echo $this->lang->line('create_group'); ?></h4>
</div>
<div class="modal-body" id="showDetaildModalBody">

    <div class="form-group gap">
        <label class="col-sm-4 control-label "><?php  echo $this->lang->line('group_name'); ?></label>
        <div class="col-sm-5">
            <input type="text" class="form-control" name="USERGRP_NAME" required placeholder="Please Enter <?php echo $this->lang->line('group_name'); ?>" value="" />
        </div>
    </div>
    <input type="hidden" id="org_id" name="ORG_ID" value="<?php echo $org_id; ?>" >
    <div class="form-group gap">
        <label class="col-sm-4 control-label"><?php echo $this->lang->line('is_active'); ?></label>

        <div class="col-sm-5">
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
    <button type="submit" class="btn btn-sm btn-primary" id=""><?php echo $this->lang->line('save'); ?></button>
    <button type="button" class="btn btn-sm btn-default" data-dismiss="modal"><?php echo $this->lang->line('close'); ?></button>
</div>
<?php echo form_close(); ?>
