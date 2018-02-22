<style>
    ul{ margin: 0; list-style-type: none;}
</style>

    <?php echo form_open("", "id='frmModules' class='form-horizontal' method='post'"); ?>

    <input type="hidden" id="txtHcTemplateId" name="txtHcTemplateId" value="<?php echo $hid; ?>" />
    <div class="card">
        <div class="table-responsive" style="overflow: hidden;" tabindex="1">
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th style="width: 300px;"><?php echo $this->lang->line('module_name'); ?></th>
                        <th><?php echo $this->lang->line('create'); ?></th>
                        <th><?php echo $this->lang->line('read'); ?></th>
                        <th><?php echo $this->lang->line('update'); ?></th>
                        <th><?php echo $this->lang->line('delete'); ?></th>
                        <th><?php echo $this->lang->line('status'); ?></th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    foreach ($active_modules as $org_module) {
                        $org_module_links = $this->utilities->findAllByAttribute("sa_module_links", array("MODULE_ID" => $org_module->MODULE_ID, "ACTIVE_STATUS" => 1));
                        ?>
                        <tr>
                            <td colspan="6" style="background: #f7f7f7; color: #5D8C53; padding: 3px;"><span class=" md-chevron-right"></span>  <?php echo $org_module->SA_MODULE_NAME; ?></td>
                        </tr>
                        <?php
                        foreach ($org_module_links as $org_module_link):
                            $org_active_module_links = $this->utilities->findByAttribute("sa_org_mlinks", array("LINK_ID" => $org_module_link->LINK_ID, "ORG_ID" => $hid));
                            if (!empty($org_active_module_links)) {
                                $is_checked_create = ($org_active_module_links->CREATE == 1) ? "checked='checked'" : "";
                                $is_checked_read = ($org_active_module_links->READ == 1) ? "checked='checked'" : "";
                                $is_checked_update = ($org_active_module_links->UPDATE == 1) ? "checked='checked'" : "";
                                $is_checked_delete = ($org_active_module_links->DELETE == 1) ? "checked='checked'" : "";
                                $is_checked_status = ($org_active_module_links->STATUS == 1) ? "checked='checked'" : "";
                            }
                            ?>
                            <tr>
                                <td style="padding-left: 20px;"><?php echo $org_module_link->LINK_NAME; ?></td>
                                <td class="text-center"><input type="checkbox" class="chkAssignPage" <?php echo (!empty($org_active_module_links)) ? $is_checked_create : ""; ?>  title="Create" value="<?php echo $org_module->SA_MODULE_ID . ',' . $org_module_link->LINK_ID . ',' . 'C' . "," . $hid; ?>" /></td>
                                <td class="text-center"><input type="checkbox" class="chkAssignPage" <?php echo (!empty($org_active_module_links)) ? $is_checked_read : ""; ?>  title="Create" value="<?php echo $org_module->SA_MODULE_ID . ',' . $org_module_link->LINK_ID . ',' . 'R' . "," . $hid; ?>" /></td>
                                <td class="text-center"><input type="checkbox" class="chkAssignPage" <?php echo (!empty($org_active_module_links)) ? $is_checked_update : ""; ?>  title="Create" value="<?php echo $org_module->SA_MODULE_ID . ',' . $org_module_link->LINK_ID . ',' . 'U' . "," . $hid; ?>" /></td>
                                <td class="text-center">
                                    <input type="checkbox" class="chkAssignPage" <?php echo (!empty($org_active_module_links)) ? $is_checked_delete : ""; ?>  title="Create" value="<?php echo $org_module->SA_MODULE_ID . ',' . $org_module_link->LINK_ID . ',' . 'D' . "," . $hid; ?>" />
                                </td>
                                <td class="text-center">
                                    <input type="checkbox" class="chkAssignPage" <?php echo (!empty($org_active_module_links)) ? $is_checked_status : ""; ?>  title="Create" value="<?php echo $org_module->SA_MODULE_ID . ',' . $org_module_link->LINK_ID . ',' . 'S' . "," . $hid; ?>" />
                                </td>
                            </tr>
                        <?php
                        endforeach;
                    }
                    ?>
                </tbody>
            </table>
        </div>
    </div>
    <?php echo form_close(); ?>
<div class="modal-footer">
    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
</div>