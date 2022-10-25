import React from 'react'
import TableService from './Services/tableservice'
import Scrape from './Types/Scrape'
import Style from './style'

export default function ScrapeTable(props : {scrapecount : number}) {
  const [ts, SetTableService] = React.useState(new TableService())
  const [scrapes, setScrapes] = React.useState(Array<Scrape>())
  React.useEffect(() => {
    async function getter(){
      let tempscrapes : Array<Scrape> = await ts.getScrapes()
      setScrapes(tempscrapes)
    }
    getter()
  }, [props.scrapecount])

  return (
    <div>
      <table className="scrape-table" style={Style.table as React.CSSProperties}>
        <tr className="table-headers" style={Style.tableRow}>
          <th>ID</th>
          <th>Time</th>
          <th>Temp</th>
          <th>Description</th>
          <th>Delete?</th>
        </tr>
        {scrapes.map((s,i) => {
          return(
            <tr style={Style.tableRow as React.CSSProperties} key={i}>
              <td>{i}</td>
              <td>{s.time}</td>
              <td>{s.temp}</td>
              <td>{s.desc}</td>
              <td></td>
            </tr>
          )
        })}
      </table>
    </div>
  )
}
