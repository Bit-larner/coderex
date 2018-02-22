<style>
    #multi-select{ overflow: auto; border: 1px solid #ccc;}
    #multi-select h1{ margin:0; font-size: 11px; border-right: 1px solid #ccc; background: -moz-linear-gradient(center top , #F7F7F7 0%, #E6E6E6 100%) repeat scroll 0 0 rgba(0, 0, 0, 0); padding: 5px;}
    #selectable .ui-selecting { background: #FECA40; }
    #selectable .ui-selected { background: #F39814; color: white; }
    #selectable,#selectable-target { list-style-type: none; margin: 0; padding: 0; height: 300px; overflow: auto; background: #fff; border-right: 1px solid #ccc;}
    #selectable li,#selectable-target li { padding: 0.4em; font-size: 11px; border-bottom: 1px solid #e3e3e3;}
    .ui-widget-content{ box-shadow: none;}
    #selectable .ui-selected,#selectable .ui-selecting,#selectable-target .ui-selected,#selectable-target .ui-selecting{ background: #5899C4; color: #fff;}
    #selectable-target{ border-radius: 3px; height: 300px;border-left: 1px solid #ccc; border-right: 0;}
    #multi-select-btn{ margin-top: 70px;}
    #multi-select-btn .iconb{ font-size: 14px; width:30px; margin-bottom: 5px;}
    .pointer{cursor: pointer;}
