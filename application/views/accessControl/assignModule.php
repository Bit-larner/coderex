<div class="row">
    <div class="panel-body custom_panel">
        <div class="row ">
            <div class="col-md-9 ">
                <div class="row   ">
                    <div class="col-md-12 btn btn-primary btn-block">
                        <div class="col-md-4">
                            <div class="controls" style="margin-top: 2px;">
                                <?php
                                echo form_dropdown('org_list', $org, '', 'id="cmbOrg" class="form-control"');
                                ?>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <span class="getGroup">
                                <select class="cmbLevel form-control" id="cmbGroup" name="cmbLevel">
                                    <option>Select A Group</option>
                                </select>
                            </span>
                        </div>
                        <div class="col-md-4">
                            <span class="getLevel">
                                <select class="cmbLevel form-control" id="cmbLevel" name="cmbLevel">
                                    <option>Select A Level</option>
                                </select>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="row   btn btn-primary btn-block " style="padding:11px">
                    <center>
                        Users
                        <br>
                    </center>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-9">
                <?php
                if (!empty($org_modules)) {
                    ?>
                    <div class="tree well">
                        <ul>
                            <li>
                                <span> Modules</span>
                                <span class="module_action" style="float: right; display: none;">
                                    <span style="padding: 0 5px;">Create</span>
                                    <span style="padding: 0 5px;">Read</span>
                                    <span style="padding: 0 5px;">Update</span>
                                    <span style="padding: 0 5px;">Delete</span>
                                    <span style="padding: 0 5px;">Status</span>
                                </span>
                                <br clear="all" />
                                <ul id="modules">
                                    <?php
                                    foreach ($org_modules as $org_module) {
                                        $org_module_links = $this->utilities->findAllByAttributeWithJoin("sa_org_mlinks", "sa_module_links", "LINK_ID", "LINK_ID", "LINK_NAME", array("SA_MODULE_ID" => $org_module->SA_MODULE_ID));
                                        ?>
                                        <li>
                                            <span> <?php echo $org_module->SA_MODULE_NAME; ?></span>
                                            <?php if (!empty($org_module_links)) { ?>
                                                <ul>
                                                    <?php foreach ($org_module_links as $org_module_link) { ?>
                                                        <li style="border-bottom: 1px dashed #ccc; padding: 5px 0 5px 0; background: #f2f2f2; padding-left: 5px;">
                                                            <span> <?php echo $org_module_link->LINK_NAME; ?></span>
                                                            <span style="float: right; display:none;">
                                                                <span style="padding: 0 19px;">
                                                                    <?php if ($org_module_link->CREATE == 1) { ?>
                                                                        <input type="checkbox" class="chkPage"  title="Create" value="<?php echo $org_module->SA_MODULE_ID . ',' . $org_module_link->SA_MLINKS_ID . ',' . 'C'; ?>" />
                                                                    <?php } else { ?>
                                                                        <input type="checkbox" title="Create" disabled="disabled"  />
                                                                    <?php } ?>
                                                                </span>
                                                                <span style="padding: 0 19px;">
                                                                    <?php if ($org_module_link->READ == 1) { ?>
                                                                        <input type="checkbox" class="chkPage" title="Read" value="<?php echo $org_module->SA_MODULE_ID . ',' . $org_module_link->SA_MLINKS_ID . ',' . 'R'; ?>" />
                                                                    <?php } else { ?>
                                                                        <input type="checkbox" title="Read" disabled="disabled" />
                                                                    <?php } ?>
                                                                </span>
                                                                <span style="padding: 0 19px;">
                                                                    <?php if ($org_module_link->UPDATE == 1) { ?>
                                                                        <input type="checkbox" class="chkPage" title="Update" value="<?php echo $org_module->SA_MODULE_ID . ',' . $org_module_link->SA_MLINKS_ID . ',' . 'U'; ?>" />
                                                                    <?php } else { ?>
                                                                        <input type="checkbox" title="Update" disabled="disabled" />
                                                                    <?php } ?>
                                                                </span>
                                                                <span style="padding: 0 19px;">
                                                                    <?php if ($org_module_link->DELETE == 1) { ?>
                                                                        <input type="checkbox" class="chkPage" title="Delete" value="<?php echo $org_module->SA_MODULE_ID . ',' . $org_module_link->SA_MLINKS_ID . ',' . 'D'; ?>" />
                                                                    <?php } else { ?>
                                                                        <input type="checkbox" title="Delete" disabled="disabled" />
                                                                    <?php } ?>
                                                                </span>
                                                                <span style="padding: 0 19px;">
                                                                    <?php if ($org_module_link->STATUS == 1) { ?>
                                                                        <input type="checkbox" class="chkPage" title="Delete" value="<?php echo $org_module->SA_MODULE_ID . ',' . $org_module_link->SA_MLINKS_ID . ',' . 'S'; ?>" />
                                                                    <?php } else { ?>
                                                                        <input type="checkbox" title="Delete" disabled="disabled" />
                                                                    <?php } ?>
                                                                </span>
                                                            </span>
                                                            <br clear="all" />
                                                        </li>
                                                    <?php } ?>
                                                </ul>
                                            <?php } ?>
                                        </li>
                                        <?php
                                    }
                                    ?>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <?php
                }
                ?>
            </div>
            <div class="col-md-3">
                <div class="row">
                    <div class="col-md-12">
                    </div>
                    <div class="col-nd-12">
                        <table class="table">
                            <tbody  id="userList">
                                <?php
                                if (!empty($users)) {
                                    foreach ($users as $user) {
                                        ?>
                                        <tr>
                                            <td>
                                                <?php echo $user->FULL_NAME; ?>&nbsp;
                                                <span class="loadingImg"></span>
                                            </td>
                                            <td>
                                                <a href="#myModal" role="button" data-toggle="modal" data-link="<?php echo site_url("cp/securityAccess/viewAccessChartModal/$user->FLD_USER_ID"); ?>">
                                                    <span class="actionIcon dialogLink" data-original-title="Access Chart of <?php echo $user->FULL_NAME; ?>" title="Access Chart of <?php echo $user->FULL_NAME; ?>"  data-placement="top">
                                                        <img src="<?php echo base_url(); ?>resources/img/sitemap.png" />
                                                    </span>
                                                </a>
                                            </td>
                                            <td><span class="md-lock-open actionIcon assignUser" id="<?php echo $user->FLD_USER_ID; ?>" title="Change Access For This user Only" data-original-title="Change Access For This user Only" style="cursor: pointer;"></span></td>
                                            <td><a href="#myModal" role="button" data-toggle="modal" data-link="<?php echo site_url("cp/securityAccess/transferGroupUserModal/$user->FLD_USER_ID"); ?>"><span class="actionIcon dialogLink"  data-placement="top" data-original-title="Transfer <?php echo $user->FULL_NAME; ?> To Different Group" title="Transfer <?php echo $user->FULL_NAME; ?> To Different Group"><i class="md-exit-to-app"></i></span></a></td>
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
</div>

<style type="text/css">
    .tree {
        margin-left: -15px;
        margin-top: 10px;
        width: 100%;
    }
    .tree li {
        list-style-type:none;
        margin:0;
        padding:10px 5px 0 5px;
        position:relative
    }
    .tree li::before, .tree li::after {
        content:'';
        left:-20px;
        position:absolute;
        right:auto
    }
    .tree li::before {
        border-left:1px solid #999;
        bottom:50px;
        height:100%;
        top:0;
        width:1px
    }
    .tree li::after {
        border-top:1px solid #999;
        height:20px;
        top:25px;
        width:25px
    }
    .tree li span {
        -moz-border-radius:5px;
        -webkit-border-radius:5px;
        border:1px solid #999;
        border-radius:5px;
        display:inline-block;
        padding:3px 8px;
        text-decoration:none
    }
    .tree li.parent_li>span {
        cursor:pointer
    }
    .tree>ul>li::before, .tree>ul>li::after {
        border:0
    }
    .tree li:last-child::before {
        height:30px
    }
    .tree li.parent_li>span:hover, .tree li.parent_li>span:hover+ul li span {
        background:#eee;
        border:1px solid #94a0b4;
        color:#000
    }
    .custom_panel{
        padding: 15px;
        overflow: hidden;
        margin-left: 9px;
        width: 101%;
    }
</style>

<script type="text/javascript">
    $(function() {
        $('.tree li:has(ul)').addClass('parent_li').find(' > span').attr('title', 'Collapse this branch');
        $('.tree li.parent_li > span').on('click', function(e) {
            var children = $(this).parent('li.parent_li').find(' > ul > li');
            if (children.is(":visible")) {
                children.hide('fast');
                $(this).attr('title', 'Expand this branch').find(' > i').addClass('icon-plus-sign').removeClass('icon-minus-sign');
            } else {
                children.show('fast');
                $(this).attr('title', 'Collapse this branch').find(' > i').addClass('icon-minus-sign').removeClass('icon-plus-sign');
            }
            e.stopPropagation();
        });

        $(document).on("click", ".actionIcon", function() {
            $(this).parents("tr").css({"backgroundColor": "rgba(116,183,73,.3)", "color": "red"});
            $(this).parents("tr").siblings().css({"backgroundColor": "#fff", "color": "#888888"});
        });
        $("#userList > tr:first td").css("borderTop", "0");
        $("#modules > li a").first().removeClass("closed");
        $("#modules > li ul").first().addClass("in");
        
        $(document).on("change", "#cmbOrg", function() {
            var org_id = $(this).val();
            $.ajax({
                type: "POST",
                url: "<?php echo site_url('AccessControl/getGroupsByOrg'); ?>",
                data: {org: org_id,'<?php echo  $this->security->get_csrf_token_name(); ?>':'<?php echo $this->security->get_csrf_hash(); ?>'},
                beforeSend: function() {
                    //$("#modules,#userList").addClass("loadingIMid");
                },
                success: function(result) {
                    $("#modules,#userList").removeClass("loadingIMid");
                    $("span.module_action").hide('slide');
                    $('.getGroup').html(result);
                }
            });

            $.ajax({
                type: "POST",
                url: "<?php echo site_url('AccessControl/getUsersByOrganization'); ?>",
                data: {org: org_id,'<?php echo  $this->security->get_csrf_token_name(); ?>':'<?php echo $this->security->get_csrf_hash(); ?>'},
                success: function(result1) {
                    $('#userList').html(result1);
                    $("#userList > tr:first td").css("borderTop", "0");
                    $('.tooltips').tooltip();
                }
            });

            $.ajax({
                type: "POST",
                url: "<?php echo site_url('AccessControl/getModuleAcceesByOrganization'); ?>",
                data: {org: org_id,'<?php echo  $this->security->get_csrf_token_name(); ?>':'<?php echo $this->security->get_csrf_hash(); ?>'},
                beforeSend: function() {
                    $("#modules").addClass("loadingIMid");
                },
                success: function(result2) {
                    $('#modules').html(result2);
                    $("#modules > li ul").first().addClass("in");
                }
            });


        });
        $(document).on("change", "#cmbGroup", function() {
            var group_idd = $(this).val();
            var org_id = $("select#cmbOrg").val();
            var group_id = group_idd + "_" + org_id;
            $.ajax({
                type: "POST",
                url: "<?php echo site_url('AccessControl/getLevelsByGroup'); ?>",
                data: {group: group_id,'<?php echo  $this->security->get_csrf_token_name(); ?>':'<?php echo $this->security->get_csrf_hash(); ?>'},
                beforeSend: function() {
                    $("#modules,#userList").addClass("loadingIMid");
                },
                success: function(result) {
                    $("#modules,#userList").removeClass("loadingIMid");
                    $("span.module_action").show('fade');
                    $('.getLevel').html(result);
                }
            });

            $.ajax({
                type: "POST",
                url: "<?php echo site_url('AccessControl/getUsersByGroup'); ?>",
                data: {group: group_id,'<?php echo  $this->security->get_csrf_token_name(); ?>':'<?php echo $this->security->get_csrf_hash(); ?>'},
                success: function(result1) {
                    $('#userList').html(result1);
                    $("#userList > tr:first td").css("borderTop", "0");
                    $('.tooltips').tooltip();
                }
            });

            $.ajax({
                type: "POST",
                url: "<?php echo site_url('AccessControl/getModuleAcceesByGroup'); ?>",
                data: {group: group_id,'<?php echo  $this->security->get_csrf_token_name(); ?>':'<?php echo $this->security->get_csrf_hash(); ?>'},
                beforeSend: function() {
                    $("#modules").addClass("loadingIMid");
                },
                success: function(result2) {
                    $('#modules').html(result2);
                    $("#modules > li ul").first().addClass("in");
                }
            });
        });


        $(document).on("change", "#cmbLevel", function() {
            var group_id = $("#cmbGroup").val();
            var level_id = $(this).val();
            var org_id = $("#cmbOrg").val();
            $.ajax({
                type: "POST",
                url: "<?php echo site_url('AccessControl/getUsersByLevel'); ?>",
                data: {group: group_id, level: level_id, org: org_id,'<?php echo  $this->security->get_csrf_token_name(); ?>':'<?php echo $this->security->get_csrf_hash(); ?>'},
                beforeSend: function() {
                    $("#userList").addClass("loadingIMid");
                },
                success: function(result1) {
                    $('#userList').html(result1).removeClass("loadingIMid");
                    $("#userList > tr:first td").css("borderTop", "0");
                }
            });

            $.ajax({
                type: "POST",
                url: "<?php echo site_url('AccessControl/getModuleAcceesByGroupLevel'); ?>",
                data: {group: group_id, level: level_id, org: org_id,'<?php echo  $this->security->get_csrf_token_name(); ?>':'<?php echo $this->security->get_csrf_hash(); ?>'},
                beforeSend: function() {
                    $("#modules").addClass("loadingIMid");
                },
                success: function(result2) {
                    $('#modules').html(result2).removeClass("loadingIMid");
                    $("#modules > li ul").first().addClass("in");
                }
            });
        });

//        $(document).on("change", "#cmbDepartment", function() {
//            var dept_id = $(this).val();
//            $.ajax({
//                type: "POST",
//                url: "<?php echo site_url('securityAccess/getUsersByDepartment'); ?>",
//                data: {department: dept_id},
//                beforeSend: function() {
//                    $("#userList").addClass("loadingIMid");
//                },
//                success: function(result1) {
//                    $('#userList').html(result1).removeClass("loadingIMid");
//                    $("#userList > tr:first td").css("borderTop", "0");
//                    $("#userList > tr:first td").css("borderTop", "0");
//                    $('.tooltips').tooltip();
//                }
//            });
//        });

//        $("#btnAssignModuleByGroup").click(function() {
//            if (confirm("Are You Sure?")) {
//                $("#frmAssignModuleByGroup").submit();
//            }
//            else {
//                return false;
//            }
//        });

        $(document).on("click", ".chkPage", function() {
            var org = $("#cmbOrg").val();
            var group = $("#cmbGroup").val();
            var level = $("#cmbLevel").val();
            //var department = $("#cmbDepartment").val();
            var value = $(this).val();
            var checked = ($($(this)).is(':checked')) ? 1 : 0;
            if (group == "") {
                alert("Please Select Group");
                return false;
            } else if (level == "") {
                alert("Please Select Level");
                return false;
            }else if (org == "") {
                alert("Please Select Organization");
                return false;
            }else {
                $.ajax({
                    type: "POST",
                    url: "<?php echo site_url('accessControl/assignModuleToGroupAction'); ?>",
                    data: {group_id: group, level_id: level, org_id: org, values: value, is_checked: checked,'<?php echo  $this->security->get_csrf_token_name(); ?>':'<?php echo $this->security->get_csrf_hash(); ?>'},
                    success: function(result) {

                    }
                });
            }
        });

//        $(document).on("click", ".assignUser", function() {
//            var user_id = $(this).attr("id");
//            $.ajax({
//                type: "POST",
//                url: "<?php echo site_url('securityAccess/getModuleAcceesByUser'); ?>",
//                data: {user: user_id},
//                beforeSend: function() {
//                    $("#modules").addClass("loadingIMid");
//                },
//                success: function(result2) {
//                    $('#modules').html(result2).removeClass("loadingIMid");
//                    $("#modules > li ul").first().addClass("in");
//                }
//            });
//        });

//        $(document).on("click", ".chkPageByUser", function() {
//            var value = $(this).val();
//            var group = $(this).attr("id");
//            var sa_uglwm_link = $(this).attr("rel");
//            var user_id = $(this).attr("user");
//            var level_id = $(this).attr("level-id");
//            var checked = ($($(this)).is(':checked')) ? 1 : 0;
//            $.ajax({
//                type: "POST",
//                url: "<?php echo site_url('securityAccess/assignModuleAcceesByUser'); ?>",
//                data: {values: value, is_checked: checked, group_id: group, sa_uglwm_link_id: sa_uglwm_link, user: user_id, level: level_id},
//                success: function(result) {
//                    //window.location.replace("<?php echo site_url("securityAccess/assignModuleToGroup"); ?>");
//                }
//            });
//        });

//        $(document).on("click", "#chkAllUser", function() {
//            var checked = $(this).is(':checked');
//            if (checked) {
//                $(".chkUser").attr("checked", "checked");
//            } else {
//                $(".chkUser").removeAttr("checked");
//            }
//            $.ajax({
//                url: "<?php echo site_url('securityAccess/getModuleAcceesByUsers'); ?>",
//                success: function(result2) {
//                    $('#modules').html(result2);
//                    $("#modules > li ul").first().addClass("in");
//                }
//            });
//        });

//        $(document).on("click", ".chkPageByUsers", function() {
//            var value = $(this).val();
//            var users = $("#frmAssignModuleByGroup").serialize();
//            var checked = ($($(this)).is(':checked')) ? 1 : 0;
//            $.ajax({
//                type: "POST",
//                url: "<?php echo site_url('securityAccess/assignModuleAccessToUsers'); ?>",
//                data: users + "&values=value&is_checked=checked",
//                success: function(result2) {
//                    $('#modules').html(result2);
//                    $("#modules > li ul").first().addClass("in");
//                }
//            });
//        });
    });
</script>