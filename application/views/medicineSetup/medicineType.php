<div class="row">
    <div class="col-md-12">

        <div class="panel panel-base">
            <div class="panel-heading">
                <div class="row">
                    <div class="col-md-11 col-sm-10 col-xs-8">
                        <h3 class="panel-title"><?php echo $this->lang->line('all_module_links'); ?></h3>
                    </div>
                    <div class="col-md-1 col-sm-2 col-xs-4">
                        <a type="button" class="modalLink btn btn-primary btn-xs"  title="Ctear Medicine Type" href="<?php echo site_url("medicineSetup/createMedicineType"); ?>">
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
                        <th>Sl No</th>
                        <th>Medicine Type NAME</th>
                        <th>Status</th>
                        <th width="10%"><?php echo $this->lang->line('action'); ?></th>
                    </tr>
                    </thead>
                    <tbody>
                    <?php
                    $slNo=1;
                    foreach($mtDetails as $row){ ?>
                        <tr>
                            <td><?php echo $slNo++; ?></td>
                            <td><?php echo $row->TYPE_NAME; ?></td>
                            <td><?php echo ($row->ACTIVE_STATUS == 'Y') ? '<span class="label label-success">' . $this->lang->line("is_active") . '</span>' : '<span class="label label-danger">' . $this->lang->line("inactive") . '</span>'; ?></td>
                            <td>
                                <a class="btn btn-success btn-xs modalLink" href="<?php echo site_url("medicineSetup/viewMedicineType/$row->TYPE_ID"); ?>" title="View Medicine Type"><i class="glyphicon glyphicon-eye-open"></i></a>
                                <a class="btn btn-warning btn-xs modalLink" href="<?php echo site_url("medicineSetup/editMedicineType/$row->TYPE_ID"); ?>" title="Edit Medicine Type"><i class="glyphicon glyphicon-edit"></i></a>
                                <a  href="<?php echo site_url("medicineSetup/deleteMedicineType/$row->TYPE_ID"); ?>" title="Delete Module" class="btn btn-xs btn-danger btn-sm ajaxDelete"><span class="glyphicon glyphicon-trash"></span></a>
                            </td>
                        </tr>
                    <?php }?>
                    </tbody>
                    <tfoot>
                    <tr>
                        <th>Sl No</th>
                        <th>Medicine Type NAME</th>
                        <th>Status</th>
                        <th width="10%"><?php echo $this->lang->line('action'); ?></th>
                    </tr>
                    </tfoot>
                    <tbody>

                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>

