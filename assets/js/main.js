/*
	Projection by TEMPLATED
	templated.co @templatedco
	Released for free under the Creative Commons Attribution 3.0 license (templated.co/license)
*/

function calculate(event) {
	event.preventDefault()
	
	var resultsDiv = document.querySelector('#results')
	var formDataArr = $('#cost-estimator-form').serializeArray()
	var formData = {}
	$(formDataArr).each(function (index, obj) {
		formData[obj.name] = parseInt(obj.value)
	})
	
	console.log(formData)

	var costPerMonth = formData["rental-cph"] * formData["hours-per-month"]
	var costPerYear = costPerMonth * 12
	var currentCostsDiv = document.createElement('div')
	currentCostsDiv.id = "current-cost-result"
	currentCostsDiv.innerHTML = 
		`<h3>Current Costs</h3>\
<strong><small>Rental Cost per Hour:</strong> ${formData["rental-cph"]}</small><br>\
<strong><small>Hours Flown per Month:</strong> ${formData["hours-per-month"]}</small><br>\
<br>
<strong><small>Cost per Month:</strong> ${costPerMonth}</small><br>\
<strong><small>Cost per Year:</strong> ${costPerYear}</small>`


	var annualLoanCosts = formData["loan-per-month"] * 12
	var annualStorageCosts = formData["stor-costs"] * 12
	var annualFixedCosts = annualLoanCosts + formData["insur-costs"] + formData["inspe-costs"] + annualStorageCosts + formData["incid-costs"]
	var fixedCostsDiv = document.createElement('div')
	fixedCostsDiv.id = "fixed-cost-result"
	fixedCostsDiv.innerHTML = 
		`<h3>Fixed Costs</h3>\
<strong><small>Monthly Loan Payments:</strong> ${formData["loan-per-month"]}</small><br>\
<strong><small>Annual Loan Payments:</strong> ${annualLoanCosts}</small><br>\
<strong><small>Annual Insurance Costs:</strong> ${formData["insur-costs"]}</small><br>\
<strong><small>Annual Inspection Costs:</strong> ${formData["inspe-costs"]}</small><br>\
<strong><small>Monthly Storage Costs:</strong> ${formData["stor-costs"]}</small><br>\
<strong><small>Annual Storage Costs:</strong> ${annualStorageCosts}</small><br>\
<strong><small>Incidentals:</strong> ${formData["incid-costs"]}</small><br>\
<br>\
<strong><small>Total Annual Cost:</strong> ${annualFixedCosts}</small>`

	resultsDiv.appendChild(currentCostsDiv)
	resultsDiv.appendChild(fixedCostsDiv)
}

(function($) {

	// Breakpoints.
		skel.breakpoints({
			xlarge:	'(max-width: 1680px)',
			large:	'(max-width: 1280px)',
			medium:	'(max-width: 980px)',
			small:	'(max-width: 736px)',
			xsmall:	'(max-width: 480px)'
		});

	$(function() {

		var	$window = $(window),
			$body = $('body');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-loading');
				}, 100);
			});

		// Prioritize "important" elements on medium.
			skel.on('+medium -medium', function() {
				$.prioritize(
					'.important\\28 medium\\29',
					skel.breakpoint('medium').active
				);
			});

		document.getElementById('cost-estimator-form').onsubmit = calculate

	// Off-Canvas Navigation.

		// Navigation Panel.
			$(
				'<div id="navPanel">' +
					$('#nav').html() +
					'<a href="#navPanel" class="close"></a>' +
				'</div>'
			)
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'left'
				});

		// Fix: Remove transitions on WP<10 (poor/buggy performance).
			if (skel.vars.os == 'wp' && skel.vars.osVersion < 10)
				$('#navPanel')
					.css('transition', 'none');

	});

})(jQuery);
