<?php


//$fieldsName         = array('MODULE_NAME','SHORT_NAME','MODULE_NAME_BN','SL_NO');
$fieldsName         = array('MODULE_NAME','SHORT_NAME','MODULE_NAME_BN','SL_NO',array('type' => 'alt','field_name' => 'ACTIVE_STATUS','value' => array('Inactive', 'Active')));

$newFieldsArray = array();
foreach($fieldsName as $fields){

    if(is_array($fields)){
        $newFieldsArray[] = $fields['field_name'];
        //echo '<pre>'.print_r($fields['field_name'],1).'</pre>';
    }
    else{
        $newFieldsArray[] = $fields;
    }
}
//echo '<pre>'.print_r($newFieldsArray,1).'</pre>';


//$sqlPartial = 'SELECT sa_modules.MODULE_ID, sa_module_links.LINK_ID, sa_modules.MODULE_NAME, sa_module_links.LINK_NAME  FROM sa_modules JOIN sa_module_links ON sa_module_links.MODULE_ID = sa_modules.MODULE_ID';



$query = $this->db->query('SELECT sa_modules.MODULE_ID, sa_module_links.LINK_ID, sa_modules.MODULE_NAME, sa_module_links.LINK_NAME  FROM sa_modules JOIN sa_module_links ON sa_module_links.MODULE_ID = sa_modules.MODULE_ID');

foreach ($query->result_array() as $row)
{

    //$this->util->arrayDump($row);
    /*$dataTableRecords[] = array(
        $row['actor_id'],
        $row['first_name'],
        $row['film_id'],
        $row['title']);*/

}


?>

<div id="resultNotification"></div>

<div class="row">

    <div class="col-md-12">

        <div class="panel panel-base">
            <div class="panel-heading">
                <div class="row">
                    <div class="col-md-11 col-sm-10 col-xs-8">
                        <h3 class="panel-title">Basic CRUD</h3>
                    </div>
                    <div class="col-md-1 col-sm-2 col-xs-4">
                        <a type="button" class="modalLink btn btn-primary btn-xs"  title="Create Module" data-tooltip="tooltip" data-placement="top" href="<?php echo site_url("CRUD/crudCreate"); ?>">
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
                        <th>MODULE NAME</th>
                        <th>SHORT NAME</th>
                        <th>MODULE NAME_BN</th>
                        <th>SL NO</th>
                        <th>STATUS</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tfoot>
                    <tr>
                        <th>MODULE NAME</th>
                        <th>SHORT NAME</th>
                        <th>MODULE NAME_BN</th>
                        <th>SL NO</th>
                        <th>STATUS</th>
                        <th>Action</th>
                    </tr>
                    </tfoot>
                </table>

            </div>
        </div>

    </div>

</div>

<a class="text-danger ajaxDelete" title="Remove Module" data-placement="top" data-tooltip="tooltip" type="button" href="http://dgdp-app.dev/Indent/indentRemove/10">
    <span class="glyphicon glyphicon-trash"></span>
</a>

<script type="text/javascript">

    $(document).ready(function() {


        var table = $('#dtsp').DataTable( {
            "processing": true,
            "serverSide": true,
            "ajax": {
                "url": "crud/ajaxCrudIndex",
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

                            alert(data);
                            $("#validationResult").html(data.msg);

                            if(data.result=='success'){
                                table.ajax.reload();
                            }


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