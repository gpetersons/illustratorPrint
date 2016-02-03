#target illustrator

var docRef = activeDocument;
var localPrintPreset = "Custom";

var localPrintOptions = new PrintOptions();
localPrintOptions.printPreset = localPrintPreset;
var myJobOptions = new PrintJobOptions();

var res =
	"dialog {properties: {borderless: false, closeButton: true}, text: 'Print:',\
		txtDaudzums: EditText {text: '1', justify: 'center', preferredSize: [170,30]}, \
		buttons: Group { orientation: 'row', alignment: 'center', \
			okBtn: Button { text:'Ok', properties:{name:'ok'} }, \
			cancelBtn: Button { text:'Cancel', properties:{name:'cancel'} } \
		} \
	} \
}";

win = new Window(res);
win.txtDaudzums.active = true;

win.buttons.okBtn.onClick = function(){
	doPrint();
	win.close();
}

win.center();
win.show();

function doPrint(){
	var tmpDaudz=win.txtDaudzums.text;
	printDialogCount = Math.ceil(tmpDaudz/999);

	for (i = 0; i<printDialogCount; i++){
		if (tmpDaudz <999){
			myJobOptions.copies = tmpDaudz; 
			localPrintOptions.jobOptions = myJobOptions;  
			docRef.print(localPrintOptions); 
		} else {
			myJobOptions.copies = 999; 
			localPrintOptions.jobOptions = myJobOptions;  
			docRef.print(localPrintOptions); 
			tmpDaudz = tmpDaudz - 999; 
		}
	}
}
