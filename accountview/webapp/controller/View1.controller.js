sap.ui.define([
    "sap/ui/core/mvc/Controller",    
    "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/Sorter",
	"sap/m/MessageBox",
	"sap/f/library",
	"sap/ui/unified/DateTypeRange",
	"sap/ui/core/date/UI5Date"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, FilterOperator, Sorter, MessageBox, fioriLibrary, DateTypeRange, UI5Date) {
        "use strict";

        return Controller.extend("sync.zeb.accountview.controller.View1", {
            onInit: function () {
                this.oView = this.getView();
                this._bDescendingSort = false;
                this.oCarrierTable = this.oView.byId("idCarrierTable");
                this.oRouter = this.getOwnerComponent().getRouter();
            },

            onSearch: function (oEvent) {
                    
                let oTableSearchState = [],
                    sQuery = oEvent.getParameter("query");

                // 검색어가 input 필드에서 제대로 가져와지는지 확인
                if (!sQuery) {
                    sQuery = oEvent.getSource().getValue();
                }
                if (sQuery && sQuery.length > 0) {
                    oTableSearchState = new Filter("BelnrD", FilterOperator.Contains, sQuery);
                }

                this.oCarrierTable.getBinding("items").filter(oTableSearchState, "Application");

            },            
            
            onDate: function (oEvent) {
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

                    // 필터 배열에 추가
                    oTableDateState = new Filter({
                        filters: [oStartDateFilter, oEndDateFilter],
                        and: true
                    });
                }
                
                this.oCarrierTable.getBinding("items").filter(oTableDateState, "Application");


            },

            onSort: function ( oEvent ) {
                // sort 정보를 역으로 바꾸기 위해 ! 를 사용한다.
                // 내림차순인 경우 오름차순으로 바꾸고
                // 오름차순인 경우 내림차순으로 바꾸기 위해 true <=> false 로 전환한다.
                this._bDescendingSort = !this._bDescendingSort;
                let oBinding = this.oCarrierTable.getBinding("items"),
                    oSorter = new Sorter("BelnrD", this._bDescendingSort);

                oBinding.sort(oSorter);
            },

            onListItemPress: function ( oEvent ) {
                let oItem = oEvent.getSource(),
                oCtx = oItem.getBindingContext(),
                sBelnrD = oCtx.getProperty("BelnrD"),
                sBukrs = oCtx.getProperty("Bukrs"),
                sGjahr = oCtx.getProperty("Gjahr");
                // debugger;
                let oFCL = this.oView.getParent().getParent();
                oFCL.setLayout(fioriLibrary.LayoutType.TwoColumnsMidExpanded);

                this.oRouter.navTo("detail", {
                    BelnrD: sBelnrD,
                    Bukrs: sBukrs,
                    Gjahr: sGjahr,
                    layout: fioriLibrary.LayoutType.TwoColumnsMidExpanded
                });
                    // let oFCL = this.oView.getParent().getParent();
                    // oFCL.setLayout(fioriLibrary.LayoutType.TwoColumnsMidExpanded);

            },
            
            onAfterRendering: function () {
                var oViewModel = this.getView().getModel("viewModel");

                this.getView().getModel().read("/CountSet('')", {
                    success: function (oData, oResponse) {
                        oViewModel.setProperty("/inProductionCount", oData.CountProgress);
                    }
                });
            },
        });
    });
