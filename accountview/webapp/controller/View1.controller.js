sap.ui.define([
    "sap/ui/core/mvc/Controller",    
    "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/Sorter",
	"sap/m/MessageBox",
	"sap/f/library"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, FilterOperator, Sorter, MessageBox, fioriLibrary) {
        "use strict";

        return Controller.extend("sync.zeb.accountview.controller.View1", {
            onInit: function () {
                this.oView = this.getView();
                this._bDescendingSort = false;
                this.oCarrierTable = this.oView.byId("idCarrierTable");
                this.oRouter = this.getOwnerComponent().getRouter();
            },

            onSearch: function (oEvent) {
                    
                var oTableSearchState = [],
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
                var oItem = oEvent.getSource(),
                oCtx = oItem.getBindingContext(),
                sBelnrD = oCtx.getProperty("BelnrD"),
                sBukrs = oCtx.getProperty("Bukrs"),
                sGjahr = oCtx.getProperty("Gjahr");
                // debugger;
                var oFCL = this.oView.getParent().getParent();
                oFCL.setLayout(fioriLibrary.LayoutType.TwoColumnsMidExpanded);

                this.oRouter.navTo("detail", {
                    BelnrD: sBelnrD,
                    Bukrs: sBukrs,
                    Gjahr: sGjahr,
                    layout: fioriLibrary.LayoutType.TwoColumnsMidExpanded
                });
                    // var oFCL = this.oView.getParent().getParent();
                    // oFCL.setLayout(fioriLibrary.LayoutType.TwoColumnsMidExpanded);

            }
        });
    });
