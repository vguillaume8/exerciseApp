<template>
    <div class="hello">
        <div class="login" v-if="ifLogin() != true">
            <h1>Login to your account</h1>
            <h3>Register <a href="/register">Here </a>if you do not have an account</h3>
            <input type="text" name="firstName" v-model="input.firstName" placeholder="First Name" required/>
            <input type="text" name="lastName" v-model="input.lastName" placeholder="Last Name" required/>
            <button v-on:click="sendData()">Login</button>
        </div>
        <br />
        <br />
        <h3>{{response}} </h3>
        <!--<textarea >{{ message }}</textarea>-->
        <h3 > Logged Exercises <a @click.prevent="show()" class="btn btn-sm btn-primary" :class="{disabled: ifUserId() == null}">+</a></h3>
        <ul class="list-group list-group-flush">
            <li v-for="e in exercises" :key="e"
                class="list-group-item">{{e}}</li>
        </ul>
        <h3 > Uploaded Pictures  <a @click.prevent="showPictureModal()" class="btn btn-sm btn-primary" :class="{disabled: ifUserId() == null}">+</a></h3>
        <!--<textarea>{{ pictureList }}</textarea> -->
        <ul class="list-group list-group-flush" id="menu">
              
               
                    <li>
                        <div class="container">
                    <a  v-for="p in photo" :key="p"
                        class="img-thumbnail row">
                        <img :src="p" v-on:click="deletePhoto(p)" class="col" weight="275px" height="275px"/>
                    </a> 
                    </div>
                    </li>
            </ul>

        <a class="btn btn-sm btn-primary" :class="{disabled: ifUserId() == null}"><img src="https://cdn2.iconfinder.com/data/icons/user-interface-30/26/2-512.png" @click.prevent="deleteUser(user)" width="50" height="50"></a>
        <!--- put forms in class modal-body -->
        <modal name="hello-world" class="modal-body">
            <div class="form-group">
                <label for="exampleInputEmail1">Exercise Name</label>
                <input type="text" class="form-control" id="exercisename" v-model="input.name" aria-describedby="exercise" placeholder="Name of Exercise" required>
            </div>
            <div class="form-group">
                <label for="exerciseDuration">Duration</label>
                <input type="text" class="form-control" id="exerciseDuration" v-model="input.duration" placeholder="Duration" required>
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Date</label>
                <input type="date" class="form-control" id="date" v-model="input.Date" placeholder="date" required>
            </div>
            <button v-on:click="sendExercise()" class="btn btn-primary">Submit</button>
        </modal>
        <modal name="picture-modal" id="picture-modal" class="modal-body">
            <form id="picture-form" action="http://35.196.189.224:3000/upload/" method="post" enctype="multipart/form-data">
                <div class="form-group">  <label for="exampleInputFile">CHOOSE FILE</label>  
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
    var userId = null;
    var login = false;
    export default {
        name: 'Lets Exercise!',
        data () {
            return {
                ip: "",
                input: {
                    
                },
                response: "",
                message: "",
                photo: "",
                userId: "",
                file: "",
                isActive: false
                
            }
        },
        mounted() {
            if(userId != 0){
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
                
                 //var array = result.body
                //  var finalArray = array.split(",");
               
                 this.photo = result.body;
                    console.log(result.body);
                
                });

                
             
            },
              sendData() {
                login = true;
                this.isActive = true;
                this.$http.post("http://35.196.189.224:3000/userLog", this.input, { headers: { "content-type": "application/json" } }).then(result => {
                    //console.log(result.status);
                    if(result.status == 204){
                        alert("There is no user found under that name!");
                    }
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
                    console.log(userId);
                    
                    //array = res.PhotoList[0].fileName
                    if(res.PhotoList[0] != undefined) {
                        array = res.PhotoList[0].fileName;
                    }
                    
                    this.getPhotos(userId);
                    api.saveId(userId);
                    
                    
                });
                
            },
            getData(){
                //console.log("Function ran");
                var host = "http://35.196.189.224:3000/userGet/" + userId;
                var ob = {name: userId};
                //console.log(host);
                this.$http.post(host, ob, { headers: { "content-type": "application/json" } }).then(result => {
                    var res = result;
                    //console.log(res);
                    //this.response = "Welcome Back " + res.firstName + "!",
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
                    //console.log(userId);
                    
                    //array = res.PhotoList[0].fileName
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
                  //this.modal.close();
              });
            },
            show () {
                this.$modal.show('hello-world');
            },
            hide () {
                this.$modal.hide('hello-world');
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
                 //var user = api.getUserId();
                //  console.log("current user in modal: " + user);
               
               
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
                this.$http.post(host, ob, { headers: { "content-type": "application/json" } })
                alert("Picture successfully deleted");
                this.sendData();
            },
             ifUserId(){
                return userId;
            },
            deleteUser(userId){
                 var confirmmes = confirm("Do you want to delete your account?");
                    if (confirmmes == true) {
                        this.crudDeleteUser(userId);
                    }
               
            },
            crudDeleteUser(p){
                var ob = {name: p}
                 var host = "http://35.196.189.224:3000/deleteUser/" + userId; 
              this.$http.post(host, ob, { headers: { "content-type": "application/json" } }).then(result => {
                  host = result;
                  this.sendData();
    
              });
            },
            ifLogin(){
                return login == true;
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
</style>