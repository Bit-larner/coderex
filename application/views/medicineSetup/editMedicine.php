<?php echo validation_errors(); ?>
<!-- form start -->
<?php echo form_open("", "id='amMainForm' class='form-horizontal' enctype='multipart/form-data'"); ?>


<script src="<?php echo base_url(); ?>resource/editor.js"></script>
<script src="<?php echo base_url('dist/scripts/js/script.js'); ?>"></script>

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
<?php
//    echo "<pre>";
//    print_r($categoryList);
//    exit;
?>

<div class="form-group">
    <label class="col-sm-3 control-label">Brand Name</label>
    <div class="col-sm-8">
        <input type="text" class="form-control" id="MEDICINE_NAME" name="MEDICINE_NAME" required
               placeholder="please Enter brand name"
               value="<?php echo $medicineInfo->MEDICINE_NAME ?>"/>
    </div>
</div>
<div class="form-group">
    <label class="col-sm-3 control-label">Medicine category</label>
    <a class="help-icon" data-container="body" data-toggle="popover" data-placement="right"
       data-content="<?php echo $this->lang->line('dropdown_module_link_help'); ?> ">
        <i class="fa fa-question-circle"></i>
    </a>
    <div class="col-sm-8">
        <select class="form-control" id="CAT_ID" name="CAT_ID" required>
            <?php foreach ($categoryList as $key => $value) { ?>
                <option value="<?php echo $key; ?>"
                    <?php if ($key == $medicineInfo->CAT_ID) {
                        echo "selected";
                    } ?>
                ><?php echo $value; ?></option>
                <?php
            }
            ?>
        </select>
    </div>
