import axios from 'axios'

class ScrapeService {
    async getScrapes(){
        let res = await axios.get('http://127.0.0.1:8000/get_scrapes')
        return res.data.scrapes
    }

    async incScrapes(){
        let res = await axios.post('http://127.0.0.1:8000/inc_scrapes')
        return res.data.scrapes;
    }
}

export default ScrapeService