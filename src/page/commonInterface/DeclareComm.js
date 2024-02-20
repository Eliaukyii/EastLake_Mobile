import axios from "axios";
import URL from "../../../public/api/serverAPI.config";

export const getDept = (userid, keyWord) => {
    return new Promise(function (resolve, reject) {
        let json = {
            Search: ""
        };
        json.Search = keyWord;
        axios({
            url: URL.histCommon,
            params: {
                userid: userid,
                type: 'GetDept',
                json: window.btoa(unescape(encodeURIComponent(JSON.stringify(json))))
            },
            method: 'get'
        }).then(res => {
            let data = decodeURIComponent(escape(window.atob(res.data)));
            let obj = eval('(' + data + ')');
            resolve(obj);
        });
    })
};

export const getEmployee = (userid, deptCode, keyword) => {
    return new Promise(function (resolve, reject) {
        let json = {
            DeptCode: "",
            Search: ""
        };
        json.DeptCode = deptCode;
        json.Search = keyword;
        axios({
            url: URL.histCommon,
            params: {
                type: 'GetEmployee',
                userid: userid,
                json: window.btoa(unescape(encodeURIComponent(JSON.stringify(json))))
            },
            method: 'get'
        }).then(res => {
            let data = decodeURIComponent(escape(window.atob(res.data)));
            let obj = eval('(' + data + ')');
            resolve(obj);
        });
    })
};

