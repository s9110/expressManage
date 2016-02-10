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
        source: customersNameArray,
        // as browsers don't fire "change" event on autocomplete/autofill
        // the value does not gets bind with model
        // thus for work-around, firing change event manually
        change: function(event) {
            console.log('..autocomplete field has been changed');
            $(event.target).trigger('change');
        }
    });
};

//
// Mark input fields disabled post success order creation
var disableInputInOrderSuccess = function() {
    console.log('..disableInputInOrderSuccess');
    var formElements = $(".post-success-disabled");
    formElements.attr("disabled", "disabled");

    return true;
}

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
