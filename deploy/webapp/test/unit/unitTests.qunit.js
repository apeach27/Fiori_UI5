/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"synce05/deploy/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
