sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel" // 화면구현을 위한 정의

],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("sync.e05.jsonmodel.controller.Main", {
            onInit: function () {
                let data = {
                    firstName: "John",  // 문자열
                    enabled: true       // boolean 타입
                };

                // sap.ui.mode.json.JSONModel 의 객체가 생성되면서
                // 동시에 data 변수에 기록된 Structure 정보가 
                // Model 의 데이터로 전달됨
                let oModel = new JSONModel(data);

                // 이 Controller 와 연결된 View 의 기본 모델로 설정
                this.getView().setModel(oModel);

            }
        });
    });
