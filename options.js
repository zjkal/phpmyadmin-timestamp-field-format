document.addEventListener("DOMContentLoaded", function (event) {
    var obj = document.getElementById("switch");

    chrome.storage.local.get(['auto_transform'], function (result) {
        var checked = result.auto_transform ? true : false;
        obj.checked = checked;
    });

    obj.onclick = function () {
        var value = this.checked;
        chrome.storage.local.set({ "auto_transform": value }, function () {
            //console.log('Value is set to ' + value);
        });
    };
});