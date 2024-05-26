import React from 'react';
import Menu from '../../components/employee';
import MenuContent from '../../components/homeContent';
import Hero from '../../components/samplehero';

function App() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <>
      <Menu />
      <Hero
        title={`WELCOME MR ${user?.firstname.toUpperCase()} TO RRA CLAIMING PAGE`}
        description='Welcome to Rwanda Revenue Authority claiming page!'
        Button_1_link='claim'
        Button_1_Name='Claim now'
        Button_2_link='myclaim'
        Button_2_Name='My claims'
      />
      <main id="main">
        <MenuContent />
      </main>
    </>
  );
}

export default App;
