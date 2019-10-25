import React from 'react'
import OfertarVaga from './OfertarVaga/OfertarVaga'
import { TelaInicial } from './TelaInicial'
import CardEmprego from './Trabalhador/CardEmprego'
import Jobs from './Jobs'
import { LeftMenu } from './LeftMenu'
import ContainerEmpregador from './Empregador/Empregador'

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
			currentWindow: <Jobs goBack={this.goBackToStartScreen} />
		})
	}

	loadEmpregador = () => {
		this.setState({
			currentWindow: <ContainerEmpregador goBack={this.goBackToStartScreen} />
		})
	}

	goBackToStartScreen = () => {
		this.setState({
			currentWindow: <TelaInicial loadJobs={this.loadJobs} loadEmpregador={this.loadEmpregador} />
		});
	}

	render() {
		return this.state.currentWindow
	}
}
export default AppContainer