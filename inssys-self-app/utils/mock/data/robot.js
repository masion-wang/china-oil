define(function(require) {
    var Robot = {
        "status": 0,
        "statusText": "Success",
        "data": {
            "id": "1",
            "robotSn": "1",
            "robotHeight": 1,
            "nickname": "123",
            "rechargeCount": 1,
            "manufactureName": "1",
            "manufactureDate": "2017-04-26",
            "comCode": "1114578",
            "version": 1,
            "insertTimeForHis": "2017-04-25 13:16:37",
            "operateTimeForHis": null,
            "validStatus": "1"
        }
    };

    var RobotList = {
        "status": 0,
        "statusText": "Success",
        "data": {
            "pageNo": 1,
            "perPage": 10,
            "totalCount": 2,
            "data": [{
                "id": "1",
                "robotSn": "1",
                "robotHeight": 1,
                "nickname": "123",
                "rechargeCount": 1,
                "manufactureName": "1",
                "manufactureDate": "2017-04-26",
                "comCode": "1114578",
                "version": 1,
                "insertTimeForHis": "2017-04-25 13:16:37",
                "operateTimeForHis": null,
                "validStatus": "1"
            }, {
                "id": "4340e41f9b3b462cb8c9b82bc6ed1839",
                "robotSn": "55",
                "robotHeight": 44,
                "nickname": "22",
                "rechargeCount": 33,
                "manufactureName": "66",
                "manufactureDate": "2017-04-04",
                "comCode": "11",
                "version": 1,
                "insertTimeForHis": "2017-04-25 13:06:03",
                "operateTimeForHis": null,
                "validStatus": ""
            }]
        }
    };
    return { Robot: Robot, RobotList: RobotList };
});