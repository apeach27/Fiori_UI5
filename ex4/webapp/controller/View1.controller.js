sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("sync.e05.ex4.controller.View1", {
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
                oModel.resetChanges();
            },
            

            onSave: function(){
                let oView = this.getView();
                let oTable = oView.byId("idTable");
                let aIndex = oTable.getSelectedIndices();

                if( !aIndex || aIndex.length == 0 ){
                    sap.m.MessageBox.information("저장할 데이터를 선택하세요")
                    return; // 중단

                }
                
                let oModel = oView.getModel();
                let successCount = 0; 
                let errorCount = 0;   

                for( const index of aIndex ){
                    let oContext = oTable.getContextByIndex(index);
                    let carrid = oContext.getProperty("Carrid");
                    let path = oContext.getPath();
                    let data = oContext.getProperty();

                    oModel.update(path, data, {
                        success: function(){
                            successCount ++;

                            if( aIndex.length == successCount ){
                                sap.m.MessageBox.success(successCount + " 건의 데이터 변경 완료");

                            }else if( aIndex.length == successCount + errorCount ){
                                // 일부 에러가 발생
                                sap.m.MessageBox.warning("성공횟수 : " + successCount + "건," + "실패횟수 :" + errorCount + "건 발생")
                            }
                        }, 
                        error: function(){
                            errorCount++;

                            if( aIndex.length == errorCount ){
                                sap.m.MessageBox.eror(errorCount + " 건의 데이터 변경 실패");

                            } else if( aIndex.length == successCount + errorCount ){
                                sap.m.MessageBox.warning("성공횟수 : " + successCount + "건," + "실패횟수 :" + errorCount + "건 발생")
                            }

                        }
                    });
                }

            }
        });
    });
