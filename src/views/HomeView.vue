<template>
  <div class="home">
    <!-- Header -->
    <header id="header" class="header">
        <div class="header-content">
            <div class="container">
                <div class="row">
                    <div class="col-lg-6">
                        <div class="text-container">
                            <h1 :style="[isMobile ? {'margin-bottom': '57px'} : '']">НАПРАВЕТЕ БИЗНЕСА<br>СИ <span id="js-rotating"  style="position : relative; margin-left: 10px;" >
                              <span :class="[currentIndex == 0 ? 'word-shown' : 'word-hidden', 'word-rotating' ]">ИНОВАТИВЕН</span>
                              <span :class="[currentIndex == 1 ? 'word-shown' : 'word-hidden', 'word-rotating']">УДОБЕН</span>
                              <span :class="[currentIndex == 2 ? 'word-shown' : 'word-hidden', 'word-rotating']">ЕФЕКТИВЕН</span>
                            </span> </h1>
                            <p class="p-large fancy-font">Подобрете преживяването на вашите клиенти с <br> <span style="color: #00c9db; font-weight: bold;"> Meta Menu</span></p>
                            <a class="btn-solid-lg page-scroll" target="_blanc" href="https://meta-menu.netlify.app/menu/f7a01c46-a728-496e-ba74-a7e9219f4ea9/1">Демо</a>
                            <a class="btn-solid-lg page-scroll" style="color: white; cursor: pointer;" @click="scrollTo()">Информация</a>
                        </div>
                    </div> <!-- end of col -->
                    <div class="col-lg-6">
                        <div class="image-container">
                            <img class="img-fluid" src="../assets/styles/images/header-iphone_remade.png" alt="alternative">
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
                    <h2 style="font-size: 33px;">Функционалности</h2>
                    <div class="p-heading p-large">С нашите услуги можете лесно да създавате и актуализирате менюто си в реално време, а клиентите Ви да имат достъп до него като просто сканират QR кода.</div>
                </div> <!-- end of col -->
            </div> <!-- end of row -->
            <div class="row">

                <!-- Tabs Links -->
                <ul class="nav nav-tabs" id="lenoTabs" role="tablist">
                    <li style="cursor: pointer" class="nav-item">
                        <a class="nav-link" :class="[selectedTab == 1 ? 'active' : '']" id="nav-tab-1" data-toggle="tab" @click="selectedTab = 1" role="tab" aria-controls="tab-1" aria-selected="true"><i class="fas fa-cog"></i>МЕНЮ</a>
                    </li>
                    <li style="cursor: pointer" class="nav-item">
                        <a class="nav-link" :class="[selectedTab == 3 ? 'active' : '']" id="nav-tab-3" data-toggle="tab" @click="selectedTab = 3" role="tab" aria-controls="tab-3" aria-selected="false"><i class="fas far fa-chart-bar"></i>СТАТИСТИКА</a>
                    </li>
                    <li style="cursor: pointer" class="nav-item">
                        <a class="nav-link" :class="[selectedTab == 2 ? 'active' : '']" id="nav-tab-2" data-toggle="tab" @click="selectedTab = 2" role="tab" aria-controls="tab-2" aria-selected="false"><i class="fas fa-money-bill"></i>ПОРЪЧКИ</a>
                    </li>
                </ul>
                <!-- end of tabs links -->


                <!-- Tabs Content-->
                <div class="tab-content" style="position: relative;" :class="[selectedTab == 2 ? 'shorter-tab-heigth' : 'longer-tab-heigth']" id="lenoTabsContent">
                    
                    <!-- Tab -->
                    <div class=" fade" :class="[selectedTab == 1 ? 'word-shown' : 'word-hidden']" style="position: absolute; transition: 400ms ease all;"  id="tab-1" role="tabpanel" aria-labelledby="tab-1">
                        <div class="container">
                            <div class="row">
                                
                                <!-- Icon Cards Pane -->
                                <div class="col-lg-4">
                                    <!-- <div class="card left-pane first">
                                        <div class="card-body">
                                            <div class="text-wrapper">
                                                <h4 class="card-title">Безконтактни поръчки</h4>
                                                <p></p>
                                            </div>
                                            <div class="card-icon">
                                                <i class="far fa-compass"></i>
                                            </div>
                                        </div>
                                    </div> -->
                                    <div class="card left-pane first">
                                        <div class="card-body">
                                            <div class="text-wrapper">
                                                <h4 class="card-title">Максимално удобство</h4>
                                                <p>Клиентите разглеждат менюто и правят поръчка със свое собствено темпо, без да се налага да отпращат или чакат сервитьор да донесе менюто или да вземе поръчката.</p>
                                            </div>
                                            <div class="card-icon">
                                                <i class="far fa-smile"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card left-pane">
                                        <div class="card-body">
                                            <div class="text-wrapper">
                                                <h4 class="card-title">Спестени ресурси</h4>
                                                <p>Традиционните хартиени менюта могат да бъдат високобюджетни, особено ако се налагат чести редакции по тях. QR менюто значително намаля нужните бройки хартиени менюта и спестява солидно количество от предвидените за целта ресурси.</p>
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
                                                <i class="far fa-check-square"></i>
                                            </div>
                                            <div class="text-wrapper">
                                                <h4 class="card-title" style="text-align: left">Актуална информация</h4>
                                                <p style="text-align: left">Менюто може лесно да се модифицира по всяко време, позволявайки на клиентите да разполагат с най - актуалната му версия.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card right-pane">
                                        <div class="card-body">
                                            <div class="card-icon">
                                                <i class="fas fa-leaf"></i>
                                            </div>
                                            <div class="text-wrapper">
                                                <h4 class="card-title" style="text-align: left">Приятел на природата</h4>
                                                <p style="text-align: left">QR менюто елиминира нуждата от употреба на хартиени менюта, което помага за намаляване на замърсяването и изсичането на дървета.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- <div class="card right-pane">
                                        <div class="card-body">
                                            <div class="card-icon">
                                                <i class="fas fa-cube"></i>
                                            </div>
                                            <div class="text-wrapper">
                                                <h4 class="card-title">Good Foundation</h4>
                                                <p>Get a solid foundation for your self development efforts. Try Leno mobile app for any mobile platform</p>
                                            </div>
                                        </div>
                                    </div> -->
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
                                        <h3>Поръчването стана много по - лесно</h3>
                                        <p>След като сте оформили своето онлайн меню и сте предоставили достъп на клиентите до QR кодовете можете да започнете да получавате поръчки!</p>
                                    </div> <!-- end of text-area -->
                                    
                                    <div class="icon-cards-area">
                                            <div class="card">
                                                <div class="card-icon">
                                                    <font-awesome-icon icon="fa-solid fa-fingerprint" class="fas" style="padding-top: 19px;"/>
                                                </div>
                                                <div class="card-body">
                                                    <h4 class="card-title">Безконтактни поръчки</h4>
                                                    <p>Клиентите могат да разглеждат менюто и да правят поръчки без да се налага употребата на хартиено меню. Това ще намали риска от предаване на бактерии и ще повиши безопасността при пандемия.</p>
                                                </div>
                                            </div>
                                            <div class="card">
                                                <div class="card-icon">
                                                    <i class="fas fa-chart-line"></i>
                                                </div>
                                                <div class="card-body">
                                                    <h4 class="card-title">Ръст в продажбите</h4>
                                                    <p>Процесът на поръчване е лесен, ефективен и бърз, което води до повишен брой поръчки и съответно повече продажби.</p>
                                                </div>
                                            </div>
                                            <!-- <div class="card">
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
                                            </div> -->
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
                                                <h4 class="card-title">Оптимизация</h4>
                                                <p>Използвайте статистиката, за да следите кои са бестселърите от вашето меню и кои са най-натоварените часове от деня.</p>
                                            </div>
                                        </div>
                                        <div class="card">
                                            <div class="card-icon">
                                                <i class="far fa-file-code"></i>
                                            </div>
                                            <div class="card-body">
                                                <h4 class="card-title">Яснота</h4>
                                                <p>Статистиката може да помогне да се придобие представа за предпочитанията на клиентите. Тази информация може да се използва за подобряване на удовлетвореността на клиентите.</p>
                                            </div>
                                        </div>
                                        <!-- <div class="card">
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
                                        </div> -->
                                    </div> <!-- end of icon cards area -->
                                    
                                    <div class="text-area">
                                        <h3>Нищо не говори по-добре от данните</h3>
                                        <p>Чрез използването на статистика Вие може да получатавате ценна информация за своя бизнес, да подобрите удовлетвореността на клиентите и да вземате информирани решения, които водят до увеличаване на продажбите и подобряване на ефективността.</p>
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

      <!-- Details 1 -->
      <div id="details" style="background-color: white;" class="basic-2">
        <div class="container">
            <div class="row">
                <div class="col-lg-6">
                    <img class="img-fluid" src="../assets/styles/images/details-1-iphone.png" alt="alternative">
                </div> <!-- end of col -->
                <div class="col-lg-6">
                    <div class="text-container">
                        <h3>Goals Setting</h3>
                        <p>Leno can easily help you track your personal development evolution if you take the time to properly setup your goals at the beginning of the training process. Check out the details</p>
                        <a class="btn-solid-reg popup-with-move-anim" href="#details-lightbox-1">LIGHTBOX</a>
                    </div> <!-- end of text-container -->
                </div> <!-- end of col -->
            </div> <!-- end of row -->
        </div> <!-- end of container -->
    </div> <!-- end of basic-2 -->
    <!-- end of details 1 -->


    <!-- Details 2 -->
    <div class="basic-3" style="background-color: white;">
        <div class="second">
            <div class="container">
                <div class="row">
                    <div class="col-lg-6">
                        <div class="text-container">
                            <h3>Calendar Input</h3>
                            <p>The calendar input function enables the user to setup training, meditation and relaxation sessions with ease. Just open the feature and start setting up your time as you desire</p>
                            <a class="btn-solid-reg popup-with-move-anim" href="#details-lightbox-2">LIGHTBOX</a>
                        </div> <!-- end of text-container -->
                    </div> <!-- end of col -->
                    <div class="col-lg-6">
                        <img class="img-fluid" src="../assets/styles/images/details-2-iphone.png" alt="alternative">
                    </div> <!-- end of col -->
                </div> <!-- end of row -->
            </div> <!-- end of container -->
        </div> <!-- end of second -->
    </div> <!-- end of basic-3 -->    
    <!-- end of details 2 -->
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
  computed:{
    isMobile(){
            if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
                return true;
            }
            return false;
        },
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
  methods:{
    scrollTo(){
        window.scrollTo(0, 900);
    }
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
  @media (max-width: 768px) {
    .word-rotating{
        display: block;
        margin-left: 35px;
    }

    .shorter-tab-heigth{
        height: 700px;
    }
    .longer-tab-heigth{
        height: 1382px;
    }
  }
</style>
