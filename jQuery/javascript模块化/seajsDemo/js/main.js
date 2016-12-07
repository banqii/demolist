define(function(require, exports, module){
	require('jquery');
	console.log(1111);

	var index = require.async('index',function(index_callback){
		console.log(index_callback);
	});
});