function floorRoomData(data){
    var floors = {}
    for (i in xrange(0,len(data)))
        floorId = data[i][2]
        if (floorId != floors)
            floors[floorId] = {
                "floorId":floorId,
                "floorName":data[i][3],
                "floorRooms":[]
            }
        floors[floorId]["floorRooms"].append({
            "roomId": data[i][0],
            "roomName": data[i][1]
        })
    return {"floors":floors.values()}
}

function floorData(data){
    var floors = []
    for (i in xrange(0,len(data)))
        floor = {
            "floorId":data[i][0],
            "floorName":data[i][1]
        }
        floors.append(floor)
    return {"floors":floors}
}

function roomData(data){
    var rooms = []
    for (i in xrange(0,len(data)))
        rooms.append({
            "roomId": data[i][0],
            "roomName": data[i][1]
        })
    return {"rooms":rooms}
}

function stockData(data){
    stockList = []
    for (i in xrange(0,len(data)))
        stock = {
            "stockId": data[i][0],
            "stockName": data[i][1],
            "stockQuantity": data[i][2],
            "tripId": data[i][3]
        }
        stockList.append(stock)
    return {"amroStock":stockList}
}

function userData(udata){
    data = {}
    if(udata && len(udata)>=2){
        data["userId"] = udata[0]
        data["userName"] = udata[1]
    }
    return data
}

function tripData(tdata){
    data = {}
    if(tdata && len(tdata)>=2){
        data["tripId"] = tdata[0]
        data["tripStatus"] = tdata[1]
    }
    return data
}

function deviceStatData(statdata){
    data = {}
    for (i in xrange(0,len(statdata)))
        data[statdata[i][1]] = statdata[i][2]
    return data
    
}

function statusData(data){
    return {"status" : data}
}

function faceData(fdata){
    data = {}
    if(fdata && len(fdata)>=2){
        data["x"] = fdata[0]
        data["y"] = fdata[1]
    return {"face":data}
    }
}