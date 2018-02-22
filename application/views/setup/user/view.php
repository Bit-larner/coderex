<table id="" class="table table-striped table-bordered" width="100%" cellspacing="0">
    <tbody>
        <tr>
            <th>Full Name</th>
            <td><?php echo $result->FULL_NAME; ?></td>
        </tr>
        <tr>
            <th><?php echo $this->lang->line('org'); ?></th>
            <td><?php echo $result->ORG_ID; ?></td>
        </tr>
        <tr>
            <th><?php echo $this->lang->line('group'); ?></th>
            <td><?php echo $result->USERGRP_ID; ?></td>
        </tr>
        <tr>
            <th><?php echo $this->lang->line('level'); ?></th>
            <td><?php echo $result->USERLVL_ID; ?></td>
        </tr>
        <tr>
            <th><?php echo $this->lang->line('email'); ?></th>
            <td><?php echo $result->EMAIL; ?></td>
        </tr>
        <tr>
            <th><?php echo $this->lang->line('username'); ?></th>
            <td><?php echo $result->USERNAME; ?></td>
        </tr>
        <tr>
            <th><?php echo $this->lang->line('status'); ?></th>
            <td><?php echo ($result->ACTIVE_STATUS == 1) ? '<span class="btn btn-xs btn-success waves-effect waves-button waves-float">Active</span>' : '<span class="btn btn-xs btn-danger waves-effect waves-button waves-float">Inactive</span>'; ?>
            </td>
        </tr>
        <?php
        if (!empty($result->USERIMG)) {
            ?>
            <tr>
                <th>User Image</th>
                <?php
                $dir = "src/upload/user_image/"; //image path to a folder
                ?>
                <td>
                    <img id="imagePreview_edit" src="<?php echo base_url($dir) . "/" . $result->USERIMG; ?>" alt="" width="90" height="90">
                </td>
            </tr>
            <?php
        }
        ?>
    </tbody>
</table>
