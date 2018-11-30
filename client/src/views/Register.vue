<template>
<div>


    <form action="http://35.196.189.224:3000/user" method="post">
  <div class="form-group">
    <label for="first_name">First Name</label>
    <input type="text" name="firstName" class="form-control" id="firstName" aria-describedby="emailHelp" placeholder="Enter first Name" required>
    <small id="emailHelp" class="form-text text-muted">We'll never share your info with anyone else.</small>
  </div>
  <div class="form-group">
    <label for="last_name">Last Name</label>
    <input type="text" name="lastName"  class="form-control" id="lastName" placeholder="Last Name" required>
    <input type="hidden" name="redirect" value="/log">
  </div>
  <button type="submit" class="btn btn-primary" osubmit="checkUser()">Register</button>
</form>
</div>

</template>

<script>



export default {
  methods: {

  }
 
  
}
</script>




