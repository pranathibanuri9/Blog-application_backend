// isLoggedIn=>
export const isLoggedIn=()=>{
    let data=localStorage.getItem("data")
    if(data==null){
        return false;
    }
    else{
        return true;
    }
}






// doLOogi =>data=>set to localstorage

export const doLogin=(data,next)=>{
    localStorage.setItem("data",JSON.stringify(data))
    next()
}



// dologout=>remove from localstorage

export const doLogout=(next)=>{
    localStorage.removeItem("data")
    next()
}

// get currentUser

export const geturrentUserDetail=()=>{
    if(isLoggedIn()){
        return JSON.parse(localStorage.getItem("data"))?.user;

    }else{
        return " ";
    }
}

export const getToken=()=>{
    if(isLoggedIn()){
        const data=JSON.parse(localStorage.getItem("data"));
        
        return data?data.jwtToken:null; 
        
    }else{
        return null;
    }
}


