<div id="sidebar-wrapper">
    <?php echo form_input('documentSearch', '', 'id="search_data" class="form-control" placeholder="search document" onkeyup="documentSearch()"'); ?> 
    <ul id="showDocumentInfo" class="sidebar-menu dynamicdiv">
        <li data-toggle="collapse" data-target="#dashboard" class="collapsed">
            <a href="<?php echo site_url('dashboard/index'); ?>"><i class="fa fa-tachometer fa-lg"></i> Dashboard</a>
        </li>
        <li data-toggle="collapse" data-target="#dashboard" class="collapsed">
            <a href="<?php echo site_url('Documents/createDocuments'); ?>"><i class="fa fa-tachometer fa-lg"></i> Create Documentation</a>
        </li>
        <li data-toggle="collapse" data-target="#dashboard" class="collapsed">
            <a href="<?php echo site_url('Documents/editDocuments'); ?>"><i class="fa fa-tachometer fa-lg"></i> Edit Documentation</a>
        </li>
        <?php
        $modules = $this->utilities->findAllByAttribute("sa_modules", array("ACTIVE_STATUS" => 1));
        if (!empty($modules))
            $i = 1;
        foreach ($modules as $module) {
            $links = $this->utilities->findAllByAttribute("sa_module_links", array("MODULE_ID" => $module->MODULE_ID));
            if (!empty($links)) {
                ?>
                <li data-toggle="collapse" data-target="#service_<?php echo $i; ?>" class="collapsed">
                    <a href="#"><i class="fa fa-cog fa-lg"></i><?php echo $module->MODULE_NAME; ?><span class="arrow"></span></a>
                </li>
                <ul class="sub-menu collapse" id="service_<?php echo $i; ?>">
                    <?php
                    foreach ($links as $link) {
                        $link_id = $link->LINK_ID;
                        ?>
                        <li><a href="<?php echo base_url('Documents/linkDescription') . "/" . $link_id; ?>"><i class="fa fa-angle-right"></i> <?php echo $link->LINK_NAME; ?></a></li>
                        <?php
                    }
                    ?>
                </ul>
                <?php
            }
            $i++;
        }
        ?>
    </ul>
</div>

<script type="text/javascript">
    function documentSearch() {
        var input_data = $('#search_data').val();
        if (input_data.length === 0) {            
        jQuery('.dynamicdiv').load('<?php echo base_url()?>documents/aa/');
            //window.location.href ='<?php //echo base_url('documents') ?>'
        } else {
            $.ajax({
                type: "POST",
                url: "<?php echo base_url(); ?>documents/getDocumentMenu/",
                data: {document: input_data},
                success: function(data) {
                    if (data.length > 0) {
                        $('#showDocumentInfo').html(data);
                    }
                }
            });
        }
    }
</script>

