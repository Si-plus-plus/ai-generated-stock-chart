function randn_bm(min, max, skew) {
    // https://newbedev.com/javascript-math-random-normal-distribution-gaussian-bell-curve
    let u = 0, v = 0;
    while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random();
    let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );

    num = num / 10.0 + 0.5; // Translate to 0 -> 1
    if (num > 1 || num < 0) num = randn_bm(min, max, skew); // resample between 0 and 1 if out of range
    num = Math.pow(num, skew); // Skew
    num *= max - min; // Stretch to fill range
    num += min; // offset to min
    return num;
}



function sigmoid(t){
    return 1 / ( 1 + Math.exp(-t));
}

function normalized(x, l, r){
        return (x - l) / (r - l);
}

function match_probability(status, price, open){
    if (price > limit.high || price < limit.low) return false;

    n_price = normalized(price, limit.low, limit.high);
    n_open = normalized(open, limit.low, limit.high);
    offset = 0.2

    if (status === "sell") {
        n_price = 1 - n_price;
        n_open = 1 - n_open
    }

    multiplier = 10
    n_price = (n_price - n_open + offset) * multiplier

    p_price = sigmoid(n_price);


    // console.log(p_price)
    return (Math.random() < p_price);
}
