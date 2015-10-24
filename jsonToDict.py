
#Imports
from pprint import pprint
import json

#Open the file and load the json file into data variable
with open('tweets.json') as file:    
    data=json.load(file)

#Returns a dictionary of data
pprint(data)
