<style media="screen">
    .panelHead {
        background-color: #000;
        color: #fff;
        text-align: center;
        padding: 8px;
        font-weight: bold;
    }

    .customPaddingCol {
        padding: 4px !important;
    }
</style>
<div class="col-md-12">
    <?php
    if ($medicineInfo->ACTIVE_STATUS == 'Y') {
        $activeY = "selected";
        $activeN = "";
    } else {
        $activeY = "";
        $activeN = "selected";
    }
    if ($medicineInfo->IS_LATEST == 'Y') {
        $latestY = 'selected';
        $latestN = "";
    } else {
        $latestY = '';
        $latestN = "selected";
    }
    ?>

    <?php echo form_open("", "id='amMainForm' class='form-horizontal' enctype='multipart/form-data'"); ?>
    <div class="row">
        <div class="col-md-3">
            <div class="form-group">
                <img src="<?php echo base_url() . $medicineInfo->INSERT_FILE; ?>" alt="" class="img-responsive">
                <input type="file" name="featuredImg" accept="image/*" class="form-control">
            </div>
        </div>
        <div class="col-md-9">
            <div class="col-md-6">
                <div class="form-group">
                    <label for="">Brand Name</label>
                    <input type="text" name="MEDICINE_NAME" class="form-control"
                           value="<?php echo $medicineInfo->MEDICINE_NAME; ?>">
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <label for="">Medicine Category</label>
                    <select class="form-control" name="CAT_ID">
                        <option value="">Medicine Category</option>
                        <?php
                        foreach ($categoryList as $cl) {
                            ?>
                            <option value="<?php echo $cl->CAT_ID ?>"
                                <?php
                                if ($medicineInfo->CAT_ID == $cl->CAT_ID) {
                                    echo "selected";
                                }
                                ?>
                            ><?php echo $cl->CAT_NAME ?></option>
                            <?php
                        }
                        ?>
                    </select>
                </div>
            </div>
            <div class="col-md-12">
                <div class="form-group">
                    <label for="">Generic Group</label>
                    <select class="form-control" name="GN_GRP_ID">
                        <option value="">Select Generic Group</option>
                        <?php
                        foreach ($genericList as $gl) {
                            ?>
                            <option value="<?php echo $gl->GN_GRP_ID ?>"
                                <?php
                                if ($medicineInfo->GN_GRP_ID == $gl->GN_GRP_ID) {
                                    echo "selected";
                                }
                                ?>
                            ><?php echo $gl->GN_NAME ?></option>
                            <?php
                        }

                        ?>

                    </select>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <label for="">Is Latest ?</label>
                    <select class="form-control" name="IS_LATEST">
                        <option value="N" <?php echo $latestN; ?>>No</option>
                        <option value="Y" <?php echo $latestY; ?>>Yes</option>
                    </select>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <label for="">Is Active ?</label>
                    <select class="form-control" name="ACTIVE_STATUS">
                        <option value="Y" <?php echo $activeY; ?>>Yes</option>
                        <option value="N" <?php echo $activeN; ?>>No</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="col-md-12">
            <div class="form-group">
                <label for="">Medicine Description</label>
                <textarea type="text" class="txtEditor form-control" id="MEDICINE_DESC" name="MEDICINE_DESC"
                          placeholder="please Enter medicine Description">
                <?php echo $medicineInfo->MEDICINE_DESC; ?>
              </textarea>
            </div>
        </div>
    </div>


    <div class="row">
        <div class="col-md-12">
            <center>
                <button type="button" class="btn btn-info btn-md" name="button">Current Medicine Property</button>
            </center>
        </div>
    </div>
    <div class="row">
        <div class="replicationRow">
            <div class="col-md-2 customPaddingCol">
                <p class="panelHead">Type</p>
            </div>

        </div>
        <div class="replicationRow ">
            <div class="col-md-2 customPaddingCol">
                <p class="panelHead">Strength</p>
            </div>

        </div>
        <div class="replicationRow">
            <div class="col-md-2 customPaddingCol">
                <p class="panelHead">UOM</p>
            </div>

        </div>
        <div class="replicationRow">
            <div class="col-md-3 customPaddingCol">
                <p class="panelHead">Image</p>
            </div>

        </div>
        <div class="replicationRow ">
            <div class="col-md-3 customPaddingCol">
                <p class="panelHead">PDF</p>
            </div>
        </div>
    </div>
    <?php
    foreach ($medicineStrength as $row) {


        ?>
        <input type="hidden" name="MSID[]" value="<?php echo $row->MS_ID ?>">
        <div class="row ">
            <div class="">
                <div class="col-md-2 customPaddingCol">
                    <select class="form-control" name="medicineTypeUpd[]">
                        <option value="1">Type</option>
                        <?php
                        foreach ($medicineType as $mt) {
                            ?>
                            <option value="<?php echo $mt->TYPE_ID ?>"
                                <?php
                                if ($mt->TYPE_ID == $row->TYPE_ID) {
                                    echo "selected";
                                }
                                ?>
                            ><?php echo $mt->TYPE_NAME ?></option>
                            <?php
                        }
                        ?>
                    </select>
                </div>
                <div class="col-md-2 customPaddingCol">
                    <input type="text" name="strengthUpd[]" class="form-control" value="<?php echo $row->STRENGTH; ?>">
                </div>
                <div class="col-md-2 customPaddingCol">
                    <select class="form-control" name="uom[]">
                        <option value="1">UOM</option>
                        <?php
                        foreach ($uom as $uomRow) {
                            ?>
                            <option value="<?php echo $uomRow->UOM_ID ?>"
                                <?php
                                if ($uomRow->UOM_ID == $row->UOM_ID) {
                                    echo "selected";
                                }
                                ?>
                            ><?php echo $uomRow->UOM_NAME ?></option>
                            <?php
                        }
                        ?>
                    </select>
                </div>
                <div class="col-md-3 customPaddingCol">
                    <div class="col-md-3">
                        <img src="<?php echo base_url() . $row->MEDICINE_IMG ?>" alt=""
                             style="width:50px!important;height:35px!important" class="">
                    </div>
                    <div class="col-md-9">
                        <input type="file" name="imageUpd[]" accept="image/*" class="form-control" value="">
                    </div>
                </div>
                <div class="col-md-3 customPaddingCol">
                    <input type="file" name="insertUpd[]" accept=".pdf" style="width:80%;float:left"
                           class="form-control" value="">


                    <a href="<?php echo site_url("medicineSetup/deleteEditMedicine/$row->MS_ID"); ?>"
                       title="Delete Module" class="btn btn-xs btn-danger btn-sm ajaxDelete"><span
                                class="glyphicon glyphicon-trash "></span></a>

                </div>
            </div>
        </div>
        <?php
    }
    ?>


    <div class="row">
        <div class="col-md-12">
            <center>
                <button type="button" class="btn btn-primary btn-xs addMoreButton" name="button">Add More</button>
            </center>
        </div>
    </div>
    <div class="row">
        <div class="replicationRow">
            <div class="col-md-2 customPaddingCol">
                <p class="panelHead">Type</p>
            </div>

        </div>
        <div class="replicationRow ">
            <div class="col-md-2 customPaddingCol">
                <p class="panelHead">Strength</p>
            </div>

        </div>
        <div class="replicationRow">
            <div class="col-md-2 customPaddingCol">
                <p class="panelHead">UOM</p>
            </div>

        </div>
        <div class="replicationRow">
            <div class="col-md-3 customPaddingCol">
                <p class="panelHead">Image</p>
            </div>

        </div>
        <div class="replicationRow ">
            <div class="col-md-3 customPaddingCol">
                <p class="panelHead">PDF</p>
            </div>
        </div>
    </div>
    <div class="row firstRow">
        <div class="rowOriginal">
            <div class="col-md-2 customPaddingCol">
                <select class="form-control" name="medicineType[]">
                    <option value="">Type</option>
                    <?php
                    foreach ($medicineType as $mt) {
                        ?>
                        <option value="<?php echo $mt->TYPE_ID ?>"><?php echo $mt->TYPE_NAME ?></option>
                        <?php
                    }
                    ?>
                </select>
            </div>
            <div class="col-md-2 customPaddingCol">
                <input type="text" name="strength[]" class="form-control" value=" ">
            </div>
            <div class="col-md-2 customPaddingCol">
                <select class="form-control" name="uom[]">
                    <option value="1">UOM</option>
                    <?php
                    foreach ($uom as $uomRow) {
                        ?>
                        <option value="<?php echo $uomRow->UOM_ID ?>"><?php echo $uomRow->UOM_NAME ?></option>
                        <?php
                    }
                    ?>
                </select>
            </div>
            <div class="col-md-3 customPaddingCol">
                <input type="file" name="image[]" accept="image/*" class="form-control" value="">
            </div>
            <div class="col-md-3 customPaddingCol">
                <input type="file" name="insert[]" style="width:80%;float:left" accept=".pdf" class="form-control"
                       value="">
                <button type="button" class="btn btn-danger btn-md deleteButton"
                        style="float: left;width: 18%;margin-left: 2%;" name="button">X
                </button>
            </div>
        </div>
    </div>
    <center>
        <button type="submit" class="btn btn-success btn-md">Submit</button>
    </center>
</div>
<?php echo form_close(); ?>
