<!-- start modal partial -->

<div class="modal fade" class="partialModal" tabindex="-1" role="dialog" aria-labelledby="partialModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="partialModalLabel">Modal title</h4>
            </div>
            <div class="modal-body">

                <?php
                if(!empty($form)){
                    $this->load->view($form);
                }else{
                    echo 'Form not found';
                }
                ?>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>

<!-- end modal partial -->