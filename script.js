/**
 * Make GET request to link
 * @param {String} link The link to make GET
 * @param {function} callback Callback (data)
 */
function loadData(link, callback) {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        callback(this.responseText);
    }
    xhttp.open("GET", link);
    xhttp.send();
}

(function() {
    let divs = document.getElementsByTagName('div');
    for (div of divs) {
        if (!div.getAttribute('id') || !div.getAttribute('id').includes('comp-')) continue;
        loadData('comp/' + div.getAttribute('id') + '.html', (data) => {
            div.innerHTML = data;
        })
    }
})()