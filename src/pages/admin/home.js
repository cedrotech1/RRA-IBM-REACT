// import './App.css';
import Menu from '../../components/admin';
// import Footer from '../../components/footer';
// import Hero from '../../components/homeHero';
import Hero from '../../components/samplehero';
function App() {
  return (
   <>
   <Menu/>

  

   <Hero title='WELCAME  MR  CEDRICK TO RRA CLAIMNG PAGE' discription='welcame admin Cedrick to rwanda revenue autority claiming page !'  Button_1_link='claim' Button_1_Name='Claim now' Button_2_link='myclaim' Button_2_Name='My claims'/>

    



<main id="main">



<section class="section">

  <div class="container">
    
    <div class="row">
      <div class="col-md-4">
        <div class="step">
          <span class="number">100</span>
          <h3>pending claims</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem, optio.</p>
        </div>
      </div>
      <div class="col-md-4">
        <div class="step">
          <span class="number">59</span>
          <h3>approved claims</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem, optio.</p>
        </div>
      </div>
      <div class="col-md-4">
        <div class="step">
          <span class="number">20</span>
          <h3>rejected claims</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem, optio.</p>
        </div>
      </div>
    </div>
  </div>

</section>




</main>


   </>
  );
}

export default App;
