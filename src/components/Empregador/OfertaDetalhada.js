import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import styled from 'styled-components';
import logo from '../../logo_ninja.svg';

const MainCardStyled = styled(Card)`
	width: 80%;
	margin: 5%;
	background: #b98fff;
`

const CardHeaderStyled = styled(CardHeader)`
	background: #8762D1;
	text-align: center;
	span{
		color: white;
		font-weight: bold;
	};
`

const CardContentStyled = styled(CardContent)`
	background: #b98fff;
`

const TypographyStyled = styled(Typography)`
	color: white;
`

const TopSectionDiv = styled.div`
	margin: 3%;
	display: flex;
	justify-content: space-evenly;
`

const TopSectionCard = styled(Card)`
	width: 15vw;
`

const BottomSectionDiv = styled.div`
	margin: 3%;
	display: flex;
	justify-content: center;
`

const BottomSectionCard = styled(Card)`
	width: 56vw;
`

const NoJobSelected = styled.div`
	width: 80%;
	margin: 5%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`

const ImgLogo = styled.img`
	width: 20vw;
`

class OfertaDetalhada extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		}
	}


	render() {

		const jobCard = this.props.showJob

		if (jobCard) {
			return (
				<MainCardStyled>
					<CardHeaderStyled
						title={this.props.jobSelected.title}
					/>
					<Divider />
					<CardContent>

						<TopSectionDiv>
							<TopSectionCard>
								<CardHeaderStyled
									title='Forma de pagamento'
								/>
								<Divider />
								<CardContentStyled>
									<TypographyStyled variant='h6' align='center'> {this.props.jobSelected.paymentMethods}</TypographyStyled>
								</CardContentStyled>
							</TopSectionCard>

							<TopSectionCard>
								<CardHeaderStyled
									title='Valor'
								/>
								<Divider />
								<CardContentStyled color="primary">
									<TypographyStyled variant='h6' align='center'>R$ {Number(this.props.jobSelected.value).toFixed(2)}</TypographyStyled>
								</CardContentStyled>
							</TopSectionCard>

							<TopSectionCard>
								<CardHeaderStyled
									title='Prazo'
								/>
								<Divider />
								<CardContentStyled>
									<TypographyStyled variant='h6' align='center'>{new Date(this.props.jobSelected.dueDate).toLocaleDateString()}</TypographyStyled>
								</CardContentStyled>
							</TopSectionCard>
						</TopSectionDiv>


						<BottomSectionDiv>
							<BottomSectionCard>
								<CardHeaderStyled
									title='Descrição'
								/>
								<Divider />
								<CardContentStyled>
									<TypographyStyled variant='h6' align='center'>{this.props.jobSelected.description}</TypographyStyled>
								</CardContentStyled>
							</BottomSectionCard>
						</BottomSectionDiv>

					</CardContent>
				</MainCardStyled>
			)
		} else {
			return (
				<NoJobSelected>
					<ImgLogo src={logo} />
					<h1>Selecione uma oferta já cadastrada ou crie uma nova.</h1>
				</NoJobSelected>
			)
		}
	}
}

export default OfertaDetalhada;