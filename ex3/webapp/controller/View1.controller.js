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

        return Controller.extend("sync.e05.ex3.controller.View1", {

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
                        name: "sync.e05.ex3.view.New",
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

                let oNewModel = this.getView().getModel("new");
                oNewModel.setData({
                    Carrid: "",
                    Carrname: "",
                    Currcode: "",
                    Url: ""
                })

                // ComboBox 선택된 내용을 지우는 과정
                let oComboBox = this.byId("idComboBox");
                oComboBox.setSelectedKey("");
                oComboBox.setSelectedItem("");
                oComboBox.setSelectedItemId("");
            },

            onSaveConfirm: function(){
                let oView = this.getView();
                let oNewModel = oView.getModel("new");  // JSON Model
                let oModel = oView.getModel();          // oData Model            
                let newData = oNewModel.getData();


                oModel.create(
                    // 경로, 신규데이터, 결과처리
                    "/ConnectionSet",
                    newData,
                    {
                        success:function(oData, oResponse){
                            sap.m.MessageToast.show(oData.Carrid + "항공사가 생성되었습니다.");
                        },

                        error: function(oError){
                            sap.m.MessageBox.error("생성 중 오류가 발생했습니다.");
                        }
                    }

                );
                
                //생성을 위한 팝업창 닫기
                this.onSaveCancel();

            },

            onDelete: function(){
                let oTable =  this.byId("idTable"); 
                console.log(oTable);
                let aIndex = oTable.getSelectedIndices();

                if (!aIndex || aIndex.length == 0){ // 선택된 항목이 없을 때
                    sap.m.MessageBox.information("삭제할 라인을 선택하세요");
                    return; // 메세지 출력 후 중단

                }
                let oModel =  this.getView().getModel();

                for( const index of aIndex ){
                    // 선택된 라인들 중 순서대로 하나씩 모델 연결 정보를 가져
                    let oSelectedContext = oTable.getContextByIndex(index);
                    let carrid = oSelectedContext.getProperty("Carrid");

                    // 해당 모델의 정보에 대한 경로
                    let path =  oSelectedContext.getPath();
                    oModel.remove(path, {
                        success: function(){
                            // Exception 이 발생하지 않은 경우
                            sap.m.MessageBox.success( carrid + "삭제 성공");
                            oTable.clearSelection();                            

                        },
                        error: function(oError){
                            sap.m.MessageBox.error("삭제 오류 발생");
                        }
                    });
                }
            }

        });
    });
