export const CommonConfig = {
    loadMoreTxt: '加载更多',
    loadFinishTxt: '加载完毕',
    loadFailTxt: '加载失败',
    scroll: 'scroll',
    hidden: 'hidden',
    opened: 'opened',
    closed: 'closed',
};

//报销列表 操作类型
export const ActType = [
    { label: "审批", keyword: 'SP' },
    { label: "申报", keyword: '' }
];

//报销列表 操作单据状态
export const StatusType = [
    { label: "全部", keyword: '-1' },
    { label: "未提交", keyword: '0' },
    { label: "进行中", keyword: '1' },
    { label: "已完成", keyword: '2' },
    { label: "退回", keyword: '4' },
    { label: "逾期", keyword: '5' }
];

//报销列表 搜索条件
export const SearchType = [
    { label: "单号", keyword: 0 },
    { label: "摘要", keyword: 3 }
];
//对冲号 搜索条件
export const DchFliter = [
    { label: "领款部门", keyword: 'Bmbh' },
    { label: "往来单位", keyword: 'Dwbh' },
    { label: "预算项目", keyword: 'Xmbh' }
];

//列表选项卡
export const ContractTabData = [
    { 'tabName': '今天', 'id': 'three', 'tabIndex': 0, 'count': 0 },
    { 'tabName': '近一周', 'id': 'week', 'tabIndex': 1, 'count': 0 },
    { 'tabName': '全部', 'id': 'all', 'tabIndex': 2, 'count': 0 }
];
//申报列表选项卡
export const DeclareTabData = [
    { 'tabName': '未提交', 'id': 'notSub', 'tabIndex': 0, 'count': 0 },
    { 'tabName': '进行中', 'id': 'submit', 'tabIndex': 1, 'count': 0 },
    { 'tabName': '已退回', 'id': 'return', 'tabIndex': 2, 'count': 0 }
];
//审核列表选项卡
export const ApprovalTabData = [
    { 'tabName': '待审批', 'id': 'approval', 'tabIndex': 0, 'count': 0 },
    { 'tabName': '已完成', 'id': 'success', 'tabIndex': 1, 'count': 0 },
    { 'tabName': '全部', 'id': 'all', 'tabIndex': 2, 'count': 0 }
];
//下发分配列表选项卡
export const DelegateTabData = [
    { 'tabName': '未提交', 'id': 'notSub', 'tabIndex': 0, 'count': 0 },
    { 'tabName': '未审批', 'id': 'submit', 'tabIndex': 1, 'count': 0 },
    { 'tabName': '已完成', 'id': 'success', 'tabIndex': 2, 'count': 0 }
];
//下发申报选项卡
export const UndistributedTabData = [
    { 'tabName': '未分配', 'id': 'approval', 'tabIndex': 0, 'count': 0 },
    { 'tabName': '进行中', 'id': 'success', 'tabIndex': 1, 'count': 0 },
    { 'tabName': '已退回', 'id': 'all', 'tabIndex': 2, 'count': 0 }
];
//对冲号暂存暂付
export const ZczfData = [
    { label: '暂存', keyword: 'zc' },
    { label: '暂付', keyword: 'zf' }
];
//首页待办与资讯选项卡
export const HomeTabData = [
    { 'tabName': '待办', 'id': 'Approval', 'tabIndex': 0, 'count': 0 },
    { 'tabName': '资讯', 'id': 'Article1', 'tabIndex': 1, 'count': 0 }
];
//下发类型选项
export const DelegateType = [
    { label: "调整预算", keyword: '0' },
    { label: "年初预算", keyword: '1' },
    { label: "结转预算", keyword: '2' }
]
//移动端权限参数
export const AllMenu = [
    { Menu_ID: '5ed20159-d1ad-4bbe-92f3-e574d9d6be88', isShow: false },//0“申报”的报销申报和“查询”的报销查询
    { Menu_ID: '50b0de20-44de-441e-8c48-f641943f374f', isShow: false },//1“审批”的报销审批
    { Menu_ID: '201705091608593987', isShow: false },//2“首页”的预算管理
    { Menu_ID: '201705101130391869', isShow: false },//3“首页”的预算管理
    { Menu_ID: '201605301130387887', isShow: false },//4“申报”的薪酬申报和“查询”的薪酬查询
    { Menu_ID: '201708141454184143', isShow: false },//5“审批”的薪酬审批
    { Menu_ID: '201607121512509449', isShow: false },//6“查询”的工资查询
    { Menu_ID: '201607141718142647', isShow: false },//7“查询”的工资查询
    { Menu_ID: '184727cc-1b9f-4788-a452-bc16987e10ad', isShow: false },//8“申报”的往来申报和“查询”的往来查询
    { Menu_ID: '8cca0fea-84fc-4427-ac34-ba47154d5c80', isShow: false },//9“审批”的往来审批
    { Menu_ID: 'c3add1a8-7dc7-4a85-a693-8b557907490d', isShow: false },//10“申报”的借支申报和“查询”的借支查询
    { Menu_ID: '7865a81a-abaf-4340-9f0a-76fa85f00961', isShow: false },//11“审批”的借支审批
    { Menu_ID: '201707032253157336', isShow: false },//12预算执行
    { Menu_ID: '201707032252563707', isShow: false }//13下发分配
]
