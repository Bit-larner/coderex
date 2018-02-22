<table id="" class="table table-striped table-bordered" width="100%" cellspacing="0">
    <tr>
        <th width="50%">Department Name</th>
        <td><?php echo $sppDetails->MEDICINE_NAME; ?></td>
    </tr>
    <tr>
        <th>Product name</th>
        <td><?php echo $sppDetails->SPECIAL_NAME; ?></td>
    </tr>
    <tr>
        <th>Product Desc</th>
        <td><?php echo $sppDetails->SPECIAL_DESC; ?></td>
    </tr>
    <tr>
        <th>Sub Tittle</th>
        <td><?php echo $sppDetails->SUB_TITTLE; ?></td>
    </tr>
    <tr>
        <th width="50%">Image</th>
        <td>
            <img class="center-block img-responsive"
                 src="<?php echo base_url(); ?>/<?php echo $sppDetails->INSERT_FILES; ?>" style="width:200px;"/>
        </td>
      

    </tr>

</table>