define(['require'],function(require){
	require(['index','test'], function(index, test){
		console.log(index.init());
		console.log(test.init());
	});
});