import React from 'react'
import OfertarVaga from './OfertarVaga/OfertarVaga'
import { TelaInicial } from './TelaInicial';
import CardEmprego from './Trabalhador/CardEmprego'
import Jobs from './Jobs'
import { LeftMenu } from './LeftMenu'
import ContainerEmpregador from './Empregador/Empregador'


export class AppContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			
		}
	}

	render() {


		return (
      <div>
		  <ContainerEmpregador />
	  </div>
		)

	}
}
export default AppContainer