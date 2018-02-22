<table id="" class="table table-striped table-bordered" width="100%" cellspacing="0">

    <tr>
        <th>Achivement Description</th>
        <td><?php echo $achivementDetails->ACHIVEMENT_DESC; ?></td>
    </tr>

    <tr>
        <th><?php echo $this->lang->line('status'); ?></th>
        <td>
            <?php echo ($achivementDetails->ACTIVE_STATUS == 'Y') ? '<span class="btn btn-xs btn-success waves-effect waves-button waves-float">Active</span>' : '<span class="btn btn-xs btn-danger waves-effect waves-button waves-float">Inactive</span>'; ?>
        </td>
    </tr>
    <tr>
        <th width="50%">Image Name</th>
        <td>
            <img class="center-block img-responsive"
                 src="<?php echo base_url(); ?>/<?php echo $achivementDetails->INSERT_FILES; ?>" style="width: 100px;"/>

        </td>
    </tr>
    <tr>
        <th width="50%">Pdf</th>
        <td>
            <embed src="<?php echo base_url(); ?>/<?php echo $achivementDetails->INSERTS_PDF; ?>" width="430px" height="500px" />
        </td>
    </tr>
</table>