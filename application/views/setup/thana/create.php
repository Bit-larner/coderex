<?php echo validation_errors(); ?>
<!-- form start -->
<?php echo form_open('', "id='amMainForm' class='form-horizontal'"); ?>
<div class="form-group">
    <label class="col-sm-3 control-label"><?php echo $this->lang->line('division'); ?></label>
    <a class="help-icon" data-container="body" data-toggle="popover" data-placement="right" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus.">
        <i class="fa fa-question-circle"></i>
    </a>
    <div class="col-sm-6">
        <?php echo form_dropdown('', $divisions, '', 'onchange="divisionSelected(this.value)"  id="division office_district" class="form-control" required'); ?>
    </div>
</div>
<div class="form-group">
    <label class="col-sm-3 control-label"><?php echo $this->lang->line('district'); ?></label>
    <a class="help-icon" data-container="body" data-toggle="popover" data-placement="right" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus.">
        <i class="fa fa-question-circle"></i>
    </a>
    <div class="col-sm-6">
        <?php echo form_dropdown('DISTRICT_ID', '', '', 'id="district_id" class="form-control" required'); ?>
    </div>
</div>

<div class="form-group caste_name_input">
    <label class="col-sm-3 control-label"><?php echo $this->lang->line('thana'); ?></label>
    <a class="help-icon" data-container="body" data-toggle="popover" data-placement="right" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus.">
        <i class="fa fa-question-circle"></i>
    </a>
    <div class="col-sm-6">
        <?php echo form_input(array('name' => 'THANA_ENAME', "class" => "form-control caste_name", 'required placeholder' => 'Thana Name')); ?>
    </div>
</div>
<div class="form-group">
    <label class="col-sm-3 control-label"><?php echo $this->lang->line('is_active'); ?></label>
    <div class="col-sm-6">
        <div class="checkbox checkbox-inline checkbox-primary">
            <?php echo form_checkbox('ACTIVE_STATUS', '1', TRUE, 'class="styled"'); ?>
            <label for="ACTIVE_STATUS"></label>
        </div>
    </div>
</div>

<div class="form-group">
    <div class="col-sm-offset-3">
        <button type="submit" class="btn btn-primary"><?php echo $this->lang->line('submit');?></button>
    </div>
</div>
<?php echo form_close(); ?>

<script type="text/javascript">
    function divisionSelected(val){ // val variable use for division id
        $.ajax({
            type: "POST",
            url: "<?php echo site_url("setup/thana/getDistrictById"); ?>",
            dataType: 'json',
            data: {fld_id: val},
            success: function (data) {                    
                var appenddata = "<option value = ' '>" + "Select District" + " </option>";
                $.each(data, function (key, value) {
                    appenddata += "<option value = '" + value.DISTRICT_ID + " '>" + value.DISTRICT_ENAME + " </option>";                        
                });
                $('#district_id').html(appenddata);
            }
        });
    }
</script>