sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("sync.e05.ex1.controller.Main", {
            onInit: function () {
                let data = {
                    value1: 0,
                    value2: 0
                };

                let oModel = new JSONModel(data);
                let oView = this.getView();
                oView.setModel(oModel, "view");
                this.getView().setModel(oModel);
            },

            onAddJSON: function(){
                sap.m.MessageToast.show("더하기 버튼을 눌렀습니다.");

                let oView = this.getView();
                let oModel = oView.getModel();  
                let data = oModel.getData();

                let value1 = data.value1;
                let value2 = data.value2;
                let AddResult = value1 + value2;

                data.AddResult = AddResult;

                oModel.setData(data)

            },

            onMinJSON: function(){
                sap.m.MessageToast.show("빼기 버튼을 눌렀습니다.");

                let oView = this.getView();
                let oModel = oView.getModel(); 
                let data = oModel.getData();   

                let value1 = data.value1;
                let value2 = data.value2;
                let MinResult = value1 - value2;

                data.MinResult = MinResult;

                oModel.setData(data)

            },

            onMultJSON: function(){
                sap.m.MessageToast.show("곱하기 버튼을 눌렀습니다.");

                let oView = this.getView();
                let oModel = oView.getModel(); 
                let data = oModel.getData();  

                let value1 = data.value1;
                let value2 = data.value2;
                let MultResult = value1 * value2;

                data.MultResult = MultResult;

                oModel.setData(data)

            },

            onDivJSON: function(){
                sap.m.MessageToast.show("나누기 버튼을 눌렀습니다.");

                let oView = this.getView();
                let oModel = oView.getModel(); 
                let data = oModel.getData();   

                let value1 = data.value1;
                let value2 = data.value2;
                let DivResult = value1 / value2;

                data.DivResult = DivResult;

                oModel.setData(data)

            },
        });
    });
