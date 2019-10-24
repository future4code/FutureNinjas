import React from 'react'
import { TelaInicial } from './TelaInicial';
import CardEmprego from './Trabalhador/CardEmprego'
import Jobs from './Jobs';
import { LeftMenu } from './LeftMenu'; //não sei qual o nome, ainda


export class AppContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentWindow: <TelaInicial 
								loadJobs={this.loadJobs} 
								loadEmpregador={this.loadEmpregador}
							/>
		}
	}

	loadJobs = () => {
		this.setState({
			currentWindow: <Jobs goBack={this.goBackToStartScreen}/>
		})
	}

	loadEmpregador = () => {
		//até termos o componente certo pra carregar:
		this.setState({
			currentWindow: <LeftMenu goBack={this.goBackToStartScreen}/>
		})
	}

	goBackToStartScreen = () => {
		this.setState({
			currentWindow: <TelaInicial loadJobs={this.loadJobs} loadEmpregador={this.loadEmpregador}/>
		});
	}

	render() {
		return (this.state.currentWindow)
	}
}