<style>
    .gap{
        margin-bottom: 5px;
    }
</style>
<?php echo form_open('AccessControl/addNewGroup', array('class' => 'form-horizontal', 'id' => 'amMainForm')); ?>
<div class="modal-body">
    <div class="form-group">          
        <label for="firstname" class="col-md-4 control-label"><?php echo $this->lang->line('create_group_sing'); ?></label>
        <div class="col-md-5">
            <?php echo form_input(array('class' => 'form-control', 'placeholder' => $this->lang->line('plz_group_name'), 'id' => 'txtGroupName', 'name' => 'txtGroupName', 'required' => 'required')); ?>
            <?php echo form_hidden('hid', $hid); ?>
        </div>
    </div>
    <div class="form-group">
        <label class="col-sm-4 control-label"><?php echo $this->lang->line('is_active'); ?></label>
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
<div class="form-group">
    <div class="col-sm-offset-4">
        <button type="submit" class="btn btn-sm btn-primary" id="createModule"><?php echo $this->lang->line('save'); ?></button>
    </div>
</div>
<?php echo form_close(); ?>
<div class="row">
    <div class="col-md-12 gap">
        <center>
            <h3 class="btn btn-default btn-block"><?php echo $this->lang->line('grooup_list_of_org'); ?></h3>
        </center>
    </div>
</div>
<div class="row">
    <?php
    foreach ($group_list as $grp) {
        ?>
        <div class="col-md-3 gap">
            <p class="btn btn-primary btn-block"><small><?php echo $grp->USERGRP_NAME; ?></small></p>
        </div>

        <?php
    }
    ?>
</div>
<div class="modal-footer">
    <span class="modal_msg pull-left"></span>
    <button type="button" class="btn btn-sm btn-default" data-dismiss="modal"><?php echo $this->lang->line('close'); ?></button>
</div>
<script type="text/javascript">
//    var specialKeys = new Array();
//    specialKeys.push(8); //Backspace
//    specialKeys.push(9); //Tab
//    specialKeys.push(46); //Delete
//    specialKeys.push(36); //Home
//    specialKeys.push(35); //End
//    specialKeys.push(37); //Left
//    specialKeys.push(39); //Right
//    function IsAlphaNumeric(e) {
//
//        var keyCode = e.keyCode == 0 ? e.charCode : e.keyCode;
//        var ret = ((keyCode >= 48 && keyCode <= 57) || (keyCode >= 65 && keyCode <= 90) || (keyCode >= 97 && keyCode <= 122) || (specialKeys.indexOf(e.keyCode) != -1 && e.charCode != e.keyCode));
//        document.getElementById("error").style.display = ret ? "none" : "inline";
//        return ret;
//
//    }
</script>
