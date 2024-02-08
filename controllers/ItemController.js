/**
 * Save Item
 * */
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

/**
 * Clear Text Fields in +New Item
 * */
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

/**
 * Search Item
 * */
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
