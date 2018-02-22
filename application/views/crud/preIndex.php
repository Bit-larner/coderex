
<div id="resultNotification"></div>

<div class="row">

    <div class="col-md-12">

        <div class="panel panel-base">
            <div class="panel-heading">
                <div class="row">
                    <div class="col-md-11 col-sm-10 col-xs-8">
                        <h3 class="panel-title">Preindent Index</h3>
                    </div>
                    <div class="col-md-1 col-sm-2 col-xs-4">
                        <a type="button" class="modalLink btn btn-primary btn-xs"  title="Create Pre Indent" data-tooltip="tooltip" data-placement="top" href="<?php echo site_url("CRUD/preCreate"); ?>">
                            <i class="glyphicon glyphicon-plus"></i>
                        </a>
                    </div>
                </div>

                <span class="pull-right clickable">
                    <i class="glyphicon glyphicon-chevron-up"></i>
                </span>
            </div>
            <div class="panel-body">

                <table id="dtsp" class="table table-striped table-bordered" cellspacing="0" width="100%">
                    <thead>
                    <tr>
                        <th>User Define Id</th>
                        <th>Date</th>
                        <th>PROC_LIST_ID</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tfoot>
                    <tr>
                        <th>User Define Id</th>
                        <th>Date</th>
                        <th>PROC_LIST_ID</th>
                        <th>Action</th>
                    </tr>
                    </tfoot>
                </table>

            </div>
        </div>

    </div>

</div>

<script type="text/javascript">

    $(document).ready(function() {


        var table = $('#dtsp').DataTable( {
            "processing": true,
            "serverSide": true,
            "ajax": {
                "url": "ajaxPreIndex",
                "type": "POST"
            },
            responsive: true,
            aoColumnDefs: [
                {
                    bSortable: false,
                    aTargets: [ -1 ]
                }
            ]
        } );


        $('#showDetaildModal').on('shown.bs.modal', function (e) {

            $('#amMainForm').formValidation()
                .on('success.form.fv', function(e) {
                    // Prevent form submission
                    e.preventDefault();

                    var $form = $(e.target),
                        fv    = $form.data('formValidation');

                    // Use Ajax to submit form data
                    $.ajax({
                        url: $form.attr('action'),
                        type: 'POST',
                        dataType:'JSON',
                        data: $form.serialize(),
                        success: function(data) {

                            $("#validationResult").html(data.msg);

//                            if(data.result=='success'){
//                                table.ajax.reload();
//                            }


                        }
                    });
                });
        });


        $( document ).on( "click", "a.delete", function(e) {

            var result = confirm("Want to delete?");

            if (result==true) {
                var url = $(this).attr('href');

                $.ajax({
                    url: url,
                    type: 'POST',
                    dataType:'JSON',
                    success: function(data) {

                        $("#resultNotification").html(data.msg);
                        if(data.result=='success'){
                            table.ajax.reload();
                        }
                    }
                });
            }

            e.preventDefault();

        });




    } );

</script>