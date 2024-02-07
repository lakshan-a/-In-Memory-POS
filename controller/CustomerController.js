
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

 //-------------------------------------------Delete Customer--------------------------------------//
 $("#btnDeleteCustomer").click(function () {
     let deleteID = $("#searchCIdDelete").val();

     yesNoAlertDelete(deleteID);
 });

 //-------------------------------Search Id Enter Pressed And Load TextFields-------------------------------//
 $("#searchCIdDelete").keyup(function (event) {
     if (event.keyCode === 13) {
         var result = customers.find(({id}) => id === $("#searchCIdDelete").val());
         console.log(result);

         if (result != null) {
             $("#searchCIdDelete").val(result.id);
             $("#disabledNameDelete").val(result.name);
             $("#disabledAddressDelete").val(result.address);
             $("#disabledSalaryDelete").val(result.salary);
         } else {
             emptyMassage();
             clearCDTextFields();
         }
     }
 });

 //---------------------------------------------- Clear Text Fields in Delete Customer---------------------------------//

 $("#btnDclearC").click(function () {
     clearCDTextFields();
 });

 function clearCDTextFields() {
     searchCIdDelete.value = '';
     disabledNameDelete.value = '';
     disabledAddressDelete.value = '';
     disabledSalaryDelete.value = '';
 }

 //--------------------------------------------- View All Customers-------------------------------------------//

 $("#btnViewAllCustomer").click(function () {
     loadAllCustomers();
 });

 //------------------------------- Load All Customers------------------------------------------//


 function loadAllCustomers() {

     // Remove all the table body content before adding data
     $("#customerTable").empty();

     // Get all customer records from the array
     for (var customer of customers) {
         console.log(customer);// customer object

         // Using String Literals to do the same thing as above
         var row = `<tr><td>${customer.id}</td><td>${customer.name}</td><td>${customer.address}</td><td>${customer.salary}</td></tr>`;

         //then add it to the table body of customer table
         $("#customerTable").append(row);
     }
     blindClickEvents();
     dblRowClickEventsCus();
     loadAllCustomersForOption();
 }

