<table id="" class="table table-striped table-bordered" width="100%" cellspacing="0">
    <tr>
        <th width="50%">Therapeutic Name</th>
        <td><?php echo $therapeuticDetails->TH_GRP_NAME; ?></td>
    </tr>
    <tr>
        <th>Therapeutic Description</th>
        <td><?php echo $therapeuticDetails->TH_GRP_DESC; ?></td>
    </tr>

    <tr>
        <th><?php echo $this->lang->line('status'); ?></th>
        <td>
            <?php echo ($therapeuticDetails->ACTIVE_STATUS== 'Y') ? '<span class="btn btn-xs btn-success waves-effect waves-button waves-float">Active</span>' : '<span class="btn btn-xs btn-danger waves-effect waves-button waves-float">Inactive</span>'; ?>
        </td>
    </tr>
</table>