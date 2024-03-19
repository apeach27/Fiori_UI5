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
                        }
                    );
                }
            },

            onSaveCancel: function(){
                let oDialog = this.getView().byId("idNewDialog");

                if(oDialog){
                    oDialog.close();
                }

                // 빈값만 있는 정보를 새로운 JSONModel을 만들어서 기존 new모델을 교체함
                // --> 데이터 초기화
                let oNewModel = this.getView().getModel("new");
                oNewModel.setData({
                    Carrid: "",
                    Carrname: "",
                    Currcode: "",
                    Url: ""
                })
            },

            onSaveConfirm: function(){
                let oView = this.getView();
                let oNewModel = oView.getModel("new");  // JSON Model
                let oModel = oView.getModel();          // oData Model
            
                let newData = oNewModel.getData();
                // newData = { Carrid: "~~", Carrname: "~~", ... }

                debugger;

                oModel.create(
                    // 경로, 신규데이터, 결과처리
                    "/CarrierSet",
                    newData,
                    {
                        success:function(oData, oResponse){
                            debugger;
                            sap.m.MessageToast.show(oData.Carrid + "항공사가 생성되었습니다.");
                        },

                        error: function(oError){
                            debugger;
                            sap.m.MessageBox.error("생성 중 오류가 발생했습니다.");
                        }
                    }

                );

            }

        });
    });
