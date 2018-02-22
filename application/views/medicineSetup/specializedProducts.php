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
                           title="Creat Speacialized Product"
                           href="<?php echo site_url("medicineSetup/createNewSpecializedProducts"); ?>">
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
                        <th>Department Name</th>
                        <th>Product Name</th>
                        <th>IMG</th>
                        <th width="10%"><?php echo $this->lang->line('action'); ?></th>
                    </tr>
                    </thead>
                    <tbody>
                    <?php
                    $slNo = 1;
                    foreach ($specializedProducts as $row) { ?>
                        <td><?php echo $slNo++; ?></td>
                        <td><?php echo $row->SPECIAL_NAME; ?></td>
                        <td><?php echo $row->MEDICINE_NAME; ?></td>

                        <td>
                            <img class="center-block img-responsive"
                                 src="<?php echo base_url(); ?>/<?php echo $row->PRODUCT_FET_PHOTO; ?>"
                                 style="width: 100px;"/>
                        </td>
                        <td>
                            <a class="btn btn-success btn-xs modalLink"
                               href="<?php echo site_url("medicineSetup/viewSpecializedProduct/$row->SP_MED_ID"); ?>"
                               title="View Speacialized Product"><i
                                        class="glyphicon glyphicon-eye-open"></i></a>

                            <a class="btn btn-warning btn-xs modalLink"
                               href="<?php echo site_url("medicineSetup/editSpecializedProducts/$row->SP_MED_ID"); ?>"
                               title="Edit Speacialized Product"><i
                                        class="glyphicon glyphicon-edit"></i></a>

                            <a href="<?php echo site_url("medicineSetup/deleteSpecializedProduct/$row->SP_MED_ID"); ?>"
                               title="Delete Module" class="btn btn-xs btn-danger btn-sm ajaxDelete"><span
                                        class="glyphicon glyphicon-trash"></span></a>
                        </td>
                        </tr>
                    <?php } ?>
                    </tbody>
                    <tfoot>
                    <tr>
                        <th>Sl No</th>
                        <th>Department Name</th>
                        <th>Product Name</th>
                        <th>IMG</th>

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




















