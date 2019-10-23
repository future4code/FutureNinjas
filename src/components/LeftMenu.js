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
	
	openJobDetail=()=>{

	}

    render() {
		const array = [{name:'Pintor'},{name:'Serralheiro'}]
		const listJobs = array.map((job)=>{
			return <BadgeMenu badgeContent={3} color="primary">
					<ItensMenu onClick={this.openJobDetail} color="primary">{job.name}</ItensMenu>
				</BadgeMenu>
		})

        return (
            <MenuContainer>
                <TitleMenu>Ofertadas Cadastradas</TitleMenu>
				{listJobs}
            </MenuContainer>
        )
    }
}