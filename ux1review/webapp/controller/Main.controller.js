sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("sync.e05.ux1review.controller.Main", {
            onInit: function () {
                let data={
                    num1:0,
                    num2:0,
                    add: 0,
                    subtract:0,
                    multi:0,
                    divide:0
                };

                let oModel = new JSONModel(data);
                this.getView().setModel(oModel);
            }
        });
    });
