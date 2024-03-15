/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"ui5_table_fragment/ze05_gw_hw1/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
