/** 
 * 产品订购之选择用户 
 */
SelectUserPanel = Ext.extend(Ext.Panel, {
	userGrid: null,
	store: null,
	dispatchUserWindow: null,
	selectUserData: null,
	parent: null,
	constructor: function(parent){
		this.parent = parent;
	    this.store = new Ext.data.GroupingStore({
            reader: new Ext.data.JsonReader({}, [
       	       'user_id','user_name',
    	       "package_group_id","package_group_name"
    	    ]),
            groupField: 'package_group_name'
        });
	    // 计算转移支付
	    this.store.on("load", function(){
	    	this.parent.doLoadTransferAmount();
	    } ,this);
		this.userGrid = new Ext.grid.GridPanel({
			store: this.store,
	        columns: [
	            {id: 'autoExpandColumn',menuDisabled: true, align: 'left', header: "终端信息", sortable: false, dataIndex: 'user_name'},
	            {menuDisabled: true, hidden: true,width: 20, align: 'left', header: "", sortable: false, dataIndex: 'package_group_name'}
	        ],
	        view: new Ext.grid.GroupingView({
	            forceFit:true,
	            groupTextTpl: '{group} 已选{[values.rs.length]} 个终端'
	        }),
	        width: 700,
	        border: false,
	        autoExpandColumn: 'autoExpandColumn',
	        height: 450,
	        animCollapse: false,
	        tbar: [{
	        	text: lmain("user._form.switchUsers"),
	        	iconCls: 'icon-add-user',
	        	scope: this,
	        	disabled: true,
	        	id: 'btnSelUser',
	        	handler: function(){
	        		this.openDispatchUserWindow();
	        	}
	        },' ',{
	        	iconCls: 'icon-collapse-all',
	        	text: lbc("common.expandOrCollpse"),
	        	scope: this,
	        	handler: function(){
	        		this.userGrid.getView().toggleAllGroups();
	        	}
	        }]
		});
		
		// Window 构造
		return SelectUserPanel.superclass.constructor.call(this, {
			layout: "fit",
			border: false,
			iconCls: 'icon-edit-user',
			items: [this.userGrid]
		});
	},
	openDispatchUserWindow: function(data){
		if(!this.dispatchUserWindow){
			this.dispatchUserWindow = new OpenDispatchUserWindow(this);
		}
		// 
		if(data){
			if(data["needShow"] === true){
				this.dispatchUserWindow.show(data);
				Ext.getCmp("btnSelUser").setDisabled(false);
			}else{
				Ext.getCmp("btnSelUser").setDisabled(true);
				this.dispatchUserWindow.saveDefaultUsersWithNoShow(data);
			}
		}else{
			this.dispatchUserWindow.show();
		}
	},
	loadSingleUser: function(userDesc){
		this.store.loadData([{
			 'user_name': userDesc,
			 'package_group_name': " "
		}]);
	},
	// 加载数据
	loadPackageUsers: function(prodId, lastOrderSn){
		//清空数据
		this.store.removeAll();
		
		Ext.Ajax.request({
			url :root + '/core/x/ProdOrder!loadPackageUserSelect.action',
			scope : this,
			params: {
				prod_id: prodId,
				last_order_sn: lastOrderSn,
				cust_id: App.getCustId()
			},
			success : function(response,opts){
				var responseObj = Ext.decode(response.responseText);
				this.packageGroups = responseObj;
				this.selectUserData = responseObj;
				this.openDispatchUserWindow(this.selectUserData);
			}
		});
	}
});

/**
 * 选择用户
 */
