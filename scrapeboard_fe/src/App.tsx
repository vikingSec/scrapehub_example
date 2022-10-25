import React from 'react';
import Header from './Components/Header/Header'
import ScrapeTable from './Components/ScrapeTable/ScrapeTable';
import Stats from './Components/Stats/Stats'

function App() {
  const [scrapeCount, setScrapecount] = React.useState(0)
  return (
    <div className="App">
      <Header />
      <Stats setter = {setScrapecount} scrapecount = {scrapeCount}/>
      <ScrapeTable scrapecount = {scrapeCount}/>
    </div>
  );
}

export default App;
