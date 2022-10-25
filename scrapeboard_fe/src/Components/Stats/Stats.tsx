import React from 'react'
import Style from './style'
import ScrapeService from './services/scrapeservice'

export default function Stats(props : {scrapecount : number, setter : Function}) {
  const [ss, setSS] = React.useState(new ScrapeService)
  
  React.useEffect(() => {
    async function setter() {
      props.setter(await ss.getScrapes())
    }
    setter()
  },[props.scrapecount])

  async function clicker(){
    async function setter() {
      props.setter(await ss.incScrapes())
    }
    setter()
  }

  return (
    <div style={Style.container as React.CSSProperties}>
      <p>Scrapes: {props.scrapecount}</p><br/>
      <button onClick={clicker}>Scrape again!</button>
    </div>
  )
}
