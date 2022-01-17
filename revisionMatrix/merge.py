import os
import re
import queue
import json



# 从目录下的data文件夹中读取html文本数据
# 依次读取(startid).txt、(startid + step).txt、(startid + step * 2).txt、...、endid.txt
# 对相邻两个版本的html文本做句子匹配，默认以换行符划分，可修改divideStr调整划分策略
# hashmax为hash函数的模数
startid = 3834
endid = 3844
step = 1
hashmax = 10000007
divideStr = r"[\n|\r]"



with open("settings.json", "r") as f_set:
    setting_json = f_set.read()
    jstype = json.loads(setting_json)
    startid = jstype["startid"]
    endid = jstype["endid"]
    step = jstype["step"]



def mysplit(mystr):
    arr = []
    i = 0
    j = 0
    l = len(mystr)
    while ((i < l) & (j < l)):
        if (mystr[j] == "\n"): 
            arr.append(mystr[i:j])
            i = j + 1
        elif (mystr[j] == "\r"):
            arr.append(mystr[i:j])
            i = j + 1
        j += 1
    return arr

def merge(id):
    print("processing id : "+str(id))
    oldFile = 'merge.txt'
    newFile = 'data/' + str(id) + '.txt'
    OFile = open(oldFile, encoding='utf-8').read()
    NFile = open(newFile, encoding='utf-8').read()
    Ostr = mysplit(OFile)
    Nstr = mysplit(NFile)
    Olines = len(Ostr)
    Nlines = len(Nstr)
    maxlines = max(Olines, Nlines) + 5
    # print("olines "+str(Olines))

    def hashcode(hashstr):
        l = len(hashstr)
        s = 0
        state = 0
        i = 0
        while (i < l):
            while (hashstr[i] == "["):
                while (hashstr[i] != "]"):
                    i += 1
                    if (i >= l) :break
                i += 1
                if (i >= l) :break
            if (i >= l) : break
            s = (s * 256 + ord(hashstr[i])) % hashmax
            i += 1
        return s
    
    Omatch = [0] * maxlines
    Nmatch = [0] * maxlines
    Oid = [0] * hashmax
    Nid = [0] * hashmax
    Ocount = [0] * hashmax
    Ncount = [0] * hashmax
    Ohash = [0] * maxlines
    Nhash = [0] * maxlines

    for i in range(Olines):
        code = hashcode(Ostr[i])
        Ohash[i] = code
        Ocount[code] += 1
        Oid[code] = i

    for i in range(Nlines):
        code = hashcode(Nstr[i])
        Nhash[i] = code
        Ncount[code] += 1
        Nid[code] = i

    matchData = []

    def matchPair(i, j):
        Omatch[i] = j
        Nmatch[j] = i

    q = queue.Queue()

    for i in range(Olines):
        code = Ohash[i]
        if ((Ocount[code] == 1) & (Ncount[code] == 1)):
            Omatch[i] = Nid[code]
            matchPair(i, Omatch[i])
            q.put([i, Omatch[i]])
        else :
            matchPair(i, -1)

    for i in range(Nlines):
        code = Nhash[i]
        if ((Ocount[code] == 1) & (Ncount[code] == 1)):
            Nmatch[i] = Oid[code]
        else :
            matchPair(-1, i)

    while not q.empty():
        x = q.get()
        a = x[0]
        b = x[1]
        if ((a > 0) & (b > 0)):
            if ((Ohash[a-1] == Nhash[b-1])):
                if ((Omatch[a-1] <= 0) & (Nmatch[b-1] <= 0)):
                    q.put([a-1,b-1])
                    matchPair(a-1, b-1)
        if ((a < Olines - 1) & (b < Nlines - 1)):
            if ((Ohash[a+1] == Nhash[b+1])):
                if ((Omatch[a+1] <= 0) & (Nmatch[b+1] <= 0)):
                    q.put([a+1,b+1])
                    matchPair(a+1, b+1)
    
    with open("merge.txt", "w", encoding='utf-8') as f:
        i = 0
        j = 0
        while ((i < Olines) | (j < Nlines)):
            if (i == Olines): break
            if (Omatch[i] == -1):
                if (len(Ostr[i]) > 0):
                    f.write(Ostr[i] + '\n')
                i += 1
            else :
                if (len(Ostr[i]) > 0):
                    f.write(Ostr[i] + '\n')
                while (j < Nlines):
                    if ((Nmatch[j] != -1) & (Nmatch[j] > i)): break
                    if (Nmatch[j] == -1):
                        if (len(Nstr[j]) > 0):
                            f.write(Nstr[j] + '\n')
                    j += 1
                i += 1
        while (j < Nlines):
            # print("unexpected")
            if (len(Nstr[j]) > 0):
                f.write(Nstr[j] + '\n')
            j += 1

with open("merge.txt", "w", encoding='utf-8') as f:
    f.write("")
id = startid
while (id <= endid):
    nextid = id + step
    merge(id)
    id = nextid
