<!doctype html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang=""> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8" lang=""> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9" lang=""> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang=""> <!--<![endif]-->
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title><?php echo $metaTitle; ?></title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="apple-touch-icon" href="dist/fonts/apple-touch-icon.png">
    <link rel="stylesheet" href="<?php echo base_url('dist/styles/main.css'); ?>">
    <link rel="stylesheet" href="<?php echo base_url('dist/styles/custom.css'); ?>">

    <link rel="shortcut icon" href="<?php echo base_url('dist/img/a2i_logo.png'); ?>" type="image/vnd.microsoft.icon" />

    <script src="<?php echo base_url('dist/scripts/modernizr.js'); ?>"></script>

    <script src="<?php echo base_url('dist/scripts/jquery.min.js'); ?>"></script>
    <script src="<?php echo base_url('dist/scripts/jquery-ui.js'); ?>"></script>
    <script>window.jQuery || document.write('<script src="dist/scripts/jquery.js"><\/script>')</script>
</head>
<body>
<!--[if lt IE 8]>
<p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
<![endif]-->

<div class="container">
    <?php echo $content;?>
</div> <!-- /container -->

<script src="<?php echo base_url('dist/scripts/bootstrap.js'); ?>"></script>
<script src="<?php echo base_url('src/scripts/formValidation.js'); ?>"></script>
<script src="<?php echo base_url('src/scripts/framework/bootstrap.js'); ?>"></script>
<script src="<?php echo base_url('src/scripts/mandatoryIcon.js'); ?>"></script>
<script src="<?php echo base_url(); ?>bower_components/tinymce/tinymce.js"></script>
<script src="<?php echo base_url('dist/scripts/main.js'); ?>"></script>
<script src="<?php echo base_url('dist/scripts/custom.js'); ?>"></script>





</body>
</html>






