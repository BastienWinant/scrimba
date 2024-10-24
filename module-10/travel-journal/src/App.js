import './App.css';

import { useState } from 'react';

import Header from './components/header/Header'
import Feed from './components/feed/Feed';
import Button from './components/button/Button';
import Form from './components/form/Form';

import tripsData from './assets/data/trips.json'

function App() {
  const [showForm, setSchowForm] = useState(false)

  function handleClick() {
    setSchowForm(!showForm)
  }

  const btnText = showForm ? 'Cancel' : 'Add trip'
  return (
    <>
      <div className='app-container'>
        <Header />
        <main>
          <Feed tripsData={tripsData} />
          <Button btnText={btnText} onClick={handleClick} />
          {/* <Form /> */}
        </main>
      </div>
    </>
  );
}

export default App;
