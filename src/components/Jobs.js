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
// import CardEmprego from './Trabalhador/CardEmprego';

const Header = styled.div`
    height: 7vh;
    display: grid;
    grid-template-columns: 10vw 1fr 10vw;
    background-color: #F5F5F5;
`
const Body = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 6.3vw;
`
const Img = styled.img`
    height: 15vh;
    margin-left: 1vw;
`

const Filter = styled.div`
    display:flex;
    justify-content: space-evenly;
`

    

class Jobs extends React.Component {
    constructor(props){
        super(props)

        this.state = {
           open: false,
           max: '',
           min: '',
           title: '',
           describe: '',
           jobsFilter: [],
           jobs: []
        };   
    }

    filter = () =>{
        const Max = parseInt(this.state.max)
        const Min = parseInt(this.state.min)
        const jobsFilter = this.state.jobs.filter(produto => produto.value <= Max)
                                          .filter(produto => produto.value >= Min)
                                          .filter(produto => produto.title.search(this.state.title) !== -1)
                                          .filter(produto => produto.describe.search(this.state.describe) !== -1)
        this.setState({jobsFilter})
    }

    change = (event) =>{
        this.setState({[event.target.name]: event.target.value })
    }

    changeMax = (event) =>{
        if (event.target.value === '')
            this.setState({max: Infinity})
        else
            this.setState({max: event.target.value})
        this.filter()
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
    // const list = this.state.jobsFilter.map(job => {return <CardEmprego job={job}/>})
        return(
            <div>
                <Header>
                    <Img src={logo} alt="logo"/>
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
                            onChange={this.change}
                        />
                        <TextField
                            value={this.state.title}
                            name="title"
                            label="Titulo"
                            margin="Titulo"
                            onChange={this.change}
                        />
                        <TextField
                            value={this.state.describe}
                            name="describe"
                            label="Descrição"
                            margin="Descrição"
                            onChange={this.change}
                        />
                    </Filter>
                    <div>
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
                    </div>
                </Header>
                <Body>
                    {/* {list} */}
                </Body>
            </div>
        )
    }
}

export default Jobs
