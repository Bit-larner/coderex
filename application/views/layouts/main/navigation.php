<?php
$userSessonData = $this->session->userdata('logged_in');

$applicant_full_name = "";
$session_org_id = $userSessonData['ORG_ID'];
$session_usergroup_id = $userSessonData['USERGRP_ID'];
$session_user_id = $userSessonData['FLD_USER_ID'];


$org_name = $this->db->query("SELECT ORG_NAME FROM sa_organizations WHERE ORG_ID = $session_org_id ")->row();
$user_group = $this->db->query("SELECT USERGRP_NAME FROM sa_user_group WHERE USERGRP_ID = $session_usergroup_id")->row();
$user_profile_image = $this->db->query("SELECT USERIMG FROM sa_users WHERE FLD_USER_ID = $session_user_id ")->row();

$CI = get_instance();
$result = $CI->db->query("SELECT u.* FROM sa_users u  WHERE u.FLD_USER_ID = $session_user_id")->row();
?>
<style type="text/css">
    .icon_logo{
        height: 90px;
        width: 90px;
        margin-top: 10px;
        padding: 8px;
        border: 1px solid black;
        border-radius: 50%;
    }
    .dropdown-menu li{
        padding-left: 20px;
        padding-right: 20px;
    }
    .top_profile{
        text-align: center;

    }
</style>
<nav class="navbar navbar-side navbar-fixed-top">
    <div class="container-fluid">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle-secondary collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a href="#" class="navbar-toggle-primary" id="menu-toggle">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </a>
            <a class="navbar-brand" href="<?php echo base_url(); ?>"><img src="<?php echo site_url('dist/img/Thikana.jpg'); ?>" width="40"/> Drug International Limited</a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
            <!-- Right nav -->
            <ul class="nav navbar-nav navbar-right">
                <li><a href = "#" class = "user-menu"><i class = "glyphicon glyphicon-user"></i><span class="caret"></span></a>
                    <ul class="dropdown-menu">
                        <li>
                            <p class="top_profile"><strong><?php echo $result->FULL_NAME ?></strong><br>
                                <img class="icon_logo" src="<?php echo $user_profile_image->USERIMG != '' ? base_url("src/upload") . "/" . $user_profile_image->USERIMG :  site_url("dist/img/avater.png"); ?>" alt="" width="90" height="90">
                            </p>
                            <p>
                                <strong>Login</strong>
                                <?php
                                date_default_timezone_set("asia/Dhaka");
                                echo date("H:i A"). '<br/>';
                                echo date("d-M-Y");
                                ?>
                            </p>
                            <a class="btn btn-primary btn-flat" href="<?php echo site_url('auth/logout'); ?>"> Sign out</a>
                        </li>
                    </ul>
                </li>
                <li class="lang_icon">
                    <a href="<?php echo site_url('langSwitch/switchLanguage/english'); ?>">En</a>
                </li>
                <li class="lang_icon">
                    <a href="<?php echo site_url('langSwitch/switchLanguage/bangla'); ?>">
                        <img src="<?php echo base_url('/dist/img/bd.png') ?>" alt="lang-bd-flag"/>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</nav>