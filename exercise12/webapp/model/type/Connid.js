sap.ui.define([
        "sap/ui/model/SimpleType",
        "sap/ui/model/ValidateException"
    ], 
    
    function(SimpleType, ValidateException) {
        'use strict';
        return SimpleType.extend("sync.e05.exercise12.model.type.Connid", {

            formetValue: function( oValue ){
                // 입력된 값 그대로 화면에 출력할 경우
                return oValue;
            },

            parseValue: function( oValue ){
                // 화면의 값을 저장할 때 어떻게 변경해서 저장할 것인가
                return oValue;
            },

            vaildateValue: function( oValue ){
                if( /\d{4}$/.test( oValue ) ){
                    // oValue 는 숫자 4개로 구성되어 있음

                } else {
                    // oValue 는 숫자 4개로 구성되어있지 않음
                    // 오류다!!
                    // ABAP 에서는 raise exception과 동일
                    throw new ValidateException("항공편은 숫자 4자리로 입력해주세요~");
                }
            }
        });
    }
);