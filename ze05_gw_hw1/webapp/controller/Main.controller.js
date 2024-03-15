sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("ui5tablefragment.ze05gwhw1.controller.Main", {
            onInit: function () {

            },
            

            onSelectionChange: function( oEvent ){

                // 선택한 Item 정보를 Event 로 부터 가져옴
                let onItem = oEvent.getParameter("listItem");

                // 선택한 라인에서 출력되는 데이터의 Model의 값 정보
                let oContext = onItem.getBindingContext();

                let carrid = oContext.getProperty("Carrid");
                let connid = oContext.getProperty("Connid");

                // 해당 Model 내용의 Carrid 속성을 화면에 출력
                sap.m.MessageToast.show("선택 라인은 항공사: "+carrid+ "항공편: "+connid +" 의 정보입니다.");

                
                // Info.fragment.xml 을 팝업창으로 호출함
                let oView = this.getView();
                let oDialog = this.byId("idDialog");

                if( oDialog ){

                    let oNameText = this.byId("idNameText");
                    oNameText.setText("항공사: " + carrid + "\n항공편: " + connid);


                    oDialog.open();

                } else {
                    // Info.fragment.xml 파일을 읽어오기
                    // Controller 도 연결함
                    let oFragment = sap.ui.core.Fragment.load({
                        id: oView.getId(),
                        name: "ui5tablefragment.ze05gwhw1.view.Info",
                        type: "XML",
                        controller: this

                    });

                    // Fragment Load 가 완료되면 Main View 에 연결함
                    // (Main View 의 모델도 이용 가능)
                    oFragment.then( function( oDialog ){
                        oView.addDependent(oDialog)  // View 에 연결

                        let oNameText = this.byId("idNameText");
                        oNameText.setText(carrid);

                        let oConnText = this.byId("idConnText");
                        oConnText.setText(connid); 

                        oDialog.open();  // 팝업창 출력
                    });
                }
            },
            
            // 닫기버튼 구현
            onDialogClose: function(){
                let oDialog = this.byId("idDialog");
                if(oDialog){
                    oDialog.close(); //  팝업창 닫기
                }
            }
        });
    });
