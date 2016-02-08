// ========================================
// Helper JS methods for partials and views
// ========================================

//
// Initialize date pickers
// element to be initialized should have .input-group.date class
//
var initDatePicker = function() {
    console.log('..initDatePicker');

    var pickerElement = $(".input-group.date");
    $(pickerElement).datepicker({
        format: "dd/mm/yyyy",
        clearBtn: true,
        autoclose: true,
        todayHighlight: true
    });
};

//
// Initialize customer name autocomplete
//
var initCustomerNameAutocomplete = function(customersJSONList) {
    console.log('..initCustomerNameAutocomplete');

    // Sanity
    customersJSONList = customersJSONList || [];
    console.log('..initCustomerNameAutocomplete customersJSONList: ', customersJSONList);

    var customersNameArray = _.values(_.mapValues(customersJSONList, 'firstName'));
    console.log('..initCustomerNameAutocomplete customersNameArray: ', customersNameArray);

    var customerNameElement = $(".customerName-control");
    $(customerNameElement).autocomplete({
        source: customersNameArray
    });
};

//
// Mark input fields disabled in delete mode
//
var markDisableInDelete = function() {
    console.log('..markDisableInDelete');
    var formElements = $(".delete-mode-disabled");
    formElements.attr("disabled", "disabled");

    return true;
}

//
// Hide success panel on button click
//
var hideSuccessSavePanel = function() {
    console.log('..hideSuccessSavePanel');
    $(".close-new-saved").closest(".panel").hide();
}

//
// Append new row to product details table
//
// var addNewDetailRow = function() {
//     console.log('..addNewDetailRow');
//
//     var rowData = '<p class="form-control-static">{{ order.lotNumber }}</p>';
//     $(".tempClass").append(rowData);
// }
