/*
	Projection by TEMPLATED
	templated.co @templatedco
	Released for free under the Creative Commons Attribution 3.0 license (templated.co/license)
*/

function formatCurrency(amount) {
	return `$${parseFloat(amount).toFixed(2)}`
}

function writeData (title, value) {
	return `<strong><small>${title}:</strong> ${value}</small><br>`
}

function getIntDifference (value1, value2) {
	return Math.abs(value1 - value2)
}

function calculate(event) {
	event.preventDefault()
	var baseResultsDiv = document.querySelector('#base-results')
	var summaryResultsDiv = document.querySelector('#summary-results')
	
	var formDataArr = $('#cost-estimator-form').serializeArray()
	var formData = {}
	$(formDataArr).each(function (index, obj) {
		formData[obj.name] = parseFloat(obj.value)
	})
	
	console.log(formData)

	var costPerMonth = formData["rental-cph"] * formData["hours-per-month"]
	var rentalCostPerYear = costPerMonth * 12
	var hoursPerYear = formData["hours-per-month"] * 12
	var currentCostsDiv = document.createElement('div')
	currentCostsDiv.id = "current-cost-result"
	// currentCostsDiv.className = "container"
	currentCostsDiv.innerHTML = 
		`<h3>Current Costs</h3>\
${writeData("Rental Cost per Hour", formatCurrency(formData["rental-cph"]))}\
${writeData("Hours Flown per Month", formData["hours-per-month"])}\
${writeData("Hours Flown per Year", hoursPerYear)}\
<br>\
${writeData("Cost per Month", formatCurrency(costPerMonth))}\
${writeData("Cost per Year", formatCurrency(costPerMonth * 12))}`


	var annualLoanCosts = formData["loan-per-month"] * 12
	var annualStorageCosts = formData["stor-costs"] * 12
	var annualFixedCosts = annualLoanCosts + formData["insur-costs"] + formData["inspe-costs"] + annualStorageCosts + formData["incid-costs"]
	var fixedCostsDiv = document.createElement('div')
	fixedCostsDiv.id = "fixed-cost-result"
	// fixedCostsDiv.className = "container"
	fixedCostsDiv.innerHTML = 
		`<h3>Fixed Costs</h3>\
${writeData("Monthly Loan Payments", formatCurrency(formData["loan-per-month"]))}\
${writeData("Annual Loan Payments", formatCurrency(annualLoanCosts))}\
${writeData("Annual Insurance Costs", formatCurrency(formData["insur-costs"]))}\
${writeData("Annual Inspection Costs", formatCurrency(formData["inspe-costs"]))}\
${writeData("Monthly Storage Costs", formatCurrency(formData["stor-costs"]))}\
${writeData("Annual Storage Costs", formatCurrency(annualStorageCosts))}\
${writeData("Incidentals", formatCurrency(formData["incid-costs"]))}\
<br>\
${writeData("Annual Fixed Costs", formatCurrency(annualFixedCosts))}`

	var fuelCostPerHour = formData['fuel-burn-rate'] * formData['fuel-cost']
	var totalOperatingCost = fuelCostPerHour + formData['oil-cost'] + formData['engine-fund'] + formData['prop-fund']
	var operatingCostsDiv = document.createElement('div')
	operatingCostsDiv.id = "operating-cost-result"
	// operatingCostsDiv.className = "container"
	operatingCostsDiv.innerHTML = 
		`<h3>Hourly Operating Costs</h3>\
${writeData("Fuel Burn Rate", `${formData['fuel-burn-rate']} gallons/hour`)}\
${writeData("Fuel Cost", formatCurrency(formData['fuel-cost']))}\
${writeData("Fuel Cost per Hour", formatCurrency(fuelCostPerHour))}\
${writeData("Oil Cost per Hour", formatCurrency(formData['oil-cost']))}\
${writeData("Engine Overhaul Fund per Hour", formatCurrency(formData['engine-fund']))}\
${writeData("Prop Overhaul Fund per Hour", formatCurrency(formData['prop-fund']))}\
<br>\
${writeData("Total Operating Cost per Hour", formatCurrency(totalOperatingCost))}`

	baseResultsDiv.innerHTML = ""
	baseResultsDiv.appendChild(currentCostsDiv)
	baseResultsDiv.appendChild(fixedCostsDiv)
	baseResultsDiv.appendChild(operatingCostsDiv)

	var realHourlyOperatingCost = (annualFixedCosts/hoursPerYear) + totalOperatingCost
	var annualOwnershipCost = (totalOperatingCost * hoursPerYear) + annualFixedCosts
	var hourlyCostDelta = getIntDifference(realHourlyOperatingCost, formData['rental-cph'])
	var annualCostDelta = getIntDifference(annualOwnershipCost, rentalCostPerYear)
	var isRentingCheaper = rentalCostPerYear < annualOwnershipCost
	var finalStatement = `It looks like you stand to save ${formatCurrency(hourlyCostDelta)}/hr, or ${formatCurrency(annualCostDelta)}/yr, by ${isRentingCheaper ? "continuing to rent." : "purchasing your own plane."}`
	
	var summaryDiv = document.createElement('div')
	summaryDiv.id = "summary-result"
	summaryDiv.innerHTML =
		`<h3>Bottom Line</h3>\
${writeData("Real Cost per Hour", `${formatCurrency(realHourlyOperatingCost)}/hr`)}\
<small>(Annual Fixed Costs/Hours Flown per Year) + Total Operating Cost per Hour</small><br>\
<small>(${annualFixedCosts}/${hoursPerYear}) + ${totalOperatingCost}</small><br>\
<br>\
${writeData("Total Cost of Ownership per Year", formatCurrency(annualOwnershipCost))}\
<small>(Total Operating Cost per Hour * Hours Flown per Year) + Annual Fixed Costs</small><br>\
<small>(${totalOperatingCost} * ${hoursPerYear}) + ${annualFixedCosts}</small><br>\
<br>\
<strong><small>${finalStatement}</small></strong>
`

	summaryResultsDiv.innerHTML = ""
	summaryResultsDiv.appendChild(summaryDiv)
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