</style>
<div class="row">
    <div class="col-md-12">
        <div class="panel panel-base">
            <div class="panel-heading">
                <div class="row">
                    <div class="col-md-11 col-sm-10 col-xs-8">
                        <h3 class="panel-title"><?php echo $this->lang->line('org_module_setup'); ?></h3>
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
                            <th class="text-center"><?php echo $this->lang->line('logo') ?></th>
                            <th class="text-center"><?php echo $this->lang->line('orgs') ?></th>
                            <th class="text-center"><?php echo $this->lang->line('status') ?></th>
                            <th class="text-center"><?php echo $this->lang->line('groups') ?></th>
                            <th class="text-center"><?php echo $this->lang->line('user') ?></th>
                            <th class="text-center"><?php echo $this->lang->line('modules') ?></th>
                            <th class="text-center"><?php echo $this->lang->line('pages') ?></th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php
                        $i = 1;
                        foreach ($careProviders as $row) {
                            ?>
                            <tr>
                        <input type="hidden" name="org_id" class="hidden_id" value="<?php echo $row->ORG_ID; ?>">
                        <td class="text-center"><?php echo $i++; ?></td>
                        <td class="text-center">
                            <img class="center-block img-responsive" src="<?php echo site_url('dist/img/'. $row->LOGO); ?>" style="width: 35px;" />
                        </td>
                        <td class="text-center"><?php echo $row->ORG_NAME; ?></td>
                        <td><?php echo ($row->ACTIVE_STATUS == 1) ? '<span class="label label-success">Active</span>' : '<span class="label label-danger">Inactive</span>'; ?></td>
                        <td class="text-center">
                            <a class="btn btn-info create_group" data-toggle="modal" href="#showDetaildModal" data-org_name="<?php echo $row->ORG_NAME ?>" data-hid="<?php echo $row->ORG_ID; ?>"><?php echo $this->lang->line('create_group') ?></a>
                        </td>
                        <td class="text-center">
                            <a type="button" class="modalLink btn btn-info "  title="<?php echo $this->lang->line('create_module_link'); ?>" href="<?php echo site_url("accessControl/createUser/$row->ORG_ID"); ?>">
                                <?php echo $this->lang->line('create_user'); ?>
                            </a>
                        </td>
                        <td class="center" style="width: 140px;">
                            <a class="btn btn-info addModule" data-toggle="modal" href="#showDetaildModal" data-org_name="<?php echo $row->ORG_NAME ?>" data-hid="<?php echo $row->ORG_ID; ?>"><?php echo $this->lang->line('assign_modules') ?></a>
                        </td>
                        <td class="center">
                            <a class="btn btn-info addLink" data-toggle="modal" href="#showDetaildModal" data-org_name="<?php echo $row->ORG_NAME ?>" data-hid="<?php echo $row->ORG_ID; ?>"><?php echo $this->lang->line('assign_pages') ?></a>
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
<div class="dialog" title="Add Module To Template"></div>
<div class="modal fade" id="showDetaildModal" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content"  id="common_modal_content">
            <div class="modal-header">
                <h4 class="modal-title" id="common_modal_title"> Create Module</h4>
            </div>
            <div class="modal-body" id="showDetaildModalBody"> </div>
        </div>
    </div>
</div>

<script type="text/javascript">
    $(document).on("click", ".addModule", function() {//Done
        var h_id = $(this).attr('data-hid');
        var org_name = $(this).attr('data-org_name');
        $.ajax({
            type: "POST",
            url: "<?php echo site_url('accessControl/moduleModal'); ?>",
            data: {hid: h_id,'<?php echo  $this->security->get_csrf_token_name(); ?>':'<?php echo $this->security->get_csrf_hash(); ?>'},
            beforeSend: function() {
                $("#showDetaildModal .modal-title").html("Assign Modules -- " + org_name);
                $("#showDetaildModal .modal-body").html("loading...");
            },
            success: function(data) {
                $("#showDetaildModal .modal-body").html(data);
                $("#selectable").selectable({
                    stop: function(event, ui) {
                        var result = $("#multi-select-add-single-ids").empty();
                        $(".ui-selected", this).each(function() {
                            result.append("<input type='hidden' name='add_selected_single_id[]' value='" + $(this).attr("id") + "' />");
                            result.append("<input type='hidden' name='add_selected_single_name[]' value='" + $(this).attr("title") + "' />");
                        });
                    }
                });
            }
        });
    });


    $(document).on("click", "#add_single", function() {//Done
        if (confirm("Are You Sure?")) {
            if ($("#multi-select-add-single-ids").children().length > 0) {
                var module_ids = $("#frmModuleIds").serialize();
                //alert(module_ids)
                $.ajax({
                    type: "POST",
                    url: "<?php echo site_url('accessControl/addModules'); ?>",
                    data: module_ids,'<?php echo  $this->security->get_csrf_token_name(); ?>':'<?php echo $this->security->get_csrf_hash(); ?>',
                    beforeSend: function() {
                        $("#selectable").html("loading...");
                        $("#selectable-target").html("loading...");
                    },
                    success: function(data) {
                        $("#multi-select-add-single-ids").html("");
                        $("#selectable-target").html(data);
                        $.ajax({
                            type: "POST",
                            url: "<?php echo site_url('accessControl/getModules'); ?>",
                            success: function(data) {
                                $("#selectable").html(data);
                            }
                        });
                    }
                });
            } else {
                alert("Please Select A Module To Add.");
                return false;
            }
        }
        else {
            return false;
        }
    });

    $(document).on("dblclick", ".rename-module", function() {
        $(this).children(".module-name").addClass("hidden");
        $(this).children(".module-name-input").removeClass("hidden");
        $(this).children(".remove-module").addClass("hidden");
    });

    $(document).on('keypress', '.txtModuleName', function(e) {
        var mname = $(this).parent().siblings(".module-name");
        var mcontrol = $(this).parent();
        var mremove = $(this).parent().siblings(".remove-module");
        var p = e.which;
        if (p == 13) {
            var hc_module_id = $(this).attr("data-hc-module-id");
            var module_name = $(this).val();
            $.ajax({
                type: "POST",
                url: "<?php echo site_url('accessControl/updateModule'); ?>",
                data: {m_id: hc_module_id, m_name: module_name,'<?php echo  $this->security->get_csrf_token_name(); ?>':'<?php echo $this->security->get_csrf_hash(); ?>'},
                beforeSend: function() {

                },
                success: function(data) {
                    mcontrol.addClass("hidden");
                    mname.removeClass("hidden").html(module_name).css("color", data);
                    mremove.removeClass("hidden");
                }
            });
        }
    });

    $(document).on("click", ".remove-module", function() {
        if (confirm("Are You Sure?")) {
            var hc_module_id = $(this).attr("data-hc-module-id");
            var mList = $(this).parent();
            $.ajax({
                type: "POST",
                url: "<?php echo site_url('accessControl/removeHcModule'); ?>",
                data: {m_id: hc_module_id,'<?php echo  $this->security->get_csrf_token_name(); ?>':'<?php echo $this->security->get_csrf_hash(); ?>'},
                beforeSend: function() {

                },
                success: function(data) {
                    mList.remove();
                }
            });
        }
        else {
            return false;
        }
    });

    $(document).on("click", ".remove-module-input", function() {
        $(this).parent().siblings(".module-name").removeClass("hidden");
        $(this).parent().addClass("hidden");
        $(this).parent().siblings(".remove-module").removeClass("hidden");
    });

    $(document).on("click", ".addLink", function() {
        var h_id = $(this).attr('data-hid');
        var org_name = $(this).attr('data-org_name');
        $.ajax({
            type: "POST",
            url: "<?php echo site_url('accessControl/moduleModalLink'); ?>",
            data: {hid: h_id,'<?php echo  $this->security->get_csrf_token_name(); ?>':'<?php echo $this->security->get_csrf_hash(); ?>'},
            beforeSend: function() {
                $("#showDetaildModal .modal-title").html("Assign Pages -- " + org_name);
                $("#showDetaildModal .modal-body").html("loading...");
            },
            success: function(data) {
                $("#showDetaildModal .modal-body").html(data);
            }
        });
    });
    $(document).on("click", ".chkAssignPage", function() {
        var value = $(this).val();
        var checked = ($($(this)).is(':checked')) ? 1 : 2;
        $.ajax({
            type: "POST",
            url: "<?php echo site_url('accessControl/assignModulePage'); ?>",
            data: {values: value, is_checked: checked,'<?php echo  $this->security->get_csrf_token_name(); ?>':'<?php echo $this->security->get_csrf_hash(); ?>'},
            success: function(result) {
            }
        });
    });
    $(document).on("click", ".create_group", function() {
        var h_id = $(this).attr('data-hid');
        var org_name = $(this).attr('data-org_name');
        $.ajax({
            type: "POST",
            url: "<?php echo site_url('accessControl/groupModal'); ?>",
            data: {hid: h_id,'<?php echo  $this->security->get_csrf_token_name(); ?>':'<?php echo $this->security->get_csrf_hash(); ?>'},
            beforeSend: function() {
                $("#showDetaildModal .modal-title").html("Create Group -- " + org_name);
                $("#showDetaildModal .modal-body").html("loading...");
            },
            success: function(data) {
                $("#showDetaildModal .modal-body").html(data);
            }
        });
    });
/*
    $(document).on("click", ".addUser", function() {
        var h_id = $(this).attr('data-hid');
        var org_name = $(this).attr('data-org_name');
        $.ajax({
            type: "POST",
            url: "<?php echo site_url('accessControl/createUser'); ?>",
            data: {hid: h_id},
            beforeSend: function() {
                $("#showDetaildModal .modal-title").html("Create User -- " + org_name);
                $("#showDetaildModal .modal-body").html("loading...");
            },
            success: function(data) {
                $("#showDetaildModal .modal-body").html(data);
            }
        });
    });
    */
</script>