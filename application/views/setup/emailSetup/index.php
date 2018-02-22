<div class="row">
    <div class="col-md-12">
        <div class="panel panel-base">
            <div class="panel-heading">
                <div class="row">
                    <div class="col-md-11 col-sm-10 col-xs-8">
                        <h3 class="panel-title"><?php echo  $this->lang->line('email_templates'); ?></h3>
                    </div>
                    <div class="col-md-1 col-sm-2 col-xs-4">
                        <a class="btn btn-primary btn-xs modalLink"  href="<?php echo site_url('setup/emailSetup/create'); ?>" title="<?php echo $this->lang->line('create_email_template'); ?>">
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
                            <th><?php echo $this->lang->line('name'); ?></th>
                            <th><?php echo $this->lang->line('subject'); ?></th>
                            <th><?php echo $this->lang->line('category'); ?></th>
                            <th><?php echo $this->lang->line('workflow'); ?></th>
                            <th><?php echo $this->lang->line('status'); ?></th>
                            <th width="10%"><?php echo $this->lang->line('action'); ?></th>
                        </tr>
                    </thead>
                    <tfoot>
                        <tr>
                           <th><?php echo $this->lang->line('sl'); ?></th>
                            <th><?php echo $this->lang->line('name'); ?></th>
                            <th><?php echo $this->lang->line('subject'); ?></th>
                            <th><?php echo $this->lang->line('category'); ?></th>
                            <th><?php echo $this->lang->line('workflow'); ?></th>
                            <th><?php echo $this->lang->line('status'); ?></th>
                            <th><?php echo $this->lang->line('action'); ?></th>
                        </tr>
                    </tfoot>
                    <tbody>
                        <?php
                        $i=1;
                        foreach($allTemplate as $row)
                        {
                        ?>
                        <tr>
                                <td><?php echo $i++; ?></td>
                                 <td><?php echo $row->TEMPL_NAME; ?></td>
                                 <td><?php echo $row->TEMPL_SUBJECT; ?></td>
                                <td>
                                    <?php
                                        if($row->TEMPL_CAT=='E')
                                        {
                                            echo "Email";
                                        }
                                        else
                                        {
                                            echo "Letter";
                                        }
                                    ?>
                                </td>
                                <td><?php 
                                    if($row->WF_NAME=='')
                                    {
                                        echo "Not Selected";
                                    }
                                    else 
                                    {
                                        echo $row->WF_NAME;
                                    }
                                ?></td>
                                
                                <td>
                                    
                                    <center>
                                    <?php echo ($row->ACTIVE_FLAG == 1)
                                                    ? '<span class="btn btn-xs btn-success waves-effect waves-button">Active</span>'
                                                    : '<span class="btn btn-xs btn-danger waves-effect waves-button waves-float">Inactive</span>'; ?>
                                    </center>
                               </td>
                               <td>
                                  <a class="btn btn-success btn-xs modalLink" href="<?php echo site_url('setup/emailSetup/view/' .$row->TEMPL_ID); ?>" title="<?php echo $this->lang->line('view_district'); ?>" type="button"><span class="glyphicon glyphicon-eye-open"></span></a>
                                  <a class="btn btn-warning btn-xs modalLink" href="<?php echo site_url('setup/emailSetup/edit/' .$row->TEMPL_ID); ?>"  title="<?php echo $this->lang->line('edit_district'); ?>" type="button" ><span class="glyphicon glyphicon-edit"></span></a>
                                   <a  href="<?php echo site_url("setup/emailSetup/deleteTemplate/$row->TEMPL_ID"); ?>" title="Delete Module" class="btn btn-xs btn-danger btn-sm ajaxDelete"><span class="glyphicon glyphicon-trash"></span></a>
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

