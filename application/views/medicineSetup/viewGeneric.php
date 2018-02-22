<table id="" class="table table-striped table-bordered" width="100%" cellspacing="0">
    <tr>
        <th width="50%">Generic Name</th>
        <td><?php echo $genericDetails->GN_NAME; ?></td>
    </tr>
    <tr>
        <th>Generic Description</th>
        <td><?php echo $genericDetails->GN_DESC; ?></td>
    </tr>

    <tr>
        <th><?php echo $this->lang->line('status'); ?></th>
        <td>
            <?php echo ($genericDetails->ACTIVE_STATUS== 'Y') ? '<span class="btn btn-xs btn-success waves-effect waves-button waves-float">Active</span>' : '<span class="btn btn-xs btn-danger waves-effect waves-button waves-float">Inactive</span>'; ?>
        </td>
    </tr>
</table>