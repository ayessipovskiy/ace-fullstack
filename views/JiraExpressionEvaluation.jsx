import React from 'react';
import TextArea from "@atlaskit/textarea"
import {postJiraExpression} from "./helpers/requestUtils"

//async functions
// eslint-disable-next-line no-unused-vars
import regeneratorRuntime                         from "regenerator-runtime";

export default class JiraExpressionValidator extends React.Component{
	constructor(props) {
		super(props);

		[
			"onChange","onChangeContext","onSubmit"

		].forEach(functionsToBind => {
			this[functionsToBind] = this[functionsToBind].bind(this);
		});

		this.state={

		};
	}
	onChange(e) {
		console.log("onChange");
		console.log(e.target);

		this.setState({expression: e.target.value});
	}

	onChangeContext(e) {
		console.log("onChange");
		console.log(e.target);

		this.setState({context: e.target.value});
	}
	onSubmit(e) {
		e.preventDefault();

		console.log("Submitting");
		console.log(this.state);
		postJiraExpression({expression:this.state.expression, context:this.state.context})
			.then(resp=> this.setState({result: JSON.stringify(resp,null,2)}))
			.catch(err=> this.setState({result: JSON.stringify(err,null,2)}));
	// this.setState({description: ''});
	}

	render(){
		return(
			<div className="App" style={{ margin: "10px"}}>
				{this.props.title} :)
				<form
					id="main"
					onSubmit={this.onSubmit}>
					<h2>Jira Expression Validator</h2>
					<hr/>
						<p>Context Issue:</p>
						<TextArea
							style={{maxWidth:"150px"}}
							isRequired
							onChange={this.onChangeContext}/>
						<p>Expression:</p>
						{/*<input onChange={this.onChange} type="text" name="expression"/><br/>*/}
						<TextArea
							isRequired
							onChange={this.onChange}/>
					<br/>

					<div className="align-right">
						<button>Submit</button>
					</div>
				</form>
				<br/>
				<div id="result">
					<TextArea
						style={{minHeight:"600px"}}
					value={this.state.result}/>

				</div>
			</div>
		)
	}
}



