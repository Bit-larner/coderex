<?php echo validation_errors(); ?>
<!-- form start -->
<?php echo form_open("", "id='amMainForm' class='form-horizontal'"); ?>
<div class="form-group">
    <label class="col-sm-3 control-label"><?php echo $this->lang->line('module'); ?></label>
    <a class="help-icon" data-container="body" data-toggle="popover" data-placement="right" data-content="<?php echo $this->lang->line('dropdown_module_link_help'); ?> ">
        <i class="fa fa-question-circle"></i>
    </a>
    <div class="col-sm-8">
        <?php echo form_dropdown('MODULE_ID', $module_list, '', 'id="office_district" class="form-control" required');
        ?>
    </div>
</div>
<div class="form-group">
    <label class="col-sm-3 control-label"><?php echo $this->lang->line('link_name'); ?></label>
    <div class="col-sm-8">
        <input type="text" class="form-control" name="txtLinkName" required placeholder="<?php echo $this->lang->line('plz_link_name'); ?>" value="<?php echo set_value('module_name_bengali'); ?>" />
    </div>
</div>
<div class="form-group">
    <label class="col-sm-3 control-label"><?php echo $this->lang->line('link_name_bangla'); ?></label>
    <a class="help-icon" data-container="body" data-toggle="popover" data-placement="right" data-content="<?php echo $this->lang->line('link_name_bangla_help'); ?>">
        <i class="fa fa-question-circle"></i>
    </a>
    <div class="col-sm-8">
        <input type="text" class="form-control" name="txtLinkNameBn" placeholder="<?php echo $this->lang->line('plz_link_name_bangla'); ?>" value="<?php echo set_value('module_name_bengali'); ?>" />
    </div>
</div>
<div class="form-group">
    <label class="col-sm-3 control-label"><?php echo $this->lang->line('uri'); ?></label>
    <a class="help-icon" data-container="body" data-toggle="popover" data-placement="right" data-content="<?php echo $this->lang->line('uri_help'); ?>">
        <i class="fa fa-question-circle"></i>
    </a>
    <div class="col-sm-8">
        <input type="text" class="form-control" name="txtModLink" required placeholder="<?php echo $this->lang->line('plz_uri'); ?>" value="<?php echo set_value('sl_num'); ?>" />
    </div>
</div>
<div class="form-group">
    <label class="col-sm-3 control-label"><?php echo $this->lang->line('order'); ?></label>
    <a class="help-icon" data-container="body" data-toggle="popover" data-placement="right" data-content="<?php echo $this->lang->line('order_help'); ?>">
        <i class="fa fa-question-circle"></i>
    </a>
    <div class="col-sm-3">
        <input type="number" class="form-control" name="SL_NO" required placeholder="<?php echo $this->lang->line('plz_order'); ?>" value="<?php echo set_value('sl_num'); ?>" />
    </div>
</div>
<div class="form-group">
    <label class="col-sm-3 control-label"><?php echo $this->lang->line('action'); ?></label>
    <div class="col-sm-9">
        <?php
        $chkCreate = array(
            'name' => 'chkpages[]',
            'class' => 'styled',
            'id' => 'chkInsert',
            'value' => 'I',
            'style' => 'margin-right:5px',
        );
        echo form_checkbox($chkCreate) . "Create &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;";
        $chkview = array(
            'name' => 'chkpages[]',
            'id' => 'chkview',
            'value' => 'V',
            'checked' => 'checked',
            'style' => 'margin-right:5px',
        );
        echo form_checkbox($chkview) . "view &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;";
        $chkUpdate = array(
            'name' => 'chkpages[]',
            'id' => 'chkUpdate',
            'value' => 'U',
            'style' => 'margin-right:5px',
        );
        echo form_checkbox($chkUpdate) . "Update &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;";
        $chkDelete = array(
            'name' => 'chkpages[]',
            'id' => 'chkDelete',
            'value' => 'D',
            'style' => 'margin-right:5px',
        );
        echo form_checkbox($chkDelete) . "Delete &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;";
        $chkStatus = array(
            'name' => 'chkpages[]',
            'id' => 'chkStatus',
            'value' => 'S',
            'style' => 'margin-right:5px',
        );
        echo form_checkbox($chkStatus) . "Status";
        ?>
    </div>
</div>
<div class="form-group">
    <label class="col-sm-3 control-label"><?php echo $this->lang->line('is_active'); ?></label>
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
<div class="form-group">
    <div class="col-sm-offset-3">
        <button type="submit" class="btn btn-primary"><?php echo $this->lang->line('submit'); ?></button>
    </div>
</div>
<?php echo form_close(); ?>