<?php
if(validation_errors() != false) { ?>

    <div class="error">
<?php
    echo validation_errors();
    ?>
    </div>
<?php
}
?>

<!-- form start -->
<?php echo form_open("", "id='createModuleForm' class='form-horizontal'"); ?>

<div class="form-group">
    <label class="col-sm-4 control-label"><?php echo $this->lang->line('module_name');?></label>
    <a class="help-icon" data-container="body" data-toggle="popover" data-placement="right" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus.">
        <i class="fa fa-question-circle"></i>
    </a>
    <div class="col-sm-7">
        <input type="text" class="form-control" id="txtModuleName" name="txtModuleName" placeholder="<?php echo $this->lang->line('module_name');?>" value="<?php echo set_value('module_name'); ?>" />
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
    <label class="col-sm-4 control-label"><?php echo $this->lang->line('priority');?></label>
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
            <input id="is_active" type="checkbox" checked class="styled" name="ACTIVE_STATUS" value="<?php echo set_value('sl_num'); ?>" />
            <label for="is_active"></label>
        </div>
    </div>

</div>

<div class="form-group">
    <div class="col-sm-offset-3">
        <button type="submit" class="btn btn-primary">Submit</button>
    </div>
</div>

<?php echo form_close(); ?>

<script type="text/javascript">
    $( document ).ready(function() {

        /*$('#createModuleForm').formValidation()
         .on('success.form.fv', function(e) {
         // Prevent form submission
         e.preventDefault();

         var $form = $(e.target),
         fv    = $form.data('formValidation');

         // Use Ajax to submit form data
         $.ajax({
         url: $form.attr('action'),
         type: 'POST',
         data: $form.serialize(),
         success: function(result) {
         // ... Process the result ...
         }
         });
         });*/

    });
</script>