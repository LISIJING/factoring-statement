const TragedyCalculator = require('./tragedyCalculator');
const ComedyCalculator = require('./ComedyCalculator');
const tragedyCalculator = new TragedyCalculator();
const comedyCalculator = new ComedyCalculator();

function statement(invoice, plays) {
	let result = `Statement for ${invoice.customer}\n`;
	result += getPerformanceDetails(invoice, plays);
	result += `Amount owed is ${formatUSD(getTotalAmount(invoice, plays))}\n`;
	result += `You earned ${getTotalCredits(invoice, plays)} credits\n`;
	return result;
}

module.exports = statement;

function getPerformanceDetails(invoice, plays) {
	let details = '';
	for (let perf of invoice.performances) {
		const play = plays[perf.playID];
		let thisAmount = 0;
		let calculator = createCalculator(play.type);
		thisAmount = calculator.getAmount(perf);

		// print line for this order
		details += `  ${play.name}: ${formatUSD(thisAmount)} (${
			perf.audience
		} seats)\n`;
	}
	return details;
}

function createCalculator(type) {
	let calculator;
	switch (type) {
		case 'tragedy':
			calculator = new TragedyCalculator();
			break;
		case 'comedy':
			calculator = new ComedyCalculator();
			break;
		default:
			throw new Error(`unknown type: ${type}`);
	}
	return calculator;
}

function getTotalAmount(invoice, plays) {
	let totalAmount = 0;
	for (let perf of invoice.performances) {
		const play = plays[perf.playID];
		totalAmount += createCalculator(play.type).getAmount(perf);
	}
	return totalAmount;
}

function getTotalCredits(invoice, plays) {
	let volumeCredits = 0;
	for (let perf of invoice.performances) {
		const play = plays[perf.playID];

		volumeCredits += createCalculator(play.type).getVolumeCredits(perf);
	}
	return volumeCredits;
}

function formatUSD(number) {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 2
	}).format(number / 100);
}
