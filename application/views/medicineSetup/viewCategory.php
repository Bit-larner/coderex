<table id="" class="table table-striped table-bordered" width="100%" cellspacing="0">
    <tr>
        <th width="50%">Category Name</th>
        <td><?php echo $categoriesDetails->CAT_NAME?></td>
    </tr>

    <tr>
        <th>Description</th>
        <td><?php echo $categoriesDetails->CAT_DESC?></td>
    </tr>
    <tr>
        <th><?php echo $this->lang->line('status'); ?></th>
        <td>
            <?php echo ($categoriesDetails->ACTIVE_STAT == 'Y') ? '<span class="btn btn-xs btn-success waves-effect waves-button waves-float">Active</span>' : '<span class="btn btn-xs btn-danger waves-effect waves-button waves-float">Inactive</span>';?>
        </td>

    </tr>
</table>
