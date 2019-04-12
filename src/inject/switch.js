var commandState = false;
chrome.extension.sendMessage({}, function(response) {

	var readyStateCheckInterval = setInterval(function() {
		if (document.readyState === "complete") {
			clearInterval(readyStateCheckInterval);
			$(document).keydown(function(e) {
				console.log(commandState);
				if (e.which == 17 && !commandState) {
					commandState = true;

				}
				if (commandState) {
					event.preventDefault();
					switch (e.which) {
                        	//TODO change to corrrect letter
                        	case 84:
                        	chrome.runtime.sendMessage({command: "switch"}, function(response) {
                        		
                        	});
                        	break;
                        }
                    }
                    if (e.which !== 17 && commandState) {
                    	commandState = false;
                    }
                });
		}
	}, 10);
});

