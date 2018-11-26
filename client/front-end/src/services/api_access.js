const api_root = "localhost:3000";
export let playerId = null;

export function getPhotos(userId, Vue){
    var host = "http://localhost:3000/getPhotos/" + userId; 
    console.log(host);
  Vue.$http.post(host, { headers: { "content-type": "application/json" } }).then(result => {
    
     var array = result.body
    //  var finalArray = array.split(",");
   
     this.photo = result.body;
        //console.log(array[1]);
    
    }, error => {
        console.error(error);
    });

 
}





  function myFetch(url = ``, data = null) {
      let options = {
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, same-origin, *omit
            headers: {
                playerId: playerId
            }
      };
      if(data){
          options = { 
            ...options,
            method:  "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                ...options.headers,
                "Content-Type": "application/json; charset=utf-8",
                // "Content-Type": "application/x-www-form-urlencoded",
            },
            body: JSON.stringify(data), // body data type must match "Content-Type" header
          };
      }
      return fetch(url, options)
      .then(response =>{
        return response.json()
      }); // parses response to JSON
  }