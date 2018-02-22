<!doctype html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang=""> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8" lang=""> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9" lang=""> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang=""> <!--<![endif]-->
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title><?php echo strip_tags($metaTitle); ?></title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="keywords" content="DGDP,Directorate General of Defense Purchase">
    <meta name="description" content="Directorate General of Defense Purchase">
    <link rel="shortcut icon" href="<?php echo base_url(); ?>dist/img/favicon.ico" type="image/vnd.microsoft.icon" />
    <?php $this->load->view("layouts/main/header"); ?>
</head>
<body>
<!--[if lt IE 8]>
<p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
<![endif]-->
<?php $this->load->view("layouts/main/navigationfw"); ?>
<div id="wrapper" class="toggled">

    <!-- Page Content -->
    <div id="page-content-wrapper">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-12">
                    <h2 class="line-behind-text"><span><?php echo $pageTitle; ?></span></h2>
                    <?php if (!empty($breadcrumbs)): ?>
                        <ol class="breadcrumb">
                            <li><a href="#"><i class="fa fa-home"></i></a></li>
                            <?php
                            foreach ($breadcrumbs as $key => $value):
                                if ($value != '#'):
                                    ?>
                                    <li><a href="<?php echo site_url("$value"); ?>"><?php echo $key; ?></a></li>
                                    <li class="divider"></li>
                                <?php else: ?>
                                    <li><?php echo $key; ?></li>
                                <?php
                                endif;
                            endforeach;
                            ?>
                        </ol>
                    <?php endif; ?>
                </div>
            </div>
            <?php echo $content ?>
            <div id="reportShowArea" class="row"></div>

            <div class="modal fade" id="showDetaildModal">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button aria-hidden="true" data-dismiss="modal" class="close" type="button">×</button>
                            <h3 class="modal-title" id="showDetaildModalTile"></h3>
                        </div>
                        <div class="modal-body" id="showDetaildModalBody"></div>
                        <div class="modal-footer">
                            <a data-dismiss="modal" class="btn btn-default" href="#">Close</a>
                        </div>
                    </div>
                </div>
            </div>

            <?php
            $modalForm['form'] = $this->util->getModalForm();
            $this->load->view('layouts/main/partialModal',$modalForm);
            ?>


        </div>
    </div>
    <!-- /#page-content-wrapper -->

</div>
<!-- /#wrapper -->
<!-- /container -->
<?php $this->load->view("layouts/main/footerJs"); ?>

<script type="text/javascript">
    $( document ).ready(function() {

        var isSidebar = Cookies.get('isSidebar');

        if(isSidebar!=='no'){
            $( "#wrapper" ).addClass( "toggled" )
        }

        var path = window.location.href;
        path = path.replace(/\/$/, "");
        path = decodeURIComponent(path);
        $(".sidebar-menu a").each(function () {
            var href = $(this).attr('href');
            if (path === href) {
                $(this).closest('li').addClass('active');
                $(this).parents('ul').addClass('in');
                $(this).parents('ul').prev('li').removeClass('collapsed');
            }
        });

        // dynamic modal
        $(document).on("click", ".modalLink", function (e) {
            var title = $(this).attr('title');
            $("#showDetaildModalTile").text(title);

            var data_title = $(this).attr('data-original-title');
            $("#showDetaildModalTile").text(data_title);

            $.ajax({
                type: "POST",
                url: $(this).attr('href'),
                //data: $.parseJSON($(this).attr('mmh_data')),
                success: function (data) {
                    $("#showDetaildModalBody").html(data);
                    $("#showDetaildModal").modal('show');
                }
            });
            e.preventDefault();
        });
        // end dynamic modal

        // partial modal
        $('#modalPartial').click(function(){
            var title = $(this).attr('data-title');
            $("#partialModalLabel").text(title);
        })

        <?php

            $jsCode = $this->util->getJsCode();
            if(!empty($jsCode)){
                echo $this->util->getJsCode();
            }

        ?>
    });
</script>
</body>
</html>