<!doctype html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang=""> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8" lang=""> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9" lang=""> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang=""> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title><?php echo $metaTitle; ?></title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="keywords" content="DGDP,Directorate General of Defense Purchase">
        <meta name="description" content="Directorate General of Defense Purchase">
        <link rel="shortcut icon" href="<?php echo base_url(); ?>dist/img/favicon.ico" type="image/vnd.microsoft.icon" />
        <link href="<?php echo base_url(); ?>dist/styles/fileinput.css" type="text/css" media="screen" rel="stylesheet" />

        <?php $this->load->view("layouts/main/header"); ?>
        <style type="text/css">
            .social_icn
            {
                color:#fff;
                font-size:20px;
                padding:5px 10px;
                border-radius:5px;

            }

            small.sm_red{color:red !important;}
            .social_bg_blank{background:none; border:0px solid #00a84e;}
            .social_bg_g{background:#00a84e}
            .social_bg_y{background:#400090}
            .social_color_y{color:#400090}
            .social_bg_h{background:none;color:#000; border:0px solid #f57f20;font-weight:bold;}
            .social_icn:hover{color:red;text-decoration:none;}
            #country_code .bootstrap-select{width: 115px;}
            #country_code .bootstrap-select button{padding:0 5px;}
            .bootstrap-select .bs-searchbox::before {left: -2px !important; top: -7px !important;}
            .alert{color: #3c763d;}
            html:not(.ie9) .select:before {
                background-color: inherit !important;
                background-position: right calc(100% - 0px) !important;
            }

            .display_none{display:none;}

            input.uppercase {
                text-transform: uppercase;
            }
            input.lowercase {
                text-transform: lowercase;
            }

            .align-left{text-align: left;}
            table tr th{text-align: center;}
            table tr td{padding: 5px;}
            .align-right{text-align: right;}
            .info_table tr th{text-align: right;}
            #accordion .panel .panel-heading{background: #556a2f; color: #fff;}
            #accordion .panel .panel-heading .panel-title a{color: #fff; font-weight: bold; text-decoration: none; cursor: pointer;}
            .form-group table.table {
                float: left;
                margin: 20px 16px;
                width: 97%;
            }
            .submit_area{margin:0 15px 15px 0;}
            .submit_area button, .submit_area input{font-weight: bold; font-size: 13px;}
            a:focus{outline: none;}
        </style>
    </head>
    <body>
        <!--[if lt IE 8]>
        <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->
        <?php $this->load->view("layouts/main/navigation"); ?>
        <div id="wrapper">
            <!-- Sidebar -->
            <div id="sidebar-wrapper">
                <ul id="sidebar-menu" class="sidebar-menu">
                    <li data-toggle="collapse" data-target="#dashboard" class="collapsed">
                        <a href="#"><i class="fa fa-tachometer fa-lg"></i> Dashboard</a>
                    </li>
                    <li data-toggle="collapse" data-target="#applicant" class="collapsed active" aria-expanded="true">
                        <a href="#"><i class="fa fa-group fa-lg"></i> Applicant <span class="arrow"></span></a>
                    </li>
                    <ul class="sub-menu collapse" id="applicant">
                        <li>
                            <a href="<?php echo site_url('applicant/application_form_details'); ?>"><i class="fa fa-angle-right"></i> Enter Details</a>
                        </li>
                        <li>
                            <a href="<?php echo site_url('applicant/pay_registration_fees'); ?>"><i class="fa fa-angle-right"></i> Pay Registration Fee</a>
                        </li>

                    </ul>
                </ul>
            </div>
            <!-- /#sidebar-wrapper -->

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
                        <div class="modal-dialog">
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
                    $this->load->view('layouts/main/partialModal', $modalForm);
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

                // dynamic modal
                $(document).on("click", ".modalLink", function (e) {
                    var title = $(this).attr('title');
                    $("#showDetaildModalTile").text(title);
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
if (!empty($jsCode)) {
    echo $this->util->getJsCode();
}
?>
});
        </script>



    </body>
</html>