<?php echo validation_errors(); ?>
<!-- form start -->
<?php echo form_open("", "id='amMainForm' class='form-horizontal' enctype='multipart/form-data'"); ?>


<!--<link type="text/css" href="resource/editor.css" rel="stylesheet"/>-->

<script src="<?php echo base_url('dist/scripts/js/script.js'); ?>"></script>


<script src="<?php echo base_url(); ?>resource/editor.js"></script>


<br/>
<style type="text/css">

    .entry:not(:first-of-type) {
        margin-top: 10px;
    }

    .glyphicon {
        font-size: 12px;
    }

    ::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);

        background-color: #F5F5F5;
    }

    ::-webkit-scrollbar {
        width: 6px;
        background-color: #F5F5F5;
    }

    ::-webkit-scrollbar-thumb {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .2);
        background-color: #555;
    }

    .headingLabel {
        background-color: #000;
        padding: 7px;
        color: #fff;
        text-align: center;
        font-weight: bold;
        height: 47px;
    }


</style>
<style>
    #imagePreview {
        width: 130px;
        height: 130px;
        background-position: center center;
        background-size: cover;
        -webkit-box-shadow: 0 0 1px 1px rgba(0, 0, 0, .3);
        display: inline-block;
        display: none;
        border: 1px solid #002166;
        float: left;
        margin-top: 42px;
        margin-left: -211px;
    }
</style>


<div class="form-group">
    <label class="col-sm-3 control-label">Brand Name</label>
    <div class="col-sm-8">
        <input type="text" class="form-control" name="MEDICINE_NAME" required placeholder="please Enter brand name"
               value="<?php echo set_value('module_name_bengali'); ?>"/>
    </div>
</div>


<div class="form-group">
    <label class="col-sm-3 control-label">Medicine category</label>
    <a class="help-icon" data-container="body" data-toggle="popover" data-placement="right"
       data-content="<?php echo $this->lang->line('dropdown_module_link_help'); ?> ">
        <i class="fa fa-question-circle"></i>
    </a>
    <div class="col-sm-8">

        <?php echo form_dropdown('CAT_ID', $category_list, '', 'id="office_district" class="form-control" required');
        ?>
    </div>
</div>
<div class="form-group">
    <label class="col-sm-3 control-label">Generic Name</label>
    <a class="help-icon" data-container="body" data-toggle="popover" data-placement="right"
       data-content="<?php echo $this->lang->line('dropdown_module_link_help'); ?> ">
        <i class="fa fa-question-circle"></i>
    </a>
    <div class="col-sm-8">
        <select name="GN_GRP_ID" id="" class="form-control">
            <?php
            foreach($generic_list as $gl)
            {
                ?>
                <option value="<?php echo $gl->GN_GRP_ID ?>"><?php echo $gl->GN_NAME.' : '.$gl->TH_GRP_NAME.''; ?></option>
                <?php
            }
            ?>
        </select>

    </div>
</div>


<div class="form-group">
    <label class="col-sm-3 control-label">Medicine Description</label>
    <a class="help-icon" data-container="body" data-toggle="popover" data-placement="right"
       data-content="<?php echo $this->lang->line('link_name_bangla_help'); ?>">
        <i class="fa fa-question-circle"></i>
    </a>
    <div class="col-sm-8 " style="width:67%; margin:0 auto;" id="">
        <textarea class="txtEditor form-control" name="MEDICINE_DESC"></textarea>
    </div>
</div>


<div class="panel panel-info">
    <div class="panel-heading">Medicine Property</div>
</div>
<p>
    <input type="button" class="btn btn-success" value="Add" onClick="addRow('dataTable')"/>
    <input type="button" class="btn btn-danger" value="Remove" onClick="deleteRow('dataTable')"/>

    <div class="col-md-12">
        <div class="form-group" style="margin-left: -13px; margin-right: -68px;">
            <div class="col-md-3" style="width: 20%;">
