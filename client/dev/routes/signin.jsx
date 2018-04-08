import React from 'react';
import {Mutation } from "react-apollo";
import gpl from 'graphql-tag';
import queries from '../utils/queries';
import {Redirect} from 'react-router-dom';
import Response from '../components/Response.jsx';
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
    this.setState(state)
    console.log('this.state',this.state);
  }
  handleSubmit = (e,addUser)=>{
    e.preventDefault();
    const variables = this.state;
    console.log(variables);
    addUser({variables});
  }
  render(){
    return (
      <div className="login expand">
        <div className="row expand flex h-align">
          <div className="col-xs-12 col-md-8 flex expand v-align h-align">
            <div className="box">
              <div className="box-title">
                Signin
              </div>
              <hr/>
              <Mutation mutation={queries.mutation.addUser}>
                {(addUser,response) => {
                  console.log('response.error',response.data);
                  return (
                  <div>

                    {response.data && <Response response={response.data.addUser.response}/>}

                    <form onSubmit={(e)=>{this.handleSubmit(e,addUser)}} className="flex column form">
                      <input type="text" name="email" onChange={this.handleChange} className="input-text" placeholder="Email"/>
                      <input type="password" name="password" onChange={this.handleChange}  className="input-text" placeholder="Password"/>
                      <input type="password" name="verifyPassword" onChange={this.handleChange} className="input-text" placeholder="Verify Password"/>
                      <button type="submit" className="button">Create New User</button>
                    </form>
                  </div>
                )}
              }
              </Mutation>

            </div>
          </div>
        </div>
      </div>
    )
  }
}
