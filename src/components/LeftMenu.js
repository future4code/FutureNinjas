import React from 'react'
import styled from 'styled-components'
import Badge from '@material-ui/core/Badge';
import Typography from '@material-ui/core/Typography';

const MenuContainer = styled.div`
    display:flex;
    flex-direction:column;
    flex-grow:1;
    align-items:center;
    width:20%;
    border: 5px solid #8762D1;
`

const TitleMenu = styled.h3`
    background: #8762D1;
    width:90%;
    color: white;
    text-align:center;
`

const TextMenu = styled.p`
    color: #8762D1;
    width:80%;
    font-weight:bold;
    text-align:start;
    margin:10px;
`

const BadgeMenu = styled(Badge)`
margin-left:10%;
align-self:flex-start;
span {
       top: 50%;
       right: -20px;
   }
`

const ItensMenu = styled(Typography)`
    font-weight:bold;
    text-align:start;
    margin:5px 0; 
`



export class LeftMenu extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <MenuContainer>
                <TitleMenu>Ofertadas Cadastradas</TitleMenu>
                <BadgeMenu badgeContent={2} color="secondary">
                    <ItensMenu color="primary">Pintor</ItensMenu>
                </BadgeMenu>
                <BadgeMenu badgeContent={1} color="secondary">
                    <ItensMenu color="primary">Serralheiro</ItensMenu>
                </BadgeMenu>
            </MenuContainer>
        )
    }
}