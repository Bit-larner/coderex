<div class="row">
    <div class="col-md-12">
        <div class="panel panel-base">
            <div class="panel-heading">
                <div class="row">
                    <div class="col-md-11 col-sm-10 col-xs-8">
                        <h3 class="panel-title"><?php echo $this->lang->line('assessment_list'); ?></h3>
                    </div>
                    <div class="col-md-1 col-sm-2 col-xs-4">
                        <a class="btn btn-primary btn-xs modalLink" href="<?php echo site_url('setup/assessment/create'); ?>" title="<?php echo $this->lang->line('asses_create'); ?>">
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
                            <th><?php echo $this->lang->line('assessment_type'); ?></th>
                            <th><?php echo $this->lang->line('assessment'); ?></th>
                            <th><?php echo $this->lang->line('status'); ?></th>
                            <th><?php echo $this->lang->line('action'); ?></th>
                        </tr>
                    </thead>
                    <tfoot>
                        <tr>
                            <th><?php echo $this->lang->line('sl'); ?></th>
                            <th><?php echo $this->lang->line('assessment_type'); ?></th>
                            <th><?php echo $this->lang->line('assessment'); ?></th>
                            <th><?php echo $this->lang->line('status'); ?></th>
                            <th><?php echo $this->lang->line('action'); ?></th>
                        </tr>
                    </tfoot>
                    <tbody>
                        <?php foreach ($assessment as $key => $values) { ?>
                            <tr>
                                <td><?php echo $key + 1 ?></td>
                                <td><?php echo $values->TYPE_NAME ?></td>
                                <td><?php echo $values->ASSESSMENT_NAME ?></td>
                                <td>
                        <center><?php echo ($values->ACTIVE_STATUS == 1) ? '<span class="btn btn-xs btn-success waves-effect waves-button">Active</span>' : '<span class="btn btn-xs btn-danger waves-effect waves-button waves-float">Inactive</span>'; ?></center>
                        </td>
                        <td>
                        <center>
                            <a class="btn btn-warning btn-xs modalLink" href="<?php echo site_url('setup/assessment/edit/' . $values->FLD_ASSES_ID); ?>"  title="<?php echo $this->lang->line('assessment_edit'); ?>" type="button" ><span class="glyphicon glyphicon-edit"></span></a>
                            <a class="btn btn-danger btn-xs ajaxDelete" href="<?php echo site_url('setup/assessment/delete/' . $values->FLD_ASSES_ID); ?>" title="<?php echo $this->lang->line('assessment_delete');?>" type="button" ><span class="glyphicon glyphicon-trash"></span></a>
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