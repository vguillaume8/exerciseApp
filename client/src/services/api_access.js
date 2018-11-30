//const api_root = "localhost:3000";
export let playerId = null;
//const userId = 0;

export function getPhotos(userId, Vue){
    var host = "http://localhost:3000/getPhotos/" + userId; 
  //  console.log(host);
  Vue.$http.post(host, { headers: { "content-type": "application/json" } }).then(result => {
    
    // var array = result.body
    //  var finalArray = array.split(",");
   
     this.photo = result.body;
        //console.log(array[1]);
    
    });
 
}

export function saveId(id){
    this.userId = id;
    //console.log("Current user id is: " + this.userId);
}

export function getUserId(){
    return this.userId;
}


