$(".action-button").click(function(){
    var side = $(this).attr('id');

    var lots = t_quant.now;
    var price = t_price.now;

    if (!isNaN(price)){
        insertData ("Day "+ (day), side, lots, price, lots*price*100, "Matched");
        transaction_count += 1;

        if (side == "buy"){
            portfolio['v_balance'] -= lots*price;
            portfolio['c_stock'] += lots;
            portfolio['v_stock'] += lots*price;
        }
        else {
            portfolio['v_balance'] += lots*price;
            portfolio['c_stock'] -= lots;
            portfolio['v_stock'] = portfolio['v_stock']*portfolio['c_stock']/(portfolio['c_stock']+lots);
        }

    }
})
