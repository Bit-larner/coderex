<div class="row">
    <div class="col-md-12">
        <div class="panel panel-base">
            <div class="panel-heading">
                <div class="row">
                    <div class="col-md-11 col-sm-10 col-xs-8">
                        <h3 class="panel-title"><?php echo $this->lang->line('post_office_list')?></h3>
                    </div>
                    <div class="col-md-1 col-sm-2 col-xs-4">
                        <a type="button" href="<?php echo site_url('setup/postoffice/create/'); ?>" class="btn btn-primary btn-xs modalLink"  title="<?php $this->lang->line('create_post_office')?>">
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
                            <th><?php echo $this->lang->line('sl')?></th>
                            <th><?php echo $this->lang->line('post_office')?></th>
                            <th><?php echo $this->lang->line('post_office_code')?></th>
                            <th><?php echo $this->lang->line('thana_name')?></th>
                            <th><?php echo $this->lang->line('district_name')?></th>
                            <th><?php echo $this->lang->line('action')?></th>
                        </tr>
                    </thead>
                    <tfoot>
                        <tr>
                        <th><?php echo $this->lang->line('sl')?></th>
                            <th><?php echo $this->lang->line('post_office')?></th>
                            <th><?php echo $this->lang->line('post_office_code')?></th>
                            <th><?php echo $this->lang->line('thana_name')?></th>
                            <th><?php echo $this->lang->line('district_name')?></th>
                            <th><?php echo $this->lang->line('action')?></th>
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
                "url": "postoffice/ajaxCrudJoinIndex",
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