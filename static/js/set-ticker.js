var ticker = document.getElementById("new-stock-ticker").innerHTML;
var set_t = document.getElementsByClassName ("st");
for (var i = 0; i < set_t.length; i++){
    set_t[i].innerHTML = ticker;
}
