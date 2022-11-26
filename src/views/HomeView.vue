<template>
  <div class="home">
    <!-- Header -->
    <header id="header" class="header">
        <div class="header-content">
            <div class="container">
                <div class="row">
                    <div class="col-lg-6">
                        <div class="text-container">
                            <h1>MOBILE APP <br>FOR <span id="js-rotating" style="position : relative; margin-left: 10px;" >
                              <span :class="[currentIndex == 0 ? 'word-shown' : 'word-hidden', 'word-rotating' ]">DESIGNERS</span>
                              <span :class="[currentIndex == 1 ? 'word-shown' : 'word-hidden', 'word-rotating']">MARKETERS</span>
                              <span :class="[currentIndex == 2 ? 'word-shown' : 'word-hidden', 'word-rotating']">DEVELOPERS</span>
                            </span> </h1>
                            <p class="p-large">Leno is one of the easiest and feature packed marketing automation apps in the market. Download it today!</p>
                            <a class="btn-solid-lg page-scroll" href="#your-link"><i class="fab fa-apple"></i>APP STORE</a>
                            <a class="btn-solid-lg page-scroll" href="#your-link"><i class="fab fa-google-play"></i>PLAY STORE</a>
                        </div>
                    </div> <!-- end of col -->
                    <div class="col-lg-6">
                        <div class="image-container">
                            <img class="img-fluid" src="../assets/styles/images/header-iphone.png" alt="alternative">
                        </div> <!-- end of image-container -->
                    </div> <!-- end of col -->
                </div> <!-- end of row -->
            </div> <!-- end of container -->
        </div> <!-- end of header-content -->
    </header> <!-- end of header -->
    <!-- end of header -->

    <!-- Features -->
    <div id="features" style="    padding-bottom: 45em;" class="tabs">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <h2>FEATURES</h2>
                    <div class="p-heading p-large">Leno was designed based on input from personal development coaches and popular trainers so it offers all</div>
                </div> <!-- end of col -->
            </div> <!-- end of row -->
            <div class="row">

                <!-- Tabs Links -->
                <ul class="nav nav-tabs" id="lenoTabs" role="tablist">
                    <li style="cursor: pointer" class="nav-item">
                        <a class="nav-link" :class="[selectedTab == 1 ? 'active' : '']" id="nav-tab-1" data-toggle="tab" @click="selectedTab = 1" role="tab" aria-controls="tab-1" aria-selected="true"><i class="fas fa-cog"></i>CONFIGURING</a>
                    </li>
                    <li style="cursor: pointer" class="nav-item">
                        <a class="nav-link" :class="[selectedTab == 2 ? 'active' : '']" id="nav-tab-2" data-toggle="tab" @click="selectedTab = 2" role="tab" aria-controls="tab-2" aria-selected="false"><i class="fas fa-binoculars"></i>TRACKING</a>
                    </li>
                    <li style="cursor: pointer" class="nav-item">
                        <a class="nav-link" :class="[selectedTab == 3 ? 'active' : '']" id="nav-tab-3" data-toggle="tab" @click="selectedTab = 3" role="tab" aria-controls="tab-3" aria-selected="false"><i class="fas fa-search"></i>MONITORING</a>
                    </li>
                </ul>
                <!-- end of tabs links -->


                <!-- Tabs Content-->
                <div class="tab-content" style="position: relative;" id="lenoTabsContent">
                    
                    <!-- Tab -->
                    <div class=" fade" :class="[selectedTab == 1 ? 'word-shown' : 'word-hidden']" style="position: absolute; transition: 400ms ease all;"  id="tab-1" role="tabpanel" aria-labelledby="tab-1">
                        <div class="container">
                            <div class="row">
                                
                                <!-- Icon Cards Pane -->
                                <div class="col-lg-4">
                                    <div class="card left-pane first">
                                        <div class="card-body">
                                            <div class="text-wrapper">
                                                <h4 class="card-title">Goal Setting</h4>
                                                <p>Like any self improving process, everything starts with setting your goals and committing to them</p>
                                            </div>
                                            <div class="card-icon">
                                                <i class="far fa-compass"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card left-pane">
                                        <div class="card-body">
                                            <div class="text-wrapper">
                                                <h4 class="card-title">Visual Editor</h4>
                                                <p>Leno provides a well designed and ergonomic visual editor for you to edit your notes and input data</p>
                                            </div>
                                            <div class="card-icon">
                                                <i class="far fa-file-code"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card left-pane">
                                        <div class="card-body">
                                            <div class="text-wrapper">
                                                <h4 class="card-title">Refined Options</h4>
                                                <p>Each option packaged in the app's menus is provided in order to improve your personal development status</p>
                                            </div>
                                            <div class="card-icon">
                                                <i class="far fa-gem"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- end of icon cards pane -->

                                <!-- Image Pane -->
                                <div class="col-lg-4">
                                    <img class="img-fluid" src="../assets/styles/images/features-iphone-1.png" alt="alternative">
                                </div>
                                <!-- end of image pane -->
                                
                                <!-- Icon Cards Pane -->
                                <div class="col-lg-4">
                                    <div class="card right-pane first">
                                        <div class="card-body">
                                            <div class="card-icon">
                                                <i class="far fa-calendar-check"></i>
                                            </div>
                                            <div class="text-wrapper">
                                                <h4 class="card-title">Calendar Input</h4>
                                                <p>Schedule your appointments, meetings and periodical evaluations using the provided in-app calendar option</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card right-pane">
                                        <div class="card-body">
                                            <div class="card-icon">
                                                <i class="far fa-bookmark"></i>
                                            </div>
                                            <div class="text-wrapper">
                                                <h4 class="card-title">Easy Reading</h4>
                                                <p>Reading focus mode for long form articles, ebooks and other materials which involve large text areas</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card right-pane">
                                        <div class="card-body">
                                            <div class="card-icon">
                                                <i class="fas fa-cube"></i>
                                            </div>
                                            <div class="text-wrapper">
                                                <h4 class="card-title">Good Foundation</h4>
                                                <p>Get a solid foundation for your self development efforts. Try Leno mobile app for any mobile platform</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- end of icon cards pane -->

                            </div> <!-- end of row -->
                        </div> <!-- end of container -->
                    </div> <!-- end of tab-pane -->
                    <!-- end of tab -->

                    <!-- Tab -->
                    <div class=" fade" :class="[selectedTab == 2 ? 'word-shown' : 'word-hidden']" style="position: absolute; transition: 400ms ease all;"  id="tab-2" role="tabpanel" aria-labelledby="tab-2">
                        <div class="container">
                            <div class="row">

                                <!-- Image Pane -->
                                <div class="col-md-4">
                                    <img class="img-fluid" src="../assets/styles/images/features-iphone-2.png" alt="alternative">
                                </div>
                                <!-- end of image pane -->
                                
                                <!-- Text And Icon Cards Area -->
                                <div class="col-md-8">
                                    <div class="text-area">
                                        <h3>Track Result Based On Your</h3>
                                        <p>After you've configured the app and settled on the data gathering techniques you can not start the information trackers and start collecting those <a class="turquoise" href="#your-link">interesting details</a>. You can always change them.</p>
                                    </div> <!-- end of text-area -->
                                    
                                    <div class="icon-cards-area">
                                            <div class="card">
                                                <div class="card-icon">
                                                    <i class="fas fa-cube"></i>
                                                </div>
                                                <div class="card-body">
                                                    <h4 class="card-title">Good Foundation</h4>
                                                    <p>Get a solid foundation for your self development efforts. Try Leno mobile app for any mobile platform</p>
                                                </div>
                                            </div>
                                            <div class="card">
                                                <div class="card-icon">
                                                    <i class="far fa-bookmark"></i>
                                                </div>
                                                <div class="card-body">
                                                    <h4 class="card-title">Easy Reading</h4>
                                                    <p>Reading focus mode for long form articles, ebooks and other materials which involve large text areas</p>
                                                </div>
                                            </div>
                                            <div class="card">
                                                <div class="card-icon">
                                                    <i class="far fa-calendar-check"></i>
                                                </div>
                                                <div class="card-body">
                                                    <h4 class="card-title">Calendar Input</h4>
                                                    <p>Schedule your appointments, meetings and periodical evaluations using the provided in-app calendar option</p>
                                                </div>
                                            </div>
                                            <div class="card">
                                                <div class="card-icon">
                                                    <i class="far fa-file-code"></i>
                                                </div>
                                                <div class="card-body">
                                                    <h4 class="card-title">Visual Editor</h4>
                                                    <p>Leno provides a well designed and ergonomic visual editor for you to edit your notes and input data</p>
                                                </div>
                                            </div>
                                    </div> <!-- end of icon cards area -->
                                </div> <!-- end of col-md-8 -->
                                <!-- end of text and icon cards area -->

                            </div> <!-- end of row -->
                        </div> <!-- end of container -->
                    </div> <!-- end of tab-pane -->
                    <!-- end of tab -->

                    <!-- Tab -->
                    <div class="fade" :class="[selectedTab == 3 ? 'word-shown' : 'word-hidden']" style="position: absolute; transition: 400ms ease all;"  id="tab-3" role="tabpanel" aria-labelledby="tab-3">
                        <div class="container">
                            <div class="row">

                                <!-- Text And Icon Cards Area -->
                                <div class="col-md-8">
                                    <div class="icon-cards-area">
                                        <div class="card">
                                            <div class="card-icon">
                                                <i class="far fa-calendar-check"></i>
                                            </div>
                                            <div class="card-body">
                                                <h4 class="card-title">Calendar Input</h4>
                                                <p>Schedule your appointments, meetings and periodical evaluations using the provided in-app calendar option</p>
                                            </div>
                                        </div>
                                        <div class="card">
                                            <div class="card-icon">
                                                <i class="far fa-file-code"></i>
                                            </div>
                                            <div class="card-body">
                                                <h4 class="card-title">Visual Editor</h4>
                                                <p>Leno provides a well designed and ergonomic visual editor for you to edit your notes and input data</p>
                                            </div>
                                        </div>
                                        <div class="card">
                                            <div class="card-icon">
                                                <i class="fas fa-cube"></i>
                                            </div>
                                            <div class="card-body">
                                                <h4 class="card-title">Good Foundation</h4>
                                                <p>Get a solid foundation for your self development efforts. Try Leno mobile app for any mobile platform</p>
                                            </div>
                                        </div>
                                        <div class="card">
                                            <div class="card-icon">
                                                <i class="far fa-bookmark"></i>
                                            </div>
                                            <div class="card-body">
                                                <h4 class="card-title">Easy Reading</h4>
                                                <p>Reading focus mode for long form articles, ebooks and other materials which involve large text areas</p>
                                            </div>
                                        </div>
                                    </div> <!-- end of icon cards area -->
                                    
                                    <div class="text-area">
                                        <h3>Monitoring Tools Evaluation</h3>
                                        <p>Monitor the evolution of your finances and health state using tools integrated in Leno. The generated real time reports can be filtered based on any <a class="turquoise" href="#your-link">desired criteria</a>.</p>
                                    </div> <!-- end of text-area -->
                                </div> <!-- end of col-md-8 -->
                                <!-- end of text and icon cards area -->

                                <!-- Image Pane -->
                                <div class="col-md-4">
                                    <img class="img-fluid" src="../assets/styles/images/features-iphone-3.png" alt="alternative">
                                </div>
                                <!-- end of image pane -->
                                    
                            </div> <!-- end of row -->
                        </div> <!-- end of container -->
                    </div><!-- end of tab-pane -->
                    <!-- end of tab -->

                </div> <!-- end of tab-content -->
                <!-- end of tabs content -->

            </div> <!-- end of row --> 
        </div> <!-- end of container --> 
    </div> <!-- end of tabs -->
    <!-- end of features -->
    
    <!-- Video -->
    <div id="preview" class="basic-1">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <h2>PREVIEW</h2>
                    <div class="p-heading p-large">Target the right customers for your business with the help of Leno's patented segmentation technology</div>
                </div> <!-- end of col -->
            </div> <!-- end of row -->
            <div class="row">
                <div class="col-lg-12">

                    <!-- Video Preview -->
                    <div class="image-container">
                        <div class="video-wrapper">
                            <a class="popup-youtube" href="https://www.youtube.com/watch?v=fLCjQJCekTs" data-effect="fadeIn">
                                <img class="img-fluid" src="../assets/styles/images/video-frame.jpg" alt="alternative">
                                <span class="video-play-button">
                                    <span></span>
                                </span>
                            </a>
                        </div> <!-- end of video-wrapper -->
                    </div> <!-- end of image-container -->
                    <!-- end of video preview -->

                </div> <!-- end of col -->
            </div> <!-- end of row -->
        </div> <!-- end of container -->
    </div> <!-- end of basic-1 -->
    <!-- end of video -->
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "HomeView",
  data () {
    return {
      selectedTab: 1,
      currentIndex: 0,
    }
  },
  created(){
    setTimeout(() => {
      this.currentIndex += 1;
    }, "3000")
  },
  updated(){
    setTimeout(() => {
      if(this.currentIndex == 2){
        this.currentIndex = 0;
      }
      else{
        this.currentIndex += 1;
      }
    
    }, "3000")
  },
  components: {
    HelloWorld,
  },
};
</script>
<style scoped>
  .word-shown{
    opacity: 1;
  }
  .word-hidden{
    opacity: 0;
  }
  .word-rotating{
    transition: 400ms ease all;
    position: absolute;
  }
</style>
