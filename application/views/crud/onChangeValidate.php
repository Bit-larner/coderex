
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

                <!-- form start -->
                <form class="amMainForm form-horizontal">

                    <div class="form-group">
                        <label class="col-sm-3 control-label">Checkbox</label>

                        <div class="col-sm-6">
                            <div class="checkbox checkbox-primary">
                                <input id="clickme" class="styled" type="checkbox" name="checkbox" />
                                <label>
                                    Default
                                </label>
                            </div>
                        </div>

                    </div>

                    <div class="form-group" id="first_name">
                        <label class="col-sm-3 control-label">First Name</label>
                        <a class="help-icon" data-container="body" data-toggle="popover" data-placement="right" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus.">
                            <i class="fa fa-question-circle"></i>
                        </a>
                        <div class="col-sm-6">
                            <input type="text" class="form-control" name="first_name" placeholder="First Name" required>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="col-sm-3 control-label">Last Name</label>
                        <a class="help-icon" data-container="body" data-toggle="popover" data-placement="right" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus. Vivamus sagittis lacus vel augue laoreet rutrum faucibus. Vivamus sagittis lacus vel augue laoreet rutrum faucibus. Vivamus sagittis lacus vel augue laoreet rutrum faucibus.">
                            <i class="fa fa-question-circle"></i>
                        </a>

                        <div class="col-sm-6">
                            <input type="text" class="form-control" name="last_name" placeholder="Last Name" required>
                        </div>
                    </div>

                    <div class="form-group">
                        <div class="col-sm-offset-2">
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </div>
                    </div>

                </form><!-- form end -->

            </div>
        </div>

    </div>

</div>



<script type="text/javascript">

    $(document).ready(function() {

        $('#clickme').click(function(){

            $("#first_name").toggle();
            $('.amMainForm').formValidation('enableFieldValidators', 'first_name', false);
            // Enable the validators of email field
            $('.amMainForm').formValidation('resetField', 'first_name');

        });
    } );

</script>