<p class="headingLabel">Medicine Type</p>
</div>
<div class="col-md-3" style="width: 14%;padding-left: 0px;">
    <p class="headingLabel">Strength</p>
</div>
<div class="col-md-3" style="width: 13%;padding-left: 0px;">
    <p class="headingLabel">Unit Of Measurement</p>
</div>
<div class="col-md-3" style="width: 24%;padding-left: 3px;">
    <p class="headingLabel">Image Insert</p>
</div>
<div class="col-md-3" style="width: 24%;padding-left: 2px;">
    <p class="headingLabel">File upload</p>
</div>
</div>
</div>
<table id="dataTable" class="form" border="0">
    <tbody>
    <tr>
        <td><input type="checkbox" name="chk[]" checked="checked"/></td>

        <td>
            <select class="form-control" id="" name="TYPE_ID[]">
                <option value="">select</option>
                <?php foreach ($medicineType as $mt) {
                    echo "<option value='$mt->TYPE_ID'>$mt->TYPE_NAME</option>";
                } ?>
            </select>
        </td>


        <td>
            <input type="text" name="STRENGTH[]" class="form-control"/>
        </td>

        <td>

            <select class="form-control" id="" name="UOM_ID[]">
                <option value="">select</option>
                <?php foreach ($uom as $u) {
                    echo "<option value='$u->UOM_ID'>$u->UOM_NAME</option>";
                } ?>
            </select>
        </td>

        <td>
            <input type="file" class="form-control" id="upload[]" name="upload[]" multiple/>
        </td>

        <td>
            <input type="file" class="form-control" id="userfiles[]" name="userfiles[]" multiple/>

        </td>


    </tr>
    </tbody>

</table>
<br/>
<div class="clear"></div>

<br/>

<div class="form-group">
    <label class="col-sm-3 control-label">Writing Image</label>
    <div class="col-sm-3">
        <?php echo form_input(array('type' => 'file', 'class' => 'btn btn-primary', 'name' => 'INSERT_FILE', 'id' => 'upload_img')); ?>
    </div>
    <div class="col-sm-9 preview_div" id="imagePreview"></div>
</div>

</div>

<div class="form-group">
    <label class="col-sm-3 control-label">Is Latest</label>
    <a class="help-icon" data-container="body" data-toggle="popover" data-placement="right"
       data-content="<?php echo $this->lang->line('status_help'); ?>">
        <i class="fa fa-question-circle"></i>
    </a>
    <div class="col-sm-1">
        <div class="checkbox checkbox-inline checkbox-primary">
            <input id="is_active" type="checkbox"  class="styled" name="IS_LATEST"
                   value="<?php echo set_value('sl_num'); ?>"/>
            <label for="is_active"></label>
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
        <button type="submit" name="fileSubmit" value="UPLOAD"
                class="btn btn-primary"><?php echo $this->lang->line('submit'); ?></button>
    </div>
</div>
<?php echo form_close(); ?>


<script type="text/javascript">
    $(document).on("click", "button.addBtn", function () {
        var $pb = $("div.pbFirst");
        $pb.after("<div class='form-group replication_row'>" + $pb.html() + "</div>");
    });
    $(document).on("click", "button.deleteBtn", function () {
        $pb = $(this).parents("div.form-group:first").remove();
    })

</script>


<script>
    $(function () {
        $("#txtEditor").Editor();
    });
</script>


<script>
    $(function () {
        $("#upload_img").on("change", function () {
            var files = !!this.files ? this.files : [];
            if (!files.length || !window.FileReader)
                return; // no file selected, or no FileReader support

            if (/^image/.test(files[0].type)) { // only image file
                var reader = new FileReader(); // instance of the FileReader
                reader.readAsDataURL(files[0]); // read the local file

                reader.onloadend = function () { // set image data as background of div
                    $("#imagePreview").css("background-image", "url(" + this.result + ")");
                    $("#imagePreview").show();
                }
            }
        });
    });
</script>