#This is a code to extract attributes from the json file received from twitter containing the tweets having the HashTag "mission impossible"


#Imports
import sqlite3 as sq
import MySQLdb

#Connect to a SQL database named Movieo1 in this case
conn=MySQLdb.connect('localhost','root','12345','Movieo1')

flag1=0
flag2=0

#Insert attributes extracted into the table named twitter
with conn:
    cur=conn.cursor()
    cur.execute("DROP TABLE IF EXISTS twitter;")
    cur.execute("CREATE TABLE twitter(id INT PRIMARY KEY,name VARCHAR(30),tweet VARCHAR(30),retweet_count INT,verified VARCHAR(30));")
    f=open('more1.txt','r')
    a="\'retweet_count\':"
    b="\'verified\':"
    c="\'text\':"
    d="\'name\':"
    #e="\'retweet_count\':"
    count=1
    for line in f:
        p=""
        if a in line:
            x=line.split(':')[1]
            x=x.strip('\n')
            x=x.strip(',')
            if x>5:
                flag1=1
        if b in line:
            y=line.split(':')[1]
            y=y.strip('\n')
            y=y.strip(' ')
            y=y.partition('}')[0]
            flag2=1
        if c in line:
            z=line.split(':')[1]
            z=z.strip('\n')
            for i in range(8,len(z)-1,1):
                p+=z[i]
            text=p
        if d in line:
            xx=line.split(':')[1]
            xx=xx.strip('\n')
            xx=xx.strip(',')
        #if e in line:
        #    yy=line.split(':')[1]
        #    yy=yy.strip('\n')
        #   yy=yy.strip(',')
        if flag1==1 and flag2!=0:
            cur.execute("INSERT INTO twitter VALUES(%s,%s,%s,%s,%s);",(count,xx,text,x,y))
            flag1=0
            flag2=0
            count+=1
