import time
import requests
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json
from typing import Union
from dotenv import dotenv_values
from pydantic import BaseModel

app = FastAPI()
config = dotenv_values(".env") 
API = config['API']

origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins
)
def getJS():
    f = open('./data.json','r')
    js = json.loads(f.read())
    f.close()
    return js

def setJS(js):

    f = open('./data.json','w')
    f.write(json.dumps(js))
    f.close()
    return js


@app.get('/get_scrapes')
def get_scrapes():
    js = getJS()
    scrapes = js['scrapes']
    print(f'[-] Scrapes: {scrapes}')
    return {'status':'success', 'scrapes':scrapes, 'scrapelist':js['scrapelist']}

@app.post('/inc_scrapes')
def incScrapes():
    t = time.time()
    js = getJS()
    js['scrapes'] = js['scrapes']+1
    scrapelist = js['scrapelist']
    lat = 41.8781
    lon = 87.6298
    url = f'https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&appid={API}&units=imperial'
    print(url)
    res = requests.get(url)
    with open('./tempdata.json','w') as f:
        f.write(json.dumps(res.json()))
    res = res.json()
    temp = res['current']['temp']
    desc = res['current']['weather'][0]['description']
    
    scrapelist.append({'time':t, 'temp':temp, 'desc':desc})
    js['scrapelist'] = scrapelist
    setJS(js)
    return {'status':'success', 'scrapes':js['scrapes']}

