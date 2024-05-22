sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(
	Controller
) {
	"use strict";

	return Controller.extend("sync.zeb.accountview.controller.Detail", {
        onInit: function () {
			var oOwnerComponent = this.getOwnerComponent();

			this.oRouter = oOwnerComponent.getRouter();
			this.oRouter.getRoute("view1").attachPatternMatched(this._onCarrierMatched, this);
			this.oRouter.getRoute("detail").attachPatternMatched(this._onCarrierMatched, this);
		},
        
		_onCarrierMatched: function (oEvent) {
			this._BelnrD = oEvent.getParameter("arguments").BelnrD || this._BelnrD || "";
			this._Bukrs = oEvent.getParameter("arguments").Bukrs || this._Bukrs || "";
			this._Gjahr = oEvent.getParameter("arguments").Gjahr || this._Gjahr || "";
			
			// this._carrid = AA
			// /CarrierSet(' + this._carrid + ') => /CarrierSet('AA')
			// this.getView().bindElement("/CarrierSet('" + this._carrid + "')");
			// ㅠㅠ실패
			// OData 경로에 매개변수를 적용하여 동적으로 데이터를 가져옴
			// let sPath = "/BkpfSet(BelnrD='" + this._BelnrD + "',Bukrs='" + this._Bukrs + "',Gjahr='" + this._Gjahr + "')";
			// 경로를 뷰에 바인딩
			// this.getView().bindElement(sPath);
			// debugger;
			let sPath = "/BkpfSet(BelnrD='" + this._BelnrD + "',Bukrs='" + this._Bukrs + "',Gjahr='" + this._Gjahr + "')";
			this.getView().bindElement(sPath);
		

			// this.getView().bindElement("/BkpfSet('" + this._BelnrD + "')");
			// this.getView().bindElement(sPath);
		},
		onEditToggleButtonPress: function() {
			var oObjectPage = this.getView().byId("ObjectPageLayout"),
				bCurrentShowFooterState = oObjectPage.getShowFooter();

			oObjectPage.setShowFooter(!bCurrentShowFooterState);
		},
		onExit: function () {
			this.oRouter.getRoute("view1").detachPatternMatched(this._onCarrierMatched, this);
			this.oRouter.getRoute("detail").detachPatternMatched(this._onCarrierMatched, this);
		}
	});
});
