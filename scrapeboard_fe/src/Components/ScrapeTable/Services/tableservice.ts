import axios from "axios";
import Scrape from "../Types/Scrape"

class TableService {
    async getScrapes(){
        let Scrapes : Array<Scrape> = [];
        let res = await axios.get('http://127.0.0.1:8000/get_scrapes')
        console.log('Res data: ',res.data)
        let resarr : Array<{time : number, temp : number, desc : string}> = res.data['scrapelist'];
        resarr.forEach((ele) => {
            Scrapes.push({time:ele.time, temp:ele.temp, desc:ele.desc})
        })
        console.log('Number of scrapes: ',Scrapes.length)
        return Scrapes;
    }
}

export default TableService