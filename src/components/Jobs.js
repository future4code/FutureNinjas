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
import { Checkbox, FormControlLabel } from '@material-ui/core';

const Header = styled.div`
    height: 8vh;
    display: grid;
    grid-template-columns: 10vw 1fr 10vw;
    background-color: #F5F5F5;
`
const Body = styled.div`
    margin: 1vw;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 1vw;
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

const Div = styled.div`
    margin-top: 2vh;
`
const MenuListStyled = styled(MenuList)`

`


class Jobs extends React.Component {
    constructor(props) {
        super(props)

        this.state = {

            open: false,
            max: '',
            min: '',
            title: '',
            description: '',
            jobsFilter: [],
            jobs: [],
            checkedB: true,
            checkedA: true
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
                jobsFilter: res.data.jobs,
            })

        })
    }

    filter = (Maximo, Minimo, Title, Description,CheckedA,CheckedB) => {


        let Max
        let Min
        if (Maximo === '')
            Max = Infinity
        else
            Max = Maximo
        if (Minimo === '')
            Min = 0
        else
            Min = Minimo
        let jobsFilter = this.state.jobs.filter(job => job.value <= Max)
            .filter(job => job.value >= Min)
            .filter(job => job.title.search(Title) !== -1)
            .filter(job => job.description.search(Description) !== -1)
        if (CheckedA === false) {
            // console.log(CheckedA)
            jobsFilter = jobsFilter.filter(job => job.taken === false)
        } if (CheckedB === false) {
            // console.log(CheckedB)
            jobsFilter = jobsFilter.filter(job => job.taken === true)
        }
        this.setState({ jobsFilter })
    }
    changeMax = (event) => {
        this.setState({ max: event.target.value })
        this.filter(event.target.value, this.state.min, this.state.title, this.state.description, this.state.checkedA, this.state.checkedB)
    }
    changeMin = (event) => {
        this.setState({ min: event.target.value })
        this.filter(this.state.max, event.target.value, this.state.title, this.state.description, this.state.checkedA, this.state.checkedB)
    }
    changeTitle = (event) => {
        this.setState({ title: event.target.value })
        this.filter(this.state.max, this.state.min, event.target.value, this.state.description, this.state.checkedA, this.state.checkedB)
    }

    changeDescription = (event) => {
        this.setState({ description: event.target.value })
        this.filter(this.state.max, this.state.min, this.state.title, event.target.value, this.state.checkedA, this.state.checkedB)
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

    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
        console.log(event.target.checked)

        if(name==='checkedA'){
            this.filter(this.state.max, this.state.min, this.state.title, this.state.description, event.target.checked, this.state.checkedB)
        }else{
            this.filter(this.state.max, this.state.min, this.state.title, this.state.description, this.state.checkedA, event.target.checked)
        }
    };


    /* ORDENANDO OS ITENS */
    // por valor mínimo:
    orderByValueMinFirst = () => {
        const orderedJobs = this.state.jobsFilter.sort((a, b) => {
            return a.value - b.value
        })
        this.setState({ jobsFilter: orderedJobs })
    }

    // por valor máximo:
    orderByValueMaxFirst = () => {
        const orderedJobs = this.state.jobsFilter.sort((a, b) => {
            return b.value - a.value
        })
        this.setState({ jobsFilter: orderedJobs })
    }

    // por ordem alfabética crescente:
    orderByTitleAtoZ = () => {
        const orderedJobs = this.state.jobsFilter.sort((a, b) => {
            if (a.title > b.title) { return 1 }
            if (a.title < b.title) { return -1 }
            return 0;
        })
        this.setState({ jobsFilter: orderedJobs })
    }

    // por ordem alfabética decrescente:
    orderByTitleZtoA = () => {
        const orderedJobs = this.state.jobsFilter.sort((a, b) => {
            if (a.title > b.title) { return -1 }
            if (a.title < b.title) { return 1 }
            return 0;
        })
        this.setState({ jobsFilter: orderedJobs })
    }

    // pelo menor prazo:
    orderByDueDateMin = () => {
        const orderedJobs = this.state.jobsFilter.sort((a, b) => {
            return new Date(a.dueDate) - new Date(b.dueDate);
        })
        this.setState({ jobsFilter: orderedJobs })
    }

    // pelo maior prazo:
    orderByDueDateMax = () => {
        const orderedJobs = this.state.jobsFilter.sort((a, b) => {
            return new Date(b.dueDate) - new Date(a.dueDate);
        })
        this.setState({ jobsFilter: orderedJobs })
    }
    /* FIM DA ORDENAÇÃO */


    render() {

  

        const list = this.state.jobsFilter.map(job => <CardEmprego reRenderJobs={this.getJobs} job={job} />)
        return (
            <div>
                <Header>
                    <Img src={logo} alt="logo" onClick={this.props.goBack} />
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
                        <div>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.checkedA}
                                        onChange={this.handleChange('checkedA')}
                                        value="checkedA"
                                        color="primary"
                                    />
                                }
                                label="Pegas"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.checkedB}
                                        onChange={this.handleChange('checkedB')}
                                        value="checkedB"
                                        color="primary"
                                    />
                                }
                                label="Abertas"
                            />
                        </div>
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
                                        <Paper >
                                            <ClickAwayListener onClickAway={this.handleClose}>
                                                <MenuListStyled>
                                                    <MenuItem onClick={this.orderByTitleAtoZ}>{`Nome (A 🡢 Z)`}</MenuItem>
                                                    <MenuItem onClick={this.orderByTitleZtoA}>{`Nome (Z 🡠 A)`}</MenuItem>
                                                    <MenuItem onClick={this.orderByValueMinFirst}>{`Valor crescente 🡥`}</MenuItem>
                                                    <MenuItem onClick={this.orderByValueMaxFirst}>{`Valor decrescente 🡦`}</MenuItem>
                                                    <MenuItem onClick={this.orderByDueDateMax}>{`Maior prazo`}</MenuItem>
                                                    <MenuItem onClick={this.orderByDueDateMin}>{`Menor prazo`}</MenuItem>
                                                </MenuListStyled>
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