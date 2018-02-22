<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');


class Mpdf_gen {

    public function __construct() {
        $this->CI = & get_instance();
        require_once 'mpdf/mpdf.php';
    }

    public function gen_pdf($html, $paper = 'A4') {
        $mpdf = new mPDF('utf-8', $paper);
        $mpdf->mirrorMargins = 1;
        $mpdf->SetWatermarkImage('dist/img/dgdp_logo.png');
        $mpdf->showWatermarkImage = true;
        $mpdf->watermarkImageAlpha = 0.1;
        $mpdf->WriteHTML($html);
        $fileName = date('Y_m_d_H_i_s');
        $mpdf->Output('DGDP_' . $fileName . '.pdf', 'I');
    }

    public function gen_item_pdf($html, $paper = 'A4') {
        $mpdf = new mPDF('utf-8', $paper, '', '', 15, 15, 30, 20, 5, 5, 'L');
        $mpdf->mirrorMargins = 1; // Use different Odd/Even headers and footers and mirror margins

        $header = '<div style="width:100%; color: #000088; border-bottom: 1px solid #e3e3e3 !important;"><div style="float:left; width: 30%;"><img style=" width:60px; height:60px;" src="dist/img/logo_dgdp.png"><br/><p style="margin-left:10px !important; margin-top:-2px !important; font-weight:bold;">DGDP</p></div><div style="width:70%; float: right; text-align: right; padding-top: 18px !important; font-size:18px;" ></div></div>';
        $footer = '<table style="width: 100%;">
					<tbody>
						<tr>
							<td style="width: 33%; font-family: sans-serif; font-size: 7pt; font-style: italic;">DGDP e-dp System</td>
							<td style="width: 66%; font-family: sans; font-size: 12pt; font-style: italic; font-weight: bold;text-align: right;">- {PAGENO}/{nb} -</td>
							
						</tr>
					</tbody>
				</table>';
        
        $mpdf->SetHTMLHeader($header);
        $mpdf->SetHTMLFooter($footer);
        $mpdf->SetWatermarkText('', 0.1);
        $mpdf->showWatermarkText = true;
        $mpdf->WriteHTML($html);
        $fileName = date('Y_m_d_H_i_s');
        $mpdf->Output('FileName_' . $fileName . '.pdf', 'I');
    }
    
    public function gen_item_specs_pdf($html, $nomenclature_name, $paper = 'A4') {
        
        $mpdf = new mPDF('utf-8', $paper, '', '', 15, 15, 30, 20, 5, 5, 'L');
        $mpdf->mirrorMargins = 1; // Use different Odd/Even headers and footers and mirror margins

       
        $header = '<div style="width:100%; color: #000088; border-bottom: 1px solid #e3e3e3 !important;"><div style="float:left; width: 30%;"><img style=" width:60px; height:60px;" src="dist/img/logo_dgdp.png"><br/><p style="margin-left:10px !important; margin-top:-2px !important; font-weight:bold;">DGDP</p></div><div style="width:70%; float: right; text-align: right; padding-top: 18px !important; font-size:18px;" ></div></div>';
        //$body = 'asdasdasd'; 
       
        $footer = '<table style="width: 100%;">
					<tbody>
						<tr>
							<td style="width: 33%; font-family: sans-serif; font-size: 7pt; font-style: italic;">DGDP e-dp System</td>
							<td style="width: 66%; font-family: sans; font-size: 12pt; font-style: italic; font-weight: bold;text-align: right;">- {PAGENO}/{nb} -</td>
							
						</tr>
					</tbody>
				</table>';
        
        $mpdf->SetHTMLHeader($header);
        $mpdf->SetHTMLFooter($footer);
        $mpdf->SetWatermarkText('', 0.1);
        $mpdf->showWatermarkText = true;
        $mpdf->WriteHTML($html);
        $mpdf->SetTitle($nomenclature_name);
        $fileName = date('Y_m_d_H_i_s');
        $mpdf->Output('FileName_' . $fileName . '.pdf', 'I');
    }

}
