<style type="text/css">
    .cursour-pointer{
        cursor: pointer;
    }
    table.inlinekbtable tbody tr {
        border: 1px solid #cfcfcf;
    }
    table.inlinekbtable tbody td {	
        border: 1px solid #999900;
        background: #FFCC00;
        padding: 0.01em 0.1em 0.01em 0.1em;
        font-weight: normal;
        font-size:1.3em;
        color: #000000;		 
        font-family: SolaimanLipi,AponaLohit,Bangla,Siyam Rupali,Likhan,Vrinda,Verdana, Helvetica, Arial, Sans-serif;
        cursor: pointer;	
        text-align: center !important;		
    }
    table.inlinekbtable tbody td:hover{
        background-color: #CCFF00 !important;
        color: #000000;
    }
    .bangla_kye{position: relative; cursor: pointer; top: 5px;}
    .ui-dialog{
        background: #535353 none repeat scroll 0 0;
        border-radius: 5px;
        display: block;
        height: 275px !important;
        overflow: hidden;
        position: relative;

        width: 435px;
        padding: 0px 0 0 0;
    }
    .ui-dialog-titlebar{cursor: all-scroll;}
    .ui-dialog-titlebar button{display: none;}
    .ui-dialog-buttonset{text-align: center;}

    #printBox{width:650px;  margin:10px auto;  font-family: verdana; padding: 10px; }
    #printTable{text-align: left; }
    #printTable tbody tr{border-bottom: 1px solid #ccc;; }
    #printTable tbody tr th{vertical-align: text-top; padding: 5px 0;border-bottom: 1px solid #ccc;}
    #printTable tbody tr td{border-bottom: 1px solid #ccc; padding: 5px 0;}
    #printTable tbody tr th,#printTable tbody tr td{ padding: 3px 5px;}
    .printBoxheader{ border-bottom: 1px solid #ccc;}
    .printBoxheader h3{margin: 0 0 0 0;}
    .printBoxBody{margin: 20px 0 0 0;}
    .col-md-3{width: 25%;}
    .col-md-9{width: 75%;}
    #buttonLink{display: none;}
    h4{ text-align: center; font-family: arial; font-weight: bold;}
</style>

<div id="printBox">
    <table style="width: 100%; border-bottom: 2px solid #666;">
        <tr>
            <td>
                <img src="<?php echo base_url(); ?>dist/img/logo_dgdp.png" style="height: 40px;" />
                <h4>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Electronic Defense Procurement System </h4>
            </td>
            <td>
        <barcode code="User Code: <?php echo $info->TYPE; ?>" type="QR" size=".5" height=".5" />
        </td>
        </tr>
    </table>
    <div class="printBoxBody col-lg-12">
        <?php
        echo $info->S_INFO_DESC;
        ?>
    </div>
</div>
