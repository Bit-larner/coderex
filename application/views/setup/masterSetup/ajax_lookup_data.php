<?php
//echo "<pre>";
//print_r($lookup_item_data);
//exit;
$i = 1;
if (!empty($lookup_item_data)) {
    foreach ($lookup_item_data as $row) {
        ?>
        <tr>
            <td><?php echo $i++; ?></td>
            <td><?php echo $row->LOOKUP_DATA_NAME ?></td> 
            <td><?php if($USE_CHAR_NUMB->USE_CHAR_NUMB == 'N'){
                echo $row->NUMB_LOOKUP;
            }
            else{
                echo $row->CHAR_LOOKUP;
            }
                
            ?></td> 
            <td><?php echo ($row->ACTIVE_FLAG == 1) ? '<span class="btn btn-xs btn-success waves-effect waves-button waves-float">Active</span>' : '<span class="btn btn-xs btn-danger waves-effect waves-button waves-float">Inactive</span>'; ?></td>
            <td> <a  title="Edit  Group Item" href="<?php echo site_url("setup/MasterSetup/editGroupItem/" . $row->LOOKUP_DATA_ID); ?>"  class="btn btn-xs btn-info modalLink">EDIT</a></td>
        </tr>
        <?php
    }
}
?>