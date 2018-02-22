<!-- form start -->
<?php //echo form_open("TemplateGenerator/create", "class='amMainForm form-horizontal'"); ?>
<?php echo form_open_multipart('CRUD/fileUpload');?>

<div class="form-group">

    <input type="file" name="userfile" size="20" />
</div>

<div class="form-group">
    <div class="col-sm-offset-2">
        <button type="submit" class="btn btn-primary">Submit</button>
    </div>
</div>
<?php echo form_close(); ?>