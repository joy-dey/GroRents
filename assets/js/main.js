const url = "http://35.174.136.97:3000/api/"

fetch(url+"houses", {
    method: "GET"
})
.then(resp => resp.json())
.then(res => console.log(res))
.catch(e => console.warn(e));