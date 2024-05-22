sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/ui/model/json/JSONModel",
    ],
    function(BaseController, JSONModel, Controller) {
      "use strict";
  
      return BaseController.extend("sync.zeb.accountview.controller.App", {
        onInit: function() {
          this.oOwnerComponent = this.getOwnerComponent();
          this.oRouter = this.oOwnerComponent.getRouter();
          this.oRouter.attachRouteMatched(this.onRouteMatched, this);
        },
            
        onRouteMatched: function (oEvent) {
          let sRouteName = oEvent.getParameter("name"),
              oArguments = oEvent.getParameter("arguments");
    
          // Save the current route name
          this.currentRouteName = sRouteName;
          this.currentCarrid = oArguments.BelnrD;
        },
    
        onStateChanged: function (oEvent) {
          let bIsNavigationArrow = oEvent.getParameter("isNavigationArrow"),
            sLayout = oEvent.getParameter("layout");
    
          // Replace the URL with the new layout if a navigation arrow was used
          if (bIsNavigationArrow) {
            this.oRouter.navTo(
              this.currentRouteName, 
              { layout: sLayout, 
                BelnrD: this.currentCarrid
              }, true);
          }
        },
    
        onExit: function () {
          this.oRouter.detachRouteMatched(this.onRouteMatched, this);
        }
      });
    }
  );
  