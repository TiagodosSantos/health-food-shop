const urlBase = 'http://localhost:8080/store/auth';

const LoginService = {


    SendForm: data => {

        return fetch(`${urlBase}`, {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body : data
        })
        .then(res => LoginService.HandleError(res))
        .then(res =>  res.json());
    },

    HandleError: res=>{
        
        if(!res.ok)
            throw Error(res.responseText);

      console.log(res.json);
      return res;      
    }

}

export default LoginService;