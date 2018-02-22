<?php
$userSessonData = $this->session->userdata('logged_in');
$session_org_id = $userSessonData['SES_ORG_ID'];
?>

<?php if ($session_org_id == 1) { ?>
    <a type="button" href="<?php echo site_url("setup/userSetup/addUserSetup"); ?>" class="modalLink btn btn-primary pull-right"  title="Add User">
        <i class="glyphicon glyphicon-plus"><?php echo $this->lang->line('add'); ?></i>
    </a>
    <br/><br/>
    <div class="bs-example" data-example-id="collapse-accordion">
        <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
            <?php
            $j = 1;
            foreach ($orgList as $row) {
                $result = $this->utilities->findAllByAttribute('sa_users_v', array('ORG_ID' => $row->ORG_ID));
                ?>
                <div class="panel panel-default">
                    <div class="panel-heading collapsed" role="tab" id="headingThree"
                         role="button" data-toggle="collapse" data-parent="#accordion" href="#<?php echo $row->ORG_ID; ?>">
                        <h4 class="panel-title">
                            <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#<?php echo $row->ORG_ID; ?>" aria-expanded="false" aria-controls="collapseThree">
                                <?php echo $row->ORG_NAME;  $totalUser=count($result);
                                
                                ?>
                            </a>
                          <?php
                            if($totalUser>0 and $totalUser<2)
                                {

                                    echo "<p class='btn btn-primary btn-xs pull-right'> $totalUser User </p>";
                                }
                                else if($totalUser>1)

                                {
                                      echo "<p class='btn btn-primary btn-xs pull-right'> $totalUser Users</p>";
                                }
                                else
                                {
                                    echo "<p class='btn btn-danger btn-xs pull-right'> $totalUser User</p>";
                                }
                          ?>
                        </h4>
                    </div>
                    <div id="<?php echo $row->ORG_ID; ?>" class="panel-collapse collapse <?php if ($j == 1) {
                            echo "in";
                        } ?>" role="tabpanel" aria-labelledby="headingThree">
                        <div class="panel-body">
                            <div class="row">
                                <div class="col-sm-12">
                                    <table id="" class="table table-striped table-bordered" width="100%" cellspacing="0">
                                        <thead>
                                            <tr>
                                                <th><?php echo $this->lang->line('sl'); ?></th>
                                                <th><?php echo $this->lang->line('name'); ?></th>
                                                <th><?php echo $this->lang->line('group'); ?></th>
                                                <th><?php echo $this->lang->line('level'); ?></th>
                                                <th><?php echo $this->lang->line('username'); ?></th>
                                                <th><?php echo $this->lang->line('email'); ?></th>
                                                <th><?php echo $this->lang->line('status'); ?></th>
                                                <th width="10%"><?php echo $this->lang->line('action'); ?></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <?php
                                            $sl = 1;
                                            
                                            if (!empty($result)) {
                                                foreach ($result as $data) {
                                                    ?>
                                                    <tr>
                                                        <td><?php echo $sl++; ?></td>
                                                        <td><?php
                                            if ($data->USERTYPE == 1) {
                                                echo $data->EMP_NAME;
                                            } else {
                                                echo $data->SUPPLIER_NAME;
                                            }
                                            ?></td>
                                                        <td><?php echo $data->USERGRP_NAME; ?></td>
                                                        <td><?php echo $data->UGLEVE_NAME; ?></td>
                                                        <td><?php echo $data->USERNAME; ?></td>

                                                        <td><?php echo $data->EMAIL; ?></td>
                                                        <td><?php echo ($data->ACTIVE_STATUS == 1) ? '<span class="btn btn-xs btn-success waves-effect waves-button waves-float">'.$this->lang->line('is_active').'</span>' : '<span class="btn btn-xs btn-danger waves-effect waves-button waves-float">'.$this->lang->line('inactive').'</span>';
                                            ?></td>
                                                        <td>
                                                            <span>
                                                                <a class="btn btn-success btn-xs modalLink" href="<?php echo site_url("setup/userSetup/viewUserSetup/" . $data->FLD_USER_ID); ?>" title="<?php echo $this->lang->line('view_user'); ?>"><i class="glyphicon glyphicon-eye-open"></i></a>
                                                                <a class="btn btn-primary btn-xs modalLink" href="<?php echo site_url("setup/userSetup/editUserSetup/" . $data->FLD_USER_ID); ?>"  title="<?php echo $this->lang->line('edit_user'); ?>"><i class="glyphicon glyphicon-edit"></i></a>
                                                            </span>
                                                        </td>

                                                    </tr>
                                                    <?php
                                                }
                                            } else {
                                               
                                                echo '<td align="center" colspan="8">'.$this->lang->line('no_data_available').'</td>';
                                            }
                                            ?>

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <?php
                $j++;
            }
            ?>
        </div>
    </div>
