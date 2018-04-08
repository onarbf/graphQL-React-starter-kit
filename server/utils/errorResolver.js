class ErrorResolver{
  constructor(){
    this.errorList = errorList
    this.errors = [];
  }
  pushError(errorNumber){
    this.errors.push(this.errorList[errorNumber])
  }
  checkErrors(){
      if(this.errors.length){
        throw Error
      }
  }
  formatErrors(e){
    let returnedErrors=[];

    if (e && e.errors) {
      Object.entries(e.errors).map(function(error){
        returnedErrors.push({
          message: error[1].message,
          code: 'unknownError',
          path: error[1].path
        });
      })
    }
    console.log('\n\n\n\n\n\n\n\ne.errors',returnedErrors);
    console.log('\n\n\n\n\n\n\n\nthis.errors',this.errors);
    if(this.errors.length){
      this.errors.map(error=>{
        returnedErrors.push(error)
      })
    }
    console.log(returnedErrors);
    return{
      response : {
        success: "",
        errors: returnedErrors
      }
    }
  }
}

export default ErrorResolver;


const errorList = {
  1:{
    message: "email vacío o inválido",
    code: 1,
    path: "email"
  },
  2:{
    message: "password vacío o inválido",
    code: 2,
    path: "password"
  },
  3:{
    message: "password de verificación vacío o inválido",
    code: 3,
    path: "password"
  }
}
