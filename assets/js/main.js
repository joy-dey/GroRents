const url = "http://35.174.136.97:3000/api/";

let signup_page = document.querySelector('#signup-page'),
    login_page = document.querySelector('#login-page'),
    home_page = document.querySelector('#home-page'),
    location_page = document.querySelector('#location-selection');

if(signup_page) {
    let signup_form = signup_page.querySelector('#signup-form');
    
    signup_form.addEventListener('submit', async function(e) {
        e.preventDefault();
        let signupData = Object.fromEntries(new FormData(signup_form));
        signupData.password = btoa(signupData.password);
        localStorage.setItem('user', JSON.stringify(signupData));
        // await fetch(url + "users/signup", {
        //     method: "POST",
        //     body: JSON.stringify({
        //         name: signupData.name,
        //         email: signupData.email,
        //         password: signupData.password,
        //         passwordConfirm: signupData.password
        //     })
        // }).then(res => res.json())
        // .then(data => console.log(data))
        // .catch(e => console.warn(e))

    })


}

if(login_page) {
    let login_form = login_page.querySelector('#login-form');
    
    login_form.addEventListener('submit', async function(e) {
        e.preventDefault();
        let loginData = Object.fromEntries(new FormData(this)),
        credentials = JSON.parse(localStorage.getItem('user'));
        if(!credentials) {
            alert('Please Signup before you continue')
        }

        if(credentials.email === loginData.email && atob(credentials.password) === loginData.password) {
            alert('Logged in Successfully. Redirecting...');
            location.href = 'index.html';
        }
    })
}

if(location_page) {
    let locationButton = location_page.querySelector('.location__selection__button');

    locationButton.addEventListener('click', () => {
        navigator.permissions.query({ name:'geolocation' }).then((result) => {
            if (result.state === 'granted') {
                console.log('granted');
                navigator.geolocation.getCurrentPosition((position) => {
                    console.log(`Lat: ${position.coords.latitude}\nLong: ${position.coords.longitude}`)
                    revGeoAddr(position.coords.latitude, position.coords.longitude)
                    .then(res => {                       
                        console.log(`City: ${res.items[0].address.city}\nState: ${res.items[0].address.state}`)
                        localStorage.setItem('location', JSON.stringify({city: res.items[0].address.city, state: res.items[0].address.state}))
                    })
                })                

            } else if (result.state === 'prompt') {
              console.log('prompted')
            }            
          });
    })
}

async function revGeoAddr(lat, long) {
    const url = `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${lat}%2C${long}&lang=en-US&apiKey=8nO9Ft8JM3gIIRtyxBOtB8vLv_WUxWSEY7w2kJq-EHc`
    
    const req = await fetch(url),
    resp = await req.json();

    return resp;    
}


fetch(url+"houses").then(res => res.json()).then(d => console.log(d)).catch(e => console.error(e))