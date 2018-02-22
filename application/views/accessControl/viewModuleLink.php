<table id="" class="table table-striped table-bordered" width="100%" cellspacing="0">
    <tr>
        <th width="50%"><?php echo $this->lang->line('link_name'); ?></th>
        <td><?php echo $moduleLinkDetails->LINK_NAME; ?></td>
    </tr>
    <tr>
        <th><?php echo $this->lang->line('link_name_bangla'); ?></th>
        <td><?php echo $moduleLinkDetails->LINK_NAME_BN; ?></td>
    </tr>
    <tr>
        <th><?php echo $this->lang->line('module_name'); ?></th>
        <td><?php echo $moduleLinkDetails->MODULE_NAME; ?></td>
    </tr>
    <tr>
        <th><?php echo $this->lang->line('uri'); ?></th>
        <td><?php echo $moduleLinkDetails->URL_URI; ?></td>
    </tr>
    <tr>
        <th><?php echo $this->lang->line('order'); ?></th>
        <td><?php echo $moduleLinkDetails->SL_NO; ?></td>
    </tr>
    <tr>
        <th><?php echo $this->lang->line('access'); ?></th>
        <td><?php echo $moduleLinkDetails->SA_MLINK_PAGES; ?></td>
    </tr>
    <tr>
        <th><?php echo $this->lang->line('status'); ?></th>
        <td>
            <?php echo ($moduleLinkDetails->ACTIVE_STATUS == 1) ? '<span class="btn btn-xs btn-success waves-effect waves-button waves-float">Active</span>' : '<span class="btn btn-xs btn-danger waves-effect waves-button waves-float">Inactive</span>'; ?>
        </td>
    </tr>
</table>