<?php } else { ?>

    <div class="row">
        <div class="col-md-12">
            <div class="panel panel-base">
                <div class="panel-heading">
                    <div class="row">
                        <div class="col-md-11 col-sm-10 col-xs-8">
                            <h3 class="panel-title">All Users </h3>
                        </div>
                        <div class="col-md-1 col-sm-2 col-xs-4">
                            <a type="button" href="<?php echo site_url("setup/userSetup/addUserSetup"); ?>" class="modalLink btn btn-primary btn-xs"  title="Add User">
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
                                <th><?php echo $this->lang->line('group'); ?></th>
                                <th><?php echo $this->lang->line('level'); ?></th>
                                <th><?php echo $this->lang->line('username'); ?></th>
                                <th><?php echo $this->lang->line('email'); ?></th>
                                <th><?php echo $this->lang->line('status'); ?></th>
                                <th width="10%"><?php echo $this->lang->line('action'); ?></th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php
                            $sl = 1;
                            $result = $this->utilities->findAllByAttribute('sa_users_v', array('ORG_ID' => $orgList->ORG_ID));
                            if (!empty($result)) {
                                foreach ($result as $data) {
                                    ?>
                                    <tr>
                                        <td><?php echo $sl++; ?></td>
                                        <td><?php
                                if ($data->USERTYPE == 1) {
                                    echo $data->EMP_NAME;
                                } else {
                                    echo $data->SUPPLIER_NAME;
                                }
                                ?></td>
                                        <td><?php echo $data->USERGRP_NAME; ?></td>
                                        <td><?php echo $data->UGLEVE_NAME; ?></td>
                                        <td><?php echo $data->USERNAME; ?></td>

                                        <td><?php echo $data->EMAIL; ?></td>
                                        <td><?php echo ($data->ACTIVE_STATUS == 1) ? '<span class="btn btn-xs btn-success waves-effect waves-button waves-float">'.$this->lang->line('is_active').'</span>' : '<span class="btn btn-xs btn-danger waves-effect waves-button waves-float">'.$this->lang->line('is_active').'</span>';
                                ?></td>
                                        <td>
                                            <span>
                                                 <a class="btn btn-success btn-xs modalLink" href="<?php echo site_url("setup/userSetup/viewUserSetup/" . $data->FLD_USER_ID); ?>" title="<?php echo $this->lang->line('view_user'); ?>"><i class="glyphicon glyphicon-eye-open"></i></a>
                                                                <a class="btn btn-primary btn-xs modalLink" href="<?php echo site_url("setup/userSetup/editUserSetup/" . $data->FLD_USER_ID); ?>"  title="<?php echo $this->lang->line('edit_user'); ?>"><i class="glyphicon glyphicon-edit"></i></a>
                                            </span>
                                        </td>

                                    </tr>
                                    <?php
                                }
                            } else {
                                echo '<td align="center" colspan="8">'.$this->lang->line('no_data_available').'</td>';
                            }
                            ?>

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>  

<?php } ?>
