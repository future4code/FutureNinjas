import React from 'react'
import CardEmprego from './Trabalhador/CardEmprego'

export class AppContainer extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return <div>
			<CardEmprego />
		</div>
	}
}