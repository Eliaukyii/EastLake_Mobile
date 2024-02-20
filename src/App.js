import React, { Fragment } from 'react';
import 'babel-polyfill'
import './css/App.css'
import './css/icon.css'
import './css/iconfont.css'
import './css/cssnew/iconfont.css'
import Login from "./page/login";
import Home from './page/homepage/home'
import { BrowserRouter, Route } from 'react-router-dom'
//工资
import PayYearDetail from "./page/payYear/PayYearDetail";
import PayMonthDetail from "./page/payYear/PayMonthDetail";
import PayYearHome from "./page/payYear/PayYearHome";
import PayThisMonth from "./page/payYear/PayThisMonth";
import PayContrastDetail from "./page/payYear/PayContrastDetail";
import PayAllowanceDetail from "./page/payYear/PayAllowanceDetail";
//报销
import PayExpenseList from "./page/payExpense/PayExpenseList";
import PayExpenseAudit from "./page/payExpense/PayExpenseAudit";
import PayExpenseAdd from "./page/payExpense/PayExpenseAdd";
import AddExpenseTwo from "./page/payExpense/AddExpenseTwo";
import AddExpenseThird from "./page/payExpense/AddExpenseThird";
import AddExpenseFour from "./page/payExpense/AddExpenseFour";
//借支
import PayBorrowList from "./page/payBorrow/PayBorrowList";
import PayBorrowAudit from "./page/payBorrow/PayBorrowAudit";
import PayBorrowAdd from "./page/payBorrow/PayBorrowAdd";
import AddBorrowTwo from "./page/payBorrow/AddBorrowTwo";
import AddBorrowThird from "./page/payBorrow/AddBorrowThird";
//往来
import PayAllowanceList from "./page/payAllowance/PayAllowanceList";
import PayAllowanceAudit from "./page/payAllowance/PayAllowanceAudit";
import PayAllowanceAdd from "./page/payAllowance/PayAllowanceAdd";
import AddAllowanceTwo from "./page/payAllowance/AddAllowanceTwo";
import AddAllowanceThird from "./page/payAllowance/AddAllowanceThird";
//下发
import PayDelegateAudit from "./page/payDelegate/PayDelegateAudit";
import PayDelegateList from "./page/payDelegate/PayDelegateList";
import PayDelegateAdd from "./page/payDelegate/PayDelegateAdd";
import PreDelegateDetail from "./page/payDelegate/PreDelegateDetail";
//分配
import PayAllocationList from "./page/payAllocation/PayAllocationList";
import PayAllocationAdd from "./page/payAllocation/PayAllocationAdd";
//公告
import NoticeDetail from "./page/notice/NoticeDetail";
//欠款
import PayDebtList from "./page/payDebt/PayDebtList";
import PayDebtDetail from "./page/payDebt/PayDebtDetail";
//薪酬
import PayManageList from "./page/payManagement/PayManageList";
import PayManageAdd from "./page/payManagement/PayManageAdd";
import PayManageAudit from "./page/payManagement/PayManageAudit";
//文件预览
import FilePreviewDetail from "./page/commonComp/FilePreviewDetail";
import FilePreviewDetail2 from "./page/commonComp/FilePreviewDetail2";
//项目执行统计表和下发分配表
import itemTree from "./page/item/itemTree";
import itemTree2 from "./page/item/itemTree2";
//提交成功
import SubmitSuccessPage from "./page/commonComp/SubmitSuccessPage";
import PreAllocationDetail from "./page/payAllocation/PreAllocationDetail";
import PayAllocationAudit from "./page/payAllocation/PayAllocationAudit";
const App = () => {
    return (
        <BrowserRouter>
            <Fragment>
                <Route path="/" exact component={Login} />
                <Route path="/login" exact component={Login} />
                <Route path="/home" exact component={Home} />
                <Route path="/home/noticeDetail" exact component={NoticeDetail} />
                <Route path="/home/payYearHome" exact component={PayYearHome} />
                <Route path="/home/payYearHome/payYearDetail" exact component={PayYearDetail} />
                <Route path="/home/payYearHome/payThisMonth" exact component={PayThisMonth} />
                <Route path="/home/payYearHome/payMonthDetail" exact component={PayMonthDetail} />
                <Route path="/home/payYearHome/payContrastDetail" exact component={PayContrastDetail} />
                <Route path="/home/payYearHome/PayAllowanceDetail" exact component={PayAllowanceDetail} />
                <Route path="/home/manageSubmitSuccess" exact component={SubmitSuccessPage} />
                <Route path="/home/payManageList" exact component={PayManageList} />
                <Route path="/home/payManageAdd" exact component={PayManageAdd} />
                <Route path="/home/payManageAudit" exact component={PayManageAudit} />
                <Route path="/home/payExpenseList" exact component={PayExpenseList} />
                <Route path="/home/payExpenseAdd" exact component={PayExpenseAdd} />
                <Route path="/home/addExpenseTwo" exact component={AddExpenseTwo} />
                <Route path="/home/addExpenseThird" exact component={AddExpenseThird} />
                <Route path="/home/addExpenseFour" exact component={AddExpenseFour} />
                <Route path="/home/payExpenseAudit" exact component={PayExpenseAudit} />
                <Route path="/home/expenseSubmitSuccess" exact component={SubmitSuccessPage} />
                <Route path="/home/payBorrowList" exact component={PayBorrowList} />
                <Route path="/home/payBorrowAdd" exact component={PayBorrowAdd} />
                <Route path="/home/addBorrowTwo" exact component={AddBorrowTwo} />
                <Route path="/home/addBorrowThird" exact component={AddBorrowThird} />
                <Route path="/home/payBorrowAudit" exact component={PayBorrowAudit} />
                <Route path="/home/borrowSubmitSuccess" exact component={SubmitSuccessPage} />
                <Route path="/home/payAllowanceList" exact component={PayAllowanceList} />
                <Route path="/home/payAllowanceAdd" exact component={PayAllowanceAdd} />
                <Route path="/home/addAllowanceTwo" exact component={AddAllowanceTwo} />
                <Route path="/home/addAllowanceThird" exact component={AddAllowanceThird} />
                <Route path="/home/payAllowanceAudit" exact component={PayAllowanceAudit} />
                <Route path="/home/allowanceSubmitSuccess" exact component={SubmitSuccessPage} />
                <Route path="/home/payDelegateList" exact component={PayDelegateList} />
                <Route path="/home/payDelegateAudit" exact component={PayDelegateAudit} />
                <Route path="/home/payDelegateAdd" exact component={PayDelegateAdd} />
                <Route path="/home/preDelegateAdd" exact component={PreDelegateDetail} />
                <Route path="/home/delegateSubmitSuccess" exact component={SubmitSuccessPage} />
                <Route path="/home/payAllocationList" exact component={PayAllocationList} />
                <Route path="/home/payAllocationAudit" exact component={PayAllocationAudit} />
                <Route path="/home/payAllocationAdd" exact component={PayAllocationAdd} />
                <Route path="/home/preAllocationAdd" exact component={PreAllocationDetail} />
                <Route path="/home/allocationSubmitSuccess" exact component={SubmitSuccessPage} />
                <Route path="/home/payDebtList" exact component={PayDebtList} />
                <Route path="/home/PayDebtDetail" exact component={PayDebtDetail} />
                <Route path="/home/filePreviewDetail" exact component={FilePreviewDetail} />
                <Route path="/home/filePreviewDetail2" exact component={FilePreviewDetail2} />
                <Route path="/home/itemTree" exact component={itemTree} />
                <Route path="/home/itemTree2" exact component={itemTree2} />
            </Fragment>
        </BrowserRouter>
    )
};

export default App;