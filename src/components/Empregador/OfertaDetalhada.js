import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import styled from 'styled-components';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Edit from '@material-ui/icons/Edit';
import logo from '../../logo_ninja.svg';
import Button from '@material-ui/core/Button';

const MainCardStyled = styled(Card)`
	width: 80%;
	margin: 5%;
	background: #b98fff;
`

const CardHeaderStyled = styled(CardHeader)`
	background: #8762D1;
	display:flex;
	align-items:center;
	span{
		color: white;
		font-weight: bold;
	};
`

const CardContentStyled = styled(CardContent)`
	background: white;

`

const CardContentStyledBottom = styled(CardContent)`
	background: white;
	min-height:30vh;
`

const CardContentStyledFlex = styled(CardContent)`
	display:flex;
	width:100%;
	justify-content:space-evenly;
`

const TypographyStyled = styled(Typography)`
	color: #8762D1;
`

const TopSectionDiv = styled.div`
	display: flex;
	flex-direction:column;
	justify-content: space-evenly;
	width:30%;
`

const HeaderIconDiv = styled.div`
	margin:0 15px;
	margin-top:5px;
	padding:0;
	display:flex;
	justify-content:center;
	align-items:center;
`

const TopSectionCard = styled(Card)`
	margin-bottom:13%;
`

const EditStyle = styled(Edit)`
	margin-right: 10px;
	color:white;
	cursor:pointer;
`

const DeleteForeverIconStyle = styled(DeleteForeverIcon)`
	color:white;
	cursor:pointer;
`

const BottomSectionDiv = styled.div`
	display: flex;
	justify-content: center;

`

const BottomSectionDivAll = styled.div`
	display: flex;
	flex-direction:column;
	width:60%;
`

const ButtonDiv = styled.div`
	display: flex;
	width:100%;
	justify-content:center;
`

const StyledButton = styled(Button)`
	padding: 10px 20px;
	margin: 10% 5%;
	background:white;
	:hover{
		background:#494949;
		color:white;
	}
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
						action={<HeaderIconDiv><EditStyle fontSize='large' /><DeleteForeverIconStyle fontSize='large'/></HeaderIconDiv>}
					/>
					
					<Divider />
					<CardContentStyledFlex>

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


						<BottomSectionDivAll>
						<BottomSectionDiv>
							<BottomSectionCard>
								<CardHeaderStyled
									title='Descrição'
								/>
								<Divider />
								<CardContentStyledBottom>
									<TypographyStyled variant='h6' align='center'>{this.props.jobSelected.description}</TypographyStyled>
								</CardContentStyledBottom>
							</BottomSectionCard>
							
						</BottomSectionDiv>
						<ButtonDiv>
						<StyledButton
							variant="outlined"
							color="primary"
						>
							<strong>Cancelar</strong>
						</StyledButton>
						<StyledButton
							variant="outlined"
							color="primary"
						>
							<strong>Salvar</strong>
						</StyledButton>
						</ButtonDiv>
						</BottomSectionDivAll>

					</CardContentStyledFlex>
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