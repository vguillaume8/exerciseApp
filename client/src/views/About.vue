<template>
  <div class="about">
    <h2>Lets Exercise was created by <a href="http://vinstonguillaume.com" target="_blank">Vinston Guillaume</a></h2>

    <p>
      This application allows users to log their exercises and share pictures of themselves working out with their friends.
    </p>

    <p><br>Lets Exercise is a web application developed using a Vue Js frontend using a component structure.
        The backend was developed using a Node Js express server implementing a MongoDB database utilizing a mongoose layer.
    </p>

    <p><br>This application uses a continous integration service, <a href="https://travis-ci.com/" target="_blank">Travis CI</a>.
            When a commit is pushed to github a NodeJs Travis CI build is triggered.
            Within the build a docker build gets triggered and sets up the client and server.
    </p>

    <p><br>This application is hosted on <a href="https://cloud.google.com/" target="_blank"> Google Cloud Platform (GCP)</a> using a docker friendly VM instance.
    </p>

    <p><br>The active domain is <a href="http://exercise.vinstonguillaume.com" target="_blank">exercise.vinstonguillaume.com</a></p>


  </div>
</template>