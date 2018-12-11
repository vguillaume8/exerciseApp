<template>
  <div class="home">
    <div class="jumbotron">
      <h1 class="display-4 header">See What Your Friends Are Up To!  <a class="btn btn-sm btn-primary" v-on:click="openFriendModal()">Follow a New User</a></h1>
      
      <ul class="list-group list-group-flush">
        <button v-for="a in all" :key="a" @click.prevent="getUser(a.userId)"
          class="list-group-item  btn">{{a.firstName}}</button>
      </ul>
    </div>

    <modal name="user-modal" id="user-modal" class="modal-body"  height="auto" :scrollable="true" :adaptive="true">
        <span @click.prevent="hide()" class="close">&times;</span>
        <h3><center>Recent Photos</center></h3>
        <ul class="list-group list-group-flush" id="menu">
            <li>
                <div class="container">
                    <a  v-for="p in userDataPhoto" :key="p"
                        class="img-thumbnail row">
                        <img :src="p.fileName" class="col" />
                    </a> 
                </div>
            </li>
        </ul>
        <ul class="list-group list-group-flush">
            <h3><center>Recent Exercises</center></h3>
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

         <modal name='friend-modal' class="modal-body">
            <div class="form-group">
                <input type="text" name="firstName" v-model="input.firstName" placeholder="Friend's First Name" required/>
                <input type="text" name="lastName" v-model="input.lastName" placeholder="Friend's Last Name" required/>
            </div>
            <button v-on:click="followUser()" class="btn btn-primary">Submit</button>
        </modal>
  </div>

</template>
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-130771998-3"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-130771998-3');
</script>
<script>
 import * as api from '@/services/api_access';



export default {
  name: 'Lets-Exercise',
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
        //   this.$http.post("http://35.196.189.224:3000/userAll", this.input, { headers: { "content-type": "application/json" } }).then(result => {
        //             if(result.status == 204){
        //                 alert("There is no user found under that name!");
        //             }
        //             var res = result.data;
        //             this.response = "Welcome Back " + res.firstName + "!",
        //             this.all = res;
             
                    
        //         });
        if(api.getUserId() != null){
            var currentId = api.getUserId();
            this.$http.post("http://localhost:3000/userGet/" + currentId, this.input, { headers: { "content-type": "application/json" } }).then(result => {
                if(result.status == 204){
                alert("There is no user found under that name!");
                }
                var res = result.data;
                this.response = "Welcome Back " + res.firstName + "!",
                console.log(res);
                this.all = res.FriendList;
            });

        }

        
        },
        methods : {
          getUser(userId){
              console.log(userId);
            var ob = {userId: userId};
            this.$http.post("http://35.196.189.224:3000/userGetHome", ob, { headers: { "content-type": "application/json" } }).then(result => {
              this.userData = result;
              if(result.data != null){
                  this.userDataPhoto = result.data.PhotoList;
                  this.userDataExercises = result.data.ExerciseList;
              }
              
        
              
              this.show();
            });
          },
          followUser(){
              this.$http.post("http://localhost:3000/addFriend", this.input, { headers: { "content-type": "application/json" } }).then(result => {
                    if(result.status == 204){
                        alert("There is no user under that name!");
                        return;
                    }
              }
              );
              
          },
           show () {
                this.$modal.show('user-modal');
            },
            hide () {
                this.$modal.hide('user-modal');
            },
            openFriendModal(){
                this.$modal.show('friend-modal');
            }
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
