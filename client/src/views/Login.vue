<template>
    <div class="home">
        <a class="btn btn-sm btn-danger logout"  v-if="ifLogin() != false" v-on:click="logout()">Logout</a>
        <div class="login" v-if="ifLogin() != true">
            <h1>Login to your account</h1>
            <h3>Register <a href="/register">Here </a>if you do not have an account</h3>
            <input type="text" name="firstName" v-model="input.firstName" placeholder="First Name" required/>
            <input type="text" name="lastName" v-model="input.lastName" placeholder="Last Name" required/>
            <button v-on:click="sendData()">Login</button>
        </div>
        

        <h1>{{response}} </h1>
        <!--<textarea >{{ message }}</textarea>-->
        <div class="exercises">
            <h3 v-if="ifLogin() != false"> Logged Exercises  <a @click.prevent="show()" class="btn btn-sm btn-primary" :class="{disabled: ifUserId() == null}">+</a></h3>
            <ul class="list-group list-group-flush">
                <table v-if="ifLogin() != false" class="table table-hover">
                    <thead>
                        <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Duration</th>
                        <th scope="col" type="date">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="e in exercises" :key="e">
                        <td>{{e.name}}</td>
                        <td>{{e.duration}}</td>
                        <td>{{e.Date}}</td>
                        </tr>
                    </tbody>
                </table>
            </ul>
        </div>

        <div class="pictures">
            <h3 v-if="ifLogin() != false"> Uploaded Pictures  
                <a @click.prevent="showPictureModal()" class="btn btn-sm btn-primary" :class="{disabled: ifUserId() == null}">+</a>
            </h3>
            <ul class="list-group list-group-flush" id="menu">
                <li>
                    <div class="container">
                        <a v-for="p in photo" :key="p" class="img-thumbnail row">
                            <img :src="p" v-on:click="deletePhoto(p)" class="col"  width="275px" height="275px"/>
                        </a> 
                    </div>
                </li>
            </ul>
        </div>

        <a class="btn btn-sm btn-danger" :class="{disabled: ifUserId() == null}" v-if="ifLogin() != false">
            <img src="https://cdn2.iconfinder.com/data/icons/user-interface-30/26/2-512.png" @click.prevent="deleteUser(user)" width="50" height="50">
        </a>

        <!--- put forms in class modal-body -->
        <modal name='exercise-modal' class="modal-body">
            <div class="form-group">
                <label>Exercise Name</label>
                <input type="text" class="form-control" id="exercisename" v-model="input.name" aria-describedby="exercise" placeholder="Name of Exercise" required>
            </div>
            <div class="form-group">
                <label >Duration</label>
                <input type="text" class="form-control" id="exerciseDuration" v-model="input.duration" placeholder="Duration" required>
            </div>
            <div class="form-group">
                <label>Date</label>
                <input type="date" class="form-control" id="date" v-model="input.Date" placeholder="date" required>
            </div>
            <button v-on:click="sendExercise()" class="btn btn-primary">Submit</button>
        </modal>

        <modal name="picture-modal" id="picture-modal" class="modal-body">
            <form id="picture-form" action="http://35.196.189.224:3000/upload/" method="post" enctype="multipart/form-data">
                <div class="form-group">  <label>CHOOSE FILE</label>  
                    <input type="file" name="photo" required >
                     <p class="help-block">Upload a picture</p>  
                </div>
                <button type="submit" class="btn btn-primary" v-on:click="sendData()">Submit</button> 
            </form>
        </modal>

    </div>
</template>

