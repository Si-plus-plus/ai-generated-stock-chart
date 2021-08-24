var transaction_id = 0;

function insertData (_date, _side, _lot_order, _price, _total, _status) {
    var table = document.getElementById("orders-history");

    var new_row = table.insertRow (1);
    var date = new_row.insertCell(0);
    date.innerHTML = _date;

    var side = new_row.insertCell(1);
    side.innerHTML = _side;

    var code = new_row.insertCell(2);
    code.innerHTML = ticker;

    var lot_order = new_row.insertCell(3);
    lot_order.innerHTML = _lot_order;

    var price = new_row.insertCell(4);
    price.innerHTML = toIDR(_price);

    var total = new_row.insertCell(5);
    total.innerHTML = toIDR(_total*100);

    var status = new_row.insertCell(6);
    status.innerHTML = _status;

}
