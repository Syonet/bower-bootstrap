!function( $, ng ) {
	"use strict";

	ng.module( "syonet" ).directive( "syoMaskOverride", function() {
		var definition = {};

		definition.restrict = "A";
		definition.require = "ngModel";
		definition.priority = 1000;

		definition.link = function( $scope, $element, $attr, ngModel ) {
			var viewValue;
			var mask = $attr.uiMask || "";
			var optional = mask.indexOf( "?" );

			if ( !mask ) {
				return;
			}

			ngModel.$parsers.push( parser );

			function parser() {
				var unfilledIndex;
				viewValue = ngModel.$viewValue;

				// Se tem parte da mascara que é opcional e não foi preenchida, corta até ela
				// e fica com o que tem antes
				unfilledIndex = viewValue.indexOf( "_", optional );
				if ( ~optional && ~unfilledIndex ) {
					viewValue = viewValue.substring( 0, unfilledIndex );
				}

				return viewValue;
			}
		};

		return definition;
	});

}( jQuery, angular );