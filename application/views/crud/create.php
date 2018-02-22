<span id="validationResult"></span>
<!-- form start -->
<?php echo form_open("", "id='amMainForm' class='form-horizontal'"); ?>

<div class="form-group">
    <label class="col-sm-4 control-label"><?php echo $this->lang->line('module_name');?></label>
    <a class="help-icon" data-container="body" data-toggle="popover" data-placement="right" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus.">
        <i class="fa fa-question-circle"></i>
    </a>
    <div class="col-sm-7">
        <input type="text" class="form-control" id="txtModuleName" name="txtModuleName" required placeholder="<?php echo $this->lang->line('module_name');?>" value="<?php echo set_value('module_name'); ?>" />
    </div>
</div>
<div class="form-group">
    <label class="col-sm-4 control-label"><?php echo $this->lang->line('module_name_bengali');?></label>
    <a class="help-icon" data-container="body" data-toggle="popover" data-placement="right" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus.">
        <i class="fa fa-question-circle"></i>
    </a>

    <div class="col-sm-7">
        <input type="text" class="form-control" name="txtModuleNameBn" placeholder="<?php echo $this->lang->line('module_name_bengali');?>" value="<?php echo set_value('module_name_bengali'); ?>" />
    </div>
</div>
<div class="form-group">
    <label class="col-sm-4 control-label"><?php echo $this->lang->line('short_name');?></label>
    <a class="help-icon" data-container="body" data-toggle="popover" data-placement="right" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus.">
        <i class="fa fa-question-circle"></i>
    </a>

    <div class="col-sm-7">
        <input type="text" class="form-control" name="txtModuleShortName" placeholder="<?php echo $this->lang->line('short_name');?>" value="<?php echo set_value('module_name_bengali'); ?>" />
    </div>
</div>

<div class="form-group">
    <label class="col-sm-4 control-label"><?php echo $this->lang->line('order');?></label>
    <a class="help-icon" data-container="body" data-toggle="popover" data-placement="right" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus. Vivamus sagittis lacus vel augue laoreet rutrum faucibus. Vivamus sagittis lacus vel augue laoreet rutrum faucibus. Vivamus sagittis lacus vel augue laoreet rutrum faucibus.">
        <i class="fa fa-question-circle"></i>
    </a>

    <div class="col-sm-3">
        <input type="number" class="form-control" name="SL_NO" placeholder="<?php echo $this->lang->line('sl_num');?>" value="<?php echo set_value('sl_num'); ?>" />
    </div>
</div>

<div class="form-group">
    <label class="col-sm-4 control-label"><?php echo $this->lang->line('is_active');?></label>

    <div class="col-sm-7">
        <div class="checkbox checkbox-inline checkbox-primary">
            <input class="styled" type="checkbox" checked="checked" value="1" name="ACTIVE_STATUS">
            <label for="ACTIVE_STATUS"></label>
        </div>
    </div>

</div>

<div class="form-group">
    <label class="col-xs-4 control-label">Start date</label>
    <div class="col-xs-5 dateContainer">
        <div class="input-group input-append date startDatePicker">
            <input type="text" class="form-control" name="startDate"
                   data-fv-notempty="true"
                   data-fv-notempty-message="The start date is required"
                   data-fv-date-format="MM/DD/YYYY"
                   data-fv-date-max="endDate"
                   data-fv-date-message="The start date is not a valid" />
            <span class="input-group-addon add-on"><span class="glyphicon glyphicon-calendar"></span></span>
        </div>
    </div>
</div>

<div class="form-group">
    <label class="col-xs-4 control-label">End date</label>
    <div class="col-xs-5 dateContainer">
        <div class="input-group input-append date startDatePicker">
            <input type="text" class="form-control" name="startDate"
                   data-fv-notempty="true"
                   data-fv-notempty-message="The end date is required"
                   data-fv-date-format="MM/DD/YYYY"
                   data-fv-date-max="startDate"
                   data-fv-date-message="The end date is not a valid" />
            <span class="input-group-addon add-on"><span class="glyphicon glyphicon-calendar"></span></span>
        </div>
    </div>
</div>

<!--<div class="form-group">
    <label class="col-xs-4 control-label">End date</label>
    <div class="col-xs-5 dateContainer">
        <div class="input-group input-append date endDatePicker">
            <input type="text" class="form-control" name="endDate" />
            <span class="input-group-addon add-on"><span class="glyphicon glyphicon-calendar"></span></span>
        </div>
    </div>
</div>-->

<!--<div class="form-group">
    <label class="col-sm-3 control-label">Date Range</label>

    <div class="col-sm-6 date">
        <div class="input-group input-daterange">
            <input type="text" class="form-control" value="2012-04-05">
            <span class="input-group-addon">to</span>
            <input type="text" class="form-control" value="2012-04-19">
        </div>
    </div>
</div>-->

<div class="form-group">
    <div class="col-sm-offset-3">
        <button type="submit" class="btn btn-primary">Submit</button>
    </div>
</div>

<?php echo form_close(); ?>

