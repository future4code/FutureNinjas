import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Fab from '@material-ui/core/Fab';
import styled from 'styled-components';

const StyledCardHeader = styled(CardHeader)`
    background: #6700A0;
    text-align: center;
    span{color: white;}
`

const StyledCard = styled(Card)`
    width: 40vw;
`

const StyledCardContent = styled(CardContent)`
    background: #9B12D3;
`

const StyledFab = styled(Fab)`
    background: white;
`

const StyledTypography = styled(Typography)`
    color: white;
`



class CardEmprego extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <StyledCard>
                <StyledCardHeader
                 title={this.props.job.title} 
                />
                <Divider/>
                <StyledCardContent>
                    <StyledTypography variant='h6' align='center'>Prazo: {new Date(this.props.job.dueDate).toLocaleDateString()}</StyledTypography>
                    <StyledTypography variant='h6' align='center'>Forma de pagamento: {this.props.job.paymentMethods}</StyledTypography>
                    <StyledTypography variant='h6' align='center'>Descricao: {this.props.job.description}</StyledTypography>
                    <StyledTypography variant='h6' align='center'>Valor:  R$ {Number(this.props.job.value).toFixed(2)}</StyledTypography>
                    <StyledFab variant="extended">
                        Candidatar-se
                    </StyledFab>
                </StyledCardContent>
            </StyledCard>
        )
    }
}

export default CardEmprego;