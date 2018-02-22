<?php
//
if (!empty($groups)) {
    $i = 1;
    foreach ($groups as $group) {
        $group_levels = $this->utilities->findAllByAttribute("sa_ug_level",
            array("USERGRP_ID" => $group->USERGRP_ID, "ACTIVE_STATUS" => 1));
        ?>
        <tr class="odd gradeX">
            <td><?php echo $i++; ?></td>
            <td>

                <div class="collapsibleDivHeader pointer">

                    <strong><?php echo $group->USERGRP_NAME." ".(!empty($group_levels)
                ? "(".count($group_levels).")" : "");
        ?> <span <?php
        echo (!empty($group_levels)) ? 'class="collapsiblePlus icon-plus" style="font-size: 10px; float:right;"'
                : ''
        ?>></span></strong>
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
                        <ol id="level_<?php echo  $group->ORG_ID.'_'.$group->USERGRP_ID; ?>" class="collapsibleDivBodyContent arrow_box" style="margin: 10px 0; padding: 0 20px;">
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

            <td><?php echo ($group->ACTIVE_STATUS == 1)
                ? '<span class="label label-success">Active</span>' : '<span class="label label-danger">Inactive</span>'; ?></td>

            <td>
                <div class="btn-group">
                    <a class="btn btn-primary btn-xs  securityModalL1" grp-org-id="<?php echo  $group->ORG_ID.'_'.$group->USERGRP_ID; ?>"  data-id="<?php echo $group->USERGRP_ID.'_'.$group->ORG_ID; ?>"><?php echo $this->lang->line('add_level') ?></a>
                </div>
            </td>
            <td>
                <div class="btn-group">
                   <a class="btn btn-primary btn-xs securityModalL2"  data-id=" <?php echo $group->USERGRP_ID; ?>" title=""><i class="glyphicon glyphicon-edit"></i></a>
                </div>
            </td>
        </tr>
        <?php
    }
}
?>