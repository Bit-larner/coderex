<style>
    table.custom tr th{
        width:25%;
    }
</style>


<table id="datatable" class="table table-striped table-bordered custom" width="100%" cellspacing="0">
    <tr>
        <th><?php echo $this->lang->line('name');?></th>
        <td><?php echo $viewdetails->TEMPL_NAME ?></td>
    </tr>

    <tr>
        <th><?php echo $this->lang->line('subject');?></th>
        <td><?php echo $viewdetails->TEMPL_SUBJECT ;?></td>
    </tr>
    <tr>
        <th><?php echo $this->lang->line('category');?></th>
        <td>
            <?php
                                        if($viewdetails->TEMPL_CAT=='E')
                                        {
                                            echo "Email";
                                        }
                                        else
                                        {
                                            echo "Letter";
                                        }
                                    ?>
        </td>
    </tr>
    <tr>
        <th><?php echo $this->lang->line('type');?></th>
        <td>
             <?php
                                        if($viewdetails->TEMPL_TYPE=='G')
                                        {
                                            echo "Global";
                                        }
                                        else
                                        {
                                            echo "Individual";
                                        }
                                    ?>
        </td>
    </tr>
    <tr>
        <th><?php echo $this->lang->line('workflow');?></th>
        <td><?php echo $viewdetails->WF_NAME ;?></td>
    </tr>
    <tr>
        <th><?php echo $this->lang->line('status');?></th>
        <td>
            <?php echo ($viewdetails->ACTIVE_FLAG == 1)
                                                    ? '<span class="btn btn-xs btn-success waves-effect waves-button">Active</span>'
                                                    : '<span class="btn btn-xs btn-danger waves-effect waves-button waves-float">Inactive</span>'; ?>
        </td>
    </tr>
    <tr>
        <th><?php echo $this->lang->line('body');?></th>
        <td><?php echo $viewdetails->TEMPL_BODY ;?></td>
    </tr>
</table>