<template>
    <div class="hello">
        <h1>Login to your account</h1>
        <h3>Register <a href="/register">Here </a>if you do not have an account</h3>
        <input type="text" name="firstName" v-model="input.firstName" placeholder="First Name" required/>
        <input type="text" name="lastName" v-model="input.lastName" placeholder="Last Name" required/>
        <button v-on:click="sendData()">Login</button>

        <br />
        <br />
        <h3>{{response}} </h3>
        <textarea>{{ message }}</textarea>
        <h3> Logged Exercises <a @click.prevent="show()" class="btn btn-sm btn-primary">+</a></h3>
        <ul class="list-group list-group-flush">
            <li v-for="e in exercises" :key="e"
                class="list-group-item">{{e}}</li>
        </ul>
        <h3> Uploaded Pictures </h3>
        <!--<textarea>{{ pictureList }}</textarea> -->
        <img :src="`${photo}`"/>
        <ul class="list-group list-group-flush">
            <a  v-for="p in photo" :key="p"
                class="img-thumbnail">
                <img :src="p" />
            </a>
        </ul>
        
        <modal name="hello-world">
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
    </div>
</template>

<script>
    import * as api from '@/services/api_access';
    var array = new Array();
    var userId = 0;
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
                userId: ""
            }
        },
        mounted() {
            console.log("Current user id: " + api.getUserId());
            if(api.getUserId() != 0 && userId != 0){
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
                var host = "http://localhost:3000/getPhotos/"+userId; 
              this.$http.post(host, {array}, { headers: { "content-type": "application/json" } }).then(result => {
                
                 var array = result.body
                //  var finalArray = array.split(",");
               
                 this.photo = result.body;
                    //console.log(array[1]);
                
                }, error => {
                    console.error(error);
                });

                
             
            },
              sendData() {
                this.$http.post("http://localhost:3000/userLog", this.input, { headers: { "content-type": "application/json" } }).then(result => {
                    console.log(result.status);
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
                    array = res.PhotoList[0].fileName;
                    this.getPhotos(userId);
                    api.saveId(userId);
                    
                }, error => {
                    console.error(error);
                    
                });
                
            },
            getData(){
                console.log("Function ran");
                var host = "http://localhost:3000/userGet/" + api.getUserId();
                console.log(host);
                this.$http.post(host, null, { headers: { "content-type": "application/json" } }).then(result => {
                    var res = result;
                    console.log(res);
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
                    console.log(userId);
                    
                    //array = res.PhotoList[0].fileName
                    array = res.PhotoList[0].fileName;
                    this.getPhotos(userId);
                    api.saveId(userId);
                    
                }, error => {
                    console.error(error);
                    
                });

            },
            sendExercise(){
              var host = "http://localhost:3000/exercise/" + userId; 
              this.$http.post(host, this.input, { headers: { "content-type": "application/json" } }).then(result => {
                  this.sendData();
                  this.modal.close();
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