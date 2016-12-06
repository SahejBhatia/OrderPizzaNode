var pricePerPizza = 7.5;
var Tax = 0.07;
var pricePerTopping = 2.50;

function calculatePrice(qty, length){
    var sum =  (qty * pricePerPizza) + (length*pricePerTopping) ;
    return Math.round(sum*1.07);
}

exports.TotalPrice = function(qty, length){
    return calculatePrice(qty,length);
}
