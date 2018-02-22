<style>
    .display_none{
        display: none;
    }
    .ajaxDelete{
        margin-left: 5px!important;
    }
</style>
<!--<a  title="" href="#"  class="btn btn-primary pull-right"><?php echo $this->lang->line('groups_by_orgs'); ?></a>-->
<!--<br>
<br clear="all" />-->
<div class="bs-example" data-example-id="collapse-accordion">
    <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
        <?php
        $i = 1;
        foreach ($orgList as $org) {
            $groups = $this->accessControl_model->userGroupList($org->ORG_ID);
            $totalGroups = count($groups);
            ?>
            <div class="panel panel-default">
                <div class="panel-heading collapsed" role="tab" id="headingThree" role="button" data-toggle="collapse" data-parent="#accordion" href="#<?php echo $org->ORG_ID; ?>">
                    <h4 class="panel-title">
                        <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#<?php echo $org->ORG_ID; ?>" aria-expanded="false" aria-controls="collapseThree">
                            <?php echo $org->ORG_NAME; ?>
                        </a>
                        <?php
                        if ($totalGroups > 0 and $totalGroups < 2) {
                            echo "<p class='btn btn-primary btn-xs pull-right'> $totalGroups User Group </p>";
                        } else if ($totalGroups > 1) {
                            echo "<p class='btn btn-primary btn-xs pull-right'> $totalGroups User Groups</p>";
                        } else {
                            echo "<p class='btn btn-danger btn-xs pull-right'> $totalGroups User Group</p>";
                        }
                        ?>
                    </h4>
                </div>
                <div id="<?php echo $org->ORG_ID; ?>" class="panel-collapse collapse <?php
                if ($i == 1) {
                    echo "in";
                }
                ?>" role="tabpanel" aria-labelledby="headingThree">

                    <div class="panel-body">
                        <div class="row">
                            <div class="col-sm-12">
                                <h4>
                                    <small style="float:right;margin-bottom:10px;">
                                        <a class="btn btn-primary btn-xs securityModal" data-org="<?php echo $org->ORG_ID; ?>" data-toggle="modal"  href="#modal_window" >
                                            <?php echo $this->lang->line('add_new_group'); ?>
                                        </a>
                                    </small>
                                </h4>
                            </div>
                            <div class="col-sm-12">
                                <table id="" class="table table-striped table-bordered" width="100%" cellspacing="0">
                                    <thead>
                                        <tr>
                                            <th style="width:2%;"><?php echo $this->lang->line('sl') ?></th>
                                            <th style="width:70%;"><?php echo $this->lang->line('group_name') ?></th>
                                            <th><?php echo $this->lang->line('status') ?></th>
                                            <th style="width: 70px;"><?php echo $this->lang->line('level') ?></th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody id="child_<?php echo $org->ORG_ID; ?>">
                                        <?php
                                        $groups = $this->accessControl_model->userGroupList($org->ORG_ID);
                                        if (!empty($groups)) {
                                            $i = 1;
                                            foreach ($groups as $group) {
                                                $group_levels = $this->utilities->findAllByAttribute("sa_ug_level", array("USERGRP_ID" => $group->USERGRP_ID, "ACTIVE_STATUS" => 1));
                                                ?>
                                                <tr class="odd gradeX">
                                                    <td><?php echo $i++; ?></td>
                                                    <td>
                                                        <div class="collapsibleDivHeader pointer">
                                                            <strong>
                                                                <?php
                                                                echo $group->USERGRP_NAME . " " . (!empty($group_levels) ? "(" . count($group_levels) . ")" : "");
                                                                ?> 
                                                                <span <?php
                                                                echo (!empty($group_levels)) ? 'class="collapsiblePlus icon-plus" style="font-size: 10px; float:right;"' : ''
                                                                ?>>
                                                                </span>
                                                            </strong>
                                                            <span class = "rht rightLabel">
                                                                <?php
                                                                if (empty($group_levels)) {
                                                                    echo "<span style='color:#999999; font-size:10px; font-style:italic; margin-left:20px;'>No Level Created So Far</span>";
                                                                }
                                                                ?>
                                                            </span>
                                                        </div>
                                                        <?php
                                                        if (!empty($group_levels)) {
                                                            ?>
                                                            <div class="collapsibleDivBody" style="display: none;">
                                                                <ol id="level_<?php echo $group->ORG_ID . '_' . $group->USERGRP_ID; ?>" class="collapsibleDivBodyContent  arrow_box" style="margin: 10px 0; padding: 0 20px;">
                                                                    <?php
                                                                    foreach ($group_levels as $group_level) {
                                                                        ?>
                                                                        <li>
                                                                            <span id="uglraw_<?php echo $group_level->UG_LEVEL_ID; ?>"><?php echo $group_level->UGLEVE_NAME; ?></span>
                                                                            <input id="uglinput_<?php echo $group_level->UG_LEVEL_ID; ?>" class="display_none" type="text" value="<?php echo $group_level->UGLEVE_NAME; ?>"/>
                                                                            <span class="ugleveledit" id="uglvledit_<?php echo $group_level->UG_LEVEL_ID; ?>" uglvledit_id="<?php echo $group_level->UG_LEVEL_ID; ?>"><i style="color:blue; cursor: pointer;" class="fa fa-edit"></i></span>
                                                                            <span  id="uglvlupdate_<?php echo $group_level->UG_LEVEL_ID; ?>" class="display_none update_level" uglvlupdate_id="<?php echo $group_level->UG_LEVEL_ID; ?>"><i style="color:green; cursor: pointer;" class="fa fa-check"></i></span>
                                                                        </li>
                                                                    <?php } ?>
                                                                </ol>
                                                            </div>
                                                        <?php } ?>
                                                    </td>
                                                    <td>
                                                        <?php echo ($group->ACTIVE_STATUS == 1) ? '<span class="label label-success">Active</span>' : '<span class="label label-danger">Inactive</span>'; ?>
                                                    </td>
                                                    <td>
                                                        <div class="btn-group">
                                                            <a class="btn btn-primary btn-xs  securityModalL1" grp-org-id="<?php echo $group->ORG_ID . '_' . $group->USERGRP_ID; ?>"  data-id="<?php echo $group->USERGRP_ID . '_' . $group->ORG_ID; ?>"><?php echo $this->lang->line('add_level') ?></a>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="btn-group">
                                                            <a class="btn btn-warning btn-xs securityModalL2"  data-id=" <?php echo $group->USERGRP_ID; ?>" title=""><i class="glyphicon glyphicon-edit"></i></a>
                                                            &nbsp; <a  href="<?php echo site_url("AccessControl/deleteUserGroup/$group->USERGRP_ID"); ?>" title="Delete Group" class="btn btn-xs btn-danger btn-sm ajaxDelete"><span class="glyphicon glyphicon-trash"></span></a>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <?php
                                            }
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
            $i++;
        }
        ?>
    </div>
</div>

<div class="modal fade" id="securityModalL1" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
        </div>
    </div>
</div>

<!--script for this page only-->
<script type="text/javascript">
    $(document).ready(function() {
        $('.toggleLevel').click(function() {
            $(this).siblings('.groupLevels').slideToggle(100, function() {
                $(this).siblings('.toggleLevel').toggleClass('test');
            });

            $(this).parent().parent().siblings().find('.groupLevels').hide(100, function() {
                $(this).siblings('.toggleLevel').removeClass('test');
                $(this).find('.answer').hide();
            });
        });

        $(document).on("click", ".securityModalL1", function() {
            $("#securityModalL1").modal('show');
            var group_id = $(this).attr('data-id');
            var group_org = $(this).attr('grp-org-id');
            $.ajax({
                type: "POST",
                url: "<?php echo site_url('AccessControl/createLevelModal'); ?>",
                data: {group_id: group_id, ORG_GRP: group_org},
                success: function(data) {
                    $(".modal-content").html(data);
                }
            });
        });
        $(document).on("click", ".securityModalL2", function() {
            $("#securityModalL1").modal('show');
            var group_id = $(this).attr('data-id');
            $.ajax({
                type: "POST",
                url: "<?php echo site_url('AccessControl/editUserGroup'); ?>",
                data: {group_id: group_id},
                success: function(data) {
                    $(".modal-content").html(data);
                }
            });
        });
        $(document).on("click", ".ugleveledit", function() {
            var lvlid = $(this).attr('uglvledit_id');
            $('#uglraw_' + lvlid).hide();
            $('#uglinput_' + lvlid).show();
            $('#uglvledit_' + lvlid).hide();
            $('#uglvlupdate_' + lvlid).show();
        });
        $(document).on("click", ".update_level", function() {
            var levelid = $(this).attr('uglvlupdate_id');
            var leveldata = $('#uglinput_' + levelid).val();
            //alert(levelid);
            $.ajax({
                type: "POST",
                url: "<?php echo site_url('AccessControl/update_user_group_lavel'); ?>",
                data: {levelid: levelid, leveldata: leveldata},
                success: function(data) {
                    if (data == 'updated') {
                        $('#uglraw_' + levelid).text($('#uglinput_' + levelid).val());
                        $('#uglraw_' + levelid).show();
                        $('#uglinput_' + levelid).hide();
                        $('#uglvledit_' + levelid).show();
                        $('#uglvlupdate_' + levelid).hide();
                    } else {
                        alert('Update failed! Try again later.');
                    }
                }
            });
        });
    });
    $(document).on("click", "a.securityModal", function() {
        $("#securityModalL1").modal('show');
        var org_id = $(this).attr('data-org');
        $.ajax({
            type: "POST",
            data: {orgId: org_id},
            url: "<?php echo site_url('accessControl/groupModalIndvidual'); ?>",
            success: function(data) {
                $(".modal-content").html(data);
            }
        });
    });
</script>
<script type="text/javascript">
    $(document).ready(function() {
        $(document).on('submit', '#insert_group_data', function(e) {
            e.preventDefault();
            var ORG = $("#org_id").val();
            form = $(this).serialize()
            $.ajax({
                type: 'POST',
                url: '<?php echo site_url('AccessControl/groupModalIndvidual'); ?>',
                data: form,
                success: function(data) {
                    $("#child_" + ORG).html(data);
                },
                complete: function(data) {
                    $("#securityModalL1").modal("hide");
                }
            });
        });
    });
</script>
<script>
    $(document).on("click", ".collapsibleDivHeader", function() {
        $(this).siblings('.collapsibleDivBody').slideToggle(100, function() {
            var $iconCon = $(this).siblings('.collapsibleDivHeader').find('.collapsiblePlus');
            if ($iconCon.hasClass('icon-plus')) {
                $iconCon.addClass('icon-minus').removeClass('icon-plus');
            } else {
                $iconCon.addClass('icon-plus').removeClass('icon-minus');
            }
        });
    });
</script>
<script type="text/javascript">
    $(document).ready(function() {
        $(document).on('submit', '#update_group_data', function(e) {
            e.preventDefault();
            var ORG = $("#org_id").val();
            form = $(this).serialize()
            $.ajax({
                type: 'POST',
                url: '<?php echo site_url('AccessControl/editUserGroup'); ?>',
                data: form,
                success: function(data) {
                    $("#child_" + ORG).html(data);
                },
                complete: function(data) {
                    $("#securityModalL1").modal("hide");
                }
            });
        });
    });
</script>
<script type="text/javascript">
    $(document).ready(function() {
        $(document).on('submit', '#create_level', function(e) {
            e.preventDefault();
            var block_id = $("#org_grp_id").val();
            form = $(this).serialize()
            $.ajax({
                type: 'POST',
                url: '<?php echo site_url('AccessControl/createLevel'); ?>',
                data: form,
                success: function(data) {
                    $("#level_" + block_id).html(data);
                },
                complete: function(data) {
                    $("#securityModalL1").modal("hide");
                }
            });
        });
    });
</script>