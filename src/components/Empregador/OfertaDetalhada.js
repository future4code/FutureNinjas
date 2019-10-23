import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import styled from 'styled-components';

const MainCardStyled = styled(Card)`
	width: 80%;
	margin: 5%;
`

const TopSectionDiv = styled.div`
	display: flex;
	justify-content: space-evenly;
`

const TopSectionCard = styled(Card)`
	width: 15vw;
`

const BottomSectionDiv = styled.div`
	margin: 30px;
	display: flex;
	justify-content: center;
`

const BottomSectionCard = styled(Card)`
	width: 51.5vw;
`

class OfertaDetalhada extends React.Component {
	constructor(props){
		super(props);
		this.state = {

		}
	}


	render(){



		return(
			<MainCardStyled>
				<CardHeader
				 title={this.props.jobSelected.title}
				/>
				<Divider />
				<CardContent>

					<TopSectionDiv>
						<TopSectionCard>
							<CardHeader
							title='Forma de pagamento' 
							/>
							<Divider />
							<CardContent>
								 <Typography variant='h6' align='center'> {this.props.jobSelected.paymentMethods}</Typography>
							</CardContent>
						</TopSectionCard>

						<TopSectionCard>
							<CardHeader
							title='Valor' 
							/>
							<Divider />
							<CardContent>
								<Typography variant='h6' align='center'>{Number(this.props.jobSelected.value).toFixed(2)}</Typography>
							</CardContent>
						</TopSectionCard>

						<TopSectionCard>
							<CardHeader
							title='Prazo' 
							/>
							<Divider />
							<CardContent>
								<Typography variant='h6' align='center'>{new Date(this.props.jobSelected.dueDate).toLocaleDateString()}</Typography>
							</CardContent>
						</TopSectionCard>
					</TopSectionDiv>


					<BottomSectionDiv>
						<BottomSectionCard>
							<CardHeader
							title='Descricao' 
							/>
							<Divider />
							<CardContent>
								<Typography variant='h6' align='center'>{this.props.jobSelected.description}</Typography>
							</CardContent>
						</BottomSectionCard>
					</BottomSectionDiv>

				</CardContent>
			</MainCardStyled>
		)
	}
}

export default OfertaDetalhada;