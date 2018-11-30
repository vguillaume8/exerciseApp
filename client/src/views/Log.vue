<template>
   <form id="form" action="" method="post" enctype="multipart/form-data">
        <div class="form-group">  <label for="exampleInputFile">CHOOSE FILE</label>  
            <input type="file" name="photo">  
            <p class="help-block">Upload a picture</p>  
        </div>
        <button type="submit" class="btn btn-primary" >Submit</button> 
    </form>
</template>


<script>
//import * as api from '@/services/api_access';
//getUrl();
export default {
    mounted: function() {
            
            //var host = this.getHost();
            document.getElementById("form").action = "http://localhost:3000/upload/5bfb17ff8def392cca915109";
            
        
    },
    methods : {
        getHost () {
            //var userId = api.getUserId()
            var host = "http://localhost:3000/upload/5bfb17ff8def392cca915109";
            //console.log(userId);
            //console.log("user id retrieved");
            return host;
        }
    }


    
    
}
</script>


