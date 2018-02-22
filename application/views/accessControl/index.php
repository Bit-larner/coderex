<div class="row">
    <div class="col-md-12">
        <div class="panel panel-base">
            <div class="panel-heading">
                <div class="row">
                    <div class="col-md-11 col-sm-10 col-xs-8">
                        <h3 class="panel-title"><?php echo $this->lang->line('all_modules') ?></h3>
                    </div>
                    <div class="col-md-1 col-sm-2 col-xs-4">
                        <a type="button" class="modalLink btn btn-primary btn-xs"  title="<?php echo $this->lang->line('create_module'); ?>" href="<?php echo site_url("accessControl/createModule"); ?>">
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
                            <th><?php echo $this->lang->line('sl'); ?></th>
                            <th><?php echo $this->lang->line('module_name'); ?></th>
                            <th><?php echo $this->lang->line('short_name'); ?></th>
                            <th><?php echo $this->lang->line('module_name_bangla'); ?></th>
                            <th><?php echo $this->lang->line('order'); ?></th>
                            <th><?php echo $this->lang->line('status'); ?></th>
                            <th><?php echo $this->lang->line('action'); ?></th>
                        </tr>
                    </thead>
                    <tfoot>
                        <tr>
                            <th><?php echo $this->lang->line('sl'); ?></th>
                            <th><?php echo $this->lang->line('module_name'); ?></th>
                            <th><?php echo $this->lang->line('short_name'); ?></th>
                            <th><?php echo $this->lang->line('module_name_bangla'); ?></th>
                            <th><?php echo $this->lang->line('order'); ?></th>
                            <th><?php echo $this->lang->line('status'); ?></th>
                            <th><?php echo $this->lang->line('action'); ?></th>
                        </tr>
                    </tfoot>
                    <tbody>
                        <?php
                        $i = 1;
                        foreach ($all_modules as $all_mod) {
                            ?>
                            <tr>
                                <td><?php echo $i++; ?></td>
                                <td><?php echo $all_mod->MODULE_NAME; ?></td>
                                <td><?php echo $all_mod->SHORT_NAME; ?></td>
                                <td><?php echo $all_mod->MODULE_NAME_BN; ?></td>
                                <td><?php echo $all_mod->SL_NO; ?></td>
                                <td><?php echo ($all_mod->ACTIVE_STATUS == 1) ? '<span class="label label-success">' . $this->lang->line("is_active") . '</span>' : '<span class="label label-danger">' . $this->lang->line("inactive") . '</span>'; ?></td>
                                <td>
                                    <a class="btn btn-success btn-xs modalLink" href="<?php echo site_url("AccessControl/viewModule/$all_mod->MODULE_ID"); ?>" title="<?php echo $this->lang->line('view_module'); ?>"><i class="glyphicon glyphicon-eye-open"></i></a>
                                    <a class="btn btn-warning btn-xs modalLink" href="<?php echo site_url("AccessControl/editModule/$all_mod->MODULE_ID"); ?>"  title="<?php echo $this->lang->line('edit_module'); ?>"><i class="glyphicon glyphicon-edit"></i></a>
                                    <a  href="<?php echo site_url("AccessControl/deleteModule/$all_mod->MODULE_ID"); ?>" title="Delete Module" class="btn btn-xs btn-danger btn-sm ajaxDelete"><span class="glyphicon glyphicon-trash"></span></a>
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