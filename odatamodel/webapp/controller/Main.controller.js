sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Fragment, JSONModel) {
        "use strict";

        return Controller.extend("sync.e05.odatamodel.controller.Main", {

            initAirlineData: {
                Carrid: "",
                Carrname: "",
                Currcode: "",
                Url: "",
            },

            onInit: function () {
                let data = this.initAirlineData;
                let oNewModel = new JSONModel(data);
                let oView = this.getView();
                oView.setModel(oNewModel, "new");
                
            },

            onCreate: function(){
                let oView = this.getView();
                let oDialog = oView.byId("idNewDialog");

                if(oDialog){
                    oDialog.open();

                }else{
                    Fragment.load({
                        id: oView.getId(),
                        name: "sync.e05.odatamodel.view.New",
                        type:"XML",
                        controller: this               // Main Controller를  공유
                    
                    }).then(
                        function(oDialog){
                        oView.addDependent(oDialog); 
                        oDialog.open();               // View 의 Model 을 공유
                    });
                }
            },

            onSaveCancel: function(){
                let oDialog = this.getView().byId("idNewDialog");

                if(oDialog){
                    oDialog.close();
                }

                // 빈값만 있는 정보를 새로운 JSONModel을 만들어서 기존 new모델을 교체함
                // --> 데이터 초기화
                let oNewModel = new JSONModel(this.initAirlineData);
                this.getView().setModel(oNewModel, "new");
            }

        });
    });
