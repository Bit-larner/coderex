/**
 * Projet Name : Dynamic Form Processing with PHP
 * URL: http://techstream.org/Web-Development/PHP/Dynamic-Form-Processing-with-PHP
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2013, Tech Stream
 * http://techstream.org
 */

function addRow(dataTable) {
	var table = document.getElementById(dataTable);
	var rowCount = table.rows.length;
	if(rowCount < 5){							// limit the user from creating fields more than your limits
		var row = table.insertRow(rowCount);
		var colCount = table.rows[0].cells.length;
		for(var i=0; i<colCount; i++) {
			var newcell = row.insertCell(i);
			newcell.innerHTML = table.rows[0].cells[i].innerHTML;
		}
	}else{
		 alert("Maximum Passenger per ticket is 5.");
			   
	}
}

// function editRow(tableID) {
//     $("#dataTable").show();
// 	alert("shad");
// 	var table = document.getElementById(tableID);
// 	var rowCount = table.rows.length;
// 	if(rowCount < 5){							// limit the user from creating fields more than your limits
// 		var row = table.insertRow(rowCount);
// 		var colCount = table.rows[0].cells.length;
// 		for(var i=0; i<colCount; i++) {
// 			var newcell = row.insertCell(i);
// 			newcell.innerHTML = table.rows[0].cells[i].innerHTML;
// 		}
// 	}else{
// 		 alert("Maximum Passenger per ticket is 5.");
//
// 	}
// }

// function editRow(dataTable) {
//     //$(function(){
// //	$("#dataTable").show();
//     //});
// 	var table = $("#dataTable").show();
//
// 	var rowCount = $("#dataTable tr").length;
// 	//alert(rowCount)
// 	if(rowCount < 5){							// limit the user from creating fields more than your limits
// 		//var row = table.insertRow(rowCount);
// 		var row = $("#dataTable").append('<tr>\n' +
//             '        <td><input type="checkbox"  name="chk[]" checked="checked" /></td>\n' +
//             '\n' +
//             '        <td>\n' +
//             '            <select class="form-control" id="" name="TYPE_ID[]">\n' +
//             '                <option value="">select</option>\n' +
//             '                <?php foreach ($medicineType as $mt) {\n' +
//             '                    echo "<option value=\'$mt->TYPE_ID\'>$mt->TYPE_NAME</option>";\n' +
//             '                } ?>\n' +
//             '            </select>\n' +
//             '        </td>\n' +
//             '\n' +
//             '\n' +
//             '        <td>\n' +
//             '            <input type="text" name="STRENGTH[]" class="form-control"/>\n' +
//             '        </td>\n' +
//             '\n' +
//             '        <td>\n' +
//             '\n' +
//             '            <select class="form-control" id="" name="UOM_ID[]">\n' +
//             '                <option value="">select</option>\n' +
//             '                <?php foreach ($uom as $u) {\n' +
//             '                    echo "<option value=\'$u->UOM_ID\'>$u->UOM_NAME</option>";\n' +
//             '                } ?>\n' +
//             '            </select>\n' +
//             '        </td>\n' +
//             '\n' +
//             '        <td>\n' +
//             '            <input type="file" class="form-control" id="upload[]" name="upload[]" multiple/>\n' +
//             '        </td>\n' +
//             '\n' +
//             '        <td>\n' +
//             '            <input type="file" class="form-control" id="userfiles[]" name="userfiles[]" multiple/>\n' +
//             '\n' +
//             '        </td>\n' +
//             '\n' +
//             '\n' +
//             '\n' +
//             '    </tr>');
// 		//console.cog(row);
// 		// var colCount = table.rows[0].cells.length;
// 		// for(var i=0; i<colCount; i++) {
// 		// 	var newcell = row.insertCell(i);
// 		// 	newcell.innerHTML = table.rows[0].cells[i].innerHTML;
// 		// }
// 	}else{
// 		 alert("Maximum Passenger per ticket is 5.");
//
// 	}
//
//
// }




function deleteRow(tableID) {
	var table = document.getElementById(tableID);
	var rowCount = table.rows.length;
	for(var i=0; i<rowCount; i++) {
		var row = table.rows[i];
		var chkbox = row.cells[0].childNodes[0];
		if(null != chkbox && true == chkbox.checked) {
			if(rowCount <= 1) { 						// limit the user from removing all the fields
				alert("Cannot Remove all the Passenger.");
				break;
			}
			table.deleteRow(i);
			rowCount--;
			i--;
		}
	}
}