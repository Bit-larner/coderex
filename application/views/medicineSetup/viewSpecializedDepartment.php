<table id="" class="table table-striped table-bordered" width="100%" cellspacing="0">
    <tr>
        <th width="50%">Special Name</th>
        <td><?php echo $spdDetails->SPECIAL_NAME; ?></td>
    </tr>
    <tr>
        <th>Special desc</th>
        <td><?php echo $spdDetails->SPECIAL_DESC; ?></td>
    </tr>
    <tr>
        <th>Image name</th>
        <td>
            <img class="center-block img-responsive" src="<?php echo base_url(); ?>/<?php echo $spdDetails->INSERT_FILES; ?>" style="height:400px; width:200px;" /></td>
    </tr>
    <tr>
        <th><?php echo $this->lang->line('status'); ?></th>
        <td>
            <?php echo ($spdDetails->ACTIVE_STATUS== 'Y') ? '<span class="btn btn-xs btn-success waves-effect waves-button waves-float">Active</span>' : '<span class="btn btn-xs btn-danger waves-effect waves-button waves-float">Inactive</span>'; ?>
        </td>
    </tr>
</table>