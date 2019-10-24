import React from 'react';
import LeftMenu from '../LeftMenu'
import OfertarVaga from '../OfertarVaga/OfertarVaga'
import styled from 'styled-components'
import OfertaDetalhada from './OfertaDetalhada'

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
    constructor(props){
        super(props);
        this.state = {
			jobSelected: {},
			jobShown: true
        }
	}
	
	saveToRender = (object) => {
		this.setState(object)
		this.state.jobShown ? this.setState({jobShown: false}) : this.setState({jobShown: true})
	}

    render(){

		let componentOferta = ''

		this.state.jobShown ?
		 componentOferta = <OfertaDetalhada jobSelected={this.state.jobSelected} showJob={false} /> : 
		 componentOferta = <OfertaDetalhada jobSelected={this.state.jobSelected} showJob={true} />

		console.log(componentOferta);

        return(

            <MainContainer>
				<OfertarVaga goBack={this.props.goBack} />

				<MainSection>
					<LeftMenu saveToRender={this.saveToRender}/>
					{componentOferta}
				</MainSection>

            </MainContainer>
        )
    }
}

export default ContainerEmpregador;