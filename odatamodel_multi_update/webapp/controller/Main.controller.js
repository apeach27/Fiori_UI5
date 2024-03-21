sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("sync.e05.odatamodelmultiupdate.controller.Main", {
            onInit: function () {
                let viewData = {
                    EditMode: false
                };

                let oViewModel = new JSONModel(viewData);
                let oView = this.getView();
                oView.setModel(oViewModel, "view");

            },

            onEdit: function(){
                let oViewModel =  this.getView().getModel("view");
                oViewModel.setProperty("/EditMode", true);

            },

            onCancel: function(){
                let oViewModel =  this.getView().getModel("view");
                oViewModel.setProperty("/EditMode", false);

                let oModel = this.getView().getModel();
                oModel.resetChanges(); // 원본 데이터로 복원
            },

            onRefresh: function(){
                let oModel = this.getView().getModel();
                oModel.resetChanges();
                oModel.refresh(true,true);

            },

            onSave: function(){
                let oView = this.getView();
                let oTable = oView.byId("idTable");
                let aIndex = oTable.getSelectedIndices();

                // !aIndex 의 뜻 : aIndex 라는 변수가 없거나, 사용불가능할 때
                // aIndex.lenght == 0 : 사용은 가능하나, 배열이 비어있을 때
                // aIndex 라는 변수가 없거나, 사용 불가능하거나, 
                // 배열이 비어있을 때 if문 실행
                // || --> 또는 (or)
                if( !aIndex || aIndex.length == 0 ){
                    sap.m.MessageBox.information("저장할 데이터를 선택하세요")
                    return; // 중단

                }
                // 여기가 실행되는 것은 aIndex 에 한 줄 이상 있다는 뜻
                let oModel = oView.getModel();
                let successCount = 0; // 성공횟수
                let errorCount = 0;   // 실패횟수

                // 선택한 라인마다 전부 oModel.update(경로, 변경할 데이터, 결과처리);
                // 배열 aIndex 의 인덱스 정보를 index 변수에 전달하면서 반복함
                for( const index of aIndex ){
                    let oContext = oTable.getContextByIndex(index);
                    let carrid = oContext.getProperty("Carrid");
                    let path = oContext.getPath();
                    let data = oContext.getProperty(); // 변경된 데이터 가져옴

                    oModel.update(path, data, {
                        success: function(){
                            successCount ++;

                            if( aIndex.length == successCount ){
                                // 모두 성공했을 경우
                                sap.m.MessageBox.success(successCount + " 건의 데이터 변경 완료");

                            }else if( aIndex.length == successCount + errorCount ){
                                // 일부 에러가 발생
                                sap.m.MessageBox.warning("성공횟수 : " + successCount + "건," + "실패횟수 :" + errorCount + "건 발생")
                            }
                        }, 
                        error: function(){
                            errorCount++;

                            if( aIndex.length == errorCount ){
                                // 모두 실패
                                sap.m.MessageBox.eror(errorCount + " 건의 데이터 변경 실패");

                            } else if( aIndex.length == successCount + errorCount ){
                                // 일부만 성공
                                sap.m.MessageBox.warning("성공횟수 : " + successCount + "건," + "실패횟수 :" + errorCount + "건 발생")
                            }

                        }
                    });
                }

            }
        });
    });
