import './App.css';
import Header from './components/header/Header'
import Card from './components/card/Card';
import Button from './components/button/button';

import tripsData from './assets/data/trips.json'

function App() {
  const cardElements = tripsData.map((tripObj, idx) => <Card key={idx} item={tripObj} />)
  return (
    <>
      <div className='app-container'>
        <Header />
        <main>
          <section className='feed'>
            {cardElements}
          </section>
          <Button />
        </main>
      </div>
    </>
  );
}

export default App;
