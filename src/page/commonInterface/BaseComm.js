
const BaseComm = {
    GetLoginID() {
        let data = localStorage.getItem("userId");
        if (!data) {
            window.location.href = '/login';
            return '';
        } else {
            return data;
        }
    },
    GetLoginIDOnly() {
        let data = localStorage.getItem("userId");
        if (!data) {
            return '';
        } else {
            return data;
        }
    },
    GetLoginInfo() {
        let session = JSON.parse(localStorage.getItem("userInfo"));
        if (session) {
            return session;
        } else {
            return { userId: '', userName: '', userOrgID: '', userOrg: '' };
        }
    },
    SetLoginInfo(userInfo) {
        localStorage.setItem("userId", userInfo.userId);
        localStorage.setItem("userName", userInfo.userName);
        localStorage.setItem("userOrgID", userInfo.userOrgID);
        localStorage.setItem("userOrg", userInfo.userOrg);
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
    },
    UrlVersion() {
        return "2.0";
    }
}

export default BaseComm;