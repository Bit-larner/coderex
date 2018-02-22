<!doctype html>
<!--[if lt IE 7]>
<html class="no-js lt-ie9 lt-ie8 lt-ie7" lang=""> <![endif]-->
<!--[if IE 7]>
<html class="no-js lt-ie9 lt-ie8" lang=""> <![endif]-->
<!--[if IE 8]>
<html class="no-js lt-ie9" lang=""> <![endif]-->
<!--[if gt IE 8]><!-->
<html class="no-js" lang=""> <!--<![endif]-->


<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>Drug International Limited</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="shortcut icon" type="image/x-icon" href="<?php echo base_url(); ?>resource/img/fav.png">
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,500" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>resource/css/jquery.fancybox.min.css">
    <link rel="stylesheet" href="<?php echo base_url(); ?>resource/css/bootstrap.min.css">
    <link rel="stylesheet" href="<?php echo base_url(); ?>resource/css/bootstrap-dropdownhover.min.css">
    <link rel="stylesheet" href="<?php echo base_url(); ?>resource/css/font-awesome.min.css">
    <link rel="stylesheet" href="<?php echo base_url(); ?>resource/css/simplelightbox.min.css">
    <link rel="stylesheet" href="<?php echo base_url(); ?>resource/style.css">
<!--    <link rel="stylesheet" href="--><?php //echo base_url(); ?><!--resource/js/jquery.ui.all.css">-->
    <link rel="stylesheet" href="<?php echo base_url(); ?>resource/css/green.css">

<!--    <script type="text/javascript" src="--><?php //echo base_url(); ?><!--resource/js/jquery-1.4.2.min.js"></script>-->
<!--    <script type="text/javascript" src="--><?php //echo base_url(); ?><!--resource/js/jquery-1.8.2.custom.js"></script>-->
    <script src="<?php echo base_url(); ?>resource/js/vendor/modernizr-2.8.3.min.js"></script>
<!----
    <script type="text/javascript">
        $(document).ready(function () {
            $('#productname').autocomplete
            {
                source:"<?php echo base_url('page_controller/search/?');?>"
            }
        );
        })
        ;
    </script>
    --->

</head>

<body>

<!--[if lt IE 8]>
<p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade
    your browser</a> to improve your experience.</p>
<![endif]-->
<header class="header">
    <div class="container-fluid">


        <div class="topmenu row">
            <nav class="text-right col-sm-offset-5 col-sm-7 topmenu-area">
                <a href="<?php echo base_url(); ?>page_controller/career" class="news-text">Career</a>
                <a href="<?php echo base_url(); ?>page_controller/news" class="news-text">News Room</a>
                <div id="google_translate_element"></div>
                <script type="text/javascript">
                    function googleTranslateElementInit() {
                        new google.translate.TranslateElement({pageLanguage: 'en', layout: google.translate.TranslateElement.InlineLayout.SIMPLE}, 'google_translate_element');
                    }
                </script>
                <script type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>
            </nav>
        </div>
        <div class="row">
            <div class="col-sm-6">
                <a href="#" id="logo">
                    <img src="<?php echo base_url(); ?>resource/img/header-logo.png" class="img-responsive">
                </a>
            </div>
            <div class="col-sm-offset-2 col-sm-4">
                <div class="text-right header-padding">
                </div>
            </div>
        </div>
        <div id="main-menu-bg"></div>
        <a id="menu-open" href="#"><i class="fa fa-bars"></i></a>
        <nav class="main-menu navbar-main-slide">
            <ul class="nav navbar-nav navbar-main">
                <li><a href="<?php echo base_url(); ?>page_controller/index">Home</a></li>
                <li class="dropdown submenu">
                    <a data-toggle="dropdown" data-hover="dropdown" data-animations=""
                       class="dropdown-toggle border-hover-color1" href="#">About Us <i class="fa fa-angle-down"
                                                                                        data-hover="dropdown"></i><span></span></a>
                    <ul class="dropdown-menu dropdown-hover-menu">
                        <li><a href="<?php echo base_url(); ?>page_controller/company_profile">Company Profile</a></li>
                        <li><a href="<?php echo base_url(); ?>page_controller/founder">Founder Chairman Profile</a>
                        </li>
                        <li><a href="<?php echo base_url(); ?>page_controller/md">Message from Managing Director</a></li>
                        <li><a href="<?php echo base_url(); ?>page_controller/mission">Mission and Vision</a></li>
                        <li><a href="<?php echo base_url(); ?>page_controller/our_people">Our People</a></li>
                        <li><a href="<?php echo base_url(); ?>page_controller/quality">Quality Policy</a></li>
