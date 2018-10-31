<template>
    <form action="http://localhost:3000/user" method="post">
  <div class="form-group">
    <label for="first_name">First Name</label>
    <input type="text" name="firstName" class="form-control" id="firstName" aria-describedby="emailHelp" placeholder="Enter first Name">
    <small id="emailHelp" class="form-text text-muted">We'll never share your info with anyone else.</small>
  </div>
  <div class="form-group">
    <label for="last_name">Last Name</label>
    <input type="text" name="lastName"  class="form-control" id="lastName" placeholder="Last Name">
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
</template>
