<template>
  <div class="home">
    <div class="jumbotron">
      <h1 class="display-4">Home!</h1>
      <ul class="list-group list-group-flush">
        <li v-for="a in all" :key="a" @click.prevent="getUser(a._id)"
          class="list-group-item">{{a.firstName}}</li>
      </ul>
      <hr class="my-4">
      <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
      <a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
    </div>

     <modal name="user-modal" id="user-modal" class="modal-body">
       <p>{{userData}}</p>
        <ul class="list-group list-group-flush">
            <a  v-for="p in userData" :key="p"
                class="img-thumbnail">
                <img :src="p" />
            </a>
        </ul>
            
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
                userData: ""
            }
        },
        mounted() {
          this.$http.post("http://localhost:3000/userAll", this.input, { headers: { "content-type": "application/json" } }).then(result => {
                    console.log(result.status);
                    if(result.status == 204){
                        alert("There is no user found under that name!");
                    }
                    var res = result.data;
                    this.response = "Welcome Back " + res.firstName + "!",
                    this.all = res;
                    var exArray = new Array();
             
                    
                }, error => {
                    console.error(error);
                    
                });
        },
        methods : {
          getUser(userId){
            var ob = {userId: userId};
            var host = "http://localhost:3000/userGet";
            this.$http.post("http://localhost:3000/userGet", ob, { headers: { "content-type": "application/json" } }).then(result => {
              this.userData = result;
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
