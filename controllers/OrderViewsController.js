function loadAllOrders() {

    $("#tblOrder").empty();

    for (var order of orders) {
        console.log(order);
        var row = `<tr><td>${order.oId}</td><td>${order.cId}</td><td>${order.oDate}</td><td>${order.subTotal}</td><td>${order.discount}</td></tr>`;
        $("#tblOrder").append(row);
    }
}