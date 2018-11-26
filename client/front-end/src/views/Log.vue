<template>
   <form id="form" action="" method="post" enctype="multipart/form-data" onsubmit="return false">
        <div class="form-group">  <label for="exampleInputFile">CHOOSE FILE</label>  
            <input type="file" name="photo">  
            <p class="help-block">Upload to a picture</p>  
        </div>
        <button type="submit" class="btn btn-primary" >Submit</button> 
    </form>
</template>


<script>
import * as api from '@/services/api_access';
//getUrl();
export default {
    mounted: function() {
            
            var host = this.getHost();
            document.getElementById("form").action = host;
            
        
    },
    methods : {
        getHost () {
            var userId = api.getUserId()
            var host = "http://localhost:3000/upload/" + userId;
            console.log(userId);
            return host;
        }
    }


    
    
}
</script>


