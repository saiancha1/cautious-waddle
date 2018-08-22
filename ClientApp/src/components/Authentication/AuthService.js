import decode from 'jwt-decode';

export default class AuthService {
  // Initializing important variables
  constructor() {
    this.domain = 'capstone1.azurewebsites.net'; // API server domain
    this.fetch = this.fetch.bind(this); // React binding stuff
    this.login = this.login.bind(this);
    this.getProfile = this.getProfile.bind(this);
  }

  login = async(username, password) => {
    // Get a token from api server using the fetch api
    var loginDetails = {Username:username, Password:password};
    return  await fetch('api/Auth/login',{
      method:"POST",
      
      headers:{
        "content-type":"application/json"
      },
      body:JSON.stringify(loginDetails)
    })
    .then(res => res.json())
    .then(response =>
    {
    const data = response;
    if(data.auth_token)
    {
     this.setToken(data.auth_token);
     localStorage.setItem("UserId",data.id);
     return true;
    }
    else
    return false;
    
    }).catch(function(error) {
      return false;
    })
    
    
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken(); // Getting token from localstorage
    return !!token && !this.isTokenExpired(token); // handwaiving here
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) { // Checking if token is expired.
        return true;
      }
      else
        return false;
    }
    catch (err) {
      return false;
    }
  }

  setToken(idToken) {
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken);
  }

  getToken() {
    // Retrieves the user token from localStorage
    if(localStorage.getItem('id_token'))
    {
    return localStorage.getItem('id_token');
    }
    return "";
  }

  logout() {
    // Clear user token and profile data from localStorage
    this.localStorage.removeItem('id_token');
  }

  getProfile() {
    // Using jwt-decode npm package to decode the token
    return decode(this.getToken());
  }


  fetch(url, options) {
    // performs api calls sending the required authentication headers
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };

    // Setting Authorization header
    // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
    if (this.loggedIn()) {
      headers['Authorization'] = 'Bearer ' + this.getToken()
    }

    return fetch(url, {
      headers,
      ...options,
    })
      .then(this.checkStatus)
      .then(response => response.json());
  }

  checkStatus(response) {
    // raises an error in case response status is not a success
    if (this.response.status >= 200 && this.response.status < 300) { // Success status lies between 200 to 300
      return this.response;
    } else {
      var error = new Error(response.statusText)
      error.response = response
      throw error
    }
  }
  handleSubmit = async(event, user, password) => {
    event.preventDefault();
    const data = this.login(user, password).then(res => {
      if(res === true)
      {
        return true;
      }

        return false;
    });
   
  }
}
