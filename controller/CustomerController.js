
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


 //---------------------------------Clear Input Field in Search Bar------------------------//


 $("#clearSearchCus").click(function () {
     searchCusId.value = '';
     clearCDTextFields();
     clearCUTextFields();
     loadAllCustomers();
 });

 //------------------------------Auto Forces Input Field in Search Bar---------------------------//


 $('#searchCusId').keypress(function (event) {
     if (event.which === 13) {
         $('#btnSearchCus').focus();
     }
 });
 $('#btnSearchCus').keypress(function (event) {
     if (event.which === 13) {
         $('#searchCusId').focus();
     }
 });

 //----------------------------------Update Customer----------------------------------------//


 $("#bntUpdateCustomer").click(function () {
     let CustomerId = $("#searchCustomerId").val();
     let response2 = updateCustomers(CustomerId);
     if (response2) {
         saveUpdateAlert(CustomerId, "updated.");
         clearCUTextFields();
         checkValidity(customerValidationsUpdate);
     } else {
         unSucsessUpdateAlert(CustomerId);
     }
 });

 function updateCustomers(CustomerId) {
     let customer = searchCustomer(CustomerId);
     if (customer != null) {
         customer.id = $("#searchCustomerId").val();
         customer.name = $("#nameUpdate").val();
         customer.address = $("#addressUpdate").val();
         customer.salary = $("#salaryUpdate").val();
         loadAllCustomers();
         return true;
     } else {
         return false;
     }
 }

 //-------------------------------- Clear Text Fields in Update Customer------------------------------//


 $("#btnUclearC").click(function () {
     clearCUTextFields();
 });

 function clearCUTextFields() {
     searchCustomerId.value = '';
     nameUpdate.value = '';
     addressUpdate.value = '';
     salaryUpdate.value = '';
 }


