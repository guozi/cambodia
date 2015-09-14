/** boss-core简体中文语言包 */
BCLang = {}
BCLang.common = {
	optr: "操作~",
	confirm: '确认~',
	switchor: '选择~',
	pswd: '密码~',
	newPswd: '新密码~',
	confirmPswd: '确定密码~',
	remark: '备注~',
	remark2: '备注信息~',
	busiInfo: '业务信息~',
	busiSave: '业务保存~',
	tipBusiSaveOK: '业务保存成功!~',
	tipLoadText: '正在查询，请稍等...',
	tipConfirmSave: '确定要保存业务吗?~',
	tipFormInvalid: '含有验证不通过的输入项!~',
	filterTreePanel:{//可以根据关键字过滤的treePanel
		emptyTipSearchField:'输入名称过滤...~',
		btnExpandAll:'展开所有资源~',
		btnCollapseAll:'合并所有资源~'
	},
	filterTitle: '条件过滤~',
	tipExistsSystem:'确定要退出系统~',
	queryBtn:'查询~',
	queryBtnWithBackSpace:'查  询~',
	total: '合计~',
	subTotal: '小计~',
	price: '单价~',
	count: '数量~',
	pay: '支付~',
	fee: {
		columns: ["费用项~","户数~","单价~","金额~"],
		tbar0: "业务费用~"
	},
	plsSwitch: '请选择~',
	taskTitle: '工单~',
	assignWay: '派单方式~',
	removeSelected: '移除选中~',
	expandOrCollpse: '展开或收缩~',
	optional: '可选~',
	selected: '已选~',
	optionalGroup: '共 {0} 个可选',
	selectedGroup: "已选 {0} 个",
	save: '保存~',
	close: '关闭~',
	busido: '业务受理~',
	defaultGroupTpl: '{0} 已选 {1} 个',
	uploadFileLabel: '文件上传~',
	busiWay: '处理方式~',
	tipSimple: '提示~',
    returnTxt:'返回~',
	tip: '提示信息~',
	totalRecord: ' ( 共: {0} 条) ',
	submit: '提交~',
	emptyMsg: '没有数据~',
	pageDisplayMsg: '第 {0} - {1} 条 共 {2} 条~',
	alertTitle: '提示~',
	submitingText: '正在提交数据...~',
	yes: '是~',
	print: '打印~',
	cancel: '取消~',
	no: '否~'
}
//主页模块
BCLang.home = {
	topWelcome: "当前操作员~",
	searchTabs:["名称编号~","设备编号~","安装地址~","电话号码~","多条件搜索~"],
	invoicePrintTitle:'发票打印~',
	searchTip:"客户编号|受理编号~",
	searchBtns:["搜索~","缴费~"],
	main: {
		tabs: ["客户信息~","单位信息~", "用户信息~", "账户信息~", "缴费记录~", "单据信息~", "业务流水~","指令信息~", "账单信息~"],
		//现金支付面板
		cashPay: {
			_title: '支付~',
			pay: {
				_title: '支付项目~',
				columns: ['操作~', '业务名称~', '费用名称~', '实付金额~', '订单号~', '备注~', '数量~', '操作时间~', '费用编号~', '流水号~'],
				buttons: ['保存~', '关闭~']
			},
			charge:{
				_title: '收费信息~',
				columns: ['总额USD~', '当日汇率~', '柬埔寨KHR~', '付款人~', '缴费方式~', '票据编号~', '账务日期~', '实收USD~', '实际收KHR~']
			}
		},
		// 客户面板
		cust: {
			base: {_title: "基本信息~",name: "客户名称~",busiId: "受理编号~",openDate: "开户日期~",addr: "地址~",status: "客户状态~",
				type: "客户类型~",certType: "证件类型~",certNum: "证件号码~",linkMan: "联系人~",tel: "固定电话~",barthday: "出生日期~",
				mobile: "手机号码~",areaCateory: "区域小区~",houseNetType: "服务类型~",houseManager: "小区客户经理~",
				houseOptr: "小区运维人员~",postalAddr: "邮寄地址~", remark: "备注~",
				email: "邮箱~", sex: "性别~",postcode: '邮编~', blackList: '黑名单~',
				agentName: "代理商~", deptName: "开户部门~", developName: "发展人~", businessLicence: "营业执照~", unitNumber: "单位税号~",
				spkgSn: "协议编号~", cust_level: "客户级别~",switchCustTitle: '选择客户~'
			},
			_form: {
				thinkCust: '意向客户~',
				switchProvince: '请选择省~',
				oldCustLevel: '原客户等级~',
				newCustLevel: '新客户等级~',
				deviceType: '设备类型~',
				deviceModel: '设备型号~',
				storeCount: '库存数量~',
				buyWay: '购买方式~',
				buyCount: '购买数量~',
				titleBatchBuyMaterial: '器材信息~',
				titleAcctRefund: '退款业务处理~',
				refundTotal: '退款金额~',
				rechargeWay: '充值方式~',
				byTicket: '凭票据~',
				rechargeCount: '充值金额~',
				tipRechargeCountMustBeGreaterThanZero: '金额需要大于0!~',
				province:'省~',
				provinceEmptyText:'请选择省~',
				addrManager: '地址管理~',
				roomNumber: '房间号~',
				roomStatus: '房间状态~',
				roomTitle: '房间信息~',
				roomTitle2: '行政区域:{0} 服务类型:{1}',
				addRoom: '新增房间~'
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
					columns: ["业务名称~","资金类型~","变更类型~","变更前~","变更金额~","变更后~","备注~","操作时间~"]
				}
			}
		},
		// 用户面板
		user: {
			base:{
				type: '用户类型~', name: '用户名称~', status: '状态~', statusTime: '状态时间~',
				stbId: '机顶盒~', cardId: '智能卡~', modem: 'Modem号~', createTime: '创建时间~',
				loginName: '账号~', terminal: '终端类型~', deviceModel: '设备型号~', buyWay: '购买方式~',
				stopDate: '预报停时间~', stopType: '催费类型~', protocolDate: '协议日期~', 
				str4: 'IP地址~',str6: 'IP收费数量~'
			},
			_form: {
				taskBackFill: '施工回填~',
				deviceCode: '设备编码~',
				feeName: '费用名称~',
				feeAmount: '收费金额$~',
				protocolInfo: '协议信息~',
				openAmount: '开户数量~',
				manualOpen: '手动开户~',
				addToOpenUserGrid: '添加至暂存表~',
				titleOpenUserGrid: '用户暂存库~',
				titleSwitchProd: '第一步：选择产品~',
				prodName: '产品名称~',
				prodDesc: '产品描述~',
				titleDetemineUser: '第二步：确定订购用户~',
				switchUsers: '选用户~',
				titleOrderInfo: '第三步：订购信息~',
				prodTariff: '产品资费~',
				prodOrderMonths: '订购月数~',
				prodStartDate: '开始计费日~',
				prodExpDate: '结束计费日~',
				lastOrderExpDate: '上期订购结束日~',
				titleOrderFee: '产品费~',
				shouldPay: '应收~',
				addOrderFee: '新增订购~',
				transferPay: '转移支付~',
				maxUserCount: '最大用户数~',
				titleDispatchUser: '分配用户~',
				terminalInfo: '终端信息~',
				addToSelected: '加入已选~',
				moveToOptional: '移至可选~',
				stopTime: '报停时间~',
				stopFee: '报停费用~',
				prodFeeCM: ["产品名称~","原资费~","新资费~","原到期日~","计费期日~",
				          "缴费月数~","新到期日~","转移支付金额~","缴费金额~"],
				prodTitle: '产品信息~',
				prodGroupText: '用户名称:{0}  用户类型:{1} ~',
				templateDown: '模板下载~',
				templateDownTip: '请勿在业务繁忙时操作;请勿删除模板中第一行;~',
				loginId: '登录账号~',
				orderFee: '订单余额~',
				canRetrunFee: '可退金额~',
				canTransferFee: '可转金额~',
				returnDevice: '回收设备~',
				retrunInfo: '可退~',
				transferInfo: '可转~',
				stdId: '机顶盒号~',
				stdModel: '机顶盒型号~',
				newStdId: '新机顶盒号~',
				newStdModel: '新机顶盒型号~',
				modemId: 'Modem号~',
				modemModel: 'Modem型号~',
				newModemId: '新Modem号~',
				newModemModel: '新Modem型号~',
				changeCause: '更换原因~'
			},
			list: {
				_title: '用户信息~',
				tools: ["查询~"]
			},
			prod: {
				base: {
					_title: "用户产品~",
					columns: ["订购编号~","产品名称~","所属套餐~","当前资费~","生效日期~" ,"失效日期~","状态~","状态变更时间~","订购时间~" ,"订购月数~","创建流水号~"]
				},
				pkg: {
					_title: '客户套餐~',
					columns: ["订购编号~","产品名称~","当前资费~","状态~","生效日期~" ,"失效日期~","产品类型~","订购时间~"]
				},
				tools: ["默认订单~","历史订单~"]
			},
			userDetail: {
				tabs: ["详细信息~","异动信息~"],
				detail: ["用户类型~","用户名~","设备型号~","购买方式~","状态~","状态时间~","预报停时间~","创建时间~","催费类型~","在网协议期~","账号~",
				         "终端类型~","账号~","终端类型~","IP信息~","IP收费数~"],
				change: ["业务~","属性~","修改前~","修改后~","修改日期~","操作员~"]
			},
			prodDetail: {
				tabs: ["订单金额明细~","异动信息~"],
				detail: ["编号~","资金类型~","转入产品~","转入类型~","转入金额~","转出产品~","转出类型~","转出金额~","流水号~" ]
			}
		},
		//缴费记录
		pay: {
			payfee: {
				_title: "预存费用~",
				columns: ["流水号~","业务名称~","账户类型~","账目名称~","用户类型~", "用户名~","设备编号~","状态~","金额~","缴费前预计到期日~",
				        "缴费后预计到期日~","打印状态~","付款方式~","受理日期~","账务日期~","受理人~","受理部门~","发票~","出票方式~", "发票类型~"]
			},
			busifee: {
				_title: "业务费用~",
				columns: ["流水号~","费用名称~","设备类型~","设备编号~","状态~","打印状态~",
				          "应付~","实付~","付款方式~","受理日期~","受理人~","受理部门~","发票~","出票方式~","发票类型~","购买数量~","设备型号~","备注~"]
			},
			detail: {
				_title: '支付记录~',
				columns: ["支付编号~","美元~","柬元~","汇率~","柬元抹零~","有效~","付款方式~",
				          "付款人~","业务流水号~","票据编号~","出票方式~","受理日期~","受理人~","受理部门~"]
			},
			feePayDetail: {
				_title: '费用明细~',
				columns: ['费用项目~', '金额~']
				
			}
		},
		// 单据信息
		doc: {
			invoice: {
				_title: '发票~',
				columns: ["发票号码~","发票代码~","金额~","打印时间~","出票方式~","发票类型~","使用状态~","结存状态~","操作员~","费用生成时间~"]
			},
			task: {
				_title: '施工单~',
				columns: ["工单类型~","工单状态~","预约时间~","完成时间~","创建时间~"]
			},
			busi: {
				_title: '业务受理单~',
				columns: ["操作员~","最后打印~","业务名称~"]
			},
			_form: {
				oldInvoiceId: '原发票号码~',
				oldInvoiceCode: '原发票代码~',
				oldInvoiceType: '原发票类型~',
				oldStatus: '原发票状态~',
				newInvoiceId: '新发票号码~',
				newInvoiceCode: '新发票代码~'
			}
		},
		//受理记录
		doneCode: {
			_title: '受理记录~',
			columns: ["流水号~","业务名称~","状态~","受理日期~","操作员~","受理部门~",
			         "可回退~","可忽略~","实缴金额~","扩展业务信息~","备注~"]
		},
		//指令
		cmd: {
			dtt: {
				_title: "DTT指令信息~",
				columns: ['业务流水号~','机顶盒号~','智能卡号~','控制字~','节目名称~',
				       '指令类型~','结果标记~','生成时间~','发送时间~','CA回传时间~','错误信息~','授权结束日期~']
			},
			ott: {
				_title: "OTT指令信息~",
				columns: ['指令编号~','业务流水号~','指令类型~','机顶盒号~','智能卡号~','MAC~','是否成功~','错误信息~','发送时间~']
			},
			band: {
				_title: 'BAND指令信息~',
				columns: ['指令编号~','业务流水号~','指令类型~','机顶盒号~','Modem号~','是否成功~','错误信息~','发送时间~']
			}
		},
		// 账单
		bill: {
			list: {
				_title: '账单信息~',
				columns: ['账期~','来源~','智能卡号~','流水~','出账时间~','账目名称~',
				      '资费名称~','状态~','出账金额~','欠费金额~','操作~'],
				tbar: ["智能卡~","流水号~","欠费账单~","全部账单~"]
			},
			acctitemInvalid: {
				_title: '账目作废信息~',
				columns: ["账目名称~","资金类型~","作废金额~"]
			}
			
		}
	}, // main end line...
	// 首页工具栏业务
	tools: {
		
		countySwitch:{//分公司切换
			titleSelectDept:'选择部门~',
			confirmSwitchDept:'确定切换部门吗~'
		},
		ad: {//公告
			_title: '公告信息~',
			tplPublishTme:'发布于~',
			columns: ['公告主题~','发布人~','生效时间~','失效时间~']
		},
		grxg:{//个人修改
			_title:'个人资料修改~',
			labelNewPwd:'新密码~',
            labelNewPwdConfirm:'确认新密码~',
            labelDefaultSystem:'默认登录系统~'
		},
		queryDevice:{//设备查询
			_title:'设备查询~',
			titleDevInfo:'设备信息~',
			labelDevNo:'设备序列号~',
			labelDevType:'设备类型~',
			labelDevModel:'设备型号~',
			labelModelName:'型号名称~',
			labelDevName:'设备名称~',
			labelDevCode:'设备编号~',
			labelDeptName:'所在仓库~',
			labelCustNo:'客户编号~',
			labelCustName:'客户姓名~',
			labelDevStatus:'设备状态~',
			labelDepStatus:'库存状态~',
			labelTranStatus:'流转状态~',
			labelOwnership:'产    权~',
			
			labelCardNo:'配对卡编号~',
            labelCardModel:'配对卡型号~',
            labelModemNo:'配对MODEM编号~',
            labelModemModel:'配对MODEM型号~',
            labelStbNo:'配对机顶盒编号~',
            labelStbModel:'配对机顶盒型号~',
            tipDevNotExists:'查询设备不存在!~'
			
		},
		invoiceQuery:{//发票查询
			_title:'发票查询~',
			titleInvoiceInfo:'发票信息~',
			btnShowInvoiceDetail:'费用明细~',
			btnChangeStatus:'修改状态~',
			btnChangeStatusIdel:'修改为空闲~',
			btnChangeStatusInvalid:'修改为失效~',
			btnChangeStatusUsed:'已被使用~',
			
			confirmChangeStatus:'是否将发票状态修改为~',
			tipInvoiceNotExists:'  发票不存在!~',
			tipInvoiceNotExists2:'查询发票不存在!~',
			statusInvalid:'失效~',
			statusIdel:'空闲~',
			
			cols:['客户名称~', '客户编号~', '业务名称~', '费用名称~', '实际金额~', '操作时间~', '操作员~'],
			
			labelInvoiceId:'发票号码~',
			labelInvoiceId2:'发&nbsp;票&nbsp;号&nbsp;~',
			labelInvoiceCode:'发票代码~',
			labelInvoiceType:'发票类型~',
			labelDeptName:'所在仓库~',
			labelUseStatus:'使用状态~',
			labelMoneyAmount2:'金&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;额~',
			labelUserOptrName:'开&nbsp;票&nbsp;员&nbsp;~',
			labelOptrName:'领&nbsp;用&nbsp;人&nbsp;~',
			labelCreateTime:'入库时间~',
			labelFinanceStatus:'结存状态~',
			labelCloseTime:'核销时间~',
			labelCheckDeptName:'结账仓库~',
			labelCheckTime:'结账时间~'
			
		},
		CustSearch:{//客户查询(多条件查询)
			_title:'客户查询~',
			tipInputAnyField:'请任填一项进行搜索!~',
			labelCustName:'客户名称~',
			labelStatus:'意向客户~',
			labelAddress:'客户地址~',
			labelLoginName:'账号~'
		},
		InvoicePrint:{//发票打印
			_title:'发票打印~',
			titleDocGrid:'打印列表~',
			titleInvoiceGrid:'发票项~',
			titlePrintDetail:'打印明细~',
			titlePrintPreview:'打印预览~',
			titleInvoiceWindow:'打印共需要 {0} 张发票~',
			wdxj:'网点现金~',
			printGridColumns:['流水号~','单据名称~','创建时间~'],
			invoiceGridColumns:['顺序号~','发票号码~','发票代码~'],
			printItemGridColumns:['名称~','金额~'],
			stillEmptyInvoiceField:"还有为空的发票输入框!~",
			hasDuplcateInvoice:"有重复的发票，请确认!~"
			
		}
	}
	
}
//各种弹出的提示信息
BCLang.msgBox = {
	selectInvoice2Print:"请选择要打印的发票!~",
	selectInvicePrintItem:"请选择发票的打印项~",
	templateReplaceError:"模板变量替换时出错! error:{0}~",
	printCmpError:'打印控件调用异常，请检查是否安装了打印控件 {0}~',
	invoiceIdNeeded:'请输入发票号码~',
	confirmSaveInvoiceInfo:"确定保存发票信息吗?~",
	
	commonSuccess:'业务操作成功!~',
	waitMsg:'操作中,请稍候~',
	needCust:'请先查找要操作的客户!~',
	needUser:'请选择用户!~',
	cancelFeeSuccess:'冲正成功!~',
	confirmCancelFeeAndInvaidInvoice:'发票{0}将作废!该发票上的费用项需要重打，确定冲正?~',
	confirmCancelFee:'确定冲正吗?~',
	selectRec4CancelFee:'请选择要冲正的费用记录!~',
	confirmUnPayWithParam:'确定要回退【金额：{0} 】吗?~',
	confirmRestoreCust:'是否确定返销户?~',
	restoreCustSuccess:'返销户成功!~',
	restoreCustFailed:'返销户失败,请联系管理员.~',
	needLogOffUser:'请先注销该客户下的用户~',
	recycleGdDevice:'请先回收产权为广电的设备~',
	custIsRelocated:'客户已经拆迁。~',
	confirmRelocateCust:'确定客户拆迁吗?~',
	notAllowedJoinUnit:'该客户为单位客户，不能加入单位!~',
	confirmQuitUnit:'确定退出单位吗?~',
	confirmBankStop:'确定要暂停卡扣吗?~',
	confirmEnableBankPay:'启用银行扣费吗?~',
	confirmDisableBankPay:'禁止银行扣费吗?~',
	confirmEditBankPay:'确定该产品',
	confirmBankResume:'确定要恢复卡扣吗?~',
	confirmRenewCust:'去顶恢复客户状态吗?~',
	
	custHasUnSuitableDev:'该用户现在不能进行设备互换~',
	custCantExchangeDev:'该用户现在不能进行设备互换~',
	
	confirmRegLoss:'确定挂失吗?~',
	regLossSuccess:'挂失成功!~',
	
	selectDev2RegLoss:'请选择要取消挂失的设备~',
	selectDevIsRegLossAlready:'请选择已经挂失的设备~',
	unRegLossSuccess:'取消挂失成功!~',
	confirmUnRegLoss:'确定取消挂失吗?~',
	//打开和关闭打印标记
	statusNotPrintStatusSuccess:'不打印标记成功!~',
	confirmNotPrintStatus:'确定不打印吗?~',
	statusPrintStatusSuccess:'打开标记成功!~',
	confirmPrintStatus:'确定打开打印标记吗?~',
	//销售设备
	selectDev2Sale:'请选择要销售的设备!~',
	cantSaleCosOwerIsCust:'设备的产权是客户的,不允许销售~',
	//修改购买方式
	modifyBuyType:'修改购买方式~',
	need2SwitchCountyId:'当前营业厅非购买设备营业厅，请先切换到[{0}]再操作！~',
	//修改产权
	changeOwner2Cust:'确定将产权修改为个人？~',
	changeOwner2Gd:'确定将产权修改为广电？~',
	cangeOwnerSuccess:'修改产权成功!~',
	//回收设备
	selectDev2Recycle:'请选择要回收的设备!~',
	devCantRecycleStillInUse:"设备的在使用中,不允许回收~",
	
	onlyResidentCanNonResiCust:'只能居民客户转集团客户~',
	
	depositUnPaySuccess:'退押金成功!~',
	unPayed:'费用未支付！~',
	notDeposit:'该费用不是押金！~',
	confirmDepositUnPay:"确定退押金吗?~",
	
	userNotActive:"选择的用户状态非正常~",
	cantLogOffZzd:'主终端不能先销户~',
	cantLogOffCosBaseProdOweFee:'有基本包产品欠费,不能销户!~',
	cantLogOffCosBaseProdNotActive:'有基本包产品状态不正常,不能销户!~',
	
	cantPayIpUserFee:'宽带用户下无产品请先订购产品~',
	
	freeUsersOver2:"免费终端不能超过2台~",
	
	singleInteractiveDevCantOpenDuplex:'该用户机顶盒交互方式是单向的，无法开通双向~',
	custMustHaveDuplexDev:'用户必选拥有交互方式双向的机顶盒~',
	
	needCancelProgramFirst:'用户下有互动电视产品，请退订后再操作!~',
	confirmCancelDuplex:"确定取消双向吗?~",
	
	userHasNoBaseProd:'用户无基本包!~',
	baseProdRechargedWait30Seconds:'基本包已充值，请稍等半分钟~',
	usersNotOweFeeStop:'用户的基本包产品[{0}]状态不是欠费停机！~',
	confirmOpenTemp:"确定授权吗?~",
	openTempSuccess:'临时授权成功!~',
	
	noUserSelected:'未选中任何用户!~',
	noSelectedUserCanOpenTemp:'选中的用户没有符合可临时授权的条件!~',
	userHasExtraFreeDev:'选中的用户有超额副机，但主机状态非正常，不能进行临时授权!~',
	
	onlyOneUser: '请选择一个用户!~',
	needStopUser: '请选择【报停】状态的用户~',
	confirmOpenUser: '确定要报开吗?~'
	
	
}