<script>
    import * as api from '@/services/api_access';
    var array = new Array();
    var userId = null; // keeps track of current user
    var login = false; // keeps track if user is logged in
    export default {
        name: 'Lets-Exercise',
        data () {
            return {
                ip: "", // for ip address
                input: {
                    
                },
                response: "",
                message: "",
                photo: "",
                userId: "",
                file: "",
                exercises: "",
                isActive: false
            }
        },
        mounted() {
            // Will get data if user logged in already
            if(userId != null){
                this.getData();
            }
            // this.$http.get("https://httpbin.org/ip").then(result => {
            //     this.ip = result.body.origin;
            // }, error => {
            //     console.error(error);
            // });
        },
        methods: {
            getPhotos(userId){
                var host = "http://35.196.189.224:3000/getPhotos/"+userId; 
                this.$http.post(host, {array}, { headers: { "content-type": "application/json" } }).then(result => {
                    this.photo = result.body;
                });
            },
            sendData() {
                this.$http.post("http://35.196.189.224:3000/userLog", this.input, { headers: { "content-type": "application/json" } }).then(result => {
                    if(result.status == 204){
                        alert("There is no user found under that name!");
                        return;
                    }
                    login = true;
                    this.isActive = true;
                    var res = result.data[0];
                    this.response = "Welcome Back " + res.firstName + "!",
                    this.message = res;
                    var exArray = new Array();

                    for(var i = 0; i < res.ExerciseList.length; i++){
                        if(!this.isEmpty(res.ExerciseList[i])){
                            exArray.push(res.ExerciseList[i]);
                        }
                    }

                    this.exercises = exArray;
                    this.pictureList = res.PhotoList;
                    userId = res._id;
                    
                    if(res.PhotoList[0] != undefined) {
                        array = res.PhotoList[0].fileName;
                    }
                    
                    this.getPhotos(userId);
                    api.saveId(userId);
                    
                });
            },
            getData(){
                var host = "http://35.196.189.224:3000/userGet/" + userId;
                var ob = {name: userId};
                this.$http.post(host, ob, { headers: { "content-type": "application/json" } }).then(result => {
                    var res = result;
                    this.message = res;
                    var exArray = new Array();

                    for(var i = 0; i < res.ExerciseList.length; i++){
                        if(!this.isEmpty(res.ExerciseList[i])){
                            exArray.push(res.ExerciseList[i]);
                        }
                    }

                    this.exercises = exArray;
                    this.pictureList = res.PhotoList;
                    userId = res._id;
                    array = res.PhotoList[0].fileName;
                    this.getPhotos(userId);
                    api.saveId(userId);
                });
            },
            sendExercise(){
              var host = "http://35.196.189.224:3000/exercise/" + userId; 
              this.$http.post(host, this.input, { headers: { "content-type": "application/json" } }).then(result => {
                  host = result;
                  this.sendData();
              });
            },
            show () {
                this.$modal.show('exercise-modal');
            },
            hide () {
                this.$modal.hide('exercise-modal');
            },
            isEmpty(myObject) {
                for(var key in myObject) {
                    if (myObject.hasOwnProperty(key)) {
                        return false;
                    }   
                }
                return true;
             },
             showPictureModal(){
                 this.$modal.show('picture-modal');
             },
             getId(){
                 return userId;
             },
            deletePhoto(p){
                var confirmmes = confirm("Do you want to delete this photo?");
                    if (confirmmes == true) {
                        this.crudDelete(p);
                    }
            },
            crudDelete(p){
                var ob = {name: p}
                var host = "http://35.196.189.224:3000/deletePhoto/" + userId; 
                this.$http.post(host, ob, { headers: { "content-type": "application/json" } });
                alert("Picture successfully deleted");
                this.sendData();
            },
            ifUserId(){
                return userId;
            },
            deleteUser(userId){
                var confirms = confirm("Do you want to delete your account?");
                    if (confirms == true) {
                        this.crudDeleteUser(userId);
                    }
               
            },
            crudDeleteUser(p){
                var ob = {name: p}
                var host = "http://35.196.189.224:3000/deleteUser/" + userId; 
                this.$http.post(host, ob, { headers: { "content-type": "application/json" } }).then(result => {
                    host = result;
                    this.getData();
              });
              alert("Your account has been deleted");
              document.location.reload(true);
            },
            ifLogin(){
                return login == true;
            },
            logout(){
                userId = null;
                login = false;
                document.location.reload(true);
            }
        } 
}
        
    
</script>

<style scoped>
    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }

    textarea {
        width: 600px;
        height: 200px;
    }
    .logout{
        float: right;
    }
</style>