</div>
<div class="form-group">
    <label class="col-sm-3 control-label">Generic Name</label>
    <a class="help-icon" data-container="body" data-toggle="popover" data-placement="right"
       data-content="<?php echo $this->lang->line('dropdown_module_link_help'); ?> ">
        <i class="fa fa-question-circle"></i>
    </a>
    <div class="col-sm-8">
        <select class="form-control" id="GN_GRP_ID" name="GN_GRP_ID" required>


            <?php
            foreach($genericList as $gl)
            {
                ?>
                <option value="<?php echo $gl->GN_GRP_ID ?>"
                    <?php if ($gl->GN_GRP_ID == $medicineInfo->GN_GRP_ID) {
                        echo "selected";
                    } ?>
                ><?php echo $gl->GN_NAME.' : '.$gl->TH_GRP_NAME; ?>


                </option>
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
    <div class="col-sm-8" style="width:67%; margin:0 auto;" id="">
        <textarea type="text" class="txtEditor form-control" id="MEDICINE_DESC" name="MEDICINE_DESC" required
                  placeholder="please Enter medicine Description"><?php
            echo $medicineInfo->MEDICINE_DESC ?></textarea>
    </div>

</div>


<div class="panel panel-info">
    <div class="panel-heading">Medicine Property</div>
</div>
<p>
    <!--    <input type="button" class="btn btn-danger" value="Remove" onClick="deleteRow('dataTable')"/>-->
    <!--    --><?php
    //    $slNo = 1;
    //    foreach ($medicine as $row) { ?>
    <!--        <a href="--><?php //echo site_url("medicineSetup/deleteMedicine/$row->MEDICINE_ID"); ?><!--"-->
    <!--           title="Delete Module" class="btn btn-xs btn-danger btn-sm ajaxDelete"><span-->
    <!--                    class="glyphicon glyphicon-trash"></span></a>-->
    <!--    --><?php //} ?>

    <div class="col-md-12">
        <div class="form-group">
            <div class="col-md-3" style="width:18%;">
<p class="headingLabel">Medicine Type</p>
</div>
<div class="col-md-3" style="width:18%;">
    <p class="headingLabel">Strength</p>
</div>
<div class="col-md-3" style="width:18%;">
    <p class="headingLabel">Unit Of Measurement</p>
</div>
<div class="col-md-3" style="width:18%;">
    <p class="headingLabel">Image Insert</p>
</div>
<div class="col-md-3" style="width:18%;">
    <p class="headingLabel">File upload</p>
</div>
<!--    <input type="button" class="btn btn-success" value="Add" onClick="editRow('dataTable')"/>-->


</div>
</div>
<table id="" class="form" border="0">
    <?php foreach ($medicineStrength as $ms) { ?>
        <input type="hidden" name="MS_ID[]" value="<?php echo $ms->MS_ID; ?>">
        <tbody>
        <tr>
            <!--                  <td><input type="checkbox" name="chk[]" checked="checked"/>-->
            <!--                <input type="hidden" value="-->
            <?php //echo $ms->MS_ID; ?><!--" name="chk_id[]" checked="checked"></td>-->

            <td style="width:141px; padding-left:14px;">
                <select class="form-control" id="TYPE_ID[]" name="TYPE_ID[]">
                    <option value="">select</option>
                    <?php foreach ($medicineType as $mt) {
                        if ($ms->TYPE_ID == $mt->TYPE_ID) {
                            $selected = 'selected';
                        } else {
                            $selected = '';
                        }
                        echo "<option value='$mt->TYPE_ID' $selected >$mt->TYPE_NAME</option>";
                    } ?>
                </select>
            </td>


            <td style="width:156px; padding-left:29px;">
                <input type="text" id="STRENGTH[]" name="STRENGTH[]" value="<?php echo $ms->STRENGTH; ?>"
                       class="form-control">
                <input type="text" value="<?php echo $ms->MS_ID; ?>" name="medicine_prob_id[]">
            </td>

            <td style="width:156px; padding-left:29px;">
                <select class="form-control" id="UOM_ID[]" name="UOM_ID[]">
                    <option value="">select</option>
                    <?php foreach ($uom as $u) {
                        if ($ms->UOM_ID == $u->UOM_ID) {
                            $selected = 'selected';
                        } else {
                            $selected = '';
                        }
                        echo "<option value='$u->UOM_ID' $selected>$u->UOM_NAME</option>";
                    } ?>
                </select>
            </td>

            <td style="width:156px; padding-left:29px;">
                <input type="file" class="form-control" value="<?php echo $ms->MEDICINE_IMG; ?>" id="upload[]"
                       name="upload[]" multiple/>

            </td>

            <td style="width:156px; padding-left:29px;">
                <input type="file" class="form-control" id="userfiles[]" value="<?php echo $ms->INSERT_FILE; ?>"
                       name="userfiles[]" multiple/>


            </td>
            <td style="padding: 3px;">
                <a href="<?php echo site_url("medicineSetup/deleteEditMedicine/$ms->MS_ID"); ?>"
                   title="Delete Module" class="btn btn-xs btn-danger btn-sm ajaxDelete"><span
                            class="glyphicon glyphicon-trash "></span></a>
            </td>

        </tr>
        </tbody>
        <?php
    }
    ?>
</table>

<br/>
<br/>

<div class="alert-success">
    <div class="panel-heading">New Medicine Add</div>
</div>
<br/>
<input type="button" id="button" class="btn btn-success" value="Add" onClick="editRow('dataTable')"/>
<input type="button" class="btn btn-danger" value="Remove" onClick="deleteRow('dataTable')"/>
<br/><br/>
<table id="dataTable" hidden class="form" border="0">
    <tbody>

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
    <div class="col-sm-9 preview_div" id="imagePreview"
         value="<?php echo base_url(); ?>/<?php echo $medicineInfo->PRODUCT_FET_PHOTO; ?>"></div>
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
            <input id="is_active" type="checkbox" class="styled" name="IS_LATEST"
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
        $fg = $("div.inputBody");
        $pb = $fg.find("div.pbFirst:first");
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
    function editRow(dataTable) {
        //$(function(){
//	$("#dataTable").show();
        //});
        var table = $("#dataTable").show();

        var rowCount = $("#dataTable tr").length;
        //alert(rowCount)
        if (rowCount < 5) {							// limit the user from creating fields more than your limits
            //var row = table.insertRow(rowCount);
            var row = $("#dataTable tbody").append('<tr><td><input type="checkbox"  name="chk[]"/></td><td><select class="form-control" id="" name="TYPE_ID[]"><option value="">select</option><?php foreach ($medicineType as $mt) {
                echo "<option value=\'$mt->TYPE_ID\'>$mt->TYPE_NAME</option>";
            } ?></select></td><td><input type="text" name="STRENGTH[]" class="form-control"/></td><td><select class="form-control" id="" name="UOM_ID[]"><option value="">select</option><?php foreach ($uom as $u) {
                echo "<option value=\'$u->UOM_ID\'>$u->UOM_NAME</option>";
            } ?></select></td><td><input type="file" class="form-control" id="upload[]" name="upload[]" multiple/></td><td><input type="file" class="form-control" id="userfiles[]" name="userfiles[]" multiple/></td></tr>');
            //console.cog(row);
            // var colCount = table.rows[0].cells.length;
            // for(var i=0; i<colCount; i++) {
            // 	var newcell = row.insertCell(i);
            // 	newcell.innerHTML = table.rows[0].cells[i].innerHTML;
            // }
        } else {
            alert("Maximum Passenger per ticket is 5.");

        }

    }
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
