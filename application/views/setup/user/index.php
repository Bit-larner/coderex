<style type="text/css">
    .search_user_panel{
        height: 88px;
    }
    #seach_item{ margin-top: 23px;}
    #phone, #name{ height: 35px !important;}
</style>
<div class="row">
    <div class="col-md-12">
        <div class="panel panel-base">
            <div class="panel-heading">
                <div class="row">
                    <div class="col-md-11 col-sm-10 col-xs-8">
                        <h3 class="panel-title">User Setup</h3>
                    </div>
                    <div class="col-md-1 col-sm-2 col-xs-4">
                        <a type="button" class="modalLink btn btn-primary btn-xs" data-tooltip="tooltip" title="Add New User" href="<?php echo site_url("setup/user/create"); ?>">
                            <i class="glyphicon glyphicon-plus"></i>
                        </a>
                    </div>
                </div>
                <span class="pull-right clickable">
                    <i class="glyphicon glyphicon-chevron-up"></i>
                </span>
            </div>
            <div class="panel-body">
                <table id="datatable" class="table table-striped table-bordered" width="100%" cellspacing="0">
                    <thead>
                        <tr>
                            <th><?php echo $this->lang->line('sl_num'); ?></th>
                            <th><?php echo $this->lang->line('user_name'); ?></th>
                            <th><?php echo $this->lang->line('user_email'); ?></th>
                            <th><?php echo $this->lang->line('user_phone'); ?></th>
                            <th><?php echo $this->lang->line('Organization'); ?></th>
                            <th><?php echo $this->lang->line('group'); ?></th>
                            <th><?php echo $this->lang->line('label'); ?></th>
                            <th width="10%"><?php echo $this->lang->line('action'); ?></th>
                        </tr>
                    </thead>
                    <tfoot>
                        <tr>
                            <th><?php echo $this->lang->line('sl_num'); ?></th>
                            <th><?php echo $this->lang->line('user_name'); ?></th>
                            <th><?php echo $this->lang->line('email'); ?></th>
                            <th><?php echo $this->lang->line('phone'); ?></th>
                            <th><?php echo $this->lang->line('Organization'); ?></th>
                            <th><?php echo $this->lang->line('group'); ?></th>
                            <th><?php echo $this->lang->line('label'); ?></th>
                            <th><?php echo $this->lang->line('action'); ?></th>
                        </tr>
                    </tfoot>
                    <tbody>
                        <?php
                        $i = 1;
                        foreach ($users as $value) {
                            ?>
                            <tr>
                                <td><?php echo $i++; ?></td>
                                <td><?php echo $value->FULL_NAME; ?></td>
                                <td><?php echo $value->EMAIL; ?></td>
                                <td><?php echo $value->MOBILE; ?></td>
                                <td><?php echo $value->ORG_NAME; ?></td>
                                <td><?php echo $value->USERGRP_NAME; ?></td>
                                <td><?php echo $value->UGLEVE_NAME; ?></td>
                                <td>
                                    <button type="button" href="<?php echo site_url("setup/user/view/$value->FLD_USER_ID"); ?>" title="View User" class="btn btn-xs btn-success btn-sm modalLink"><i class="glyphicon glyphicon-eye-open"></i></button>
                                    <button type="button" href="<?php echo site_url("setup/user/edit/$value->FLD_USER_ID"); ?>" title="Edit User" class="btn btn-xs btn-warning btn-sm modalLink"><i class="glyphicon glyphicon-edit"></i></button>
                                    <a  href="<?php echo site_url("setup/user/delete/$value->FLD_USER_ID"); ?>" title="Delete User" class="btn btn-xs btn-danger btn-sm ajaxDelete"><span class="glyphicon glyphicon-trash"></span></a>
                                </td>
                            </tr>
                            <?php
                        }
                        ?>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
<script>
    $(document).on("change", "#orgIdDrop", function () {
        var org = $(this).val();
        $groupHtml = $('select#group_name');
        $groupHtml.find('option').remove();
        $.ajax({
            type: "POST",
            url: "<?php echo site_url('setup/user/userGroupByOrgId'); ?>",
            data: {orgId: org,'<?php echo  $this->security->get_csrf_token_name(); ?>':'<?php echo $this->security->get_csrf_hash(); ?>'},
            async: true,
            dataType: 'json',
            success: function (result) {
                user_groups = result.user_groups;
                $groupHtml.each(function () {
                    $(this).append("<option value=' '> -- Select -- </option>");
                    for (var USERGRP_ID in user_groups) {
                        $(this).append("<option  value = '" + USERGRP_ID + "'>" + user_groups[USERGRP_ID] + "</option>");
                    }
                });
            }
        });
    });

    // get lebel name on change of group name
    $(document).on("change", "#group_name", function () {
        var group_id = $(this).val();
        $.ajax({
            type: "POST",
            url: "<?php echo site_url('setup/user/getGroupLevel'); ?>",
            data: {group_id: group_id,'<?php echo  $this->security->get_csrf_token_name(); ?>':'<?php echo $this->security->get_csrf_hash(); ?>'},
            success: function (result) {
                $("#level_name").html(result).change();
            }
        });
    });
</script>