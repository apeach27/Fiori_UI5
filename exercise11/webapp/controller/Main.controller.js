sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("sync.e05.exercise11.controller.Main", {
            onInit: function () {

            },

            onSelectionChange: function( oEvent ){
                // 선택한 Item 정보를 Event 로 부터 가져옴
                let onItem = oEvent.getParameter("listItem");

                // 선택한 라인에서 출력되는 데이터의 Model의 값 정보
                let oContext = onItem.getBindingContext();

                // 해당 Model 내용의 Carrid 속성을 화면에 출력
                sap.m.MessageToast.show(oContext.getProperty("Carrid"));

                // 선택한 라인의 접근 경로
                let selectedPath = oContext.getPath();

                // 항공편이 보이는 Table의 ID 로 화면 구성 요소를 찾음
                let oConnTable = this.byId("idConnTable");

                // 선택한 라인의 접근 경로를 현재 경로로 취급하도록
                // 테이블에 bindElement 메소드 호출
                // 이렇게 테이블에서 현재 경로를 설정하면
                // item 에 적은 {toConnection} 은
                // {선택한 항공사/toConnection} 이라고 적은 것과 같도록 됨
                oConnTable.bindElement(selectedPath);
            }
        });
    });
