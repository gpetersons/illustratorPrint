#target illustrator

var docRef = activeDocument;
var localPrintPreset = "Custom";

var localPrintOptions = new PrintOptions();
localPrintOptions.printPreset = localPrintPreset;
var myJobOptions = new PrintJobOptions();

//Get fullPath to Script file
var thisFile = new File($.fileName);
var pathJSX = thisFile.path;

//Read  INI File
var myINIFile = new File(pathJSX+'/LastPrintCount.ini');
var openIni = myINIFile.open('e'); // 'e' read-write open file.
if (myINIFile.length == 0) {
	//Write  default INI file
	myINIFile. writeln('1');
	myINIFile.close();
	myINIFile = new File(pathJSX+'/LastPrintCount.ini');
	var openIni = myINIFile.open('e'); // 'e' read-write open file.
}

if (!openIni){
	var LastPrintCount = '1';
} else {
	var LastPrintCount = myINIFile. readln();
	myINIFile.close();
}

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
win.txtDaudzums.text = LastPrintCount;
win.txtDaudzums.active = true;

win.buttons.okBtn.onClick = function(){
	writeINI(win.txtDaudzums.text)
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

function writeINI(LastPrintCount){
	myINIFile = new File(pathJSX+'/LastPrintCount.ini');
	myINIFile.open('e'); // 'e' read-write open file.
	myINIFile. writeln(LastPrintCount);
	myINIFile.close();
}
