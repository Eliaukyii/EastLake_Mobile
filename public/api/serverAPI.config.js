/***
 *
 *统一定义接口，有利于维护
 *
 **/

const HISTORY = 'http://172.30.10.21:9009';
 // const HISTORY = 'http://192.168.2.101:1002/'

const URL = {
    histLogin: HISTORY + '/PaySearchInterface.aspx',//登录
    histPay: HISTORY + '/Pays.aspx',//工资，
    histExpense: HISTORY + '/Approval.aspx',//报销
    histBorrow: HISTORY + '/Anysingle.aspx',//借支
    histAllowance: HISTORY + '/CurrentPayment.aspx',//往来
    histPayManage: HISTORY + '/AllowanNone.aspx',//薪酬
    histBudget: HISTORY + '/BudgetInterface.aspx',//预算
    histCommon: HISTORY + '/ApplySeachInterface.aspx',//公共
    histCommon1: HISTORY + '/HelperMethod.aspx',//公共
    histHelper: HISTORY + '/HelperMethod.aspx',//上传
};
export default URL;