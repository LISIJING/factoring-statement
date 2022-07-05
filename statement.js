const Invoice = require('./Invoice');
const { createCalculator } = require('./util');

function statement(invoice, plays) {
	const invoiceInstance = new Invoice(invoice);
	let result = `Statement for ${invoiceInstance.customer}\n`;
	result += getPerformanceDetails(invoice, plays);
	result += `Amount owed is ${formatUSD(
		invoiceInstance.getTotalAmount(plays)
	)}\n`;
	result += `You earned ${invoiceInstance.getTotalCredits(plays)} credits\n`;
	return result;
}

module.exports = statement;

function getPerformanceDetails(invoice, plays) {
	let details = '';
	for (let perf of invoice.performances) {
		const play = plays[perf.playID];
		details += `  ${play.name}: ${formatUSD(
			createCalculator(play.type).getAmount(perf)
		)} (${perf.audience} seats)\n`;
	}
	return details;
}

function formatUSD(number) {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 2
	}).format(number / 100);
}
