<table id="" class="table table-striped table-bordered" width="100%" cellspacing="0">
    <tr>
        <th width="50%"><?php echo $this->lang->line('module_name'); ?></th>
        <td><?php echo $moduleDetails->MODULE_NAME ?></td>
    </tr>
    <tr>
        <th><?php echo $this->lang->line('module_name_bengali'); ?></th>
        <td><?php echo $moduleDetails->MODULE_NAME_BN ?></td>
    </tr>
    <tr>
        <th><?php echo $this->lang->line('short_name'); ?></th>
        <td><?php echo $moduleDetails->SHORT_NAME ?></td>
    </tr>
      <tr>
        <th><?php echo $this->lang->line('status'); ?></th>
        <td>
            <?php echo ($moduleDetails->ACTIVE_STATUS == 1) ? '<span class="btn btn-xs btn-success waves-effect waves-button waves-float">Active</span>' : '<span class="btn btn-xs btn-danger waves-effect waves-button waves-float">Inactive</span>';?>
        </td>
    </tr>
</table>
