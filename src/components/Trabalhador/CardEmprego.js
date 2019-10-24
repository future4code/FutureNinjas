import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Fab from '@material-ui/core/Fab';
import styled from 'styled-components';
import axios from 'axios';
import Check from '@material-ui/icons/Check'

const StyledCardHeader = styled(CardHeader)`
    background: #8762D1;
    text-align: center;
    span{color: white;}
`

const StyledCard = styled(Card)`
    width: 40vw;
`

const StyledCardContent = styled(CardContent)`
    background: #b98fff;
`

const StyledFab = styled(Fab)`
    justify-self: flex-end;
`

const StyledTypography = styled(Typography)`
    color: white;
`

const Div = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
`

class CardEmprego extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            render:""
        }
    }

    takeJob=async ()=>{
        const res = await axios.put(`https://us-central1-missao-newton.cloudfunctions.net/futureNinjas/jobs/${this.props.job.id}/take`)
        this.props.reRenderJobs()
    }

    render(){
        console.log(this.state.render)
        let buttonTaken
        if(this.props.job.taken){
            buttonTaken = <StyledFab onClick={this.takeJob} color="secondary" variant="extended"><Check/></StyledFab>
        }else{
            buttonTaken = <StyledFab onClick={this.takeJob} color="primary" variant="extended">Candidatar-se</StyledFab>
        }
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
                    <Div>
                        {buttonTaken}
                    </Div>
                </StyledCardContent>
            </StyledCard>
        )
    }
}

export default CardEmprego;