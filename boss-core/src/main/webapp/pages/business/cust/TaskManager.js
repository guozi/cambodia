/**工单管理*/
UserDetailGrid = Ext.extend(Ext.grid.GridPanel, {
	userDetailStore : null,
	constructor : function() {
		this.userDetailStore = new Ext.data.JsonStore({
					fields : ['user_type', 'user_type_text','user_name', 'device_model','device_model_text','task_id',
							'device_code', 'password','device_id','band','posNo','occNo']
				});
		var userCols = lbc('home.tools.TaskManager.userCols');
		UserDetailGrid.superclass.constructor.call(this, {
			ds : this.userDetailStore,
			border: false,
			sm : new Ext.grid.CheckboxSelectionModel(),
			cm : new Ext.grid.ColumnModel([{
						header : userCols[0],dataIndex : 'user_type_text',width : 60,renderer : App.qtipValue}, {
						header : userCols[1],dataIndex : 'user_name',width : 120,renderer : App.qtipValue}, {
						header : userCols[2],dataIndex : 'password',width : 60,renderer : App.qtipValue}, {
						header : userCols[3],dataIndex : 'device_model_text',width : 120,renderer : App.qtipValue}, {
						header : userCols[4],dataIndex : 'device_id',width : 120,renderer : App.qtipValue}, {
						header : userCols[5],dataIndex : 'posNo',width : 100,renderer : App.qtipValue}, {
						header : userCols[5],dataIndex : 'occNo',width : 100,renderer : App.qtipValue}, {
						header : userCols[6],dataIndex : 'band',width: 80,renderer : App.qtipValue}])
		})
	}
})

TaskDetailGrid = Ext.extend(Ext.grid.GridPanel, {
	taskDetailStore : null,
	constructor : function() {
		this.taskDetailStore = new Ext.data.JsonStore({
					fields : ['busi_code', 'busi_name', 'optr_id','optr_name','log_time',
							'syn_status','error_remark','syn_status_text']});
		var operateCols = lbc('home.tools.TaskManager.operateCols');							
		TaskDetailGrid.superclass.constructor.call(this, {
			ds : this.taskDetailStore,
			sm : new Ext.grid.CheckboxSelectionModel(),
			border: false,
			cm : new Ext.grid.ColumnModel([{
				header : operateCols[0],dataIndex : 'log_time',width : 100,renderer : Ext.util.Format.dateFormat}, {
				header : operateCols[1],dataIndex : 'busi_name',width:80,renderer : App.qtipValue}, {
				header : operateCols[2],dataIndex : 'optr_name',width:80,renderer : App.qtipValue}, {
				header : operateCols[3],dataIndex : 'syn_status_text',width:80,renderer : App.qtipValue}, {
				header : operateCols[4],daIndex : 'error_remark',width:150,renderer :  App.qtipValue
			}])          
		})               
	}                    
})

TaskAllInfo = Ext.extend(Ext.TabPanel,{
	panel : null,
	userGrid : null,
	detail : null,
	constructor : function() {
		this.userGrid = new UserDetailGrid();
		this.detail = new TaskDetailGrid();
		TaskAllInfo.superclass.constructor.call(this, {
				border : false,
				activeTab: 0,
				closable : true,
				defaults : {
					border: false,
					layout : 'fit'
				},
				items:[{title : lbc('home.tools.TaskManager._userTitle'),items:[this.userGrid]
				},{title : lbc('home.tools.TaskManager._operateTitle'),items:[this.detail]}]
		})
	}
})

