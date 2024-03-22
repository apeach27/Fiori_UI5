sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Fragment) {
        "use strict";

        return Controller.extend("sync.e05.ex2.controller.View1", {
            onInit: function () {

            },
            onSelectionChange: function( oEvent ){
                let oListItem = oEvent.getParameter("listItem");
                let oContext = oListItem.getBindingContext();

                // Fragment 의 Dialog 오픈
                let oView = this.getView();
                let oDialog = oView.byId("idDialog");

                // 선택한 라인의 경로를 현재 화면에 지정해줌
                let currentModelPath = oContext.getPath();
                oView.bindElement(currentModelPath);

                if(oDialog) {
                    // Main 화면에 있을 때
                    oDialog.open();
                    alert();

                } else{
                    // Main 화면에 없을 때
                    Fragment.load({
                        id: oView.getId(),
                        name: "sync.e05.ex2.view.Conn",
                        type: "XML",
                        controller: this
                    }).then(
                        function(oDialog){
                            oView.addDependent(oDialog);
                            oDialog.open();
                        }
                    );
                }
            },

            // 닫기버튼 구현
            onClosePress: function(){
                let oDialog = this.byId("idDialog");
                if(oDialog){
                    oDialog.close(); //  팝업창 닫기
                }
            }
        });
    });
