<template>
    <div class="hello">
        <h1>Login to your account</h1>
        <h3>Register <a href="/register">Here </a></h3>
        <input type="text" name="firstName" v-model="input.firstName" placeholder="First Name" />
        <input type="text" name="lastName" v-model="input.lastName" placeholder="Last Name" />
        <button v-on:click="sendData()">Send</button>
        <button v-on:click="getPhotos()">Get Photos</button>

        <br />
        <br />
        <h3>{{response}} </h3>
        <textarea>{{ message }}</textarea>
        <img :src="`${photo}`"/>
    </div>
</template>

<script>
    var array = new Array();
    export default {
        name: 'HelloWorld',
        data () {
            return {
                ip: "",
                input: {
                    
                },
                response: "",
                message: "",
                photo: ""
            }
        },
        mounted() {
            this.$http.get("https://httpbin.org/ip").then(result => {
                this.ip = result.body.origin;
            }, error => {
                console.error(error);
            });
        },
        methods: {
            sendData() {
                this.$http.post("http://localhost:3000/userLog", this.input, { headers: { "content-type": "application/json" } }).then(result => {
                    var res = result.data[0];
                    this.response = "Welcome Back " + res.firstName + "!",
                    this.message = res;
                    //array = res.PhotoList[0].fileName
                    array = res.PhotoList[0].fileName;
                }, error => {
                    console.error(error);
                });
            },
            getPhotos(){
              this.$http.post("http://localhost:3000/getPhotos", {array}, { headers: { "content-type": "application/json" } }).then(result => {
                 this.photo = result.imgs;
                }, error => {
                    console.error(error);
                });
             
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