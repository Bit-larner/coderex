
        <table id="" class="table table-striped table-bordered" width="100%" cellspacing="0">
            <tbody>
                 <tr>
                        <th><?php echo $this->lang->line('employee_name'); ?></th>
                        <td><?php echo $result_from_view_table->EMP_NAME; ?></td>
                    </tr>
                <tr>
                    <th><?php echo $this->lang->line('org'); ?></th>
                    <td><?php echo $result_from_view_table->ORG_NAME; ?></td>
                </tr>
                <tr>
                    <th><?php echo $this->lang->line('group'); ?></th>
                    <td><?php echo $result_from_view_table->USERGRP_NAME; ?></td>
                </tr>
                <tr>
                    <th><?php echo $this->lang->line('level'); ?></th>
                    <td><?php echo $result_from_view_table->UGLEVE_NAME; ?></td>
                </tr>
                <tr>
                    <th><?php echo $this->lang->line('email'); ?></th>
                    <td><?php echo $result_from_view_table->EMAIL; ?></td>
                </tr>
                <tr>
                    <th><?php echo $this->lang->line('username'); ?></th>
                    <td><?php echo $result_from_view_table->USERNAME; ?></td>
                </tr>
                <tr>
                    <th><?php echo $this->lang->line('user_type'); ?></th>
                    <td><?php echo $result_from_view_table->USERTYPE == 1 ? 'Employee' : 'Supplier'; ?></td>
                </tr>
                <?php if ($result_from_view_table->USERTYPE == 1) {
                    ?>
                   
                <?php } else { ?>
                    <tr>
                        <th><?php echo $this->lang->line('supplier_name'); ?></th>
                        <td><?php echo $result_from_view_table->SUPPLIER_NAME; ?></td>
                    </tr>
                <?php } ?>

                <tr>
                    <th><?php echo $this->lang->line('effective_date'); ?></th>
                    <td><?php echo $result_from_view_table->EFECT_FROM_DT; ?></td>
                </tr>

                <tr>
                    <th><?php echo $this->lang->line('exp_date'); ?></th>
                    <td><?php echo $result_from_view_table->EXPR_DT; ?></td>
                </tr>
                <tr>
                    <th><?php echo $this->lang->line('status'); ?></th>
                     <td><?php echo ($result_from_view_table->ACTIVE_STATUS == 1) ? '<span class="btn btn-xs btn-success waves-effect waves-button waves-float">Active</span>' : '<span class="btn btn-xs btn-danger waves-effect waves-button waves-float">Inactive</span>';
                        ?></td>
                </tr>
<?php
    if($result_from_view_table->USERIMG>0)
    {
?>
                <tr>
                    <th>User Image</th>
                    <?php
                    $dir = "src/upload/profile_picture/"; //image path to a folder
                    ?>
                    <td>
                        <img id="imagePreview_edit" src="<?php echo base_url($dir) . "/" . $result_from_view_table->USERIMG; ?>" alt="" width="130" height="130">
                    </td>
                </tr>
                <?php 
    }
                ?>
                

            </tbody>
        </table>
