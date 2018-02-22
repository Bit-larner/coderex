<div class="row">
    <div class="col-md-12">
        <div class="panel panel-base">
            <div class="panel-heading">
                <div class="row">
                    <div class="col-md-11 col-sm-10 col-xs-8">
                        <h3 class="panel-title"><?php echo $this->lang->line('division_list'); ?></h3>
                    </div>
                    <div class="col-md-1 col-sm-2 col-xs-4">
                        <a class="btn btn-primary btn-xs modalLink" href="<?php echo site_url('setup/division/create'); ?>" title="<?php echo $this->lang->line('create_division'); ?>">
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
                            <th><?php echo $this->lang->line('division'); ?></th>
                            <th><?php echo $this->lang->line('status'); ?></th>
                            <th><?php echo $this->lang->line('action'); ?></th>
                        </tr>
                    </thead>
                    <tfoot>
                        <tr>
                            <th><?php echo $this->lang->line('sl'); ?></th>
                            <th><?php echo $this->lang->line('division'); ?></th>
                            <th><?php echo $this->lang->line('status'); ?></th>
                            <th><?php echo $this->lang->line('action'); ?></th>
                        </tr>
                    </tfoot>
                    <tbody>
                        <?php foreach ($divisions as $key => $values) { ?>
                            <tr>
                                <td><?php echo $key + 1 ?></td>
                                <td><?php echo $values->DIVISION_ENAME ?></td>
                                <td>
                        <center><?php echo ($values->ACTIVE_STATUS == 1) ? '<span class="btn btn-xs btn-success waves-effect waves-button">Active</span>' : '<span class="btn btn-xs btn-danger waves-effect waves-button waves-float">Inactive</span>'; ?></center>
                        </td>

                        <td>
                        <center>
                            <a class="btn btn-success btn-xs modalLink" href="<?php echo site_url('setup/division/view/' . $values->DIVISION_ID); ?>" title="<?php echo $this->lang->line('division'); ?>" type="button"><span class="glyphicon glyphicon-eye-open"></span></a>
                            <a class="btn btn-warning btn-xs modalLink"  href="<?php echo site_url('setup/division/edit/' . $values->DIVISION_ID); ?>"  title="<?php echo $this->lang->line('edit_division'); ?>" type="button" ><span class="glyphicon glyphicon-edit"></span></a>
                            <a class="btn btn-danger btn-xs ajaxDelete" title="Remove Division" data-placement="top" data-tooltip="tooltip" type="button" href="<?php echo site_url('setup/division/delete/' . $values->DIVISION_ID); ?>"><span class="glyphicon glyphicon-trash"></span></a>
                        </center>
                        </td>
                        </tr>
                    <?php } ?>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>