OpenDispatchUserWindow = Ext.extend(Ext.Window, {
	selectedDataMap: {},
	// 所有用户分组 key: group_id, value: 用户List 
	allUserGroup: {},
	parent: null,
	currentActiveGroup: null,
	constructor: function(p){
		this.parent = p;
		this.subProdStore = new Ext.data.JsonStore({
		    fields: [
	            'package_id', 'package_group_id',"package_group_name",
	            'user_type','terminal_type','max_user_cnt'
	        ]
		});
		// 源用户存储器
		this.fromUserStore = new Ext.data.JsonStore({
			fields: ["user_id","user_name"]
		});
		// 目标用户存储器
		this.toUserStore = new Ext.data.JsonStore({
			fields: ["user_id","user_name"]
		});
		this.fromSm = new Ext.grid.CheckboxSelectionModel();
		this.toSm = new Ext.grid.CheckboxSelectionModel();
		
		//显示内容
		var tpl = new Ext.XTemplate(
    		'<tpl for=".">',
            '<div class="pkg-sub-prod" id="{package_group_id}">',
		    	'<div class="pkg-title">{package_group_name}</div>',
		    	'<div class="pkg-detail">',
			    	'<div>'+ lmain("user.base.type") +'：{user_type}, '+ lmain("user._form.maxUserCount") +'：<i style="color: red;">{max_user_cnt}</i></div>',
		    	'</div>',
		    	'<div class="pkg-user-selected"></div>',
		    '</div>',
        '</tpl>');
		
		// Window Construct instance
		return OpenDispatchUserWindow.superclass.constructor.call(this, {
			layout:"border",
			title: lmain("user._form.titleDispatchUser"),
			width: 450,
			height: 400,
			resizable: false,
			maximizable: false,
			closeAction: 'hide',
			minimizable: false,
			closable: false,
			border: false,
			items: [{
				region: "north",
				height: 110,
				layout: 'fit',
				bodyStyle: 'border-bottom: none',
				items: {
					id:'datViewId',
					xtype: 'dataview',
					store: this.subProdStore,
				    autoScroll: true,
		            itemSelector:'.pkg-sub-prod',
		            selectedClass: 'selected',
		            simpleSelect: true,
		            singleSelect: true,
				    tpl: tpl,
			        listeners: {
		            	scope: this,
			        	selectionchange: this.doSelectionGroupChange
		            }
				}
			},{
				region: 'center',
				layout: 'border',
				border: false,
				items: [{
					title: lbc("common.optional"),
					region: "center",
					xtype: 'grid',
					stripeRows: true,
					store: this.fromUserStore,
					sm: this.fromSm,
					columns: [this.fromSm, {id: 'userColumn1',header: lmain("user._form.terminalInfo"), dataIndex: 'user_name'} ],
					autoExpandColumn: 'userColumn1',
			        stateful: true,
			        tbar: [{
			        	xtype: 'textfield',
			        	width: 120,
			        	emptyText: "Enter to filter..",
		        		enableKeyEvents: true,
			        	listeners: { 
			        		scope: this,
			        		specialKey: function(field, e){
			        			if (e.getKey() == e.ENTER) {
			        				this.doFilterStoreData(this.fromUserStore, field);
			        	        }
			        		}
			        	}
			        },'-',{
			        	text: lmain("user._form.addToSelected"),
			        	iconCls: 'icon-add',
			        	scope: this,
			        	handler: this.doAddSelected
			        }],
			        listeners:{
			        	scope: this,
			        	dblclick: this.doAddSelected
			        }
				},{
					title: lbc("common.selected"),
					region: 'east',
					width: '50%',
					border: true,
					xtype: 'grid',
					split: true,
			        minSize: 150,
			        maxSize: 350,
					store: this.toUserStore,
					sm: this.toSm,
					columns: [this.toSm, {id: 'userColumn2',header: lmain("user._form.terminalInfo"), dataIndex: 'user_name'} ],
					autoExpandColumn: 'userColumn2',
			        stateful: true,
			        tbar: [{
			        	text: lmain("user._form.moveToOptional"),
			        	iconCls: 'icon-del',
			        	scope: this,
			        	handler: this.doRemoveSelected
			        },'-',{
			        	xtype: 'textfield',
			        	width: 120,
			        	emptyText: "Enter to filter..",
			        	enableKeyEvents: true,
			        	listeners: { 
			        		scope: this,
			        		specialKey: function(field, e){
			        			if (e.getKey() == e.ENTER) {
			        				this.doFilterStoreData(this.toUserStore, field);
			        	        }
			        		}
			        	}
			        }],
			        listeners:{
			        	scope: this,
			        	dblclick: this.doRemoveSelected
			        }
				}]
			}],
			buttons:[
			         {text:lbc("common.save"), iconCls:'icon-save', scope:this, handler: this.doPassResultToParent},
			         {text:lbc("common.close"), iconCls:'icon-close', scope:this, handler: this.hide},
			]
		});
	},
	//父页面加载数据
	doPassResultToParent: function(){
		var targetData = []; 
		var alertInfo = null;
		for(var gid in this.selectedDataMap){
			var group = this.allUserGroup[gid]["group"];
			var users = this.selectedDataMap[gid];
			
			if(group['prod_type'] == 'CPKG' && users.length != group['max_user_cnt']){
				Alert('客户套餐已选用户必须等于套餐最大用户数!');
				return;
			}
			
			if(group['prod_type'] == "SPKG" && users.length < group['max_user_cnt']){
				alertInfo = '协议套餐已选用户小于套餐内容最大用户数，可继续选择用户!';
			}
			
			for(var i = 0; i< users.length; i++){
				var user = users[i];
				targetData.push({
					 'user_id': user["user_id"],
					 'user_name': user["user_name"],
					 'package_group_id': group["package_group_id"],
					 'package_group_name': group["package_group_name"]
				});
			}
		}
		if(alertInfo){
			Alert(alertInfo, function(){
				if(targetData.length>0){
					this.parent.store.loadData(targetData);
					this.hide();
				}
			});
		}else if(targetData.length>0){
			// 父面板加载数据
			this.parent.store.loadData(targetData);
			this.hide();
		}
	},
	// 如果已经有默认值了，就不需要显示窗口，跳过选择的步骤
	saveDefaultUsersWithNoShow: function(data){
		var userList = data["userList"];
		var userMap = {/* key: user_id , value: userDto */};
		// 准备用户的数据结构，方便提取用户
		for(var i = 0 ; i < userList.length; i++){
			var userDto = userList[i]; 
			userMap[userDto["user_id"]] = userDto;
		}
		// 抽取默认用户
		var groupList = data["groupList"];
		var targetData = [];
		for(var i = 0; i < groupList.length; i++){
			var group = groupList[i];
			var selectUserList = group["userSelectList"]; 
			for(var j = 0; j < selectUserList.length; j++){
				var user = userMap[selectUserList[j]];
				targetData.push({
					 'user_id': user["user_id"],
					 'user_name': user["user_name"],
					 'package_group_id': group["package_group_id"],
					 'package_group_name': group["package_group_name"]
				});
			}
		}
		// 父面板加载数据
		this.parent.store.loadData(targetData);
	},
	doSelectionGroupChange:  function(dv,nodes){
		if(nodes.length == 0){
			return;
		}
		this.fromUserStore.removeAll();
		this.toUserStore.removeAll();
		
		// 选中的组名
		var groupId = nodes[0].id;
		this.currentActiveGroup = groupId;
		// 所有用户
		var groupUsers = this.allUserGroup[groupId]["users"];
		var selectedUsers = this.selectedDataMap[groupId];
		var tmpUsers = [];
		if(selectedUsers){
			for(var j = 0; j< groupUsers.length; j++){
				var existed = false;
				for(var i = 0 ; i < selectedUsers.length ; i++){
					if(selectedUsers[i]["user_id"] == groupUsers[j]["user_id"]){
						existed = true;
						break;
					}
				}
				if(!existed){
					tmpUsers.push(groupUsers[j]);
				}
			}
		}else{
			tmpUsers = groupUsers;
		}
		this.fromUserStore.loadData(tmpUsers);
		this.toUserStore.loadData(selectedUsers || []);
		this.setGridTitle();
		this.fromSm.selectAll();
		this.toSm.selectAll();
	},
	doFilterStoreData: function(store, field){
		var v = field.getValue().trim();
		if(v){
			store.filterBy(function(r){
				return new RegExp("^.*" + field.getValue()+".*$").test(r.get("user_name"));
			}, this);
		}else{
			store.clearFilter();
		}
	},
	setGridTitle: function(){
		this.fromSm.grid.setTitle("共"+ this.fromUserStore.getCount() + "个可选用户");
		this.toSm.grid.setTitle("已选"+ this.toUserStore.getCount() + "个用户");
	},
	setActiveItemsCount: function(){
		var arr = this.selectedDataMap[this.currentActiveGroup];
		var itemEl = Ext.get(this.currentActiveGroup).child(".pkg-user-selected");
		itemEl.update(arr ? arr.length : 0);
	},
	// left -> right
	doAddSelected: function(){
		var selectedRecord = Ext.getCmp('datViewId').getSelectedRecords()[0];
		if(this.toUserStore.getCount() >= selectedRecord.get('max_user_cnt')){
			Alert('已超过套餐最大用户数限制!');
			return;
		}
		
		var records = this.fromSm.getSelections();
		this.fromUserStore.remove(records);
		this.toUserStore.add(records);
		
		// 添加到缓存
		var users = this.selectedDataMap[this.currentActiveGroup];
		if(!users){
			users = [];
		}
		for(var i = 0; i< records.length; i++){
			users.push(records[i].data);
		}
		this.selectedDataMap[this.currentActiveGroup] = users;
		this.setGridTitle();
		this.setActiveItemsCount();
		this.toSm.selectRecords(records);
	},
	// right -> left
	doRemoveSelected: function(){
		var records = this.toSm.getSelections();
		this.fromUserStore.add(records);
		this.toUserStore.remove(records);
		
		var users = this.selectedDataMap[this.currentActiveGroup];
		if(users){
			for(var j = 0; j< records.length; j++){
				var userId = records[j].data["user_id"];
				for(var i = users.length - 1; i >= 0; i--){
					if(users[i]["user_id"] == userId){
						users.remove(users[i]);
						break;
					}
				}
			}
		}
		this.setGridTitle();
		this.setActiveItemsCount();
		this.fromSm.selectRecords(records);
	},
	// 显示之前进行数据归类
	show: function(data){
		if(data){
			this.doAnalysisData(data);
			this.fromUserStore.removeAll();
			this.toUserStore.removeAll();
		}
		return OpenDispatchUserWindow.superclass.show.call(this);
	},
	doAnalysisData: function(data){
		// 内容组
		var groupList = data["groupList"];
		// 加载用户数据
		var allUserList = data["userList"];
		for(var i = 0; i < groupList.length ; i++){
			var group = groupList[i];
			var gid = groupList[i]["package_group_id"];
			
			// 匹配用户
			var tmpUsers = [];
			var userType = group["user_type"];
			var terminalType =  group["terminal_type"];
			for(var j = 0; j< allUserList.length; j++){
				var user = allUserList[j];
				if(userType && user["user_type"] !=  userType){
					continue;
				}
				if(terminalType && user["terminal_type"] != terminalType){
					continue;
				}
				tmpUsers.push(user);
			}
			// 存储起来
			this.allUserGroup[String(gid)] = {
				group: group,
				users: tmpUsers
			}
		}
		this.subProdStore.loadData(groupList);
	}
});

