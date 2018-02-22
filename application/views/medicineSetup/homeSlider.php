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
                           title="Creat Home Slider"
                           href="<?php echo site_url("medicineSetup/createNewHomeSlider"); ?>">
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
                        <th>Slider Image</th>
                        <th>IMG Desc</th>
                        <th>Status</th>
                        <th width="10%"><?php echo $this->lang->line('action'); ?></th>
                    </tr>
                    </thead>
                    <tbody>
             <?php
                    $slNo = 1;
                    foreach ($homeSlider as $row) { ?> 
                        <tr>
                            <td><?php echo $slNo++; ?></td>
                            <td>
                                <img class="center-block img-responsive" src="<?php echo base_url(); ?>/<?php echo $row->INSERT_FILES; ?>" style="height:100px; width: 100px;" />
                                </td>
                            <td><?php echo $row->SLIDER_DESC; ?></td>
                            <td><?php echo ($row->ACTIVE_STATUS == 'Y') ? '<span class="label label-success">' . $this->lang->line("is_active") . '</span>' : '<span class="label label-danger">' . $this->lang->line("inactive") . '</span>'; ?></td>
                            <td>
                                <a class="btn btn-success btn-xs modalLink"
                                   href="<?php echo site_url("medicineSetup/viewHomeSlider/$row->HOME_SLIDER_ID"); ?>"
                                   title="View Home Slider"><i
                                            class="glyphicon glyphicon-eye-open"></i></a>

                                <a class="btn btn-warning btn-xs modalLink"
                                   href="<?php echo site_url("medicineSetup/editHomeSlider/$row->HOME_SLIDER_ID"); ?>"
                                   title="Edit Home Slider"><i
                                            class="glyphicon glyphicon-edit"></i></a>

                                <a href="<?php echo site_url("medicineSetup/deleteHomeSlider/$row->HOME_SLIDER_ID"); ?>"
                                   title="Delete Module" class="btn btn-xs btn-danger btn-sm ajaxDelete"><span
                                            class="glyphicon glyphicon-trash"></span></a>
                            </td>
                        </tr>
                    <?php } ?>
                    </tbody>
                    <tfoot>
                    <tr>
                        <th>Sl No</th>
                        <th>Slider Image</th>
                        <th>IMG Desc</th>
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