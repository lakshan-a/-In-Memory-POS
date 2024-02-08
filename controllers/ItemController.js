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

