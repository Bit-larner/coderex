<table id="" class="table table-striped table-bordered" width="100%" cellspacing="0">
    <tr>
        <th width="50%">Medicine Type NAME</th>
        <td><?php echo $typeDetails->TYPE_NAME?></td>
    </tr>

    <tr>
        <th><?php echo $this->lang->line('status'); ?></th>
        <td>
            <?php echo ($typeDetails->ACTIVE_STATUS == 'Y') ? '<span class="btn btn-xs btn-success waves-effect waves-button waves-float">Active</span>' : '<span class="btn btn-xs btn-danger waves-effect waves-button waves-float">Inactive</span>';?>
        </td>
    </tr>
</table>
