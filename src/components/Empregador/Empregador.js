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
			jobSelected: {}
        }
	}
	
	saveToRender = (object) => {
		this.setState(object)
	}

    render(){
        return(

            <MainContainer>
				<OfertarVaga />

				<MainSection>
					<LeftMenu saveToRender={this.saveToRender}/>
					<OfertaDetalhada jobSelected={this.state.jobSelected} />
				</MainSection>

            </MainContainer>
        )
    }
}

export default ContainerEmpregador;