function handleMinus (n){
    if (n < 0) return "-";
    return "";
}

function toIDR (_n){
    n = Math.abs(_n);
    var d = Math.round(n * 100) % 100;
    return handleMinus(_n) + 'Rp'+(Math.floor(n) + '').replace(/(\d)(?=(\d{3})+$)/g, '$1.') + (d > 9 ? '.' + d : d > 0 ? '.0' + d : '');
}
