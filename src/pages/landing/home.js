// import './App.css';
import Menu from '../../components/menuLanding';
import Footer from '../../components/footer';
import Hero from '../../components/homeHero';
import MenuContent from '../../components/homeContent';
function App() {
  return (
    <>
      <Menu />
      <Hero title='WELCAME TO RWANDA REVENUE CLAIMING PAGE' discription='welcame to rwanda revenue autority claiming page !' />
      <main id="main">
        <MenuContent />
      </main>

      <Footer />

    </>
  );
}

export default App;
