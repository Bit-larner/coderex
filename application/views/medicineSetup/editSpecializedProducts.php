<?php echo validation_errors(); ?>
    <!-- form start -->
<?php echo form_open("", "id='amMainForm' class='form-horizontal'"); ?>


    <div class="form-group">
        <label class="col-sm-3 control-label">Special Department Name</label>
        <a class="help-icon" data-container="body" data-toggle="popover" data-placement="right"
           data-content="<?php echo $this->lang->line('dropdown_module_link_help'); ?> ">
            <i class="fa fa-question-circle"></i>
        </a>
        <div class="col-sm-8">
            <?php echo form_dropdown('SPECIAL_ID', $special_department_list, '', 'id="office_district" class="form-control" required');
            ?>
        </div>
    </div>


    <div class="form-group">
        <label class="col-sm-3 control-label">Product Name</label>
        <a class="help-icon" data-container="body" data-toggle="popover" data-placement="right"
           data-content="<?php echo $this->lang->line('dropdown_module_link_help'); ?> ">
            <i class="fa fa-question-circle"></i>
        </a>
        <div class="col-sm-8">
            <?php echo form_dropdown('MEDICINE_ID', $special_product_list, '', 'id="office_district" class="form-control" required');
            ?>
        </div>
    </div>


    </div>
    <div class="form-group">
        <label class="col-sm-3 control-label"><?php echo $this->lang->line('is_active'); ?></label>
        <a class="help-icon" data-container="body" data-toggle="popover" data-placement="right"
           data-content="<?php echo $this->lang->line('status_help'); ?>">
            <i class="fa fa-question-circle"></i>
        </a>
        <div class="col-sm-1">
            <div class="checkbox checkbox-inline checkbox-primary">
                <input id="is_active" type="checkbox" checked class="styled" name="ACTIVE_STATUS"
                       value="<?php echo set_value('sl_num'); ?>"/>
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