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

                // 통화코드 콤보박스를 위해 추가
                let viewData = {
                    Currency: [
                        { key: 'KRW', name: '원화'},
                        { key: 'USD', name: '달러'}
                    ],

                    CreateMode: true
                };

                let oViewModel = new JSONModel(viewData);
                oView.setModel(oViewModel,"view");
            },

            onCurrencyChange: function ( oEvent ) {
                let oItem = oEvent.getParameter("selectedItem");
                let oNewModel = this.getView().getModel("new");
                oNewModel.setProperty("/Currcode", oItem.getKey());
            },

            onCreate: function(){
                // 아무것도 입력되지 않은 상태의 input 팝업창
                let data = {
                    Carrid: "",
                    Carrname: "",
                    Currcode: "",
                    Url: ""
                };

                let oNewModel = new JSONModel(data);
                this.getView().setModel(oNewModel, "new");

                let oViewModel = this.getView().getModel("view");
                oViewModel.setProperty("/CreateMode", true);

                this.openDialog();

            },

            onUpdate: function(oEvent){
                // 선택한 라인의 데이터가 자동으로 입력되어있는 상태의 팝업창
                let oButton = oEvent.getSource();
                let oContext = oButton.getBindingContext();
                let path = oContext.getPath(); // 내가 선택한 라인의 모델 경로 /CarrierSet('AA')
                let data = oContext.getProperty(); 

                let oNewModel = new JSONModel(data);
                this.getView().setModel(oNewModel, "new");

                let oViewModel = this.getView().getModel("view");
                oViewModel.setProperty("/CreateMode", false);

                // 항공사 ID는 수정 불가능 해야함
                this.openDialog();

            },

            openDialog: function(){
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
                // newData = { Carrid: "~~", Carrname: "~~", ... }

                debugger;

                let oViewModel = oView.getModel("view");
                let createMode = oViewModel.getProperty("/CreateMode"); // <- true(생성), false(수정)

                if(createMode){
                    // 생성
                    // oModel.create(경로, 신규데이터, 결과처리)
                    oModel.create(
                        // 경로, 신규데이터, 결과처리
                        "/CarrierSet",
                        newData,
                        {
                            success:function(oData, oResponse){
                                sap.m.MessageToast.show(oData.Carrid + "항공사가 생성되었습니다.");
                                oModel.refresh();
                            },
    
                            error: function(oError){
                                sap.m.MessageBox.error("생성 중 오류가 발생했습니다.");
                            }
                        }
                    );

                } else {
                    // 수정
                    // oModel.update(경로, 변경될 데이터, 결과처리);
                    oModel.update(
                        // /CarrierSet('AA') 와 같이 만들기 위해 문자열 사이에 Carrid 를 합치는 작업
                        "/CarrierSet('"+ newData.Carrid +"')",
                        newData,
                        {
                            success: function(){
                                sap.m.MessageToast.show(newData.Carrid + "항공사 수정 성공");
                            },
                            error: function(oError){
                                sap.m.MessageBox.error("수정 중 오류 발생");
                            }
                        }
                    );    
                }

                //생성을 위한 팝업창 닫기
                this.onSaveCancel();

            },

            onDelete: function(oEvent){
                // debugger;
                // oEvent의 getSource()는 이벤트가 발생한
                // 오브젝트를 의미함
                let oButton = oEvent.getSource();
                let oContext = oButton.getBindingContext();
                let path = oContext.getPath();

                let oView = this.getView();
                let oModel = oView.getModel();

                // HTTP Method 에서 Delete 에 해당하는 명령
                oModel.remove(
                    path, {
                    success: function(){
                        sap.m.MessageToast.show("항공사 삭제 완료")
            
                        },
                    error: function(oError){
                        sap.m.MessageToast.error("삭제 중 오류 발생");
                    }
                });
            },
            
            // 새로고침 구현
            onRefresh: function(){
                let oModel = this.getView().getModel();
                oModel.refresh();
            }

        });
    });
