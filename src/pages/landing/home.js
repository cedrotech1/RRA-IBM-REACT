// import './App.css';
import Menu from '../../components/menuLanding';
import Footer from '../../components/footer';
import Hero from '../../components/homeHero';
function App() {
  return (
   <>
   <Menu/>

  

   <Hero title='WELCAME TO RWANDA REVENUE CLAIMING PAGE' discription='welcame to rwanda revenue autority claiming page !'/>

    



<main id="main">

{/* <!-- ======= Home Section ======= --> */}
<section class="section">
  <div class="container">

    <div class="row justify-content-center text-center mb-5">
      <div class="col-md-5" data-aos="fade-up">
        <h2 class="section-heading">Save your time to using SoftLand</h2>
      </div>
    </div>

    <div class="row">
      <div class="col-md-4" data-aos="fade-up" data-aos-delay="">
        <div class="feature-1 text-center">
          <div class="wrap-icon icon-1">
            <i class="bi bi-people"></i>
          </div>
          <h3 class="mb-3">Explore Your Team</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem, optio.</p>
        </div>
      </div>
      <div class="col-md-4" data-aos="fade-up" data-aos-delay="100">
        <div class="feature-1 text-center">
          <div class="wrap-icon icon-1">
            <i class="bi bi-brightness-high"></i>
          </div>
          <h3 class="mb-3">Digital Whiteboard</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem, optio.</p>
        </div>
      </div>
      <div class="col-md-4" data-aos="fade-up" data-aos-delay="200">
        <div class="feature-1 text-center">
          <div class="wrap-icon icon-1">
            <i class="bi bi-bar-chart"></i>
          </div>
          <h3 class="mb-3">Design To Development</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem, optio.</p>
        </div>
      </div>
    </div>

  </div>
</section>

<section class="section">

  <div class="container">
    {/* <div class="row justify-content-center text-center mb-5" data-aos="fade">
      <div class="col-md-6 mb-5">
        <img src="assets/img/undraw_svg_1.svg" alt="Image" class="img-fluid"/>
      </div>
    </div> */}

    <div class="row">
      <div class="col-md-4">
        <div class="step">
          <span class="number">01</span>
          <h3>Sign Up</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem, optio.</p>
        </div>
      </div>
      <div class="col-md-4">
        <div class="step">
          <span class="number">02</span>
          <h3>Create Profile</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem, optio.</p>
        </div>
      </div>
      <div class="col-md-4">
        <div class="step">
          <span class="number">03</span>
          <h3>Enjoy the app</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem, optio.</p>
        </div>
      </div>
    </div>
  </div>

</section>

<section class="section">
  <div class="container">
    <div class="row align-items-center">
      <div class="col-md-4 me-auto">
        <h2 class="mb-4">Seamlessly Communicate</h2>
        <p class="mb-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur at reprehenderit optio,
          laudantium eius quod, eum maxime molestiae porro omnis. Dolores aspernatur delectus impedit incidunt
          dolore mollitia esse natus beatae.</p>
        <p><a href="#" class="btn btn-primary">Download Now</a></p>
      </div>
      <div class="col-md-6" data-aos="fade-left">
        <img src="assets/img/undraw_svg_2.svg" alt="Image" class="img-fluid"/>
      </div>
    </div>
  </div>
</section>




{/* <!-- ======= CTA Section ======= --> */}
<section class="section cta-section">
  <div class="container">
    <div class="row align-items-center">
      <div class="col-md-6 me-auto text-center text-md-start mb-5 mb-md-0">
        <h2>Starts Publishing Your Apps</h2>
      </div>
      <div class="col-md-5 text-center text-md-end">
        <p><a href="#" class="btn d-inline-flex align-items-center"><i class="bx bxl-apple"></i><span>App store</span></a> <a href="#" class="btn d-inline-flex align-items-center"><i class="bx bxl-play-store"></i><span>Google play</span></a></p>
      </div>
    </div>
  </div>
</section>
{/* <!-- End CTA Section --> */}

</main>
{/* <!-- End #main --> */}

{/* <!-- ======= Footer ======= --> */}
<Footer/>

   </>
  );
}

export default App;
