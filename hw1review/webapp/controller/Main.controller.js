sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("sync.e05.hw1review.controller.Main", {
            onInit: function () {

            },
            onSelectionChange: function( oEvent ){
                let listItem = oEvent.getParameter("listItem")
                alert(listItem.getBindingContext())
                let context = listItem.getBindingContext()
                alert(context.getProperty("Carrid"));
            }
        });
    });
