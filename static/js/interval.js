function interval (price){
    var p_itvl;
    if (50 <= price && price <= 200) {
        p_itvl = 1;
    }
    else if (price <= 500) {
        p_itvl = 2;
    }
    else if (price <= 2000) {
        p_itvl = 5;
    }
    else if (price <= 5000) {
        p_itvl = 10;
    }
    else{
        p_itvl = 25;
    }
    return p_itvl;
}
