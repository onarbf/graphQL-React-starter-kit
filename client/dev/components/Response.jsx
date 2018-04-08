import React from 'react';

const Success = ({message})=>{
  return (<div className="response success">
    {message}
  </div>)
}

const Errors = ({errors})=>{
  return errors.map((error,i)=>(
    <div className="response error" key={i}>{error.message}</div>
  ))
}

export default ({response})=>{
  console.log('works',response);
  return(
    <div>
      {(response && response.success) && <Success message={"Todo ha ido genial"} />}
      {(response && response.errors.length) && <Errors errors={response.errors} />}
    </div>
  )
}
