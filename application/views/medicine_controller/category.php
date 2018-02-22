<div class="row">
    <div class="col-md-12">
        <div class="row table-bordered">
            <div class="col-md-12 text-center">
                I = Insert , V = View , U = Update , D = Delete , S = Status .
            </div>
        </div>
        <div class="panel panel-base">
            <div class="panel-heading">
                <div class="row">
                    <div class="col-md-11 col-sm-10 col-xs-8">
                        <h3 class="panel-title"><?php echo $this->lang->line('all_module_links'); ?></h3>
                    </div>
                    <div class="col-md-1 col-sm-2 col-xs-4">
                        <a type="button" class="modalLink btn btn-primary btn-xs"  title="<?php echo $this->lang->line('create_module_link'); ?>" href="<?php echo site_url("medicineSetup/create_categoryModuleLink"); ?>">
                            <i class="glyphicon glyphicon-plus"></i>
                        </a>
                    </div>
                </div>
                <span class="pull-right clickable">
                    <i class="glyphicon glyphicon-chevron-up"></i>
                </span>
            </div>

        </div>
    </div>
</div>