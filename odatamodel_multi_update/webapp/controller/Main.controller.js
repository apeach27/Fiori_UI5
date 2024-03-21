sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("sync.e05.odatamodelmultiupdate.controller.Main", {
            onInit: function () {
                let viewData = {
                    EditMode: false
                };

                let oViewModel = new JSONModel(viewData);
                let oView = this.getView();
                oView.setModel(oViewModel, "view");

            },

            onEdit: function(){
                let oViewModel =  this.getView().getModel("view");
                oViewModel.setProperty("/EditMode", true);

            },

            onCancel: function(){
                let oViewModel =  this.getView().getModel("view");
                oViewModel.setProperty("/EditMode", false);

                let oModel = this.getView().getModel();
                oModel.resetChanges(); // 원본 데이터로 복원
            }
        });
    });
