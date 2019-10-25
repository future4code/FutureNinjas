import React from 'react';
import LeftMenu from '../LeftMenu'
import OfertarVaga from '../OfertarVaga/OfertarVaga'
import styled from 'styled-components'
import OfertaDetalhada from './OfertaDetalhada'
import axios from 'axios'

const MainContainer = styled.div`
	min-height: 100vh;
	display: flex;
	flex-direction: column;
`

const MainSection = styled.div`
	display: flex;
	flex-grow: 1;
`


class ContainerEmpregador extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			jobSelected: {},
			jobShown: true,
			jobs: [],

		}
	}

	saveToRender = (object) => {
		this.setState(object)
		this.setState({ jobShown: false })
	}

	saveToState = (object) => {
		this.setState(object)
	}

	getJobs = async () => {
		const res = await axios.get('https://us-central1-missao-newton.cloudfunctions.net/futureNinjas/jobs')
		this.setState({ jobs: res.data.jobs })
	}

	render() {

		let componentOferta = ''

		this.state.jobShown ?
			componentOferta = <OfertaDetalhada getJobs={this.getJobs} jobSelected={this.state.jobSelected} showJob={false} /> :
			componentOferta = <OfertaDetalhada saveToState={this.saveToState} getJobs={this.getJobs} jobSelected={this.state.jobSelected} showJob={true} />

		console.log(componentOferta);

		return (

			<MainContainer>
				<OfertarVaga getJobs={this.getJobs} goBack={this.props.goBack} />

				<MainSection>
					<LeftMenu jobs={this.state.jobs} getJobs={this.getJobs} saveToRender={this.saveToRender} />
					{componentOferta}
				</MainSection>

			</MainContainer>
		)
	}
}

export default ContainerEmpregador;