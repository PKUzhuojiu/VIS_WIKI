import os
import re
import queue
import json



# 从目录下的data文件夹中读取html文本数据
# 依次读取(startid).txt、(startid + step).txt、(startid + step * 2).txt、...、endid.txt
# 对相邻两个版本的html文本做句子匹配，默认以换行符划分，可修改divideStr调整划分策略
# hashmax为hash函数的模数
startid = 3891
endid = 3895
step = 1
hashmax = 10000007
divideStr = r"[\n|\r| ]"



def getdiff(id, nextid):
    oldFile = 'data/' + str(id) + '.txt'
    newFile = 'data/' + str(nextid) + '.txt'
    OFile = open(oldFile, encoding='utf-8').read()
    NFile = open(newFile, encoding='utf-8').read()
    Ostr = re.split(divideStr, OFile)
    Nstr = re.split(divideStr, NFile)
    Olines = len(Ostr)
    Nlines = len(Nstr)
    maxlines = max(Olines, Nlines) + 5

    def hashcode(str):
        l = len(str)
        s = 0
        state = 0
        i = 0
        while (i < l):
            if (state == 0):# 此段逻辑如下：将cite_note cite_ref等开头直到下一个</之间的信息忽略
                            # 防止引用的编号大量改变引起的算法匹配失败
                if ((i + 7 < l) & (str[i:i+5] == "cite_")):
                    state = 1
            elif (state == 1):
                if (str[i:i+2] != "</"):
                    while ((i < l-1) & (str[i:i+2] != "</")):
                        i += 1
                state = 0
            s = (s * 256 + ord(str[i])) % hashmax
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

    def addMatch(matchData, i, j):
        data = {
            "OldSentenceNumber" : i,
            "NewSentenceNumber" : j,
            "Size" : 0,
            "str" : "123"
        }
        if (i != -1): 
            data["Size"] = len(Ostr[i])
            data["str"] = Ostr[i][0:30]
        if (j != -1): 
            data["Size"] = len(Nstr[j])
            data["str"] = Nstr[j][0:30]

        matchData.append(data)

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

    
    for i in range(Olines):
        addMatch(matchData, i, Omatch[i])

    for i in range(Nlines):
        if (Nmatch[i] == -1):
            addMatch(matchData, -1, i)

    return matchData


allData = []
id = startid
while (id + step <= endid):
    nextid = id + step
    thisdict = {
        "OldVersionNumber" : id,
        "NewVersionNumber" : nextid,
        "MatchedPairs" : []
    }
    thisdict["MatchedPairs"] = getdiff(id, nextid)
    allData.append(thisdict)
    id = nextid
allDataStr = json.dumps(allData, indent=4)
with open("difference.json", "w") as f:
    f.write(allDataStr)
