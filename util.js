const TragedyCalculator = require('./tragedyCalculator');
const ComedyCalculator = require('./ComedyCalculator');

const createCalculator = function (type) {
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
};

module.exports = { createCalculator };
