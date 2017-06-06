import React, { Component } from 'react';
import {Table, TableBody, TableHeader,TableHeaderColumn, TableRow,TableRowColumn} from 'material-ui/Table';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import './App.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

export default class App extends Component {

  constructor(){
    super();
    this.state = {
      teams: [],
      team: [],
      players: [],
      open: false,
      showCheckboxes: false,
      height: '300px',
    };
  };

  loadTeamData() {
    //Get data from API
    fetch("https://api.soccerama.pro/v1.2/standings/season/741?api_token=HOLCAStI6Z0OfdoPbjdSg5b41Q17w2W5P4WuoIBdC66Z54kUEvGWPIe33UYC")
      .then(response => response.json())
      .then(json => {
        this.setState({
          teams: json.data[0].standings.data
        });
      });
  }

  loadPlayersData(team_id) {
  //Get data from API
    fetch("https://api.soccerama.pro/v1.2/players/team/"+ team_id + "?api_token=HOLCAStI6Z0OfdoPbjdSg5b41Q17w2W5P4WuoIBdC66Z54kUEvGWPIe33UYC")
      .then(response => response.json())
      .then(json => {
        this.setState({
          players: json.data
        });
      });
  }

  componentDidMount() {
    this.loadTeamData();
  }

  //Dialog Open
  handleOpen = (row,column,event,data) => {
    //if clicked on name then Dialog is open
    if(column === 2){
      this.loadPlayersData(this.state.teams[row].team_id);
      this.setState({
        open: true,
        team: this.state.teams[row].team,
      });
    }
  };

  //Dialog closed
  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const actions = [
      <FlatButton
        label="Go Back"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />,
    ];
    return (
      <div className='container'>
        <Table onCellClick= {this.handleOpen}>
          <TableHeader
            displaySelectAll={this.state.showCheckboxes}
            adjustForCheckbox={this.state.showCheckboxes}
          >
            <TableRow>
              <TableHeaderColumn tooltip="The Position">Position</TableHeaderColumn>
              <TableHeaderColumn tooltip="The Team Name">Team Name</TableHeaderColumn>
              <TableHeaderColumn tooltip="Played">Played</TableHeaderColumn>
              <TableHeaderColumn tooltip="Won">Won</TableHeaderColumn>
              <TableHeaderColumn tooltip="Drawn">Drawn</TableHeaderColumn>
              <TableHeaderColumn tooltip="Lost">Lost</TableHeaderColumn>
              <TableHeaderColumn tooltip="Goal Difference">Goal Difference</TableHeaderColumn>
              <TableHeaderColumn tooltip="Points">Points</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={this.state.showCheckboxes}
          >
            //loop the array
            {this.state.teams.map( (row, index) => (
              <TableRow key={index} >
                <TableRowColumn>{row.position}</TableRowColumn>
                <TableRowColumn id="team_hover">{row.team.name}</TableRowColumn>
                <TableRowColumn>{row.overall_played}</TableRowColumn>
                <TableRowColumn>{row.overall_win}</TableRowColumn>
                <TableRowColumn>{row.overall_draw}</TableRowColumn>
                <TableRowColumn>{row.overall_loose}</TableRowColumn>
                <TableRowColumn>{row.goal_difference}</TableRowColumn>
                <TableRowColumn>{row.points}</TableRowColumn>
              </TableRow>
              ))}
          </TableBody>
        </Table>
        <Dialog
            id="modal_scroll"
            actions={actions}
            model={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
          >
            <h3 id="modal_h3">{this.state.team.name}</h3>
            <img id="img_center"src={this.state.team.logo} alt={this.state.team.name}/>
            <div id="modal_scroll">
              <Table >
                <TableHeader 
                  displaySelectAll={this.state.showCheckboxes}
                  adjustForCheckbox={this.state.showCheckboxes}
                >
                  <TableRow>
                    <TableHeaderColumn>ID</TableHeaderColumn>
                    <TableHeaderColumn>Name</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={this.state.showCheckboxes}>
                {this.state.players.map( (row, index) => (
                  <TableRow key={index} >
                    <TableRowColumn>{row.id}</TableRowColumn>
                    <TableRowColumn>{row.name}</TableRowColumn>
                  </TableRow>
                ))}
                </TableBody>
              </Table>
            </div>
          </Dialog>
      </div>
    );
  }
}
