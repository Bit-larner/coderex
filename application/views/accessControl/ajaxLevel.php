<?php
//Showing Group Lists
foreach ($group_levels as $group_level) {
    ?>
    <li>
        <span id="uglraw_<?php echo $group_level->UG_LEVEL_ID; ?>"><?php echo $group_level->UGLEVE_NAME; ?></span>
        <input id="uglinput_<?php echo $group_level->UG_LEVEL_ID; ?>" class="display_none" type="text" value="<?php echo $group_level->UGLEVE_NAME; ?>"/>
        <span class="ugleveledit" id="uglvledit_<?php echo $group_level->UG_LEVEL_ID; ?>" uglvledit_id="<?php echo $group_level->UG_LEVEL_ID; ?>"><i style="color:blue; cursor: pointer;" class="fa fa-edit"></i></span>
        <span  id="uglvlupdate_<?php echo $group_level->UG_LEVEL_ID; ?>" class="display_none update_level" uglvlupdate_id="<?php echo $group_level->UG_LEVEL_ID; ?>"><i style="color:green; cursor: pointer;" class="fa fa-check"></i></span>
    </li>
<?php } ?>