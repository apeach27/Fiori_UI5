sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("sync.e05.odatamodelmultidelete.controller.Main", {
            onInit: function () {

                let data = {
                    Currency:[
                        {Key:"KRW", Name:"원화"},
                        {Key:"USD", Name:"달러"},
                        {Key:"EUR", Name:"유로"},
                        {Key:"AUD", Name:"호주"},
                        {Key:"CAD", Name:"캐나다"},
                    ]
                };

                let oViewModel = new JSONModel(data);
                this.getView().setModel(oViewModel, "view");

            },

            onDelete: function(){
                let oTable =  this.byId("idTable"); // View 에서 id 속성 값이 idTable 인 항목을 찾음
                
                let aIndex = oTable.getSelectedIndices();

                if (!aIndex || aIndex.length == 0){ // 선택된 항목이 없을 때
                    sap.m.MessageBox.information("삭제할 라인을 선택하세요");
                    return; // 메세지 출력 후 중단

                }
                // console.log(oTable.getContextByIndex(3));
                // console.log(aIndex);

                // oData 모델을 View 에서 가져옴
                let oModel =  this.getView().getModel();

                // const 는 상수를 선언하는 방법, 상수는 값이 변경되지 않음
                for( const index of aIndex ){
                    // 선택된 라인들 중 순서대로 하나씩 모델 연결 정보를 가져옴
                    let oSelectedContext = oTable.getContextByIndex(index);
                    let carrid = oSelectedContext.getProperty("Carrid");

                    // 해당 모델의 정보에 대한 경로
                    let path =  oSelectedContext.getPath();

                    // oData 모델의 remove(경로, 결과처리) 메소드를 이용하면,
                    // 해당 데이터를 삭제명령 보낼 수 있음
                    // 해당 삭제명령의 경우 sap Gateway 의 YE05_GW005 의
                    // Carrierset_delete_entity 메소드가 실행됨

                    oModel.remove(path, {
                        success: function(){
                            // Exception 이 발생하지 않은 경우
                            sap.m.MessageBox.success( carrid + "삭제 성공");
                            oTable.clearSelection();                            

                        },
                        error: function(oError){
                            // 삭제 중 Exception 이 발생한 경우
                            sap.m.MessageBox.error("삭제 오류 발생");
                        }
                    });
                }
            }
        });
    });
