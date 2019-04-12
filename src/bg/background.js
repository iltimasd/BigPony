// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });


//example of using a message handler from the inject scripts
chrome.extension.onMessage.addListener(
	function(request, sender, sendResponse) {


		console.log(sender.tab ?
			"from a content script:" + sender.tab.url :
			"from the extension");
		if (request.command == "switch")
			chrome.windows.getLastFocused(
				{populate: true},
				function(window){
					tab = window.tabs.find(x => x.url=="https://reservation.newschool.edu/wco")
					console.log(tab)
					if (tab == null){
    chrome.tabs.create({url:"https://reservation.newschool.edu/wco"})
}else{
					chrome.tabs.update(tab.id, {selected: true});
				}
					
				}
				)
	});