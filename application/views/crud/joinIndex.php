<div class="row">

    <div class="col-md-12">

        <div class="panel panel-base">
            <div class="panel-heading">
                <div class="row">
                    <div class="col-md-11 col-sm-10 col-xs-8">
                        <h3 class="panel-title">Basic Form with Validation</h3>
                    </div>
                    <div class="col-md-1 col-sm-2 col-xs-4">
                        <a type="button" class="modalLink btn btn-primary btn-xs"  title="Create Module" href="<?php echo site_url("CRUD/crudCreate/?id=1"); ?>">
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
                            <th>Module ID</th>
                            <th>Module Name</th>
                            <th>Module Link ID</th>
                            <th>Module Link Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tfoot>
                        <tr>
                            <th>Module ID</th>
                            <th>Module Name</th>
                            <th>Module Link ID</th>
                            <th>Module Link Name</th>
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
        $('#dtsp').DataTable( {
            "processing": true,
            "serverSide": true,
            "ajax": {
                "url": "ajaxCrudJoinIndex",
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
    } );

</script>