var transaction_id = 0;

function insertData (_date, _side, _lot_order, _price, _total, _status) {
    var _table = document.getElementById("orders-history");

    var new_row = _table.insertRow (1);
    var date = new_row.insertCell(0);
    date.innerHTML = _date;

    var side = new_row.insertCell(1);
    if (_side == "buy"){
        side.innerHTML = "<mark style='background-color: #23a93aFF'>Buy</mark>";
    }
    else {
        side.innerHTML = "<mark style='background-color: #dc3545FF'>Sell</mark>";
    }

    var code = new_row.insertCell(2);
    code.innerHTML = ticker;

    var lot_order = new_row.insertCell(3);
    lot_order.innerHTML = _lot_order;

    var price = new_row.insertCell(4);
    price.innerHTML = toIDR(_price);

    var total = new_row.insertCell(5);
    total.innerHTML = toIDR(_total);

    var status = new_row.insertCell(6);
    status.innerHTML = _status;

}
