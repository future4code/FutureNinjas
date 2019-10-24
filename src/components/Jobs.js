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
    height: 7vh;
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
    height: 80%;
    align-self: center;
    margin-left: 2vw;
    cursor:pointer;
`

const Filter = styled.div`
    display:flex;
    justify-content: space-evenly;
`

const Div =  styled.div`
    margin-top: 2vh;
`


class Jobs extends React.Component {
    constructor(props){
        super(props)

        this.state = {
           open: false,
           max: Infinity,
           min: 0,
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
               this.setState({jobs: res.data.jobs,
                            jobsFilter: res.data.jobs})
               console.log(res.data.jobs)
           })
       }

    filter = (Max, Min, Title, Description) =>{
        
        const jobsFilter = this.state.jobs.filter(job => job.value <= Max)
                                          .filter(job => job.value >= Min)
                                          .filter(job => job.title.search(Title) !== -1)
                                          .filter(job => job.description.search(Description) !== -1)
        this.setState({jobsFilter})
    }


    changeMax = (event) =>{
        if (event.target.value === ''){
            this.setState({max: Infinity})
            this.filter(Infinity, this.state.min, this.state.title, this.state.description)
        }
        else{
            this.setState({max: event.target.value})
            this.filter(event.target.value, this.state.min, this.state.title, this.state.description)
        }
    }

    changeMin = (event) =>{
        if (event.target.value === ''){
            this.setState({min: 0})
            this.filter(this.state.max, 0, this.state.title, this.state.description)
        }
        else{
            this.setState({min: event.target.value})
            this.filter(this.state.max, event.target.value, this.state.title, this.state.description)
        }
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
    
        this.setState({ open: false });
	  };

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
                            {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                id="menu-list-grow"
                                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                            >
                                <Paper>
                                <ClickAwayListener onClickAway={this.handleClose}>
                                    <MenuList>
                                    <MenuItem onClick={this.handleClose}>Preço</MenuItem>
                                    <MenuItem onClick={this.handleClose}>Nome</MenuItem>
                                    <MenuItem onClick={this.handleClose}>Prazo</MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                                </Paper>
                            </Grow>
                            )}
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
