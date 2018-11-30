<template>
  <div class="home">
    <div class="jumbotron">
      <h1 class="display-4 header">See What Your Friends Are Up To!</h1>
      <ul class="list-group list-group-flush">
        <button v-for="a in all" :key="a" @click.prevent="getUser(a._id)"
          class="list-group-item  btn">{{a.firstName}}</button>
      </ul>
    </div>

    <modal name="user-modal" id="user-modal" class="modal-body"  height="auto" :scrollable="true">
        <h3>Recent Photos</h3>
        <ul class="list-group list-group-flush" id="menu">
            <li>
                <div class="container">
                    <a  v-for="p in userDataPhoto" :key="p"
                        class="img-thumbnail row">
                        <img :src="p.fileName" class="col" width="275px" height="275px"/>
                    </a> 
                </div>
            </li>
        </ul>
        <ul class="list-group list-group-flush">
            <h3>Recent Exercises</h3>
            <table class="table table-hover">
                <thead>
                    <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Duration</th>
                    <th scope="col" type="date">Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="e in userDataExercises" :key="e">
                    <td>{{e.name}}</td>
                    <td>{{e.duration}}</td>
                    <td>{{e.Date}}</td>
                    </tr>
                </tbody>
            </table>
        </ul>
        
       <p></p>
      
            
        </modal>
  </div>

</template>

<script>
export default {
  name: 'Lets Exercise!',
        data () {
            return {
                ip: "",
                input: {
                    
                },
                response: "",
                all: "",
                photo: "",
                userId: "",
                userData: "",
                userDataPhoto: "",
                userDataExercises: ""
            }
        },
        mounted() {
          this.$http.post("http://35.196.189.224:3000/userAll", this.input, { headers: { "content-type": "application/json", "Access-Control-Allow-Origin":"*"  } }).then(result => {
                    //console.log(result.status);
                    if(result.status == 204){
                        alert("There is no user found under that name!");
                    }
                    var res = result.data;
                    this.response = "Welcome Back " + res.firstName + "!",
                    this.all = res;
                    //var exArray = new Array();
             
                    
                });
        },
        methods : {
          getUser(userId){
            var ob = {userId: userId};
            //var host = "http://35.196.189.224:3000/userGet";
            this.$http.post("http://35.196.189.224:3000/userGet", ob, { headers: { "content-type": "application/json" } }).then(result => {
              this.userData = result;
              this.userDataPhoto = result.data.PhotoList;
              //var array = new Array();
               //console.log(result.data);
              for(var i = 0; i < result.data.ExerciseList.length; i++ ){
                  //console.log(result.data.ExerciseList[i]);
                 
              }
              this.userDataExercises = result.data.ExerciseList;
              this.show();
            })
          },
           show () {
                this.$modal.show('user-modal');
            },
            hide () {
                this.$modal.hide('user-modal');
            },
        }
       
}
</script>
<style lang="css">
modal{
    overflow-y: auto;
} 

ul#menu li {
    display:inline-block;
}
.header {
   
    align-self: auto;
}
</style>
