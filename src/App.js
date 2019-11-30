import React from 'react'
import axios from 'axios'
import './App.css'
class App extends React.Component {
    constructor() {
        super();
        this.state = {
            desc: '',
            bang: {},
            ind: {},
            matchResult: ''
        }
    }

    componentDidMount() {
        axios.get('https://cors-anywhere.herokuapp.com/http://www.espncricinfo.com/ci/engine/match/1187017.json')
            .then(res => {
                this.setState({
                    desc: res.data.description,
                    bang: {
                        inning1run: res.data.innings[0].runs,
                        inning2run: res.data.innings[2].runs,
                        overs: res.data.innings[2].overs,
                        name: res.data.team[1].team_name,
                        flag: 'http://www.espncricinfo.com' + res.data.team[1].logo_image_path
                    },
                    ind: {
                        inning1run: res.data.innings[1].runs,
                        name: res.data.team[0].team_name,
                        flag: 'http://www.espncricinfo.com' + res.data.team[0].logo_image_path,
                        wicket: res.data.innings[2].wickets,
                    },
                    matchResult: res.data.live.status
                })
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div className="container">
                <h3>
                    Result
                </h3>
                <p>
                    {this.state.desc}
                </p>
                <div className= 'resultDisplay'>
                    <div className='flagView'>
                        <div>
                            <img src={this.state.bang.flag} alt="" height='40' widht='30' />

                            <span className="countryName loss"> {this.state.bang.name} </span>
                        </div>
                        <div >

                            <img src={this.state.ind.flag} alt="" height='40' widht='30' />
                            <span className="countryName win" > {this.state.ind.name} </span>
                        </div>
                    </div>
                    <div>
                        <p className= "runs loss">
                            {`${this.state.bang.inning1run} & ${this.state.bang.inning2run} (${this.state.bang.overs})`}
                        </p>
                        <p className= "runs win">
                            {`${this.state.ind.inning1run} / ${this.state.ind.wicket}d`}
                        </p>
                    </div>
                </div>
                <p id = 'matchResult'>
                    {this.state.matchResult}
                </p>
            </div>
        )
    }
}
export default App;