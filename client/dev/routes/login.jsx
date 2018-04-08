import React from 'react';
import {Mutation } from "react-apollo";
import gpl from 'graphql-tag';
import queries from '../utils/queries';
import {Redirect} from 'react-router-dom';

export default class extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      email : "",
      password: "",
      verifyPassword: ""
    }
  }
  handleChange = (e)=>{
    e.preventDefault();
    let state = this.state;
    state[e.target.name] = e.target.value;
    this.setState({...this.state, state})
    console.log('this.state',this.state);
  }
  handleSubmit = (e,login)=>{
    e.preventDefault();
    const variables = this.state;
    login({variables});
  }
  render(){
    return (
      <div className="login expand">
        <div className="row expand flex h-align">
          <div className="col-xs-12 col-md-8 flex expand v-align h-align">
            <div className="box">
              <div className="box-title">
                Login
              </div>
              <hr/>
              <Mutation mutation={queries.mutation.login}>
                {(login,response) => {

                  return (
                  <div>

                    <form onSubmit={(e)=>{this.handleSubmit(e,login)}} className="flex column form">
                      <input type="text" name="email" onChange={this.handleChange} className="input-text" placeholder="Email"/>
                      <input type="password" name="password" onChange={this.handleChange}  className="input-text" placeholder="Password"/>
                      <button type="submit" className="button">Login</button>
                    </form>
                  </div>
                )}}
              </Mutation>

            </div>
          </div>
        </div>
      </div>
    )
  }
}
