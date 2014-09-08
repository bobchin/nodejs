
exports.hash = function(val) {
	var result = '';
	if (val != '') {
		var shasum = require('crypto').createHash('sha512');

		shasum.update('initialhash');
		shasum.update(val);
		result = shasum.digest('hex');
	}
	return result;
};

