<?php
$orgId = $_SESSION['logged_in']['ORG_ID'];
$userGroupId = $_SESSION['logged_in']['USERGRP_ID'];
$userLevelId = $_SESSION['logged_in']['USERLVL_ID'];
$modules = $this->accessControl_model->getModuleByOrganization($orgId);
?>
<div id="sidebar-wrapper">
    <ul id="sidebar-menu" class="sidebar-menu">
        <li data-toggle="collapse" data-target="#dashboard" class="collapsed">
            <a href="<?php echo site_url('dashboard/index'); ?>"><i class="fa fa-tachometer fa-lg"></i> Dashboard</a>
        </li>
        <?php
        if (!empty($modules))
            $i = 1;
        foreach ($modules as $module) {
            $links = $this->accessControl_model->getAccessLink($orgId, $userGroupId, $userLevelId, $module->SA_MODULE_ID);
            if (!empty($links)) {
                ?>
                <li data-toggle="collapse" data-target="#service_<?php echo $i; ?>" class="collapsed">
                    <a href="#"><i class="fa fa-cog fa-lg"></i><?php echo $module->MODULE_NAME; ?><span class="arrow"></span></a>
                </li>
                <ul class="sub-menu collapse" id="service_<?php echo $i; ?>">
                    <?php
                    foreach ($links as $link) {
                        ?>
                        <li><a href="<?php echo site_url($link->URL_URI) ?>"><i class="fa fa-angle-right"></i> <?php echo $link->LINK_NAME; ?></a></li>
                        <?php } ?>
                </ul>
                <?php
            }
            $i++;
        }
        ?>
    </ul>
</div>