var TaskDeviceGrid = Ext.extend(Ext.grid.EditorGridPanel,{
	taskDeviceGridStore:null,
	taskTypeId:null,
	constructor:function(rs){
		this.taskDeviceGridStore = new Ext.data.JsonStore({
			url: root + '/core/x/Task!queryTaskDevice.action' ,
			fields:['device_id','device_type','device_type_text','device_model','device_model_text','user_id',
				'device_code','user_type', 'user_type_text','user_name','task_id','occNo','posNo','recycle_result'
				,'recycle_result_text']
		});
		var taskId = rs.get('task_id');
		this.taskTypeId = rs.get('task_type_id');
		this.taskDeviceGridStore.load({params : {task_id :taskId}});
		var columns = [],nextColums = [];	
		var cols = lbc('home.tools.TaskManager.taskDeviceCols');
		var baseColumns = [{
				header : cols[0],dataIndex : 'user_type_text',width : 70,renderer : App.qtipValue}, {
				header : cols[1],dataIndex : 'user_name',renderer : App.qtipValue},
				{header: cols[2],dataIndex:'device_model_text',width:130}];
		if(this.taskTypeId == '9'){//销终端工单
			this.resultCombo = new Ext.ux.ParamCombo({
				paramName:'BOOLEAN',typeAhead:false,valueField:'item_name',
				forceSelection:true,selectOnFocus:true,editable:true
			});
			App.form.initComboData([this.resultCombo]);
			nextColums = [{header:cols[3],dataIndex:'device_id',width:130},
				{header:cols[4],dataIndex:'recycle_result_text',width:80,editor:this.resultCombo}]; 
		}else{
			nextColums = [{header:cols[3],dataIndex:'device_code',width:130,editor:new Ext.form.TextField({vtype:'alphanum'})},
						{header:'occNo',dataIndex:'occNo',width:80,editor:new Ext.form.TextField({vtype:'alphanum'})},
						{header:'posNo',dataIndex:'posNo',width:80,editor:new Ext.form.TextField({vtype:'alphanum'})}]
		}
		columns  = baseColumns.concat(nextColums)
		
		TaskDeviceGrid.superclass.constructor.call(this,{
			region:'center',
			ds:this.taskDeviceGridStore,
			clicksToEdit:1,
			columns:columns,
			sm:new Ext.grid.RowSelectionModel({}),
			listeners:{
				scope:this,
				beforeedit: this.beforeEdit,
				afteredit:this.afteredit
			}
		});
		},beforeEdit: function(obj){
			if(obj.field == 'occNo' || obj.field == 'posNo'){
				var value = obj.record.get('user_type');
				if(value !='BAND'){
					return false;
				}
			}
		},
		afteredit:function(obj){
			if(obj.field == 'recycle_result_text'){
				var record =obj.record;
				var cmp = this.resultCombo;
				var index = cmp.store.find('item_name',obj.value);
				var data = cmp.store.getAt(index);
				record.set('recycle_result',data.get('item_value'));
			}
			//暂时不验证
			if(obj.field == 'device_code'){
				var record =obj.record;
				this.queryAndAddDevice(obj.value,record);
				
			}
		},
		queryAndAddDevice:function(newValue,record){
			Ext.Ajax.request({
				url:Constant.ROOT_PATH + "/core/x/Task!queryDeviceInfoByCodeAndModel.action",
				params:{deviceCode:newValue,deviceModel:record.get('device_model')},
				scope:this,
				success:function(res,opt){
					var data = Ext.decode(res.responseText);
					record.set('device_code',data['device_code']);
					record.set('device_type_text',data['device_type_text']);
					record.set('device_type',data['device_type']);
				},
				clearData:function(){
					record.set('device_code','');
					record.set('device_type_text','');
					record.set('device_type','');
					//清空组件
				}
			});
		},
		getValues:function(){
			var arr=[];
			var store = this.getStore();
			store.each(function(record){
				var values = {};
				values["oldDeviceCode"] = record.get('device_id');
				values["deviceModel"] =record.get('device_model');
				values["deviceCode"] = record.get('device_code');
				values["posNo"] = record.get('posNo');
				values["occNo"] = record.get('occNo');
				values["fcPort"] = false;
				if(record.get('user_type') == 'BAND'){
					values["fcPort"] = true;
				}
				arr.push(values);
			},this);
			return arr;
		},
		getUserIds:function(){
			var arr=[];
			var store = this.getStore();
			store.each(function(record){
				if(record.get('recycle_result') == 'T'){
					arr.push(record.get('user_id'));
				}
			},this);
			return arr;
		},
		checkDeviceCode : function(){
			this.stopEditing();//停止编辑
			var store = this.getStore();
			var count = store.getCount();//总个数
			var config = this.getColumnModel().config;
			var dataIndexes = [];
			for(var i=0;i<config.length;i++){
				dataIndexes.push(config[i].dataIndex);
			}
			var flag = true;
			for(var i=0;i<count;i++){
				var data = store.getAt(i).data;
				for(var k=0;k<dataIndexes.length;k++){
					var a = dataIndexes[k];
					if(Ext.isEmpty(data[a]) && a == 'device_code'){
						Alert(lbc('home.tools.TaskManager.msg.enterDeviceNo'),function(){
							this.getSelectionModel().selectRow(i);
							this.startEditing(i,k);
						});
						flag = false;
						break;
					}
				}
			}
			return flag;
	}
});

