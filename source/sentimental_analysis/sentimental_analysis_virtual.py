from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from pyvirtualdisplay import Display
import os
import time
import MySQLdb


var = MySQLdb.connect("localhost","root","krishna","Tweet_DB")
with var:
	cur = var.cursor()

chromedriver = '/usr/bin/chromedriver'
os.environ['webdriver.chrome.driver'] = chromedriver
display = Display(visible=0 , size=(800, 600))
display.start()

list = ["Movie is excellent","Movie is bad","Action is awesome","Movie is not bad"]
br = webdriver.Chrome(chromedriver)
br.get('http://sentiment.vivekn.com/')

for i in range(len(list)):
	time.sleep(1)
	q=br.find_element_by_id("txt")
	q.clear()
	q.send_keys(list[i])
#	time.sleep(1)
	w=br.find_element_by_id("submit")
	time.sleep(1)
	w.send_keys(Keys.RETURN)
	time.sleep(1)
	w=br.find_element_by_tag_name('blockquote')
	te = str(w.text).split('\n')
	com = "INSERT INTO TABLE tweet_DB values (te[0],te[1][8:],te[2][18:])"
	cur.execute(com)
	#print te[1][8:]
	#print te[2][18:]
	#print str(w.text).split['/n']

br.close()
