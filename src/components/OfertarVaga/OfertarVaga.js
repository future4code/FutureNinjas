import React from 'react'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import styled from 'styled-components'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import logo from '../../logo_ninja.svg';
import AddCircle from "@material-ui/icons/AddCircle";
import axios from 'axios';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';



const ImgLogo = styled.img`
    height: 7vh;
    margin-left: 2vw;
    cursor:pointer;
 `

const ButtonStyled = styled(Button)`
	vertical-align: bottom;
	margin:10px;
`

const ExpansionPanelSummaryStyled = styled(ExpansionPanelSummary)`        
	div{display:grid;
	grid-template-columns: 2fr 1fr 2fr;
	justify-content:center;}
`

const PStyle = styled.p`
	justify-self:center;  
	font-weight:bold;
	font-size:28px;
`

const FlexDivLogo = styled.div`
	align-self: flex-start;
`

const ExpansionPanelDetailsStyled = styled(ExpansionPanelDetails)`
	display:flex;
	justify-content:space-evenly;
	width:100vw;

`

const TextFieldStyled = styled(TextField)`
	margin:10px;
`

const TextFieldStyledMargin = styled(TextField)`
	margin:10px;
	margin-top:26px;
`

const FormControlStyled = styled(FormControl)`
	margin:10px;
	margin-top:26px;
	width:200px;
`

const ExpansionPanelStyled = styled(ExpansionPanel)`
	background-color: #F5F5F5;
`
const TypographyStyled = styled(Typography)`
	width:100%;
	display:flex;
	justify-content:space-evenly;
`
class OfertarVaga extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			titleValue: '',
			descriptionValue: '',
			valueValue: '',
			paymentMethodsValue: '',
			dueDateValue: '',
		}
	}

	handleChange = name => event => {
		this.setState({ [name]: event.target.value });
	};

	addJob = async () => {
		try {
			const data = {
				title: this.state.titleValue,
				description: this.state.descriptionValue,
				value: Number(this.state.valueValue),
				paymentMethods: [this.state.paymentMethodsValue],
				dueDate: Number(new Date(this.state.dueDateValue)),
			}
			console.log(data)

			const res = await axios.post('https://us-central1-missao-newton.cloudfunctions.net/futureNinjas/jobs', data)
			window.alert(res.data.message)
			this.setState({
				titleValue: '',
				descriptionValue: '',
				valueValue: '',
				paymentMethodsValue: '',
				dueDateValue: '',
			})
			this.props.getJobs()
		} catch (err) {
			window.alert(`Verifique todos os campos. Erro: ${err.message}`)
		}
	}

	render() {

		return (

			<ExpansionPanelStyled>
				<ExpansionPanelSummaryStyled expandIcon={<ExpandMoreIcon />}>
					<FlexDivLogo>
						<ImgLogo src={logo} onClick={this.props.goBack} />
					</FlexDivLogo>

					<PStyle >Oferte Uma Vaga  <AddCircle /></PStyle>

				</ExpansionPanelSummaryStyled>

				<ExpansionPanelDetailsStyled>
					<TypographyStyled>



						<TextFieldStyled
							label="Título"
							onChange={this.handleChange('titleValue')}
							value={this.state.titleValue}
						/>
						<TextFieldStyled
							label="Descrição"
							onChange={this.handleChange('descriptionValue')}
							value={this.state.descriptionValue}
						/>
						<TextFieldStyled
							type='number'
							label="Valor"
							inputProps={{ min: 0 }}
							onChange={this.handleChange('valueValue')}
							value={this.state.valueValue}
						/>

						<TextFieldStyledMargin
							type='date'
							helperText="Prazo"
							margin="normal"
							inputProps={{ min: new Date().getFullYear() + '-' + (Number(new Date().getMonth()) + 1) + '-' + Number(new Date().getDate()) }}
							onChange={this.handleChange('dueDateValue')}
							value={this.state.dueDateValue}
						/>

						<FormControlStyled >
							<Select
								value={this.state.paymentMethodsValue}
								onChange={this.handleChange('paymentMethodsValue')}

							>
								<MenuItem value="Cartão de crédito">
									<em>Cartao de crédito</em>
								</MenuItem>
								<MenuItem value={'Cartão de débito'}>Cartão de débito</MenuItem>
								<MenuItem value={'Dinheiro'}>Dinheiro</MenuItem>
								<MenuItem value={'Cheque'}>Cheque</MenuItem>
								<MenuItem value={'Transferência Bancária'}>Transferência Bancária</MenuItem>
							</Select>
							<FormHelperText>Forma de Pagamento</FormHelperText>
						</FormControlStyled>

						<ButtonStyled variant="contained" color="primary" onClick={this.addJob} >Criar <br /> Vaga</ButtonStyled>



					</TypographyStyled>
				</ExpansionPanelDetailsStyled>
			</ExpansionPanelStyled>


		)
	}
}
export default OfertarVaga