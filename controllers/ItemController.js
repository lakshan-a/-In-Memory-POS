//-------------------------------Save Item-----------------------------------//
$("#btnISave").click(function () {

    //create object
    let itemArray = new item(
        $("#txtItemsId").val(),
        $("#txtItemName").val(),
        $("#txtItemQty").val(),
        $("#txtItemPrice").val());

    clearTextFieldsI();

    //Alert Save
    saveUpdateAlert("Item", "saved.");

    //Add the item object to the array
    items.push(itemArray);

    /*console.log(items);*/
    $("#txtItemsId").val(generateItemID());
    loadAllItems();
});

//-------------------------------- Clear Text Fields in +New Item----------------------------//
$("#btnClearI").click(function () {
    clearTextFieldsI();
});

function clearTextFieldsI() {
    txtItemsId.value = '';
    txtItemName.value = '';
    txtItemQty.value = '';
    txtItemPrice.value = '';
    $("#txtItemsId").focus();
    checkValidity(ItemsValidations);
}

//-------------------------- Search Item---------------------------//
$("#btnSearchItem").click(function () {
    var resultI = items.find(({code}) => code === $("#ItemIdSearch").val());
    console.log(resultI);

    if (resultI != null) {
        $("#ItemTable").empty();
        var row = `<tr><td>${resultI.code}</td><td>${resultI.name}</td><td>${resultI.qty}</td><td>${resultI.price}</td></tr>`;
        $("#ItemTable").append(row);

        $("#searchItemId").val(resultI.code);
        $("#updateItemName").val(resultI.name);
        $("#updateItemQty").val(resultI.qty);
        $("#updateItemPrice").val(resultI.price);

        $("#searchDItemId").val(resultI.code);
        $("#DItemName").val(resultI.name);
        $("#DItemQty").val(resultI.qty);
        $("#DItemPrice").val(resultI.price);
    } else {
        emptyMassage();
        clearCDTextFields();
    }
});
//--------------------------- Clear Input Field in Search Bar---------------------------------//
$("#clearSearchItem").click(function () {
    ItemIdSearch.value = '';
    clearUTextFields();
    clearDTextFields();
    loadAllItems();
});

//-------------------------- Auto Forces Input Field in Search Bar---------------------------//
$('#ItemIdSearch').keypress(function (event) {
    if (event.which === 13) {
        $('#btnSearchItem').focus();
    }
});
$('#btnSearchItem').keypress(function (event) {
    if (event.which === 13) {
        $('#ItemIdSearch').focus();
    }
});

//------------------------------------Update Item------------------//
$("#btnUpdateItem").click(function () {
    let ItemId = $("#searchItemId").val();
    let response = updateItem(ItemId);
    if (response) {
        saveUpdateAlert(ItemId, "updated.");
        checkValidity(ItemsValidationsUpdate);
    } else {
        unSucsessUpdateAlert(ItemId);
    }
});

function updateItem(itemId) {
    let item = searchItem(itemId);
    if (item != null) {
        item.code = $("#searchItemId").val();
        item.name = $("#updateItemName").val();
        item.qty = $("#updateItemQty").val();
        item.price = $("#updateItemPrice").val();
        loadAllItems();
        return true;
    } else {
        return false;
    }
}

//------------------------ Clear Text Fields in Update Item----------------------//
$("#btnUclearI").click(function () {
    clearUTextFields();
});


function clearUTextFields() {
    searchItemId.value = '';
    updateItemName.value = '';
    updateItemQty.value = '';
    updateItemPrice.value = '';
    checkValidity(ItemsValidationsUpdate);
}

//----------------------------------Delete Item-------------------------------//
$("#btnDeleteItems").click(function () {
    let deleteIID = $("#searchDItemId").val();
    yesNoAlertIDelete(deleteIID);
});

//------------------------------- Search Id Enter Pressed And Load TextFields-----------------------------//
$("#searchDItemId").keyup(function (event) {
    if (event.keyCode === 13) {
        var resultI = items.find(({code}) => code === $("#searchDItemId").val());
        console.log(resultI);

        if (resultI != null) {
            $("#searchDItemId").val(resultI.code);
            $("#DItemName").val(resultI.name);
            $("#DItemQty").val(resultI.qty);
            $("#DItemPrice").val(resultI.price);
        } else {
            emptyMassage();
            clearCDTextFields();
        }
    }
});

//---------------------------- Clear Text Fields in Delete Item---------------------//
$("#btnDclearI").click(function () {
    clearDTextFields();
});

function clearDTextFields() {
    searchDItemId.value = '';
    DItemName.value = '';
    DItemQty.value = '';
    DItemPrice.value = '';
}

//------------------------------- View All Items----------------------//
$("#btnViewAllItems").click(function () {
    loadAllItems();
});
/**
 * Load All Items
 * */
function loadAllItems() {

    //remove all the table body content before adding data
    $("#ItemTable").empty();


    // get all items records from the array
    for (var item of items) {
        console.log(item);// items object

        // Using String Literals to do the same thing as above
        var row = `<tr><td>${item.code}</td><td>${item.name}</td><td>${item.qty}</td><td>${item.price}</td></tr>`;

        //then add it to the table body of items table
        $("#ItemTable").append(row);
    }
    tblClickEventsI();
    dblRowClickEventsItem();
    loadAllItemsForOption();
}

/**
 * Table Listener Click & Load To TextFields
 * */
function tblClickEventsI() {
    $("#ItemTable>tr").click(function () {
        let code = $(this).children().eq(0).text();
        let name = $(this).children().eq(1).text();
        let qty = $(this).children().eq(2).text();
        let price = $(this).children().eq(3).text();

        $("#searchItemId").val(code);
        $("#updateItemName").val(name);
        $("#updateItemQty").val(qty);
        $("#updateItemPrice").val(price);

        $("#searchDItemId").val(code);
        $("#DItemName").val(name);
        $("#DItemQty").val(qty);
        $("#DItemPrice").val(price);
    });
}

/**
 * Table Listener Double Click & Remove
 * */
function dblRowClickEventsItem() {
    $("#ItemTable>tr").on('dblclick', function () {
        let deleteItemID = $(this).children().eq(0).text();
        yesNoAlertIDelete(deleteItemID);

    });
}

/**
 * Generate New Item Code
 * */
function generateItemID() {
    if (items.length > 0) {
        let lastId = items[items.length - 1].code;
        let digit = lastId.substring(6);
        let number = parseInt(digit) + 1;
        return lastId.replace(digit, number);
    } else {
        return "I00-001";
    }
}

