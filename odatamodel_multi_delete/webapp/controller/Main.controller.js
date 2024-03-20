sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("sync.e05.odatamodelmultidelete.controller.Main", {
            onInit: function () {

                let data = {
                    Currency:[
                        {Key:"KRW", Name:"원화"},
                        {Key:"USD", Name:"달러"},
                        {Key:"EUR", Name:"유로"},
                        {Key:"AUD", Name:"호주"},
                        {Key:"CAD", Name:"캐나다"},
                    ]
                };

                let oViewModel = new JSONModel(data);
                this.getView().setModel(oViewModel, "view");

            }
        });
    });
