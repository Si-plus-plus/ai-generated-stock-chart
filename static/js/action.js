$(".action-button").click(function(){
    var side = $(this).attr('id');

    var lots = getLots();
    var price = getPrice();

    if (!isNaN(price)){
        insertData (getDate(), side, lots, price, lots*price, "Matched");

        if (side == "buy"){
            portfolio['v_balance'] -= lots*price;
            portfolio['c_stock'] += lots;
            portfolio['v_stock'] += lots*price;
        }
        else {
            portfolio['v_balance'] += lots*price;
            portfolio['c_stock'] -= lots;
            portfolio['v_stock'] -= lots*calAvg();
        }

    }
})