export const getItem = (userid, deptCode, name, year) => {
    return new Promise(function (resolve, reject) {
        let json = {
            DeptCode: "",
            Search: "",
            Year: ""
        };
        json.DeptCode = deptCode;
        json.Search = name;
        json.Year = year;
        axios({
            url: URL.histCommon,
            params: {
                type: 'GetItem',
                userid: userid,
                json: window.btoa(unescape(encodeURIComponent(JSON.stringify(json))))
            },
            method: 'get'
        }).then(res => {
            let data = decodeURIComponent(escape(window.atob(res.data)));
            let obj = eval('(' + data + ')');
            resolve(obj);
        });
    })
};
export const getItemAll = (userid, deptCode, name, year) => {
    return new Promise(function (resolve, reject) {
        let json = {
            DeptCode: "",
            Search: "",
            Year: ""
        };
        json.DeptCode = deptCode;
        json.Search = name;
        json.Year = year;
        axios({
            url: URL.histCommon,
            params: {
                type: 'GetItemAll',
                userid: userid,
                json: window.btoa(unescape(encodeURIComponent(JSON.stringify(json))))
            },
            method: 'get'
        }).then(res => {
            let data = decodeURIComponent(escape(window.atob(res.data)));
            let obj = eval('(' + data + ')');
            resolve(obj);
        });
    })
};
export const getItemAllot = (userid, itemid, type) => {
    return new Promise(function (resolve, reject) {
        let json = {
            ID: itemid,
            Type: type
        };
        axios({
            url: URL.histBudget,
            params: {
                type: 'ResidualDistribution',
                userid: userid,
                json: unescape(encodeURIComponent(JSON.stringify(json)))
            },
            method: 'get'
        }).then(res => {
            var obj;
            if (typeof (res.data) == "string") {
                let data = decodeURIComponent(escape(res.data));
                obj = JSON.parse(data);
            }
            else {
                obj = res.data;
            }
            if (obj.code === "00") {
                resolve(parseFloat(obj.msg));
            } else {
                resolve(res.data);
            }
        });
    })
};
export const getNote = (userid, keyWord) => {
    return new Promise(function (resolve, reject) {
        let json = {
            Search: ""
        };
        json.Search = keyWord;
        axios({
            url: URL.histCommon,
            params: {
                type: 'GetNote',
                userid: userid,
                json: window.btoa(unescape(encodeURIComponent(JSON.stringify(json))))
            },
            method: 'get'
        }).then(res => {
            let data = decodeURIComponent(escape(window.atob(res.data)));
            let obj = eval('(' + data + ')');
            resolve(obj);
        });
    })
};
//薪酬栏目
export const getPayCol = (userid, ItemID, keyWord) => {
    return new Promise(function (resolve, reject) {
        let json = {
            ItemID: "",
            Search: ""
        };
        json.ItemID = ItemID;
        json.Search = keyWord;
        axios({
            url: URL.histCommon,
            params: {
                type: 'GetPayCol',
                userid: userid,
                json: window.btoa(unescape(encodeURIComponent(JSON.stringify(json))))
            },
            method: 'get'
        }).then(res => {
            let data = decodeURIComponent(escape(window.atob(res.data)));
            let obj = eval('(' + data + ')');
            resolve(obj);
        });
    })
};
//薪酬栏目类型
export const getPayColType = (userid, PayColCode) => {
    return new Promise(function (resolve, reject) {
        let json = {
            Search: ""
        };
        json.Search = PayColCode;
        axios({
            url: URL.histCommon,
            params: {
                type: 'GetPayColType',
                userid: userid,
                json: window.btoa(unescape(encodeURIComponent(JSON.stringify(json))))
            },
            method: 'get'
        }).then(res => {
            let data = decodeURIComponent(escape(window.atob(res.data)));
            let obj = eval('(' + data + ')');
            resolve(obj);
        });
    })
};
//往来单位
export const getZwd = (userid, keyWord) => {
    return new Promise(function (resolve, reject) {
        let json = {
            Search: ""
        };
        json.Search = keyWord;
        axios({
            url: URL.histCommon,
            params: {
                type: 'Getzwdwzd',
                userid: userid,
                json: window.btoa(unescape(encodeURIComponent(JSON.stringify(json))))
            },
            method: 'get'
        }).then(res => {
            let data = decodeURIComponent(escape(window.atob(res.data)));
            let obj = eval('(' + data + ')');
            resolve(obj);
        });
    })
};
//挂账科目
export const getBill = (userid, keyWord) => {
    return new Promise(function (resolve, reject) {
        let json = {
            Search: ""
        };
        json.Search = keyWord;
        axios({
            url: URL.histCommon,
            params: {
                type: 'GetBillSubject',
                userid: userid,
                json: window.btoa(unescape(encodeURIComponent(JSON.stringify(json))))
            },
            method: 'get'
        }).then(res => {
            let data = decodeURIComponent(escape(window.atob(res.data)));
            let obj = eval('(' + data + ')');
            resolve(obj);
        });
    })
};
//对冲号
export const getDCH = (userid, ZCZF, DeptCode, ItemCode, DWBH) => {
    return new Promise(function (resolve, reject) {
        let json = {
            ZCZF: "",
            DeptCode: "",
            DWBH: "",
            ItemCode: "",
        };
        json.ZCZF = ZCZF;
        json.DeptCode = DeptCode;
        json.DWBH = DWBH;
        json.ItemCode = ItemCode;
        axios({
            url: URL.histCommon,
            params: {
                type: 'GetDCH',
                userid: userid,
                json: window.btoa(unescape(encodeURIComponent(JSON.stringify(json))))
            },
            method: 'get'
        }).then(res => {
            let data = decodeURIComponent(escape(window.atob(res.data)));
            let obj = eval('(' + data + ')');
            resolve(obj);
        });
    })
};
//流程历史
export const getProcess = (userid, PI_ID) => {
    return new Promise(function (resolve, reject) {
        let json = {
            PI_ID: ""
        };
        json.PI_ID = PI_ID;
        axios({
            url: URL.histCommon,
            params: {
                userid: userid,
                type: "GetWorkFlow",
                json: window.btoa(unescape(encodeURIComponent(JSON.stringify(json))))
            }
        }).then(res => {
            let data = decodeURIComponent(escape(window.atob(res.data)));
            let obj = eval('(' + data + ')');
            resolve(obj);
        })
    })
};
//附件信息
export const getAttachment = (userid, PFI_ID) => {
    return new Promise(function (resolve, reject) {
        let json = {
            PFI_ID: ""
        };
        json.PFI_ID = PFI_ID;
        axios({
            url: URL.histCommon,
            params: {
                type: 'GetAttachment',
                userid: userid,
                json: window.btoa(unescape(encodeURIComponent(JSON.stringify(json))))
            },
            method: 'get'
        }).then(res => {
            let data = decodeURIComponent(escape(window.atob(res.data)));
            let obj = eval('(' + data + ')');
            resolve(obj);
        });
    })
};
//附件二进制预览
export const getFilePreview = (userid, At_ID) => {
    return new Promise(function (resolve, reject) {
        let json = {
            At_ID: ""
        };
        json.At_ID = At_ID;
        axios({
            url: URL.histCommon1,
            params: {
                type: 'GetFilePreview',
                userid: userid,
                json: window.btoa(unescape(encodeURIComponent(JSON.stringify(json))))
            },
            method: 'get'
        }).then(res => {
            let data = decodeURIComponent(escape(window.atob(res.data)));
            let obj = eval('(' + data + ')');
            resolve(obj);
        });
    })
};
//附件下载
// export const getFileDownload =(userid,At_ID)=>{
//     return new Promise(function (resolve,reject) {
// if (fileType === ".pdf") {
//     fileType = "application/PDF";
// } else if (fileType ===".doc") {
//     fileType = "application/msword";
// } else if (fileType ===".xls") {
//     fileType = "application/vnd.ms-excel";
// } else if (fileType === ".txt") {
//     fileType = "text/plain";
// } else if (fileType === ".ppt") {
//     fileType = "application/vnd.ms-powerpoint";
// } else if (fileType === ".rar") {
//     fileType = "application/octet-stream";
// } else if (fileType === ".zip") {
//     fileType = "application/zip";
// }else if (fileType === ".gif") {
//     fileType = "image/gif";
// } else if (fileType === ".png"||'.pnz') {
//     fileType = "image/png";
// } else if (fileType === ".JPG"||'.jpeg'||'.jpe'||'.jpz') {
//     fileType = "image/jpeg";
// } else {
//     fileType = "application/octet-stream";
// }
// let json = {
//     At_ID:""
// };
// json.At_ID = At_ID;
// console.log(json);
// axios({
//     url:URL.histCommon,
//     params:{
//         type:'GetFileDownload',
//         userid:userid,
//         json:window.btoa(unescape(encodeURIComponent(JSON.stringify(json))))
//     },
//     method:'post',
// }).then(res=>{
//     console.log(res);
//     let data = decodeURIComponent(escape(window.atob(res.data)));
// let obj = eval('(' + data + ')');
// console.log(data);
// resolve(data);
// let blob = new Blob([res.data], {type:fileType});
// let downloadElement = document.createElement('a');
// let href = window.URL.createObjectURL(blob); //创建下载的链接
// downloadElement.href = href;
// downloadElement.download = fileName; //下载后文件名
// document.body.appendChild(downloadElement);
// downloadElement.click(); //点击下载
// document.body.removeChild(downloadElement); //下载完成移除元素
// window.URL.revokeObjectURL(href); //释放blob对象
//         })
//     })
// };
//附件上传
export const getUploadFile = (userid, formData, PFI_ID) => {
    return new Promise(function (resolve, reject) {
        let json = {
            FilePath: "",
            At_ObjdectID: "",
            At_Code: "WorkFlow",
            At_Type: "PrImg"
        };
        json.At_ObjdectID = PFI_ID;
        axios({
            method: 'post',
            params: {
                type: 'UploadFile',
                userid: userid,
                Files: formData,
                json: window.btoa(unescape(encodeURIComponent(JSON.stringify(json))))
            },
            transformRequest: [function () {
                return formData;
            }],
            url: URL.histHelper,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => {
            let data = decodeURIComponent(escape(window.atob(res.data)));
            let obj = eval('(' + data + ')');
            resolve(obj);
        }).catch(reason => {
            resolve(reason);
        });
    })
};