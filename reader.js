var textArray;

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

function updateList(){
	var fileContentDiv = document.getElementById("fileContents");
	fileContentDiv.innerHTML = "";
	var searchContent = document.getElementById("searchbox").value.toLowerCase();
	for(let i = 0; i < textArray.length; i++){
		var newVal = textArray[i];
		if(searchContent == "" || newVal.toLowerCase().includes(searchContent)){
			var newElement = document.createElement("P");
			newElement.innerHTML = "<div class = 'lineNumber'>" + i.toString().padStart(3, "0") + "</div>" + textArray[i].replace(/</g, "&lt;").replace(/>/g, "&gt;");
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