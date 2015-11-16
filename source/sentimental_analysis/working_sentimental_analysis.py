#! /usr/bin/env python
import time
from selenium import webdriver as d
from selenium.webdriver.common.keys import Keys

lis=["Movie is Excellent and graphics were ok","Action was excellent","Highly disappointing","Expected a lot"]
f=d.Firefox()
f.get("http://sentiment.vivekn.com/")
#print 1
for val in lis:
 #   print 2
    elem=f.find_element_by_id("txt")
  #  print 3
    elem.clear()
    elem.send_keys(val)
    elem=f.find_element_by_id("submit")
    elem.send_keys(Keys.RETURN)
    time.sleep(0.8)
    elem=f.find_element_by_tag_name('blockquote')
    print elem.text
