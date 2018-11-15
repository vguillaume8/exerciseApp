<template>
<div>


    <form action="http://localhost:3000/user" method="get">
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
<div id="fb-root"></div>
<div class="fb-login-button" data-max-rows="1" data-size="large" data-button-type="continue_with" data-show-faces="false" data-auto-logout-link="false" data-use-continue-as="false"></div>
</div>


</template>

<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.2&appId=488823434962064&autoLogAppEvents=1';
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>


