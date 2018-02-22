<table id="" class="table table-striped table-bordered" width="100%" cellspacing="0">
    <tr>
        <th width="50%">Photo Name</th>
        <td>
            <img class="center-block img-responsive"
                 src="<?php echo base_url(); ?>/<?php echo $pgDetails->INSERTS_FILES; ?>" style="width: 100px;"/>
        </td>
    </tr>
    <tr>
        <th>Tittle</th>
        <td><?php echo $pgDetails->TITTLE; ?></td>
    </tr>
    <tr>
        <th>Photo Department</th>
        <td><?php echo $pgDetails->DEPARTMENT_NAME; ?></td>
    </tr>
    <tr>
        <th>Photo Description</th>
        <td><?php echo $pgDetails->PHOTO_DESC; ?></td>
    </tr>

    <tr>
        <th><?php echo $this->lang->line('status'); ?></th>
        <td>
            <?php echo ($pgDetails->ACTIVE_STATUS == 'Y') ? '<span class="btn btn-xs btn-success waves-effect waves-button waves-float">Active</span>' : '<span class="btn btn-xs btn-danger waves-effect waves-button waves-float">Inactive</span>'; ?>
        </td>
    </tr>
</table>