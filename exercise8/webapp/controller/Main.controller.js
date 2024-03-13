sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("sync.e05.exercise8.controller.Main", {
            onInit: function () {
                let sPerson = {
                    name: "도현"
                }

                let oModel = new JSONModel(sPerson);
                let oView = this.getView();
               
                oView.setModel(oModel); // JSON Model 정보를 현재 View 에 등록
            },

            onButtonClick: function() {
                sap.m.MessageToast.show("버튼을 클릭했습니다.");
                // MessageToast.show();

                // Popup.fragment.xml 을 팝업창으로 호출함
                let oView = this.getView();
                let oDialog = this.byId("idDialog");
                let oInput = this.byId("idInput");  // View 에서 idInput 인 ID 를 가진 Element 를 찾음
                let name = oInput.getValue();      // 해당 Element 의 getValue 에 메소드를 실행함

                if( oDialog ){

                    // 팝업창의 텍스트 Element 중 ID 가 idNameText 인 항목을 찾아서
                    let oNameText = this.byId("idNameText");
                    // 이름이 입력된 입력 필드의 값을 전달함
                    oNameText.setText(name);   

                    oDialog.open(); // Fragment 를 Load 한 적 있으면 byId 로 찾아라
                                    // 그렇게 찾은 Fragment 를 팝업으로 보여줌
                } else {
                    // Popup.fragment.xml 파일을 읽어오기
                    // Controller 도 연결함
                    let oFragment = sap.ui.core.Fragment.load({
                        id: oView.getId(),
                        name: "sync.e05.exercise8.view.Popup",
                        type: "XML",
                        controller: this

                    })

                    // Fragment Load 가 완료되면 Main View 에 연결함
                    // (Main View 의 모델도 이용 가능)
                    oFragment.then( function( oDialog ){
                        oView.addDependent(oDialog)  // View 에 연결

                        let oNameText = oView.byId("idNameText");
                        oNameText.setText(name);
                        oDialog.open();  // 팝업창 출력
                    });
                }
            },


            onDialogClose: function(){
                let oDialog = this.byId("idDialog");
                if(oDialog){
                    oDialog.close(); //  팝업창 닫기
                }
            }
        });
    });
