import os
import re
import queue
import json
import collections
import calendar

#使用词典存储id和时间的对应
fi0 = open('edit_history.csv','r',encoding='utf-8')
dict = collections.defaultdict(str)
while True:
    line = fi0.readline()
    if line=='':
        break

    line_list = line.split(',')
    hm = line_list[2][1:]
    if hm=='': #第一次异常空值id一万多，可以直接退出
        break
    date_list = line_list[3][0:-1].split()
    day = int(date_list[0])
    month = list(calendar.month_name).index(date_list[1])
    year = int(date_list[2])
    date = "%4d-%02d-%02d" % (year, month, day)
    time = date+' '+hm
    #print(time)
    dict[line_list[0]]=time

data_file = 'points_3834_5500.json' #数据文件名
fi1 = open(data_file,'r',encoding='utf-8')
data = json.load(fi1)
i = 0
j = 0
for i in range(len(data)):
    if data[i]==[]:
        continue
    for j in range(len(data[i])):
        data[i][j][0] = dict[str(data[i][j][0])]
        data[i][j][1] = dict[str(data[i][j][1])]

fi2 = open(data_file[0:-5]+'_processed.json','w',encoding='utf-8')
fi2.write(json.dumps(data,indent=4))
fi2.close()



