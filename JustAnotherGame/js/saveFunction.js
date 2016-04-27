function saveDatFileBro(localstorage) {
	localstorage.root.getFile("info.txt", {create: true}, function(DatFile) {
	    DatFile.createWriter(function(DatContent) {
	    	var blob = new Blob(["Lorem Ipsum"], {type: "text/plain"});
	     	DatContent.write(blob);
	   	});
	});
}

function deleteDatFileBro(localstorage) {
	localstorage.root.getFile("info.txt", {create: false}, function(DatFile) { DatFile.remove(function() {}); })
}

function saveSession() {
	var currentSessionInfo = {
		'resources': {
			'totalGold' : resources.gold,
			'totalWood': resources.wood,
			'totalStone': resources.stone
		}
	}

	var saveInfo = JSON.stringify(currentSessionInfo);
	var textFileAsBlob = new Blob([saveInfo], {type:'text/plain'});
	//var fileNameToSaveAs = document.getElementById("inputFileNameToSaveAs").value;

	var downloadLink = document.createElement("a");
	downloadLink.download = 'fileSave';
	downloadLink.innerHTML = "lala";
	if(window.wbkitURL != null) {
		downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
	}
	else {
		downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
		downloadLink.onclick = destroyClickedElement;
		downloadLink.style.display = "none";
		document.body.appendChild(downloadLink);
	}
	downloadLink.click();
}

function destroyClickedElement(event) {
	document.body.removeChild(event.target);
}

function loadSession() {
	var fileToLoad = document.getElementById("fileToLoad").files[0];
	var fileReader = new FileReader();
	fileReader.onload = function(fileLoadedEvent) {
		var textFromFileLoaded = fileLoadedEvent.target.result;
		loadedSession = textFromFileLoaded;
	};	
	fileReader.readAsText(fileToLoad, "UTF-8");
}