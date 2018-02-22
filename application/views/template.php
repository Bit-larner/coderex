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
        <title><?php echo strip_tags($metaTitle); ?></title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="keywords" content="DGDP,Directorate General of Defense Purchase">
        <meta name="description" content="Directorate General of Defense Purchase">
        <link rel="shortcut icon" href="<?php echo base_url(); ?>dist/img/favicon.ico" type="image/vnd.microsoft.icon"/>
        <?php $this->load->view("layouts/main/header"); ?>
    </head>
    <body>
        <!--[if lt IE 8]>
        <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade
            your browser</a> to improve your experience.</div>
        <![endif]-->
        <?php $this->load->view("layouts/main/navigation"); ?>
        <div id="wrapper">
            <!-- Sidebar -->
            <?php $this->load->view("layouts/main/sidebar"); ?>
            <!-- /#sidebar-wrapper -->
            <ul class="ttw-notification-menu">
                <li id="projects" class="notification-menu-item first-item" data-url="<?php echo base_url('Dashboard/notifications'); ?>"><a href="#">Tenders <span
                            class="label label-danger">12</span></a></li>
                <li id="tasks" class="notification-menu-item" data-url="<?php echo base_url('Dashboard/notificationsTender'); ?>"><a href="#">Notice <span class="label label-danger">10</span></a></li>
                <li id="messages" class="notification-menu-item" data-url="<?php echo base_url('Dashboard/notificationsMessage'); ?>"><a href="#">Messages <span class="label label-danger">1</span></a>
                </li>
                <li id="clients" class="notification-menu-item last-item" data-url="<?php echo base_url('Dashboard/notificationsdWarning'); ?>"><a href="#">Warnings <span class="label label-danger">2</span></a>
                </li>
            </ul>
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
            <!-- Page Content -->
            <div id="page-content-wrapper">
                <div class="container-fluid">

                    <!--  end flash message  -->

                    <?php echo $content ?>
                    <div id="reportShowArea" class="row"></div>
                    <!--   RIGHT SIDE MENU START HERE     -->

                    <!--   RIGHT SIDE MENU END HERE     -->

                    <div class="modal fade" id="showDetaildModal" data-backdrop="static">
                        <div id="modalSize" class="modal-dialog">
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
            
            
            $(document).on("click", "button.submitApprove", function (e) {
                 var txt;
                var r = confirm("Are You Sure ?");
                if (r == true) {
                    txt = "You pressed OK!";
                } else {
                    return false;
                }
              
            });
            
            
            
            
            
            $(document).ready(function () {

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
                 

                    var modal_size = $(this).attr('data-modal-size');

                    if ( modal_size!=='' && typeof modal_size !== typeof undefined && modal_size !== false ) {
                        $("#modalSize").addClass(modal_size);
                    }
                    else{
                        $("#modalSize").addClass('modal-lg');
                    }


                    var title = $(this).attr('title');
                    $("#showDetaildModalTile").text(title);

                    var data_title = $(this).attr('data-original-title');
                    $("#showDetaildModalTile").text(data_title);

                    $.ajax({
                        type: "GET",
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


                // CRUD delete globally

                $(document).on("click", "a.ajaxDelete", function (e) {

                    var result = confirm("Want to delete?");

                    if (result == true) {

                        var url = $(this).attr('href');

                        var removeRow = $(this).parent().parent();

                        $.ajax({
                            url: url,
                            type: 'GET',
                            dataType: 'JSON',
                            success: function (data) {

                                $("#resultNotification").html(data.msg);
                                if (data.result == 'success') {
                                    removeRow.remove();
                                }
                            }
                        });
                    }

                    e.preventDefault();

                });

                // CRUD delete globally

                // BOOTSTRAP SIDE MENU
                $('#side_menu_right').BootSideMenu({side: "right"});

                // POPOPER MENU START
                $('*[data-poload]').click(function () {
                    var e = $(this);
                    e.off('hover');
                    $.get(e.data('poload'), function (d) {
                        e.popover({content: d}).popover('show');
                    });
                });
                // qTip2
//                $('.tender_groups').each(function () {
//                    $(this).qtip({ // Grab all elements with a non-blank data-tooltip attr.
//                        content: {
//                            title: {
//                                text: 'About me',
//                                button: 'Close'
//                            },
//                            ajax: {
//                                url: $(this).attr('data-url')
//                            }
//                        },
//                        position: {
//                            my: 'right top',  // Position my top left...
//                            at: 'left center' // at the bottom right of..
//                        },
//                        style: {
//                            classes: 'qtip-tipped'
//                        },
//                        show: {
//                            solo: true
//                        },
//                        hide: false // Don't hide on any event except close button
//                    });
//                });
                $('.notification-menu-item').each(function () {
                    $(this).qtip({ // Grab all elements with a non-blank data-tooltip attr.
                        content: {
                            title: {
                                text: 'About me',
                                button: 'Close'
                            },
                            ajax: {
                                url: $(this).attr('data-url')
                            }
                        },
                        position: {
                            my: 'top left',  // Position my top left...
                            at: 'bottom center' // at the bottom right of..
                        },
                        style: {
                            classes: 'qtip-tipped',
                            width:300,
                            height:400
                        },
                        show: {
                            solo: true
                        },
                        hide: false // Don't hide on any event except close button
                    });
                });
                // partial modal
                $('#modalPartial').click(function () {
                    var title = $(this).attr('data-title');
                    $("#partialModalLabel").text(title);
                });

<?php
$jsCode = $this->util->getJsCode();
if (!empty($jsCode)) {
    echo $this->util->getJsCode();
}
?>


    })
    ;
        </script>



      
    </body>
</html>