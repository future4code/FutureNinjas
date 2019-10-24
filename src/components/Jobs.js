import React from 'react';
import styled from 'styled-components';
import logo from '../logo_ninja.svg';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import CardEmprego from './Trabalhador/CardEmprego';
import axios from 'axios';

const Header = styled.div`
    height: 8vh;
    display: grid;
    grid-template-columns: 10vw 1fr 10vw;
    background-color: #F5F5F5;
`
const Body = styled.div`
    margin: 2vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 6.3vw;
    justify-items: center;
`
const Img = styled.img`
    height: 7vh;
    align-self: center;
    margin-left: 2vw;
    cursor:pointer;
`

const Filter = styled.div`
    display:flex;
    justify-content: space-evenly;
    align-self: center;
`

const Div =  styled.div`
    margin-top: 2vh;
`


class Jobs extends React.Component {
    constructor(props){
        super(props)

        this.state = {
           open: false,
           max: '',
           min: '',
           title: '',
           description: '',
           jobsFilter: [],
           jobs:[]
        };   
    }
    componentDidMount() {
        this.getJobs()
    }

    getJobs = () => {
        const request = axios.get('https://us-central1-missao-newton.cloudfunctions.net/futureNinjas/jobs')
            request.then(res => {
                this.setState({
                    jobs: res.data.jobs,
                    jobsFilter: res.data.jobs
                })
            })
    }

    filter = (Maximo, Minimo, Title, Description) => {
        let Max
        let Min
        if(Maximo === '')
            Max = Infinity
        else
            Max  = Maximo
        if(Minimo === '')
             Min = 0
        else
            Min = Minimo
        const jobsFilter = this.state.jobs.filter(job => job.value <= Max)
                                          .filter(job => job.value >= Min)
                                          .filter(job => job.title.search(Title) !== -1)
                                          .filter(job => job.description.search(Description) !== -1)
        this.setState({jobsFilter})
        console.log(this.state.jobsFilter) //APAGAR ANTES DE DAR MERGE!!
    }

    changeMax = (event) =>{
            this.setState({max: event.target.value})
            this.filter(event.target.value, this.state.min, this.state.title, this.state.description)
    }

    changeMin = (event) =>{
            this.setState({min: event.target.value})
            this.filter(this.state.max, event.target.value, this.state.title, this.state.description)
    }

    changeTitle = (event) =>{
        this.setState({title: event.target.value })
        this.filter(this.state.max, this.state.min, event.target.value,  this.state.description)
    } 
    
    changeDescription = (event) =>{
        this.setState({description: event.target.value })
        this.filter(this.state.max, this.state.min, this.state.title, event.target.value)
    }
    
    handleToggle = () => {
        this.setState(state => ({ open: !state.open }));
    };
    
    handleClose = event => {
        if (this.anchorEl.contains(event.target)) {
            return;
        }
    }

    /* ORDENANDO OS ITENS */  
    // por valor mínimo:
    orderByMinValue  = () => {
        const orderedJobs = this.state.jobsFilter.sort((a, b) => {
            return a.value - b.value
        })
        this.setState({jobsFilter: orderedJobs})
    }

    // por ordem alfabética:
    orderByTitle  = () => {
        const orderedJobs = this.state.jobsFilter.sort((a, b) => {
            if (a.title > b.title) { return 1 }
            if (a.title < b.title) { return -1 }
            return 0;
        })
        this.setState({jobsFilter: orderedJobs})
    }

    // pelo menor prazo:
    orderByDueDate = () => {
        const orderedJobs = this.state.jobsFilter.sort((a, b) => {            
            return new Date(a.dueDate) - new Date(b.dueDate);
        })
        this.setState({jobsFilter: orderedJobs})
    }
    /* FIM DA ORDENAÇÃO */

    render(){
    const list =  this.state.jobsFilter.map(job => <CardEmprego job={job}/>)
        return(
            <div>
                <Header>
                    <Img src={logo} alt="logo" onClick={this.props.goBack}/>
                    <Filter>
                        <TextField
                            type='number'
                            value={this.state.max}
                            label="Valor Maximo"
                            margin="Valor Maximo"
                            onChange={this.changeMax}
                        />
                        <TextField
                            type='number'
                            name="min"
                            value={this.state.min}
                            label="Valor Minimo"
                            margin="Valor Minimo"
                            onChange={this.changeMin}
                        />
                        <TextField
                            value={this.state.title}
                            name="title"
                            label="Titulo"
                            margin="Titulo"
                            onChange={this.changeTitle}
                        />
                        <TextField
                            value={this.state.description}
                            name="description"
                            label="Descrição"
                            margin="Descrição"
                            onChange={this.changeDescription}
                        />
                    </Filter>
                    <Div>
                        <Button
                            buttonRef={node => {
                            this.anchorEl = node;
                            }}
                            aria-owns={this.state.open ? 'menu-list-grow' : undefined}
                            aria-haspopup="true"
                            onClick={this.handleToggle}
                        >
                            Ordenar
                        </Button>
                        <Popper open={this.state.open} anchorEl={this.anchorEl} transition disablePortal>
                            {
                                ({ TransitionProps, placement }) => (
                                    <Grow
                                        {...TransitionProps}
                                        id="menu-list-grow"
                                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                    >
                                        <Paper>
                                            <ClickAwayListener onClickAway={this.handleClose}>
                                                <MenuList>
                                                    <MenuItem onClick={this.orderByTitle}>Nome</MenuItem>
                                                    <MenuItem onClick={this.orderByMinValue}>Preço</MenuItem>
                                                    <MenuItem onClick={this.orderByDueDate}>Prazo</MenuItem>
                                                </MenuList>
                                            </ClickAwayListener>
                                        </Paper>
                                    </Grow>
                                )
                            }
                        </Popper>
                    </Div>
                </Header>
                <Body>
                    {list}
                </Body>
            </div>
        )
    }
}

export default Jobs