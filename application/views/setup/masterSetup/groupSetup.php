<style type="text/css">
    .panel-heading{
        background-color: #E7EAEC !important;
    }
    .pull-right{
        margin-bottom: 14px !important;
    }
    #headingThree{
        cursor: pointer;
    }
</style>
<a  title="<?php echo $this->lang->line('add_new_group'); ?>" href="<?php echo site_url('setup/masterSetup/addGroup'); ?>"  class="btn btn-primary pull-right modalLink"><?php echo $this->lang->line('add_group') ?></a>
<br clear="all" />
<div class="bs-example" data-example-id="collapse-accordion">
    <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
        <?php foreach ($result as $value) { ?>
            <div class="panel panel-default">
                <div class="panel-heading collapsed" role="tab" id="headingThree"
                     role="button" data-toggle="collapse" data-parent="#accordion" href="#<?php echo $value->LOOKUP_GRP_ID; ?>">
                    <h4 class="panel-title">
                        <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#<?php echo $value->LOOKUP_GRP_ID; ?>" aria-expanded="false" aria-controls="collapseThree">
                            <?php echo $value->LOOKUP_GRP_NAME; ?>
                        </a>
                    </h4>
                </div>
                <div id="<?php echo $value->LOOKUP_GRP_ID; ?>" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree">
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-sm-12">
                                <h4><small style="float:right"><a title="Add Group Item" href="<?php echo site_url("setup/masterSetup/addGroupItem/" . $value->LOOKUP_GRP_ID . "/" . $value->USE_CHAR_NUMB); ?>" class="btn btn-sm btn-primary lookupModal modalLink"><?php echo $this->lang->line('add_group_item') ?></a></small></h4>
                            </div> 
                        </div> 
                        <table class="table">
                            <thead>
                                <tr>
                                    <th><?php echo $this->lang->line('sl') ?></th>
                                    <th><?php echo $this->lang->line('name') ?></th>
                                    <th><?php
                        if ($value->USE_CHAR_NUMB == 'N') {
                            echo "SHORT NAME(N)";
                        } else {
                            echo "SHORT NAME(C)";
                        }
                            ?></th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody id="child<?php echo $value->LOOKUP_GRP_ID ?>">
                                <?php
                                $result = $this->utilities->findAllByAttribute('sa_lookup_data', array('LOOKUP_GRP_ID' => $value->LOOKUP_GRP_ID));
                                if (!empty($result)) {
                                    $sr = 1;
                                    foreach ($result as $group_item) {
                                        ?>
                                        <tr>
                                            <td><?php echo $sr++; ?></td>
                                            <td><?php echo $group_item->LOOKUP_DATA_NAME; ?></td>
                                            <td><?php
                            if ($value->USE_CHAR_NUMB == 'N') {
                                echo $group_item->NUMB_LOOKUP;
                            } else {
                                echo $group_item->CHAR_LOOKUP;
                            }
                                        ?></td>
                                            <td><?php echo ($group_item->ACTIVE_FLAG == 1) ? '<span class="btn btn-xs btn-success waves-effect waves-button waves-float">Active</span>' : '<span class="btn btn-xs btn-danger waves-effect waves-button waves-float">Inactive</span>';
                                        ?></td>
                                            <td><a title="Edit Group Item" href="<?php echo site_url("setup/MasterSetup/editGroupItem/" . $group_item->LOOKUP_DATA_ID); ?>" 
                                                   class="btn btn-xs btn-info modalLink"><?php echo $this->lang->line('edit') ?></a></td>
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
        <?php } ?>
    </div>
</div>

<script type="text/javascript">
    $(document).ready(function () {
        // for Group Item data saved
        $(document).on('submit', '#save_group_data', function (e) {
            e.preventDefault();
            if ($("#LOOKUP_DATA_NAME").val() == '') {
                alert("Field is required");
                $("#LOOKUP_DATA_NAME").focus();
            } else {
                var LOOKUP_DATA_NAME = $("#LOOKUP_DATA_NAME").val();
                var LOOKUP_GRP_ID = $("#LOOKUP_GRP_ID").val();
                var USE_CHAR_NUMB = $("#USE_CHAR_NUMB").val();
                var NUMB_LOOKUP = $("#NUMB_LOOKUP").val();
                var CHAR_LOOKUP = $("#CHAR_LOOKUP").val();
                $.ajax({
                    type: 'POST',
                    url: '<?php echo site_url('setup/MasterSetup/saveGroupIitem'); ?>',
                    data: {
                        LOOKUP_DATA_NAME: LOOKUP_DATA_NAME,
                        LOOKUP_GRP_ID: LOOKUP_GRP_ID,
                        USE_CHAR_NUMB: USE_CHAR_NUMB,
                        NUMB_LOOKUP: NUMB_LOOKUP,
                        CHAR_LOOKUP: CHAR_LOOKUP,
                        ACTIVE_FLAG: ($('#ACTIVE_FLAG').is(':checked')) ? 1 : 0
                    },
                    success: function (data) {
                        $("#child" + LOOKUP_GRP_ID).html(data);
                    },
                    complete: function (data) {
                        $("#showDetaildModal").modal("hide");
                    }
                });
            }
        });
        // update Group Item data 
        $(document).on('submit', '#update_group_data', function (e) {
            e.preventDefault();
            if ($("#LOOKUP_DATA_NAME").val() == '') {
                alert("Field is required");
                $("#LOOKUP_DATA_NAME").focus();
            } else {
                var LOOKUP_DATA_NAME = $("#LOOKUP_DATA_NAME").val();
                var LOOKUP_DATA_ID = $("#LOOKUP_DATA_ID").val();
                var LOOKUP_GRP_ID = $("#LOOKUP_GRP_ID").val();
                var USE_CHAR_NUMB = $("#USE_CHAR_NUMB").val();
                var CHAR_LOOKUP = $("#CHAR_LOOKUP").val();
                var NUMB_LOOKUP = $("#NUMB_LOOKUP").val();
                var active_flag = ($('#active_flag').is(':checked')) ? 1 : 0;
                //alert(GRP_ID);
                $.ajax({
                    type: 'POST',
                    url: '<?php echo site_url('setup/masterSetup/updateGroupItem'); ?>',
                    data: {
                        LOOKUP_DATA_NAME: LOOKUP_DATA_NAME,
                        LOOKUP_GRP_ID: LOOKUP_GRP_ID,
                         USE_CHAR_NUMB: USE_CHAR_NUMB,
                         CHAR_LOOKUP: CHAR_LOOKUP,
                         NUMB_LOOKUP: NUMB_LOOKUP,          
                         active_flag: active_flag,
                         LOOKUP_DATA_ID: LOOKUP_DATA_ID
                    },
                    success: function (data) {
                        $("#child" + LOOKUP_GRP_ID).html(data);
                    },
                    complete: function (data) {
                        $("#showDetaildModal").modal("hide");
                    }
                });
            }

        });
    });
</script>

