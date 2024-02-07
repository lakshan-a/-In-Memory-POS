
 // ------------------------Save Customer-----------------------//

$("#btnCSave").click(function () {

    // Create Object
    let CustomerArray = new customer(
        $("#txtCustomerId").val(),
        $("#txtCustomerName").val(),
        $("#txtCustomerAddress").val(),
        $("#txtCustomerSalary").val()
    );

    clearTextFieldsC();

    // Alert Save
    saveUpdateAlert("Customer", "saved.");

    // Add the customer object to the array
    customers.push(CustomerArray);

    $("#txtCustomerId").val(generateCustomerID());
    loadAllCustomers();
});

//--------------------------------Clear Text Fields in +New Customer ---------------------------//

$("#btnClearC").click(function () {
    clearTextFieldsC();
});

function clearTextFieldsC() {
    txtCustomerId.value = '';
    txtCustomerName.value = '';
    txtCustomerAddress.value = '';
    txtCustomerSalary.value = '';
    $("#txtCustomerId").focus();
    checkValidity(customerValidations);
}

//------------------------------------Search Customer----------------------------//

$("#btnSearchCus").click(function () {
    var result = customers.find(({id}) => id === $("#searchCusId").val());
    console.log(result);

    if (result != null) {
        $("#customerTable").empty();
        var row = `<tr><td>${result.id}</td><td>${result.name}</td><td>${result.address}</td><td>${result.salary}</td></tr>`;
        $("#customerTable").append(row);

        $("#searchCustomerId").val(result.id);
        $("#nameUpdate").val(result.name);
        $("#addressUpdate").val(result.address);
        $("#salaryUpdate").val(result.salary);

        $("#searchCIdDelete").val(result.id);
        $("#disabledNameDelete").val(result.name);
        $("#disabledAddressDelete").val(result.address);
        $("#disabledSalaryDelete").val(result.salary);

    } else {
        emptyMassage();
        clearCDTextFields();
    }
});
