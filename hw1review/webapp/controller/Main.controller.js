sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast) {
        "use strict";

        return Controller.extend("sync.e05.hw1review.controller.Main", {
            onInit: function () {

            },
            onSelectionChange: function( oEvent ){
                // let listItem = oEvent.getParameter("listItem")
                // alert(listItem.getBindingContext())
                // let context = listItem.getBindingContext()
                // alert(context.getProperty("Carrid"));
                let oListItem = oEvent.getParameter("listItem");
                let oContext = oListItem.getBindingContext();
                let carrid = oContext.getProperty("Carrid");
                let connid = oContext.getProperty("Connid");

                MessageToast.show("선택하신 라인은 항공사: "+carrid+", 항공편: "+connid+" 의 정보입니다.");

            }
        });
    });
