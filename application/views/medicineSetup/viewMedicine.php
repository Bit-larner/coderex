<table id="" class="table table-striped table-bordered" width="100%" cellspacing="0">
    <tr>
        <th width="50%">Medicine Name</th>
        <td><?php echo $medicineDetails->MEDICINE_NAME; ?></td>
    </tr>
    <tr>
        <th width="50%">Generic Name</th>
        <td><?php echo $medicineDetails->GN_NAME; ?></td>
    </tr>
    <tr>
        <th width="50%">Therapeutic Name</th>
        <td><?php echo $medicineDetails->TH_GRP_NAME; ?></td>
    </tr>
    <tr>
        <th>MEdicine Description</th>
        <td><?php echo $medicineDetails->MEDICINE_DESC; ?></td>
    </tr>
    <tr>
        <th>Image</th>
        <td>
            <img class="center-block img-responsive"
                 src="<?php echo base_url(); ?>/<?php echo $medicineDetails->PRODUCT_FET_PHOTO; ?>"
                 style=" height:150px; width: 150px;"/>
        </td>
    </tr>
    <?php
//    foreach
//    ($products as $pi) {
//        ?>
    <tr>
        <th width="50%">Medicine Type</th>
        <td><?php echo $medicineDetails->TYPE_NAME;?></td>
    </tr>
    <tr>
        <th width="50%">Strength</th>
        <td><?php echo $medicineDetails->STRENGTH;?></td>
    </tr>
    <tr>
        <th width="50%">Unit Of Measurement</th>
        <td><?php echo $medicineDetails->UOM_NAME;?></td>
    </tr>
    <tr>
        <th>Image Insert</th>
        <td>
            <img class="center-block img-responsive"
                 src="<?php echo base_url(); ?>/<?php echo $medicineDetails->MEDICINE_IMG; ?>"
                 style=" height:150px; width: 150px;"/>
        </td>
    </tr>

<!--    --><?php //}
//    ?>
    <tr>
        <th>Pdf File</th>
        <td>
            <embed src="<?php echo base_url(); ?>/<?php echo $medicineDetails->INSERT_FILE; ?>" width="430px" height="500px" />

        </td>
    </tr>

    <tr>
        <th><?php echo $this->lang->line('status'); ?></th>
        <td>
            <?php echo ($medicineDetails->ACTIVE_STATUS == 'Y') ? '<span class="btn btn-xs btn-success waves-effect waves-button waves-float">Active</span>' : '<span class="btn btn-xs btn-danger waves-effect waves-button waves-float">Inactive</span>'; ?>
        </td>
    </tr>
</table>