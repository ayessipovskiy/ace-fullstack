async function postJiraExpression(options) {
	let {context, expression}=options;
	console.log("posting...");
	console.log({expression});

	let request = {
		"expression": expression,
		"context":    {
			"issue": {
				"key": context
			}
		}
	};
	// eslint-disable-next-line no-mixed-spaces-and-tabs
	return new Promise((resolve, reject) => {
		// eslint-disable-next-line no-undef
	AP.request({
				   // eslint-disable-next-line no-mixed-spaces-and-tabs
				   // eslint-disable-next-line
				   url:     "/rest/api/2/expression/eval?expand=meta.complexity",
				   type:    "POST", contentType: "application/json",
				   data:    JSON.stringify(request),
				   success: function (responseText) {
					   // eslint-disable-next-line no-undef
					   resolve(JSON.parse(responseText));
				   },
				   error:   function (xhr, statusText, errorThrown) {
					   errorMsg = JSON.stringify(errorThrown);
					   reject(JSON.parse(errorThrown));
				   }
			   });
	})
	//return {key1:"value1"}
}

module.exports = {
	postJiraExpression
};
