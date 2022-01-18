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

#读取作者词典
fi1 = open('authors.json','r',encoding='utf-8')
au_dict = json.load(fi1)
fi1.close()

# [旧版本号，对应时间，新版本号，对应时间，纵坐标，增删标记，作者]
data_file = 'points_3834_5500.json' #数据文件名
fi2 = open(data_file,'r',encoding='utf-8')
data = json.load(fi2)
i = 0
j = 0
for i in range(len(data)):
    if data[i]==[]:
        continue
    for j in range(len(data[i])):
        new_point = []
        new_point.append(data[i][j][0])
        new_point.append(dict[str(data[i][j][0])])
        new_point.append(data[i][j][1])
        new_point.append(dict[str(data[i][j][1])])
        new_point.append(data[i][j][2])
        new_point.append(data[i][j][3])
        new_point.append(au_dict[str(data[i][j][1])])
        data[i][j] = new_point

fi3 = open(data_file[0:-5]+'_all_processed.json','w',encoding='utf-8')
fi3.write(json.dumps(data,indent=4))
fi3.close()



