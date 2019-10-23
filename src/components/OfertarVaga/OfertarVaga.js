import React from 'react'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import styled from 'styled-components'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import logo from '../../logo_ninja.svg'


class OfertarVaga extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            labelTituloValue:'',
            labeldescricaoValue:'',
            labelValorValue:'',
            labelPrazoValue:'',
            labelFormaPagamentoValue:'',
        }      
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
      };

    
    render(){
        const ImgLogo = styled.img`
        
        `

        const ButtonStyled = styled(Button)`
        vertical-align: bottom;
        `

        const ExpansionPanelSummaryStyled = styled(ExpansionPanelSummary)`
        
        div{display:grid;
        grid-template-columns: 2fr 1fr 2fr;
        justify-content:center;}
       
        `
        

        const PStyle = styled.p`
            justify-self:center;  
        `
        const FlexDivLogo = styled.div`
            align-self: flex-start;
        `
        
        return(
            
            <ExpansionPanel>
                <ExpansionPanelSummaryStyled expandIcon={<ExpandMoreIcon />}>
                        <FlexDivLogo>
                            <ImgLogo src={logo} onClick={this.props.ChangeView} />
                        </FlexDivLogo>
                        
                            <PStyle >Oferte Uma Vaga</PStyle>
                        
                </ExpansionPanelSummaryStyled>
                <ExpansionPanelDetails>
                <Typography>
                    
                <form  noValidate autoComplete="off">
                    <TextField
                        label="Título"
                        onChange={this.handleChange('labelTituloValue')} 
                        
                    />
                    <TextField
                        label="Descrição"
                        onChange={this.handleChange('labeldescricaoValue')}
                    />
                    <TextField
                        label="Valor"  
                        onChange={this.handleChange('labelValorValue')}
                    />
                    <TextField
                        label="Prazo"    
                        onChange={this.handleChange('labelPrazoValue')}      
                    />
                    <TextField
                        label="Forma de Pagamento"  
                        onChange={this.handleChange('labelFormaPagamentoValue')}  
                    />
                    <ButtonStyled color="primary" >Enviar </ButtonStyled>
                </form>
                </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            
        )
    }   
}
export default OfertarVaga