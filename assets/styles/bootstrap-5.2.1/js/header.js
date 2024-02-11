let nav_home = document.getElementById("nav-home");
let nav_customer = document.getElementById("nav-customer");
let nav_order = document.getElementById("nav-order");
let nav_item = document.getElementById("nav-item");
let nav_orderD = document.getElementById("nav-order-detail");
let main_root = document.getElementById("main-root");

let nav_customer_txt = document.getElementById("nav-customer-txt");
let nav_item_txt = document.getElementById("nav-item-txt");
let nav_order_txt = document.getElementById("nav-order-txt");
let nav_home_txt = document.getElementById("nav-home-txt");
let nav_order_detail_txt = document.getElementById("nav-orderD-txt");

function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    // add a zero in front of numbers<10
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('time').innerHTML = h + ":" + m + ":" + s;
    t = setTimeout(function () {
        startTime()
    }, 500);
}

startTime();
