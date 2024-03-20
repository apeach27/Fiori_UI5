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

            },

            onDelete: function(){
                let oTable =  this.byId("idTable"); // View 에서 id 속성 값이 idTable 인 항목을 찾음

                let aIndex = oTable.getSelectedIndices();

                if (!aIndex || aIndex.length == 0){ // 선택된 항목이 없을 때
                    sap.m.MessageBox.information("삭제할 라인을 선택하세요");
                    return; // 메세지 출력 후 중단

                }
            }
        });
    });