TaskDeviceWin = Ext.extend(Ext.Window,{
	deviceGrid : null,
	task_id:null,
	task_type_id:null,
	constructor : function(rs){
		this.deviceGrid = new TaskDeviceGrid(rs);
		TaskDeviceWin.superclass.constructor.call(this,{
			title : '设备回填',
			layout : 'fit',
			height : 400,
			width : 700,
			id:'TaskDeviceWinId',
			closeAction : 'close',
			items : [this.deviceGrid],
			buttons : [{
				text : '保存',
				scope : this,
				iconCls : 'icon-save',
				handler : this.doSave
			}, {
				text : '关闭',
				scope : this,
				handler : function() {
					this.close();
				}
			}]
		})
	},
	doSave:function(){
		if(!this.deviceGrid.checkDeviceCode()){
			return false;
		}
		var o ={},url;
		if(this.task_type_id == '9'){//销终端工单
			var data = this.deviceGrid.getUserIds();
			url = Constant.ROOT_PATH + "/core/x/Task!fillWriteOffTerminalTask.action";
			o = {task_id:this.task_id,userIds : data.join(",")};
		}else{
			var data = this.deviceGrid.getValues();
			url = Constant.ROOT_PATH + "/core/x/Task!fillTask.action";
			o = {task_id:this.task_id,devices : Ext.encode(data)};
		}
		var that = this;
		App.sendRequest( url, o, function(res,opt){
			Ext.getCmp('taskManagerPanelId').grid.getStore().reload({
				callback:function(records, options, success){
					var panel = Ext.getCmp('taskManagerPanelId');
	           		var index = panel.grid.getStore().find('task_id',that.task_id);	           		
	           		panel.grid.getSelectionModel().selectRow(index);
	           		panel.loadTaskData(that.task_id);
				}
	         });
			that.close();
		});
	},
	show:function(rs,data){
		this.task_id = rs.get('task_id');
		this.task_type_id = rs.get('task_type_id');
		TaskDeviceWin.superclass.show.call(this);
	}
});

/**
 * 工单管理
 */