/**
 * 转移支付
 */
TransferPayWindow = Ext.extend(Ext.Window, {
	store: new Ext.data.JsonStore({
		fields: ["prod_name","tariff_name", "user_name", "month_count", "active_fee", "last_order_end_date", "eff_date", "exp_date"]
	}),
	constructor: function(){
		var columns = [
       	    {header: "产品名称", width: 100,sortable:true, dataIndex: 'prod_name'},
       	    {header: "资费", width: 70, sortable:true, dataIndex: 'tariff_name'},
       	    {header: "用户", width: 60, sortable:true, dataIndex: 'user_name'},
       	    {header: "开始计费日", width: 80, sortable:true, dataIndex: 'eff_date',renderer: Ext.util.Format.dateFormat},
       	    {header: "结束计费日", width: 80, sortable:true, dataIndex: 'exp_date',renderer: Ext.util.Format.dateFormat},
       	    {header: "转移金额$", width: 60, sortable:true, dataIndex: 'active_fee',renderer: Ext.util.Format.convertToYuan}
       	];
		// Window Construct instance
		return TransferPayWindow.superclass.constructor.call(this, {
			layout:"fit",
			title: "转移支付明细",
			width: 450,
			height: 200,
			resizable: false,
			maximizable: false,
			closeAction: 'hide',
			minimizable: false,
			items: [{
				xtype: 'grid',
				stripeRows: true,
				border: false,
				store: this.store,
				columns: columns,
		        stateful: true
			}]
		});
	},
	show: function(data, effDate){
		this.store.loadData(data);
		this.setTitle("转移明细（开始计费日：" + effDate.format("Y-m-d") + "）");
		return TransferPayWindow.superclass.show.call(this);
	}
});
