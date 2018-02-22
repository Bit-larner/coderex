<?php echo form_open('', "id='amMainForm' class='form-horizontal'"); ?>
    <div class="form-group">
        <label class="col-sm-3 control-label">Work Flow</label>
        <div class="col-sm-6">
            <?php echo form_dropdown('TEMPL_WF_ID', $workflow, $viewdetails->TEMPL_WF_ID, 'onchange=""  id="" class="form-control"'); ?>
        </div>
    </div>
  <div class="form-group">
        <label class="col-sm-3 control-label">Category</label>
        <div class="col-sm-6">
            <select class="form-control" name="TEMPL_CAT" required>
                <option  value="E" <?php if($viewdetails->TEMPL_CAT=='E') { echo 'selected';} ?> >Email</option>
                <option value="L" <?php if($viewdetails->TEMPL_CAT=='L') { echo 'selected';} ?>>Letter</option>
            </select>
        </div>
    </div>
    <div class="form-group">
        <label class="col-sm-3 control-label">Type</label>
        <div class="col-sm-6">
            <select class="form-control" name="TEMPL_TYPE" required>
                <option value="I" <?php if($viewdetails->TEMPL_TYPE=='I') { echo 'selected';} ?> >Individual</option>
                <option value="G" <?php if($viewdetails->TEMPL_TYPE=='G') { echo 'selected';} ?>>Global</option>
            </select>
        </div>
    </div>
    <div class="form-group caste_name_input">
        <label class="col-sm-3 control-label">Template Name</label>

        <div class="col-sm-6">
            <?php echo form_input(array('name' => 'TEMPL_NAME', 'value' => $viewdetails->TEMPL_NAME, "class" => "form-control", 'required placeholder' => 'Please Type Email Subject')); ?>
        </div>
    </div>
    <div class="form-group caste_name_input">
        <label class="col-sm-3 control-label">Subject</label>

        <div class="col-sm-6">
            <?php echo form_input(array('name' => 'TEMPL_SUBJECT', 'value' => $viewdetails->TEMPL_SUBJECT, "class" => "form-control", 'required placeholder' => 'Please Type Email Subject')); ?>
        </div>
    </div>
    <div class="form-group">
        <label class="col-sm-3 control-label">Email Body</label>
        <a class="help-icon" data-container="body" data-toggle="popover" data-placement="right" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus.">
            <i class="fa fa-question-circle"></i>
        </a>
        <div class="col-sm-6">
            <textarea class="form-control txtEditor" required name="TEMPL_BODY" rows="3"><?php echo $viewdetails->TEMPL_BODY; ?></textarea>
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
            <button type="submit" class="btn btn-primary">Submit</button>
        </div>
    </div>
<?php echo form_close(); ?>

