import React from 'react';
import styled from 'styled-components';
import Badge from '@material-ui/core/Badge';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

const MenuContainer = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
	width: 20%;
    border-right: 1px solid #494949;
	box-shadow:0 1px 5px #494949;
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
	cursor:pointer;
`



export class LeftMenu extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			
		}
	}

	componentDidMount() {
		this.props.getJobs()
	}

	

	openJobDetail = (id) => {
		this.props.saveToRender({jobSelected: id})
	}

	render() {
		const listJobs = this.props.jobs.map((job, id) => {

			let totalTakens = 0
			if(job.taken===true){
				totalTakens +=1
			}else{
				totalTakens = '0'
			}
			return (
				<BadgeMenu key={id} badgeContent={totalTakens} color="primary">
					<ItensMenu onClick={()=>this.openJobDetail(job)} color="primary">{job.title}</ItensMenu>
				</BadgeMenu>
			)
		})

		return (
			<MenuContainer>
				<TitleMenu>Ofertas Cadastradas</TitleMenu>
				{listJobs}
            </MenuContainer>
        )
    }
}


export default LeftMenu;

