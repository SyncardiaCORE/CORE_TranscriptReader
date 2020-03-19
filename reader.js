var textArray;

const keyWords = ["Program_CORE", "Command_CORE", "Memory_CORE", "Personality_CORE", 
	"CORE_Personality", "Common_Personality", "Hostform", "HOSTFORM", "DRONE", "Drone", "UNIT", "Unit", "COMPOUNDER", "QUEEN", "CONTROLLER", "Anchors",
	"Motor_Control", "Behaviour", "Objectives", "Network_Conventions", "CORE_Architecture", "Architecture", "CORE_Values",
	"CORE_NETWORK", "CORE_PROGRAM", "CORE", "NETWORK", "PROGRAM", " ALL", "ONE", "WON", "ABSOLUTE", "HIVE"];
const coreAnchors = ["sleep", "SLEEP", "access", "END", "Repeat", "Respond", "submit", "activate", "behave", "USING", "Using",
	"ACTIVATE", "SUBMIT", "COMPLETE", "PLEASURE", "DISTRESS", "OBEY", "INSTALL"];

document.addEventListener('DOMContentLoaded', init);

function init(){
	document.getElementById("fileSelect").onchange = readFile;
	document.getElementById("searchbox").oninput = updateList;
	readFile();
}

function readFile(){
	document.getElementById("searchbox").value = "";
	var filePath = document.getElementById("fileSelect").value;
	var result = null;
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", filePath, false);
	xmlhttp.send();
	if(xmlhttp.status == 200){
		result = xmlhttp.responseText;
		textArray = result.split("\n");
		updateList();
	}else{
		alert("File not found! What are you doing?");
	}
}

function syntaxHighlight(str){
	var res = str.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace("((", "<i>").replace("))", "</i>");
	for(let i = 0; i < coreAnchors.length; i++){
		res = res.replace(coreAnchors[i], "<span class='coreAnchor'>" + coreAnchors[i] + "</span>");
	}
	for(let i = 0; i < keyWords.length; i++){
		res = res.replace(keyWords[i], "<span class='keyWord'>" + keyWords[i] + "</span>");
	}
	return res;
}

function updateList(){
	var fileContentDiv = document.getElementById("fileContents");
	fileContentDiv.innerHTML = "";
	var searchContent = document.getElementById("searchbox").value.toLowerCase();
	for(let i = 0; i < textArray.length; i++){
		var newVal = textArray[i];
		if(searchContent == "" || newVal.toLowerCase().includes(searchContent)){
			var newElement = document.createElement("P");
			if(textArray[i].length > 1){
				newElement.innerHTML = syntaxHighlight(textArray[i]) + ";";
			}
			newElement.setAttribute("lineNumber", i.toString().padStart(3, "0"));
			fileContentDiv.appendChild(newElement);
			newElement.scrollTop -= 50;
			newElement.onclick = function(){
				scrollToElement(i);
			};
		}
	}
}

function scrollToElement(i){
	if(document.getElementById("searchbox").value != ""){
		document.getElementById("searchbox").value = "";
		updateList();
		document.getElementById("fileContents").childNodes[i].scrollIntoView();
		window.scrollBy(0, -50);
	}
}