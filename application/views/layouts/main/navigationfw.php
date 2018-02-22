<nav class="navbar navbar-side navbar-fullwidth navbar-fixed-top">
    <div class="container-fluid">
        <div class="navbar-header">
            <a class="navbar-brand" href="<?php  echo base_url(); ?>">DGDP e-DP</a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">

            <!-- Right nav -->
            <ul class="nav navbar-nav navbar-right">
                <li class="lang_icon">
                    <a href="<?php echo site_url('langSwitch/switchLanguage/english'); ?>">
                        <img src="<?php echo base_url('/dist/img/england.png') ?>" alt="lang-bd-flag"/>
                    </a>
                </li>
                <li class="lang_icon">
                    <a href="<?php echo site_url('langSwitch/switchLanguage/bangla'); ?>">
                        <img src="<?php echo base_url('/dist/img/bd.png') ?>" alt="lang-bd-flag"/>
                    </a>
                </li>
                <li><a href="<?php echo site_url('auth/logout');?>"> Sign out</a></li>
            </ul>
            <form class="navbar-form navbar-right">
                <input type="text" class="form-control" placeholder="Search...">
            </form>
        </div>
    </div>
</nav>