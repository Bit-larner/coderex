<div class="row">
    <div class="col-md-12">
        
        <div class="panel panel-base">
            <div class="panel-heading">
                <div class="row">
                    <div class="col-md-11 col-sm-10 col-xs-8">
                        <h3 class="panel-title"><?php echo $this->lang->line('all_module_links'); ?></h3>
                    </div>
                    <div class="col-md-1 col-sm-2 col-xs-4">
                        <a type="button" class="modalLink btn btn-primary btn-xs"  title="Creat Generic" href="<?php echo site_url("medicineSetup/createNewGeneric"); ?>">
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
                             <th>Therapeutic</th>
                            <th>Generic</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th width="10%"><?php echo $this->lang->line('action'); ?></th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php 
                        $slNo=1;
                        foreach($generic as $row){ ?>
                        <tr>
                            <td><?php echo $slNo++; ?></td>
                          <td><?php echo $row->TH_GRP_NAME; ?></td>
                            <td><?php echo $row->GN_NAME; ?></td>
                            <td><?php echo $row->GN_DESC; ?></td>
                            <td><?php echo ($row->ACTIVE_STATUS == 'Y') ? '<span class="label label-success">' . $this->lang->line("is_active") . '</span>' : '<span class="label label-danger">' . $this->lang->line("inactive") . '</span>'; ?></td>

                            <td>
                                    <a class="btn btn-success btn-xs modalLink" href="<?php echo site_url("medicineSetup/viewGeneric/$row->GN_GRP_ID"); ?>" title="View Generic"><i class="glyphicon glyphicon-eye-open"></i></a>
                                   
                                    <a class="btn btn-warning btn-xs modalLink" href="<?php echo site_url("medicineSetup/editGeneric/$row->GN_GRP_ID"); ?>" title="Edit Generic"><i class="glyphicon glyphicon-edit"></i></a>
                                    
                                    <a  href="<?php echo site_url("medicineSetup/deleteGeneric/$row->GN_GRP_ID"); ?>" title="Delete Module" class="btn btn-xs btn-danger btn-sm ajaxDelete"><span class="glyphicon glyphicon-trash"></span></a>
                                </td>
                        </tr>
                        <?php }?>
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>Sl No</th>
                              <th>Therapeutic</th>
                            <th>Generic</th>
                            <th>Description</th>
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