/** boss-core简体中文语言包 */
BCLang = {}
//主页模块
BCLang.home = {
	topWelcome: "当前操作员~",
	searchTabs:["名称编号~","设备编号~","安装地址~","电话号码~","多条件搜索~"],
	searchTip:"客户编号|受理编号|银行账号|宽带账号~",
	searchBtns:["搜索~","缴费~"],
	main: {
		tabs: ["客户信息~","单位信息1", "用户信息~", "账户信息~", "缴费记录~", "单据信息~", "业务流水~","指令信息~", "账单信息~"],
		// 客户面板
		cust: {
			base: {_title: "基本信息",name: "客户名称",busiId: "受理编号",openDate: "开户日期",addr: "地址",status: "客户状态",
				type: "客户类型",certType: "证件类型",certNum: "证件号码",linkMan: "联系人",tel: "固定电话",barthday: "出生日期",
				mobile: "手机号码",areaCateory: "区域小区",houseNetType: "服务类型",houseManager: "小区客户经理",
				houseOptr: "小区运维人员",postalAddr: "邮寄地址", remark: "备注",
				email: "邮箱", sex: "性别",
				agentName: "代理商", deptName: "开户部门", developName: "发展人", businessLicence: "营业执照", unitNumber: "单位税号",
				spkgSn: "协议编号", cust_level: "客户级别"
			},
			acct: {
				_title: "账目信息~",
				columns: ["账目名称~","卡号~","余额~","往月欠费~", "本月费用~","实时费用~","实时余额~","可转余额~","可退余额~","冻结余额~"]
			},
			change:{
				_title: '异动信息~',
				columns: ["属性~","修改前~","修改后~","修改日期~"]
			},
			acctTabs: {
				detail: {
					_title: '明细~',
					columns: ["资金类型~","余额~"]
				},
				adjust: {
					_title: '调账~',
					columns: ["调账金额~","操作时间~","调账原因~","备注~"]
				},
				changes: {
					_title: '异动~',
					columns: ["业务~","资金类型~","变更类型~","变更前~","变更金额~","变更后~","备注~","操作时间~"]
				}
			}
		},
		// 用户面板
		user: {
			list: {
				_title: '用户信息~',
				columns: ["用户类型~","用户名~","状态~","状态时间~", "机顶盒~","智能卡~","Modem号~"],
				tools: ["有效产品~","查询~"]
			},
			prod: {
				base: {
					_title: "用户产品~",
					columns: ["订购SN~","产品名称~","所属套餐~","当前资费~","生效日期~" ,"失效日期~","创建流水号~","状态~","状态变更时间~","订购时间~" ,"订购月数~"]
				},
				pkg: {
					_title: '客户套餐~',
					columns: ["订购SN~","产品名称~","当前资费~","状态~","生效日期~" ,"失效日期~","产品类型~","订购时间~"]
				},
				tools: ["默认订单~","历史订单~"]
			},
			userDetail: {
				tabs: ["详细信息~","异动信息~"],
				detail: ["用户类型~","用户名~","设备型号~","购买方式~","状态~","状态时间~","预报停时间~","创建时间~","催费类型~","在网协议期~","账号~","终端类型~"],
				change: ["业务~","属性~","修改前~","修改后~","修改日期~","操作员~"]
			},
			prodDetail: {
				tabs: ["订单金额明细~","异动信息~"],
				detail: ["编号~","资金类型~","转入产品~","转入类型~","转入金额~","转出产品~","转出类型~","转出金额~","流水号~" ]
			}
		},
		//缴费记录
		pay: {
			
		}
	}
}