TaskManagerPanel = Ext.extend( Ext.Panel ,{
	taskStore:null,
	grid: null,
	pageSize: 20,
	taskAllInfo:null,
	constructor:function(item){
		this.initWidgets(item);	
		this.taskAllInfo = new TaskAllInfo();
		var btns = lbc('home.tools.TaskManager.buttons');
  		TaskManagerPanel.superclass.constructor.call(this,{
			border: false,
			id: 'taskManagerPanelId',
			layout: 'border',
			items : [{
						region : 'south',
						layout : 'fit',
						height : 140,
						border: false,
						split : true,
						items : [this.taskAllInfo]
					}, {
						region : 'center',
						layout : 'fit',
						border: false,
						items : [this.grid]
					}],
			buttons: [{
				id:'team_btn_id',
				text: btns['distTeam'],
				height: 30,
				width: 80,
//				disabled:true,
				hidden:true,
				style: 'color: red;',
				scope: this,
				handler: this.doTeamTask
			},{
				id:'withdraw_btn_id',
				text: btns['withdraw'],
				width: 80,
				hidden:true,
				height: 30,
				scope: this,
				handler: this.doWithdrawTask
			},{
				id:'removeTaskBtnId',
				text: btns['invalidTeam'],
				height: 30,
				width: 80,
				hidden:true,
				style: 'color: red;',
				scope: this,
				handler: this.doCancelTask
			},{
				id:'device_btn_id',
				text: btns['backDevice'],
				height: 30,
				width: 80,
				hidden:true,
				style: 'color: red;',
				scope: this,
				handler: this.doDeviceTask
			},{
				id:'end_btn_id',
				text: btns['finish'],
				height: 30,
				width: 80,
				hidden:true,
				style: 'color: red;',
				scope: this,
				handler: this.doEndTask
			},{
				id:'visit_btn_id',
				text: btns['returning'],
				height: 30,
				width: 80,
				hidden:true,
				style: 'color: red;',
				scope: this,
				handler: this.doVisitTask
			},{
				id:'send_btn_id',
				text: btns['sendAuth'],
				width: 80,
				hidden:true,
				height: 30,
				scope: this,
				handler: this.doSendTask
			}]
		});
	},
	swapViews : function(){
		if(this.view.lockedWrap){
			this.view.lockedWrap.dom.style.right = "0px";
		}
        this.view.mainWrap.dom.style.left = "0px"; 
        if(this.view.updateLockedWidth){
        	this.view.updateLockedWidth = this.view.updateLockedWidth.createSequence(function(){ 
	            this.view.mainWrap.dom.style.left = "0px"; 
	        }, this); 
        }
          
	},
	initEvents: function(){
		this.on("afterrender",function(){
			this.swapViews.call(this.grid);
		},this,{delay:10});
		
		TaskManagerPanel.superclass.initEvents.call(this);
	},
	initWidgets: function(item){
		this.taskStore = new Ext.data.JsonStore({
			url: root + '/core/x/Task!queryTasks.action' ,
			fields:['task_id','cust_no','cust_name','tel','old_addr','new_addr','address','task_type_id',
					'task_status','task_status_text','task_type_id_text','team_id','team_id_text','bug_type','bug_type_text'
					,'bug_detail','zte_status','zte_status_text','task_create_time','team_type'],
			root : 'records',
			totalProperty : 'totalProperty',
			autoDestroy : true
		});
		var forms = lbc('home.tools.TaskManager.forms');
		var tomorrow = new Date();
		tomorrow.setDate(tomorrow.getDate() + 1);
		var startDate = new Date();
		startDate.setDate(startDate.getDate() - 7);
		this.createStartDateField = new Ext.form.DateField({
				xtype: 'datefield',width: 90,format: 'Y-m-d',allowBlank: false,value: startDate
			});
		this.createEndDateField = new Ext.form.DateField({
				xtype: 'datefield',width: 90,format: 'Y-m-d',allowBlank: false,value: tomorrow});
		this.custNoField = new Ext.form.TextField({
				xtype: 'textfield',width: 90,emptyText: forms['custNo']});
		this.taskNoField = new Ext.form.TextField({
				xtype: 'textfield',width: 90,emptyText: forms['taskNo']});			
		this.custNameField = new Ext.form.TextField({
				xtype: 'textfield',width: 90,emptyText: forms['custName']});
		this.mobileField = new Ext.form.TextField({
				xtype: 'textfield',width: 100,emptyText: forms['mobile']});
		this.newaddrField = new Ext.form.TextField({
				xtype: 'textfield',width: 140,emptyText: forms['newaddr']});
		this.taskStatusCombo = new Ext.ux.LovCombo({
				width: 120,
				emptyText: forms['taskStatus'],
				paramName:'TASK_STATUS',
				hiddenName : 'task_status',
				typeAhead:true,editable:true,
				store:new Ext.data.JsonStore({
					fields:['item_value','item_name']
				}),displayField:'item_name',valueField:'item_value',
				triggerAction:'all',mode:'local'
			});		
		
		this.taskDetailTypeCombo = new Ext.ux.LovCombo({
				xtype: 'textfield',
				width: 120,
				emptyText: forms['taskDetailType'],
				typeAhead:true,editable:true,
				paramName:'TASK_DETAIL_TYPE',
				store:new Ext.data.JsonStore({
					fields:['item_value','item_name']
				}),displayField:'item_name',valueField:'item_value',
				triggerAction:'all',mode:'local'
		});
		
		this.taskAddrCombo = new Ext.ux.LovCombo({
			typeAhead: true,
			width: 120,
		    triggerAction: 'all',
		    mode: 'remote',
		    emptyText: forms['taskAddr'],
		    editable : true,
		    store: new Ext.data.JsonStore({
		    	url: root + '/commons/x/QueryCust!queryProvince.action',
		    	autoLoad : true,
		   	 	autoDestroy:true,
		        fields: ['name','id']
		    }),
		    valueField: 'id',
		    displayField: 'name'
		});
		
		this.taskTeamCombo = new Ext.ux.LovCombo({
			typeAhead: true,
			width: 120,
		    triggerAction: 'all',
		    mode: 'remote',
		    emptyText: forms['taskTeam'],
		    editable : true,
		    store: new Ext.data.JsonStore({
		    	url: root + '/core/x/Task!queryTaskTeam.action' ,
		    	autoLoad : true,
		   	 	autoDestroy:true,
		        fields: [ 'dept_id', 'dept_name' ]
		    }),
		    valueField: 'dept_id',
		    displayField: 'dept_name'
		});
		//初始化下拉框的数据 
		App.form.initComboData([this.taskStatusCombo,this.taskDetailTypeCombo],function(){this.doWaitTask();},this);
		
		var twoTbar = new Ext.Toolbar({
			items : [this.taskNoField,'-',this.custNoField,'-',this.mobileField,'-',this.custNameField,'-',this.newaddrField,'-',{
				text: lbc('home.tools.TaskManager.buttons.query'),pressed: true,scope: this,width: 80,handler: this.doSearchTask
			},'-',{text: lbc('home.tools.TaskManager.buttons.pendingOrder'),pressed: true,scope: this,width: 100,handler: this.doWaitTask}]
		});
		
    	// create the Grid
    	var sm = new Ext.grid.RowSelectionModel();
    	var taskCols = lbc('home.tools.TaskManager.taskCols');
	    this.grid = new Ext.grid.GridPanel({
	        store: this.taskStore,
	        cm: new Ext.ux.grid.LockingColumnModel({
	        	columns:[
				//{header: '工单编号',		dataIndex : 'task_id', 				width: 100},
				{header: taskCols[0],		dataIndex : 'task_type_id_text', 	width: 70, renderer: function(v, m ,rs){
					return "<span style='font-weight: bold;'>"+ v +"</span>";
				}},
				{header: taskCols[1], 	dataIndex: 'cust_name', width: 80},
				{header: taskCols[2], 		dataIndex: 'task_status', width: 70, renderer: function(v, m ,rs){
					var text = rs.get("task_status_text");
					var color = "black";
					if(v == 'INIT'){
						color = "purple";
					}else if(v == 'END'){
						color = "green";
					}else if(v == 'CANCEL'){
						color = "gray";
					}
					return "<span style='font-weight: bold;color: "+ color +";'>"+ text +"</span>";
				}},
				{header: taskCols[3], dataIndex:'team_id_text',width:100,renderer:App.qtipValue},
				{header: taskCols[4],dataIndex: 'zte_status_text', width: 70, renderer:Ext.util.Format.statusShow},
				{header: taskCols[5], 		dataIndex : 'address', width: 200,renderer:App.qtipValue},
				{header: taskCols[6], 	dataIndex : 'tel', 				width: 100},
				{header: taskCols[7], dataIndex: 'task_create_time', 	width: 80, renderer: Ext.util.Format.dateFormat},					
				{header: taskCols[8],dataIndex:'bug_type_text',width:85},
				{header: taskCols[9],dataIndex:'bug_detail',width:120,renderer:App.qtipValue}
	        ]}),
	        sm: sm,
	        stripeRows: true,
			bbar: new Ext.PagingToolbar({
		        store: this.taskStore, // grid and PagingToolbar using same store
		        pageSize: this.pageSize
		    }),
			tbar: [this.taskDetailTypeCombo,'-',this.taskAddrCombo,'-',lbc('home.tools.TaskManager.buttons.accptTime'),this.createStartDateField,' ',this.createEndDateField,'-',
			this.taskTeamCombo,'-',this.taskStatusCombo],
			listeners : {
				'render' : function() {
					twoTbar.render(this.tbar);
				}
			}
	    });
	},
	initEvents: function(){
		this.grid.on("rowclick", this.doClickRecord, this );
		TaskManagerPanel.superclass.initEvents.call(this);
	},
	doClickRecord:function(g, i, e){
		//选中一条时才显示
		var record = g.getStore().getAt(i);
//		if((record.get('task_status') == 'INIT' && record.get('team_type') == 'SUPERNET' ) || record.get('task_status') == 'CREATE'){
//			Ext.getCmp('team_btn_id').enable()
//		}else{
//			Ext.getCmp('team_btn_id').disable();
//		}
		this.loadTaskData(record.get("task_id"));
	},
	loadTaskData:function(taskId){
		Ext.Ajax.request({
			scope : this,
			url: root + '/core/x/Task!queryTaskDetail.action' ,
			params : {task_id : taskId},
			success : function(res,opt){
				var rs = Ext.decode(res.responseText);
				this.taskAllInfo.userGrid.getStore().loadData(rs.taskUserList);
				this.taskAllInfo.detail.getStore().loadData(rs.taskLogList);
			}
		});
	},
	createStartDateField: null,
	createEndDateField: null,
	custNoField: null,
	taskStatusCombo: null,
	mobileField: null,
	newaddrField: null,
	doCancelTask: function(){
		var rs = this.getSelections();
		if(rs === false){return ;}
		if(this.checkViald(rs) === false){return;}
		var ts = rs.get("task_status");
		if(ts == 'WAITEND' || ts == 'CANCEL' || ts == 'END'){
			Alert(lbc('home.tools.TaskManager.msg.noCancel'));
			return ;
		}
		Confirm(lbc('home.tools.TaskManager.msg.sureWantSelectedWork'), this , function(){
			var taskId = rs.get("task_id");
			var that = this;
			App.sendRequest(
				Constant.ROOT_PATH + "/core/x/Task!cancelTaskSn.action",
				{task_id : taskId,taskType:rs.get('task_type_id')},
				function(res,opt){
					Ext.getCmp('taskManagerPanelId').grid.getStore().reload({
					callback:function(records, options, success){  
		           		    var panel = Ext.getCmp('taskManagerPanelId');
				           	var index = panel.grid.getStore().find('task_id',taskId);	           		
				           	panel.grid.getSelectionModel().selectRow(index);
				           	panel.loadTaskData(taskId);
						}
			         });
					that.close();
				});
		}); 
	},
	doSendTask: function(){
		var rs = this.getSelections();
		if(rs === false){return ;}

	},
	doWithdrawTask:function(){//工单撤回
		var rs = this.getSelections();
		if(rs === false){return ;}
		if(rs.get('task_status') != 'INIT' || rs.get('team_type') != 'CFOCN' ){
			Alert('施工中状态,cfocn的工单才能进行工单撤回');
			return false;
		}
		
	},
	doTeamTask:function(){//派单
		var rs = this.getSelections();
		if(rs === false){return ;}
		if(this.checkViald(rs) === false){return;}
		if((rs.get('task_status') != 'INIT' && rs.get('team_type') != 'SUPERNET' ) || rs.get('task_status') != 'CREATE'){
			Alert('只有待派单状态的工单或者施工中状态,supernet的工单才能进行派单');
			return false;
		}
		var arr = [];
		this.taskTeamCombo.getStore().each(function(record){
			if(rs.get('task_status') == 'CREATE'){
				arr.push(record.data);
			}else if(rs.get('team_type') == 'SUPERNET' && rs.get('task_status') == 'INIT'){
				if(record.get('dept_id') != rs.get('team_id')){
					arr.push(record.data);
				}
			}
		});
		
		var teamCombo = new Ext.form.ComboBox({
			typeAhead: true,
			width: 120,
		    triggerAction: 'all',
		    mode: 'local',
		    fieldLabel:lbc('home.tools.TaskManager.forms.taskTeam'),
		    editable : true,
		    allowBlank:false,
		    store: new Ext.data.JsonStore({
		        fields: [ 'dept_id', 'dept_name' ]
		    }),
		    valueField: 'dept_id',
		    displayField: 'dept_name'
		});
		teamCombo.getStore().loadData(arr);
		var form = new Ext.form.FormPanel({
			labelWidth: 90,
			bodyStyle: 'padding-top: 10px;',
			items: [teamCombo]
		});
		if(rs.get('task_type_id') == '2'){
			var bugCauseCombo = new Ext.ux.ParamCombo({
				fieldLabel: lbc('home.tools.TaskManager.forms.faultType'),
				xtype:'paramcombo',
				allowBlank:false,
				anchor: '95%',
				paramName:'TASK_BUG_CAUSE'
			});
			App.form.initComboData([bugCauseCombo]);
			form.add(bugCauseCombo);
		}
		var win = new Ext.Window({
			width: 320,
			height: 250,
			title: lbc('home.tools.TaskManager.forms.taskTeam'),
			border: false,
			closeAction:'close',
			layout: 'fit',
			items: form,
			buttons: [{
				text: lbc('common.save'),
				scope: this,
				iconCls : 'icon-save',
				handler: function(){
					if(Ext.isEmpty(teamCombo.getValue())){
						Alert(lbc('home.tools.TaskManager.msg.teamCantEmpty'));return false;
					}
					if(bugCauseCombo && Ext.isEmpty(bugCauseCombo.getValue())){
						Alert(lbc('home.tools.TaskManager.msg.faultTypeCantEmpty'));return false;
					}
					var url = Constant.ROOT_PATH + "/core/x/Task!editTaskTeam.action";
					var taskId = rs.get("task_id");
					var o = {
						task_id : taskId, 
						deptId: teamCombo.getValue(),
						bugType : bugCauseCombo?bugCauseCombo.getValue():null
					};
					App.sendRequest( url, o, function(res,opt){
						Ext.getCmp('taskManagerPanelId').grid.getStore().reload({
							callback:function(records, options, success){  
				           		 var panel = Ext.getCmp('taskManagerPanelId');
					           	var index = panel.grid.getStore().find('task_id',taskId);	           		
					           	panel.grid.getSelectionModel().selectRow(index);
					           	panel.loadTaskData(taskId);
							}
				         });
						win.close();
					});
				}
			},{
				text: lbc('common.cancel'),handler: function(){win.hide();}
			}]
		});
		win.show();
	},
	doDeviceTask:function(){//回填设备
		var rs = this.getSelections();
		if(rs === false){return ;}
		if(this.checkViald(rs) === false){return;}
		var win = Ext.getCmp('TaskDeviceWinId');
		if(!win)
			win = new TaskDeviceWin(rs);
		win.show(rs);
	},
	doEndTask:function(){//完成工单,施工中和supernet
		var rs = this.getSelections();
		if(rs === false){return ;}
		if(rs.get('task_status') != 'INIT' || rs.get('team_type') != 'SUPERNET' ){
			Alert(lbc('home.tools.TaskManager.msg.taskStatusInitAndSupernet'));
			return false;
		}		
		
		var finishCombo = new Ext.form.ComboBox({
			width: 120,
			fieldLabel:lbc('home.tools.TaskManager.forms.finishType'),
			allowBlank:false,
			typeAhead:true,editable:true,
			paramName:'TASK_FINISH_TYPE',
			store:new Ext.data.JsonStore({
				fields:['item_value','item_name']
			}),displayField:'item_name',valueField:'item_value',
			triggerAction:'all',mode:'local'
		});
		App.form.initComboData([finishCombo]);
		var endForm = new Ext.form.FormPanel({
			layout : 'form',
			border : false,
			labelWidth : 100,
			bodyStyle : 'padding : 5px;padding-top : 10px;',
			items: [finishCombo,{
				fieldLabel: lbc('home.tools.TaskManager.forms.finishExplan'),
				name:'finishRemark',
				height : 100,
				width : 240,
				xtype:'textarea'
			}]
		});
		var win = new Ext.Window({
			width: 450,
			height: 250,
			title: lbc('home.tools.TaskManager._winTitle'),
			border: false,
			closeAction:'close',
			layout: 'fit',
			items: endForm,
			buttons: [{
				text: lbc('common.save'),
				scope: this,
				iconCls : 'icon-save',
				handler: function(){
					if(Ext.isEmpty(finishCombo.getValue())){
						Alert(lbc('home.tools.TaskManager.msg.finishTypeCantEmpty'));return false;
					}
					var url = Constant.ROOT_PATH + "/core/x/Task!endTask.action";
					var taskId = rs.get("task_id");
					var o = {
						task_id : taskId, 
						resultType : finishCombo.getValue(),
						finishRemark : endForm.getForm().findField('finishRemark').getValue()
					};
					App.sendRequest( url, o, function(res,opt){
						Ext.getCmp('taskManagerPanelId').grid.getStore().reload({
							callback:function(records, options, success){  
				           		var panel = Ext.getCmp('taskManagerPanelId');
					           	var index = panel.grid.getStore().find('task_id',taskId);	           		
					           	panel.grid.getSelectionModel().selectRow(index);
					           	panel.loadTaskData(taskId);
							}
				         });
						win.close();
					});
				}
			},{
				text: lbc('common.cancel'),
				handler: function(){
					win.hide();
				}
			}]
		});
		win.show();
	},
	doVisitTask:function(){
	
	},
	getSelections: function(){
		var rs = this.grid.getSelectionModel().getSelected();
		if(rs == null || Ext.isEmpty(rs.get('task_id'))){
			Alert(lbc('home.tools.TaskManager.msg.selectRecord'));
			return false;
		}
		return rs;
	},
	checkViald:function(rs){
		if(rs.get('task_status') == 'END' || rs.get('task_status') == 'CANCEL'){
			Alert(lbc('home.tools.TaskManager.msg.roderHaveBeenCompletedOrObsolete'));
			return false;
		}
//		if(rs.get('team_id') != App.getData().optr['dept_id']){
//			Alert(lbc('home.tools.TaskManager.msg.teamIsnotSingleWork'));
//			return false;
//		}
	}
	,
	//search task from remote
	doSearchTask: function(){
		var o = {
			"taskCond.startTime": Ext.util.Format.date(this.createStartDateField.getValue(), "Y-m-d"),
			"taskCond.EndTime": Ext.util.Format.date(this.createEndDateField.getValue(), "Y-m-d"),
			"taskCond.custNo": this.custNoField.getValue(),
			"taskCond.status": this.taskStatusCombo.getValue(),
			"taskCond.mobile": this.mobileField.getValue(),
			"taskCond.addr": this.newaddrField.getValue(),
			"taskCond.custName":this.custNameField.getValue(),
			"taskCond.taskTeam":this.taskTeamCombo.getValue(),
			"taskCond.addrIds":this.taskAddrCombo.getValue(),
			"taskCond.taskId":this.taskNoField.getValue(),
			"taskCond.taskType":this.taskDetailTypeCombo.getValue()
		};
		this.taskStore.baseParams = o;
		this.taskStore.load({
			params: {
				"start": 0, 
				"limit": this.pageSize
			}
		});
	},
	doWaitTask:function(){
		var o = {"isWaitTask": 'T'};
		this.taskStore.baseParams = o;
		this.taskStore.load({params: {"start": 0, "limit": this.pageSize}});
	
	}
});		
