sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/ui/model/BindingMode',
    'sap/ui/model/json/JSONModel',
    'sap/viz/ui5/format/ChartFormatter',
    'sap/viz/ui5/api/env/Format',   
    "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, BindingMode, JSONModel, ChartFormatter, Format, Filter, FilterOperator) {
        "use strict";

        return Controller.extend("sync.zeb.glchart.controller.View1", {
            oVizFrame : null,

            onInit: function () {
                this.oVizFrame = this.byId("idVizFrame");
                this.oData = this.getView().byId("idVizFrame"); 

            },
            onToggleDataLabel: function () {
                let oVizFrame = this.byId("idVizFrame");
                let bCurrentState = oVizFrame.getVizProperties().plotArea.dataLabel.visible;
                oVizFrame.setVizProperties({
                    plotArea: {
                        dataLabel: {
                            visible: !bCurrentState
                        }
                    }
                });
            },

            onToggleChartType: function () {
                let oVizFrame = this.byId("idVizFrame");
                let sCurrentType = oVizFrame.getVizType();
                let sNewType = (sCurrentType === "bar") ? "donut" : "bar";
                oVizFrame.setVizType(sNewType);
            },            
                
            onDate: function (oEvent) {
            //     let sDate = oEvent.getParameter("value");
            //     let aFilters = [];

            //     if (sDate) {
            //         let oStartDateFilter = new Filter("Budat", FilterOperator.GE, sDate + "-01");
            //         let oEndDateFilter = new Filter("Budat", FilterOperator.LE, sDate + "-31");

            //         aFilters.push(oStartDateFilter, oEndDateFilter);
            //     }

            //     let oBinding = this.oVizFrame.getDataset().getBinding("data");
            //     oBinding.filter(aFilters);
            // }

                let oTableDateState = [],
                    sQuery = oEvent.getParameter("query");
                                
                // 검색어가 input 필드에서 제대로 가져와지는지 확인
                if (!sQuery) {
                    sQuery = oEvent.getSource().getValue();
                }
                if (sQuery && sQuery.length === 7) {
                    let startDate = sQuery + "-01";
                    let endDate = sQuery + "-31";
                   
                    // 필터 생성 (시작일과 종료일 사이)
                    let oStartDateFilter = new Filter("Budat", FilterOperator.GE, startDate);
                    let oEndDateFilter = new Filter("Budat", FilterOperator.LE, endDate);
                    console.log(oStartDateFilter, oEndDateFilter);
                    // 필터 배열에 추가
                    oTableDateState = new Filter({
                        filters: [oStartDateFilter, oEndDateFilter],
                        and: true
                    });
                    console.log(oTableDateState);
                }
                
                // var oDataset = this.oVizFrame.getDataset();
                let oDataset = this.byId("idDataset");
                let oBinding = oDataset.getBinding("data");
                oBinding.filter(oTableDateState, "Application");


            }
        });
    });
