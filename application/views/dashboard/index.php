




<div class="row">
    <!--                <div class="col-lg-12">-->
    <!--                    <h2 class="line-behind-text"><span>-->
    <?php //echo $pageTitle; ?><!--</span></h2>-->
    <div class="col-md-7 padding0">
        <h5 class="list-group-item-heading"><i class="fa fa-asterisk"></i> My Score</h5>

        <div class="col-md-4 alert alert-success margin-right5">Achievements <i
                class="fa fa-arrow-right"></i> 50%
        </div>
        <div class="col-md-4 alert alert-danger margin-right5">Failure <i class="fa fa-arrow-right"></i> 50%
        </div>
        <div class="col-md-3 alert alert-info">Status <i class="fa fa-arrow-right"></i> 50%</div>
        <div class="col-md-8 padding0"></div>
    </div>
    <div class="col-md-5 padding0">
        <h5 class="list-group-item-heading"><i class="fa fa-check-square"></i> My Enlistments</h5>

        <div class="list-group">
            <div class="list-group-item">
                <div><a href="#" class="list-group-item-text">1. Z-1 Spare Parts for Repeater (
                        <small class="text-warning"><em>Contract started on: Saturday 18th March, 2016</em>
                        </small>
                        )</a></div>
                <div><a href="#" class="list-group-item-text">2. Various Type Berets and Others (
                        <small class="text-warning"><em>Contract started on: Sunday 9th February, 2015</em>
                        </small>
                        )</a></div>
                <div><a href="#" class="list-group-item-text">3. Drawers Cotton Knitted (
                        <small class="text-warning"><em>Contract started on: Wednesday 2nd November,
                                2016</em></small>
                        )</a></div>
            </div>
        </div>
        <h5 class="list-group-item-heading"><i class="fa fa-square-o"></i> Enlistment Groups</h5>

        <div class="list-group">
            <div class="list-group-item">
                <div><a href="#" class="list-group-item-text tender_groups"
                        data-url="<?php echo base_url('Tender/tendersByGroup'); ?>"><strong>Group1:</strong>
                        Mechanical Transport,
                        all spares and
                        battery</a> <img src="<?php echo base_url(); ?>dist/img/new_icon.gif"></div>
                <div><a href="#" class="list-group-item-text tender_groups"
                        data-url="<?php echo base_url('Tender/tendersByGroup'); ?>"><strong>Group2:</strong>
                        Signal, Electronics,
                        Electrical Equipment
                        and spares thereof</a></div>
                <div><a href="#" class="list-group-item-text tender_groups"
                        data-url="<?php echo base_url('Tender/tendersByGroup'); ?>"><strong>Group3:</strong>
                        Medicine,
                        Electro-medical Equipment
                        including related Instruments</a></div>
                <div><a href="#" class="list-group-item-text tender_groups"
                        data-url="<?php echo base_url('Tender/tendersByGroup'); ?>"><strong>Group4:</strong>
                        Armament, Ammunition
                        and Explosives</a> <img src="<?php echo base_url(); ?>dist/img/new_icon.gif"></div>

                <div><a href="#" class="list-group-item-text tender_groups"
                        data-url="<?php echo base_url('Tender/tendersByGroup'); ?>"><strong>Group5:</strong>
                        Clothing, Barrack
                        Items, Tents & Field
                        Items, Hospital and related items.</a></div>
                <div><a href="#" class="list-group-item-text tender_groups"
                        data-url="<?php echo base_url('Tender/tendersByGroup'); ?>"><strong>Group6:</strong>
                        Factory,
                        Workshops and Testing
                        Equipment</a></div>
                <div><a href="#" class="list-group-item-text tender_groups"
                        data-url="<?php echo base_url('Tender/tendersByGroup'); ?>"><strong>Group7:</strong>
                        Food, Fodder,
                        Hygiene & Chemicals including
                        all ASC items</a> <img src="<?php echo base_url(); ?>dist/img/new_icon.gif"></div>

                <div><a href="#" class="list-group-item-text tender_groups"
                        data-url="<?php echo base_url('Tender/tendersByGroup'); ?>"><strong>Group8:</strong>
                        All machineries and
                        Ground Equipment</a></div>
                <div><a href="#" class="list-group-item-text tender_groups"
                        data-url="<?php echo base_url('Tender/tendersByGroup'); ?>"><strong>Group9:</strong>
                        Stationery, Office
                        Equipment, Photographic Materials etc</a></div>
                <div><a href="#" class="list-group-item-text tender_groups"
                        data-url="<?php echo base_url('Tender/tendersByGroup'); ?>"><strong>Group10:</strong>
                        Aircraft,
                        Helicopter, Naval Vessels and spares thereof</a></div>
                <div><a href="#" class="list-group-item-text tender_groups"
                        data-url="<?php echo base_url('Tender/tendersByGroup'); ?>"><strong>Group11:</strong>
                        Construction
                        material including raw materials, iron mongers, General Engineering</a></div>
                <div><a href="#" class="list-group-item-text tender_groups"
                        data-url="<?php echo base_url('Tender/tendersByGroup'); ?>"><strong>Group12:</strong>
                        Paints, Chemicals
                        other then hygiene, Packing materials</a></div>
            </div>
        </div>
    </div>
</div>
</div>

<!--  flash message  -->
<div class="row">
    <div class="col-md-12">

        <?php if ($this->session->flashdata('success')): ?>
            <div class="alert alert-success"
                 role="alert"><?php echo $this->session->flashdata('success'); ?></div>
             <?php endif; ?>

        <?php if ($this->session->flashdata('error')): ?>
            <div class="alert alert-danger"
                 role="alert"><?php echo $this->session->flashdata('error'); ?></div>
             <?php endif; ?>

    </div>
</div>