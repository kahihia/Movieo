import json
import requests



def func(inp):
    url = 'http://gateway-a.watsonplatform.net/calls/text/TextGetTextSentiment'
    payload = 'apikey=0915a75da9fb89af90a9484cc2ad9eda07e97043&text='+inp+'&outputMode=json'
    headers = {'content-type': 'application/x-www-form-urlencoded'}
    r = requests.post(url, data=payload, headers=headers)
    #print (json.loads(r.json))
    return int(float(json.loads(r.text)['docSentiment']['score'])*100)
