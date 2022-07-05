module.exports = class PerformanceCalculator {
	constructor() {}
	getAmount(perf) {}
	getVolumeCredits(perf) {
		return Math.max(perf.audience - 30, 0);
	}
};
