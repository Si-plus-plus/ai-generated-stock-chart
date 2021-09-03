$(".action-button").click(function(){
    var side = $(this).attr('id');

    var lots = t_quant.now;
    var price = t_price.now;

    if (!isNaN(price)){
        var status = "Pending"
        transaction_count += 1;

        if (match_probability(side, price)){
            status = "Matched";
            success(side, lots, price);
        }
        else {
            if (side == "buy"){
                portfolio.on_hold_balance += lots*price*100;
            }
            else {
                portfolio.on_hold_stock += lots;
            }
        }

        insertData ("Day "+ (day), side, lots, price, lots*price*100, status);
    }
})
