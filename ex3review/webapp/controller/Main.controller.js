sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("sync.e05.ex3review.controller.Main", {
            onInit: function () {

                let data = {
                    Data: {
                        Carrid: "",
                        Connid: "0",
                        Countryfr: "",
                        Cityfrom: "",
                        Airpfrom: "",
                        Countryto: "",
                        Cityto: "",
                        Airpto: "",
                        Distance: "0",
                        Distid: "KM"
                    },
                    DistanceUnit: [
                        {key: "KM", name: "킬로미터"},
                        {key: "MI", name: "마일"}
                    ]
                }

                let oModel = new sap.ui.model.json.JSONModel(data);
                this.getView().setModel(oModel, "new");

                

            },

            onCreate: function(){
                sap.m.MessageToast.show('신규생성 버튼 클릭');

                let oView = this.getView();
                let oDialog = oView.byId("idDialog");

                if ( oDialog ) {
                    oDialog.open();
                } else {
                    sap.ui.core.Fragment.load({
                        id: oView.getId(),
                        name: 'sync.e05.ex3review.view.New',
                        type: 'XML',
                        controller: this
                    }).then(function(oDialog){
                        oView.addDependent(oDialog);
                        oDialog.open();
                    });
                }

            },

            onClose: function(){
                this.byId("idDialog").close();
 
            },

            onSave: function(){
                let oView = this.getView();
                let oModel = oView.getModel(); // SAP Gateway와 연결된 Model
                let oNewModel = oView.getModel("new"); // JSON Model 팝업의 Input 데이터를 담당
                
                let newData = oNewModel.getProperty("/Data");

                // create(경로 (엔티티셋), 신규데이터, 결과처리 )
                oModel.create(
                    "/ConnectionSet",
                    newData,
                    {success: function( oData, oReponse ){
                        sap.m.MessageBox.success(oData.Carrid + "," + oData.Connid + " 생성완료")
                        debugger;
                    }, 
                    error: function( oError ){
                        console.error("생성중 오류 발생");
                        console.error(oError);
                        sap.m.MessageBox.error( "생성중 오류 발생" );

                    }} 
                );
                this.byId("idDialog").close();
                this.onInit();
            },

            onDelete: function(){
                sap.m.MessageToast.show("삭제 버튼 클릭");

                let oView = this.getView();
                let oTable =  oView.byId('idTable');

                // 선택된 행에 대한 인덱스 정보를 
                // 배열로 전달함
                let aIndex = oTable.getSelectedIndices();

                // aIndex가 없을 수도 있고, 한줄도 없을 수도 있음
                if( !aIndex || aIndex.length == 0 ){
                    sap.m.MessageBox.information("삭제할 데이터가 선택되지 않았습니다.");
                
                } else{
                    sap.m.MessageBox.confirm(aIndex.length+"개의 행을 선택했습니다. 삭제할까요?", {
                        onClose: function( oAction ){
                            if( oAction == sap.m.MessageBox.Action.OK ){
                                sap.m.MessageBox.show("삭제 성공");
                                let oModel = oView.getModel();
                                
                                for( const vIndex of aIndex ){
                                    let oContext = oTable.getContextByIndex(vIndex);
                                    let path = oContext.getPath();
                                    // sap.m.MessageBox.show(path);

                                    oModel.remove(path, {});
                                }

                                oTable.clearSelection();

                            } else{
                                sap.m.MessageBox.show("삭제 취소");

                            }
                        }
                    });
                }
            }
        });
    });
