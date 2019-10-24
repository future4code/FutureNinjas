import React from 'react'
import styled from 'styled-components';
import logoCompleto from '../images/logo_ninja.svg';
import Button from '@material-ui/core/Button';

const BigWrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 100vw;
	height: 100vh;
	margin: auto;	
	align-items: center;
	background-image: url("https://images.unsplash.com/photo-1529400971008-f566de0e6dfc");
	background-repeat: no-repeat;
	background-size: 100%;
`

const MainContainer = styled.div`
	display: flex;
	flex-grow: 0.5;
	margin: auto;
	justify-content: center;
	align-items: center;
	background-color: rgba(245,243,252,0.8);
	width: 50%;
	border: 1px solid darkgray;
	border-radius: 80px;	
`

const Logo = styled.img`
	width: 25%;
	height: auto;
	margin-right: 50px;	
`

const SmallContainer = styled.div`
	margin-left: 50px;
`

const StyledButton = styled(Button)`
	padding: 10px 20px;
	margin: 20px;
`

const StyledH1 = styled.h1`
	margin-left: 20px;
`

const StyledH4 = styled.h1`
	margin-left: 20px;
	font-size: 15pt;
`

export class TelaInicial extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<BigWrapper>
				<MainContainer>
					<Logo src={logoCompleto} alt=""/>
					<SmallContainer>
						<StyledH1>Bem vind@!</StyledH1>
						<StyledH4>O que deseja fazer hoje?</StyledH4>
						<StyledButton 
							variant="contained" 
							color="primary"
							onClick={this.props.loadJobs}
						>
							<strong>buscar <br/> oportunidades</strong>
      					</StyledButton>
						<StyledButton 
							variant="contained" 
							color="primary"
							onClick={this.props.loadEmpregador}
						>
							<strong>oferecer <br/> oportunidades</strong>
      					</StyledButton>
					</SmallContainer>
				</MainContainer>
			</BigWrapper>
		)
	}
}