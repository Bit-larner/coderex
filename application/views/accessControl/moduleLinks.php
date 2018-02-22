<div class="row">
    <div class="col-md-12">
        <div class="row table-bordered">
            <div class="col-md-12 text-center">
                I = Insert , V = View , U = Update , D = Delete , S = Status .
            </div>
        </div>
        <div class="panel panel-base">
            <div class="panel-heading">
                <div class="row">
                    <div class="col-md-11 col-sm-10 col-xs-8">
                        <h3 class="panel-title"><?php echo $this->lang->line('all_module_links'); ?></h3>
                    </div>
                    <div class="col-md-1 col-sm-2 col-xs-4">
                        <a type="button" class="modalLink btn btn-primary btn-xs"  title="<?php echo $this->lang->line('create_module_link'); ?>" href="<?php echo site_url("accessControl/createModuleLink"); ?>">
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
                            <th><?php echo $this->lang->line('link_name'); ?></th>
                            <th><?php echo $this->lang->line('uri'); ?></th>
                            <th><?php echo $this->lang->line('access'); ?></th>
                            <th><?php echo $this->lang->line('order'); ?></th>
                            <th><?php echo $this->lang->line('status'); ?></th>
                            <th width="10%"><?php echo $this->lang->line('action'); ?></th>
                        </tr>
                    </thead>
                    <tfoot>
                        <tr>
                            <th><?php echo $this->lang->line('sl'); ?></th>
                            <th><?php echo $this->lang->line('module_name'); ?></th>
                            <th><?php echo $this->lang->line('link_name'); ?></th>
                            <th><?php echo $this->lang->line('uri'); ?></th>
                            <th><?php echo $this->lang->line('access'); ?></th>
                            <th><?php echo $this->lang->line('order'); ?></th>
                            <th><?php echo $this->lang->line('status'); ?></th>
                            <th><?php echo $this->lang->line('action'); ?></th>
                        </tr>
                    </tfoot>
                    <tbody>
                        <?php
                        $i = 1;
                        foreach ($moduleLinks as $row) {
                            ?>
                            <tr>
                                <td><?php echo $i++; ?></td>
                                <td><?php echo $row->MODULE_NAME; ?></td>
                                <td><?php echo $row->LINK_NAME; ?></td>
                                <td><?php echo $row->URL_URI; ?></td>
                                <td><?php echo $row->SA_MLINK_PAGES; ?></td>
                                <td><?php echo $row->SL_NO; ?></td>
                                <td><?php echo ($row->ACTIVE_STATUS == 1) ? '<span class="label label-success">' . $this->lang->line("is_active") . '</span>' : '<span class="label label-danger">' . $this->lang->line("inactive") . '</span>'; ?></td>
                                <td>
                                    <a class="btn btn-success btn-xs modalLink" href="<?php echo site_url("AccessControl/viewModuleLink/$row->LINK_ID"); ?>" title="<?php echo $this->lang->line('view_module_link'); ?>"><i class="glyphicon glyphicon-eye-open"></i></a>
                                    <a class="btn btn-warning btn-xs modalLink" href="<?php echo site_url("AccessControl/editModuleLink/$row->LINK_ID"); ?>" title="<?php echo $this->lang->line('edit_module_link'); ?>"><i class="glyphicon glyphicon-edit"></i></a>
                                    <a  href="<?php echo site_url("AccessControl/deleteModuleLink/$row->LINK_ID"); ?>" title="Delete Module" class="btn btn-xs btn-danger btn-sm ajaxDelete"><span class="glyphicon glyphicon-trash"></span></a>
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