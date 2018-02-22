<?php echo validation_errors(); ?>
<!-- form start -->
<?php echo form_open("", "id='amMainForm' class='form-horizontal'"); ?>



<div class="form-group">
    <label class="col-sm-4 control-label">Therapeutic Name</label>
    <a class="help-icon" data-container="body" data-toggle="popover" data-placement="right" data-content="<?php echo $this->lang->line('dropdown_module_link_help'); ?> ">
        <i class="fa fa-question-circle"></i>
    </a>
    <div class="col-sm-7">
        <select class="form-control" id="TH_GRP_ID" name="TH_GRP_ID" required>
            <?php foreach($therapeuticDropdown  as $row ){?>
            <option value="<?php echo $row->TH_GRP_ID ?>"
                <?php
                    if($row->TH_GRP_ID==$Generic_details->TH_GRP_ID)
                    {
                        echo "selected";
                    }
                ?>
                ><?php echo $row->TH_GRP_NAME; ?></option>
            <?php
            }
            ?>
       </select>
    </div>
</div>

<div class="form-group">
    <label class="col-sm-4 control-label">Generic Name</label>
    <div class="col-sm-7">
        <input type="text" class="form-control" id="GN_NAME" name="GN_NAME" required placeholder="please Enter Generic Name" value="<?php echo $Generic_details->GN_NAME ?>" />
    </div>
</div>

<div class="form-group">
    <label class="col-sm-4 control-label">Generic Description</label>
    <a class="help-icon" data-container="body" data-toggle="popover" data-placement="right" data-content="">
        <i class="fa fa-question-circle"></i>
    </a>
    <div class="col-sm-7">
        <textarea  type="text" class="form-control" id="GN_DESC" name="GN_DESC"  placeholder="please Enter Generic Description" value=""><?php echo $Generic_details->GN_DESC ?></textarea>


    </div>
</div>


<div class="form-group">
    <label class="col-sm-4 control-label">Active</label>
    <a class="help-icon" data-container="body" data-toggle="popover" data-placement="right" data-content="">
        <i class="fa fa-question-circle"></i>
    </a>
    <div class="col-sm-1">
        <div class="checkbox checkbox-inline checkbox-primary">
            <?php echo form_checkbox('ACTIVE_STATUS', '1', ($Generic_details->ACTIVE_STATUS == 1) ? TRUE : FALSE, 'class="styled"'); ?>
            <label for="is_active"></label>
        </div>
    </div>
</div>
<input type="hidden" id="GN_GRP_ID" name="GN_GRP_ID" value="">
<div class="form-group">
    <div class="col-sm-offset-4">
        <button type="submit" class="btn btn-primary"><?php echo $this->lang->line('submit') ?></button>
    </div>
</div>
<?php echo form_close(); ?>