<!--                        <li><a href="--><?php //echo base_url(); ?><!--page_controller/environment">Environment Health &amp;-->
<!--                                Safety Policy</a></li>-->
                        <li><a href="<?php echo base_url(); ?>page_controller/corporate">Corporate Social Responsibility</a></li>
                        <li><a href="<?php echo base_url(); ?>page_controller/sister_concerns">Sister Concerns</a></li>
                    </ul>
                </li>
                <li class="dropdown submenu">
                    <a data-toggle="dropdown" class="dropdown-toggle " href="#" data-hover="dropdown"
                       data-animations="">Products <i class="fa fa-angle-down"></i></a>
                    <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu">
                        <li class="dropdown dropdown-submenu">
                            <a href="#" data-hover="dropdown" class="dropdown-toggle" data-toggle="dropdown">Pharmaceuticals</a>
                            <ul class="dropdown-menu submenu-li" role="menu">
                                <li><a href="<?php echo base_url(); ?>page_controller/product_by_trade">Product By Brand
                                        Name</a></li>
                                <li><a href="<?php echo base_url(); ?>page_controller/product_by_generic">Product By
                                        Generic Name</a></li>
                                <li><a href="<?php echo base_url(); ?>page_controller/product_by_therapetic">Product By
                                        Therapeutic Class</a></li>
                            </ul>
                        </li>
                        <li><a href="<?php echo base_url(); ?>page_controller/Oncology_product">Oncology Products</a>
                        </li>
                        <li class="dropdown dropdown-submenu">
                            <a href="<?php echo base_url(); ?>page_controller/hu" data-hover="dropdown" class="dropdown-toggle" data-toggle="dropdown">Herbal
                                &amp; Unani</a>
                            <ul class="dropdown-menu submenu-li" role="menu">
                                <li><a href="<?php echo base_url(); ?>page_controller/herbal_product">Herbal</a></li>
                                <li><a href="<?php echo base_url(); ?>page_controller/Unani_product">Unani</a></li>
                            </ul>
                        </li>

                    </ul>
                </li>
                <li class="dropdown submenu">
                    <a data-toggle="dropdown" data-hover="dropdown" data-animations=""
                       class="dropdown-toggle border-hover-color1" href="#">Facility <i
                                class="fa fa-angle-down"></i></a>
                    <ul class="dropdown-menu">
                        <li class="dropdown dropdown-submenu">
                            <a href="<?php echo base_url(); ?>page_controller/formulation" data-hover="dropdown"
                               class="dropdown-toggle" data-toggle="dropdown">Factory</a>
                            <ul class="dropdown-menu submenu-li" role="menu">
                                <li><a href="<?php echo base_url(); ?>page_controller/formulation">Unit - 1</a></li>
                                <li><a href="<?php echo base_url(); ?>page_controller/formulation2">Unit - 2</a></li>
                                <li><a href="<?php echo base_url(); ?>page_controller/unit_3">Unit - 3</a></li>
                            </ul>
                        </li>
                        <li><a href="<?php echo base_url(); ?>page_controller/production_facility">Production
                                Facility</a></li>
                        <li><a href="<?php echo base_url(); ?>page_controller/oncology">Oncology Unit</a></li>
                        <li><a href="<?php echo base_url(); ?>page_controller/hu">Herbal &amp; Unani Unit</a></li>
                        <li><a href="<?php echo base_url(); ?>page_controller/research">Resarch and Development</a></li>
                        <li><a href="<?php echo base_url(); ?>page_controller/ware_house">Ware house</a></li>
                        <li><a href="<?php echo base_url(); ?>page_controller/virtual">Virtual Tour</a></li>
                        <li class="dropdown dropdown-submenu">
                            <a href="#" data-hover="dropdown" class="dropdown-toggle" data-toggle="dropdown">Photo
                                Gallery</a>
                            <ul class="dropdown-menu submenu-li" role="menu">

                                <?php
                                $imgUnit = $this->db->query("SELECT PHOTO_GALLERY_ID,DEPARTMENT_NAME FROM image_department i where ACTIVE_STATUS='Y';")->result();
                                foreach
                                ($imgUnit as $pi) {
                                    ?>
                                    <li><a href="<?php echo base_url(); ?>page_controller/pg_unit1/<?php echo $pi->PHOTO_GALLERY_ID?>"><?php echo $pi->DEPARTMENT_NAME;?></a></li>

                                <?php }
                                ?>

                            </ul>
                        </li>
                    </ul>
                </li>
                <li><a href="<?php echo base_url(); ?>page_controller/global_operation">Global Operation</a></li>
                <li><a href="<?php echo base_url(); ?>page_controller/contact">Contact Us</a></li>
            </ul>
<!--            <form class="navbar-form navbar-right" action="--><?php //echo site_url('page_controller/search'); ?><!--"-->
<!--                  method="post">-->
                <?php echo form_open(base_url( 'page_controller/search' ), array( 'id' => 'amMainForm', 'class' => 'navbar-form navbar-right'));?>

                <div class="form-group">
                    <input type="text" placeholder="Search" name="productname" id="productname"  class="form-control">

                    <button class="btn btn-default  search-btn" name="submit" type="submit"><i class="glyphicon glyphicon-search"></i>
                    </button>

                </div>
            </form>
            <?php echo form_close(); ?>


        </nav>
        <a id="menu-close" href="#"><i class="fa fa-times"></i></a>
    </div>
</header>
<div class="htop-height"></div>
