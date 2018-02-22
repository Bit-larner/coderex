<div class="row">
    <div class="col-md-12">

        <div class="panel panel-base">
            <div class="panel-heading">
                <div class="row">
                    <div class="col-md-11 col-sm-10 col-xs-8">
                        <h3 class="panel-title"><?php echo $this->lang->line('all_module_links'); ?></h3>
                    </div>
                    <div class="col-md-1 col-sm-2 col-xs-4">
                        <a type="button" class="modalLink btn btn-primary btn-xs"
                           title="Creat Global Achivement"
                           href="<?php echo site_url("medicineSetup/createNewAchivement"); ?>">
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
                        <th>Our Achivement</th>
                        <th>Achivement Desc</th>
                        <th>Status</th>
                        <th width="10%"><?php echo $this->lang->line('action'); ?></th>
                    </tr>
                    </thead>
                    <tbody>
                    <?php
                    $slNo = 1;
                    foreach ($achivement as $row) { ?>
                        <tr>
                            <td><?php echo $slNo++; ?></td>
                            <td>
                                <img class="center-block img-responsive" src="<?php echo base_url($row->INSERT_FILES); ?>" style="width: 100px;" />
                            </td>
                            <td><?php echo $row->ACHIVEMENT_DESC; ?></td>
                            <td><?php echo ($row->ACTIVE_STATUS == 'Y') ? '<span class="label label-success">' . $this->lang->line("is_active") . '</span>' : '<span class="label label-danger">' . $this->lang->line("inactive") . '</span>'; ?></td>
                            <td>
                                <a class="btn btn-success btn-xs modalLink"
                                   href="<?php echo site_url("medicineSetup/viewAchivement/$row->ACHIVEMENT_ID"); ?>"
                                   title="View Global Achivement"><i
                                            class="glyphicon glyphicon-eye-open"></i></a>

                                <a class="btn btn-warning btn-xs modalLink"
                                   href="<?php echo site_url("medicineSetup/editNewAchivement/$row->ACHIVEMENT_ID"); ?>"
                                   title="Edit Global Achivement"><i
                                            class="glyphicon glyphicon-edit"></i></a>

                                <a href="<?php echo site_url("medicineSetup/deleteAchivement/$row->ACHIVEMENT_ID"); ?>"
                                   title="Delete Module" class="btn btn-xs btn-danger btn-sm ajaxDelete"><span
                                            class="glyphicon glyphicon-trash"></span></a>
                            </td>
                        </tr>
                    <?php } ?>
                    </tbody>
                    <tfoot>
                    <tr>
                        <th>Sl No</th>
                        <th>Our Achivement</th>
                        <th>Achivement Desc</th>
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