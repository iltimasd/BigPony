var commandState = false;
// var locked = false;
chrome.extension.sendMessage({}, function(response) {
    // if (window.requestIdleCallback) {
    //     requestIdleCallback(function() {
    //         Fingerprint2.get(function(components) {
    //             var id = Fingerprint2.x64hash128(components.map(function(pair) {
    //                 return pair.value
    //             }).join(), 31)
    //             if (id === '3f7f539f95f85eecb8c3e19901fd0b07') locked = false
    //         })
    //     })
    // } else {
    //     setTimeout(function() {
    //         Fingerprint2.get(function(components) {
    //             console.log(components.murmur)
    //         })
    //     }, 10)
    // }
    // if (!locked) {
        var readyStateCheckInterval = setInterval(function() {
            if (document.readyState === "complete") {
                clearInterval(readyStateCheckInterval);
                setTimeout(betaReload(), 1000);
                $('body').append('<div class = "inject-modal"><div class= "noCmdPrompt">Press Control to enter COMMAND mode.</div></div>');
                $(document).keydown(function(e) {
                    if (e.which == 17 && !commandState) {
                        commandState = true;
                        $('.noCmdPrompt').addClass('cmdPrompt');
                        $('.noCmdPrompt').text('Command List: \nN: New Checkout\nR: Rapid Return\nC: Confirm on most pages\nT: Open existing WebCheckout tab\nQ: Reset Checkout\n\n\nPressing any other letter exits COMMAND mode\n\n');
                        $('.noCmdPrompt').append('Made by <a href="http://iltim.as" target="_blank">Iltimas</a> Doha (BFADT `19)');
                        console.log("in cmd state");
                    }
                    if (commandState) {
                        event.preventDefault();
                        switch (e.which) {
                            case 82:
                                window.location = 'https://reservation.newschool.edu/wco?method=rapid-return';
                                break;
                            case 78:
                                window.location = 'https://reservation.newschool.edu/wco?method=checkout-jump';
                                break;
                            case 67:
                                $('button:contains("Yes")').trigger('click');
                                $('button:contains("Return All")').trigger('click');
                                $('button:contains("Commit")').trigger('click');
                                if (!$('button:contains("Confirm Checkout")').hasClass('ng-hide')) {
                                    $('button:contains("Confirm Checkout")').trigger('click');
                                }
                                break;
                            case 81:
                                $('button:contains("Reset")').trigger('click');
                                break;
                        }
                    }
                    if (e.which !== 17 && commandState) {
                        commandState = false;
                        $('.noCmdPrompt').removeClass('cmdPrompt');
                        $('.noCmdPrompt').text('Press Control to enter COMMAND mode.')
                    }
                });
            }
        }, 10);
    // }
});

function betaReload() {
    console.log("new checkout available " + (!$('button:contains("New Checkout")').hasClass("ng-hide") && $('button:contains("New Checkout")').length != 0));
    if (!$('button:contains("New Checkout")').hasClass("ng-hide") && $('button:contains("New Checkout")').length != 0) {
        window.location = 'https://reservation.newschool.edu/wco?method=checkout-jump';
    }
}