<template>
<div>


    <form action="http://localhost:3000/user" method="post">
  <div class="form-group">
    <label for="first_name">First Name</label>
    <input type="text" name="firstName" class="form-control" id="firstName" aria-describedby="emailHelp" placeholder="Enter first Name">
    <small id="emailHelp" class="form-text text-muted">We'll never share your info with anyone else.</small>
  </div>
  <div class="form-group">
    <label for="last_name">Last Name</label>
    <input type="text" name="lastName"  class="form-control" id="lastName" placeholder="Last Name">
    <input type="hidden" name="redirect" value="/log">
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
<a @click.prevent="login" class="btn btn-sm btn-primary">Login with Facebook</a>
</div>

</template>

<script>
import * as fb from '@/services/facebook';


export default {
  methods: {
    login() {
      fb.FBLogin();

    }
  }
 
  
}
</script>




