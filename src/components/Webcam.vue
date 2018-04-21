<template>
  <div class="container text-center">
    <div class="row">
      <b-card title="Webcam AR" class="mb-2 mx-auto">
        <webcamjs class="mt-2"></webcamjs>  
      </b-card>
    </div>
  </div>
</template>

<script>
  import WebcamJS from '@/components/WebcamJS'

  export default {
    name:'webcam',
    components:{
      'webcamjs': WebcamJS
    }
  }
</script>

<style scoped>
</style>
