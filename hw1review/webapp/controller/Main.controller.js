sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/Fragment"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast, Fragment) {
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


                // Fragment 의 Dialog 오픈
                let oView = this.getView();
                let oDialog = oView.byId("idDialog");
                // oDialog = this.byid("idDialog");

                // 선택한 라인의 경로를 현재 화면에 지정해줌
                let currentModelPath = oContext.getPath();
                oView.bindElement(currentModelPath);

                if(oDialog) {
                    // Main 화면에 있을 때
                    oDialog.opne();

                } else{
                    // Main 화면에 없을 때
                    Fragment.load({
                        id: oView.getId(),
                        name: "sync.e05.hw1review.view.Info",
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
