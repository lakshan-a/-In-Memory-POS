/**
 * Disable Buttons
 * */
$("#btnAddToCart").attr('disabled', true);
$("#btnPurchase").attr('disabled', true);

/**
 * Generate New Order ID
 * */
function generateOrderID() {
    if (orders.length > 0) {
        let lastId = orders[orders.length - 1].oId;
        let digit = lastId.substring(6);
        let number = parseInt(digit) + 1;
        return lastId.replace(digit, number);
    } else {
        return "ODI-001";
    }
}

/**
 * Add Order Date
 * */
function setCurrentDate() {
    let orderDate = $("#orderDate");
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    today = dd + '/' + mm + '/' + yyyy;
    orderDate.val(today);
}

/**
 * Load All Customers
 * */
function loadAllCustomersForOption() {
    $("#cmbCustomerId").empty();
    for (let cus of customers) {
        $("#cmbCustomerId").append(`<option>${cus.id}</option>`);
    }
}

/**
 * Customers Combo Box
 * */
$("#cmbCustomerId").click(function () {
    let rCmbC = customers.find(({id}) => id === $("#cmbCustomerId").val());
    $("#customerName").val(rCmbC.name);
    $("#customerAddress").val(rCmbC.address);
    $("#customerSalary").val(rCmbC.salary);
});

/**
 * Load All Items
 * */
function loadAllItemsForOption() {
    $("#cmbItemCode").empty();
    for (let item of items) {
        $("#cmbItemCode").append(`<option>${item.code}</option>`);
    }
}

/**
 * Items Combo Box
 * */
$("#cmbItemCode").click(function () {
    let rCmbI = items.find(({code}) => code === $("#cmbItemCode").val());
    $("#itemName").val(rCmbI.name);
    $("#itemPrice").val(rCmbI.price);
    $("#qtyOnHand").val(rCmbI.qty);
});

/**
 * Clear All
 * */
$("#btnClearAll").click(function () {
    clearDetails();
});

function clearDetails() {
    $('#cmbCustomerId,#customerName,#customerAddress,#customerSalary,#cmbItemCode,#itemName,#itemPrice,#qtyOnHand,#buyQty,#txtDiscount,#txtTotal,#txtDiscount,#txtSubTotal,#txtCash,#txtBalance').val("");
}

/**
 * Item Details
 * */
let itemCode;
let itemName;
let itemPrice;
let itemQty;
let itemOrderQty;

let total = 0;
let discount = 0;
let subTotal = 0;

/**
 * Add To Cart
 * */
let tableRow = [];
$("#btnAddToCart").click(function () {
    let duplicate = false;

    for (let i = 0; i < $("#tblAddToCart tr").length; i++) {
        if ($("#cmbItemCode option:selected").text() === $("#tblAddToCart tr").children(':nth-child(1)')[i].innerText) {
            duplicate = true;
        }
    }
    if (duplicate !== true) {

        loadCartTableDetail();
        reduceQty($("#buyQty").val());
        calcTotal($("#buyQty").val() * $("#itemPrice").val());

    } else if (duplicate === true) {

        manageQtyOnHand(tableRow.children(':nth-child(4)').text(), $("#buyQty").val());
        $(tableRow).children(':nth-child(4)').text($("#buyQty").val());

        manageTotal(tableRow.children(':nth-child(5)').text(), $("#buyQty").val() * $("#itemPrice").val());
        $(tableRow).children(':nth-child(5)').text($("#buyQty").val() * $("#itemPrice").val());

    }

    /**
     * Add To Table
     * */
    $("#tblAddToCart>tr").click('click', function () {
        tableRow = $(this);
        let itemCode = $(this).children(":eq(0)").text();
        let itemName = $(this).children(":eq(1)").text();
        let unitPrice = $(this).children(":eq(2)").text();
        let qty = $(this).children(":eq(3)").text();
        let total = $(this).children(":eq(4)").text();

        $("#cmbItemCode").val(itemCode);
        $("#itemName").val(itemName);
        $("#itemPrice").val(unitPrice);
        $("#buyQty").val(qty);
        $("#txtTotal").val(total);
    });
});

/**
 * Reduce QtyOnHand
 * */
function reduceQty(orderQty) {
    let minQty = parseInt(orderQty);
    let reduceQty = parseInt($("#qtyOnHand").val());
    reduceQty = reduceQty - minQty;
    $("#qtyOnHand").val(reduceQty);
}

/**
 * Calculate Total
 * */
function calcTotal(amount) {
    total += amount;
    $("#txtTotal").val(total);
}

/**
 * Add To Table
 * */
$("#tblAddToCart").empty();

function loadCartTableDetail() {
    itemCode = $("#cmbItemCode").val();
    itemName = $("#itemName").val();
    itemPrice = $("#itemPrice").val();
    itemQty = $("#qtyOnHand").val();
    itemOrderQty = $("#buyQty").val();

    let total = itemPrice * itemOrderQty;
    let row = `<tr><td>${itemCode}</td><td>${itemName}</td><td>${itemPrice}</td><td>${itemOrderQty}</td><td>${total}</td></tr>`;

    $("#tblAddToCart").append(row);
}

/**
 * Manage QtyOnHand
 * */
function manageQtyOnHand(preQty, nowQty) {
    var preQty = parseInt(preQty);
    var nowQty = parseInt(nowQty);
    let avaQty = parseInt($("#qtyOnHand").val());

    avaQty = avaQty + preQty;
    avaQty = avaQty - nowQty;
    $("#qtyOnHand").val(avaQty);
}

