import axios from "axios";
const token = sessionStorage.getItem("token")


const baseURL = "https://connected-api-f16928fbc771.herokuapp.com/api/v1"
export async function POST_FILE(endpoint, data ) {
    const url = baseURL + endpoint;
    const headers = {
        headers :{
            "Content-Type": "multipart/form-data",
            'Authorization': `Bearer ${token}`
   
        }
      }
      console.log(headers)
    try {
        return await axios.post(url, data, headers)
    }
    catch (error) {
   
      
        //      if (error.response.status===403 && error.response.data.message==="Expired Jwt"){
         
        //     window.location.assign("/")
        // }
        // else{
            return error.response;
        // }
        
    }

}

export async function POST(endpoint, body) {
    const url = baseURL + endpoint;
    const headers = {
        headers :{
          'Content-Type': 'application/json',
        }
      }
    try {
        const res = await axios.post(url, body, headers)
        

        return res


    }
    catch (error) {
               return error.response;
        // if (error.response.status===403){
         
        //     window.location.assign("/")
        // }
        // else{
     
        // }
    }

}
export async function POST_SERVICE (endpoint, body){
    const url = baseURL + endpoint;
    const headers = {
      headers :{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }
  
    try {
        const res = await axios.post(url, body, headers)


        return res


    }
    catch (error) {
        // if (error.response.status===403){
         
        //     window.location.assign("/")
        // }
        // else{
        //     return error.response;
        // }
    }
}
export async function GET(endpoint) {
    const url = baseURL + endpoint;

    try {
        return await axios.get(url)
    }
    catch (error) {
        
        if (error.response.status===403){
            // window.addEventListener("click", 
            // login()
            // )
            window.location.assign("/")
        }
        else{
            return error.response;
        }
    }

}
export async function GET_SERVICE(endpoint) {
 
    const url = baseURL + endpoint;
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      };
     

  
    try {
        const response = await axios.get(url, { headers })
       
       

        return response
    }
    catch (error) {

        if (error.response.status===403){
         
            window.location.assign("/")
        }
        else{
            return error.response;
        }
        
        

    }
    
}

export async function PUT_SERVICE (endpoint, body){
    const url = baseURL + endpoint;

    const headers = {
      headers :{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }
  
    try {
        const res = await axios.put(url, body, headers)


        return res


    }
    catch (error) {
        if (error.response.status===403){
         
            window.location.assign("/")
        }
        else{
            return error.response;
        }
    }
}

export async function DELETE_SERVICE (endpoint, body){
    const url = baseURL + endpoint;
    const headers = {
      headers :{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }
  
    try {
        const res = await axios.delete(url, headers,body)


        return res


    }
    catch (error) {
    
       
        // if (error.response.status===403 && error.response.data.message==="Expired Jwt"){
         
        //     window.location.assign("/")
        //     sessionStorage.clear()
        // }
        // else{
        //     return error.response;
        // }
        
    }
    
}
  
  