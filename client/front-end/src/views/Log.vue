<template>
   <form action="http://localhost:3000/upload/5bfb46f018a0ff337c4901c7" method="post" enctype="multipart/form-data">
        <div class="form-group">  <label for="exampleInputFile">CHOOSE FILE</label>  
            <input type="file" name="photo">  
            <p class="help-block">Upload to a picture</p>  
        </div>
        <button type="submit" class="btn btn-primary" >Submit</button> 
    </form>
</template>


<script>
import { getUrl } from '@/services/api_access';
//getUrl();
export default {

    
    
}
</script>


