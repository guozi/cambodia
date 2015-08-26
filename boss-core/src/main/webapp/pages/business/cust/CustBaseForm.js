
QueryFilterTree = Ext.extend(Ext.ux.QueryFilterTreePanel,{
	doSearch:function(){
		var _v = this.searchT.getValue();
		Ext.Ajax.request({
			url: Constant.ROOT_PATH+"/commons/x/QueryParam!queryAddrTree.action",
			scope : this,
			params : {
				comboQueryText : _v
			},
			success : function(res,opt){
				var data = Ext.decode(res.responseText);
				var root = new Ext.tree.AsyncTreeNode({
						  text:'gen',
						  id:'root',
						  draggable:false,
						  children:data
						 });
				this.setRootNode(root);
//				this.root.expand(true);
//				this.expandAll();	
			}
		});				
			
//		alert(_v);
//		this.setRootNode(root);
//		this.root.expand(true);
	}
});


QueryTreeLoader = Ext.extend(Ext.tree.TreeLoader,{

    load : function(node, callback, scope){
        if(this.clearOnLoad){
            while(node.firstChild){
                node.removeChild(node.firstChild);
            }
        }
        if(this.doPreload(node)){ // preloaded json children
            this.runCallback(callback, scope || node, [node]);
        }else if(this.directFn || this.dataUrl || this.url){
            this.requestData(node, callback, scope || node);
        }
    },

    doPreload : function(node){
        if(node.attributes.children){
            if(node.childNodes.length < 1){ // preloaded?
                var cs = node.attributes.children;
                node.beginUpdate();
                for(var i = 0, len = cs.length; i < len; i++){
                    var cn = node.appendChild(this.createNode(cs[i]));
                    if(this.preloadChildren){
                        this.doPreload(cn);
                    }
                }
                node.endUpdate();
            }
            return true;
        }
        return false;
    }


})

AddressTreeCombo = Ext.extend(Ext.ux.TreeCombo,{
	initList : function() {
		var rootVisible = false;
		if (this.rootNodeCfg) {
			rootVisible = true;
		} else {
			this.rootNodeCfg = {
				expanded : true
			};
		}
		this.list = new QueryFilterTree({
			root : new Ext.tree.AsyncTreeNode(this.rootNodeCfg),
			loader : new QueryTreeLoader({
						dataUrl : this.treeUrl,
						baseParams : this.treeParams
						,listeners : {
							beforeload : this.onBeforeLoad,
							scope : this
						}
					}),
			floating : true,
			height : this.treeHeight,
			autoScroll : true,
			animate : false,
			searchFieldWidth : this.treeWidth - 80,
			rootVisible : rootVisible,
			listeners : {
				click : this.onNodeClick,
				checkchange : this.onCheckchange,
				scope : this
			},
			alignTo : function(el, pos) {
				this.setPagePosition(this.el.getAlignToXY(el, pos));
			}
		});
		if (this.minChars == 0) {
			this.doQuery("");
		}
	},
	listeners:{
		expand:function(thisCmp){
			function getFocus(){
				var search = thisCmp.list.searchT;//如果第一次获取焦点,list会为空
				if(search){
//					search.setValue('输入关键字搜索');
					var dom = search.el.dom;
					dom.select();
				}
			};
			getFocus.defer(200,this);
		}
	},
	onNodeClick : function(node, e) {		
		if (!this.isCanClick(node)) {
			return;
		}
		Ext.Ajax.request({
			scope : this,
			url: Constant.ROOT_PATH+"/commons/x/QueryParam!queryCustAddrName.action",
			params : {
				addrId : node.id
			},
			success : function(res,opt){
				var rec = Ext.decode(res.responseText);
				//		// 显示隐藏值
				this.addOption(node.id, rec);
				this.setValue(node.id);
				this.setRawValue(rec);
				this.collapse();
				this.fireEvent('select', this, node, node.attributes);
			}
		});
		
	},
	firstExpand: true,
	doQuery : function(q, forceAll) {
		if(!this.firstExpand){
			this.firstExpand = true;
			this.list.expandAll();
		}
		this.expand();
	},
	onBeforeLoad:function(l,node){
		l.on('beforeload',function(loader,node){
  			l.baseParams.addrId=node.id; //通过这个传递参数，这样就可以点一个节点出来它的子节点来实现异步加载
		},l);
	}
	
}); 



ResidentForm = Ext.extend( Ext.Panel , {
	parent : null,
	constructor: function(p){
		this.parent = p;
		ResidentForm.superclass.constructor.call(this, {
			layout:'column',
			border : false,
			anchor: '100%',
			defaults:{
				baseCls: 'x-plain',
				bodyStyle: "background:#F9F9F9",
				columnWidth:1,
				layout: 'form',
				labelWidth: 75
			},
			items:[{
				items:[{
					id:'cust_colony_id',
					fieldLabel:'客户群体',
					xtype:'paramcombo',
					allowBlank:false,
					hiddenName:'cust.cust_colony',
					paramName:'CUST_COLONY',
					defaultValue:'YBKH',
					listeners : {
						scope : this,
						select : function(combo){
							this.parent.custColony = combo.getValue();
						}
					}
				}]
			}]
		})
	}
});

UnitForm = Ext.extend(Ext.Panel, {
	parent : null,
	constructor: function(p){
		this.parent = p;
		UnitForm.superclass.constructor.call(this, {
			layout:'column',
			border : false,
			anchor: '100%',
			bodyStyle: "background:#F9F9F9",
			defaults:{
				baseCls: 'x-plain',
				columnWidth:0.5,
				labelWidth: 75
			},
			items:[{
				layout:'form',border:false,items:[{
					id:'cust_colony_id',
					fieldLabel:'客户群体',
					xtype:'combo',
					hiddenName:'cust.cust_colony',
					store:new Ext.data.JsonStore({
						fields:['text','value'],
						data:[{text:'协议客户',value:'XYKH'},{text:'模拟大客户',value:'MNDKH'}]
					}),displayField:'text',valueField:'value',editable:true,forceSelection:true,
					listeners : {
						scope : this,
						select : function(combo){
							var value = combo.getValue();
							this.parent.custColony = value;
							var custCountCmp = Ext.getCmp('custcount_itemId');
							if(value){
								custCountCmp.show();
								Ext.getCmp('cust_count_id').allowBlank = false;
							}else{
								custCountCmp.hide();
								Ext.getCmp('cust_count_id').allowBlank = true;
							}
					},
					blur:function(combo){
						var value = combo.getValue();
						if(Ext.isEmpty(value)){
							Ext.getCmp('custcount_itemId').hide();
							Ext.getCmp('cust_count_id').allowBlank = true;
						}
					}
				}
			}]
			},{
				id:'custcount_itemId',
				layout:'form',border:false,
				items:[{
					id:'cust_count_id',
					fieldLabel:'容量',
					xtype:'numberfield',
					name:'cust.cust_count',
					minValue:1,
					allowDecimals:false,
					allowNegative:false
				}]
			}]
		})
	},
    initEvents: function () {
        this.on('afterrender', function () {
	        Ext.getCmp('custcount_itemId').hide();
        });
	    this.doLayout();
        UnitForm.superclass.initEvents.call(this);
    }
});

/**
 * 联系人面板
 * @class LinkPanel
 * @extends Ext.Panel
 */
LinkPanel = Ext.extend(Ext.Panel,{
	parent : null,
	constructor : function(){
		LinkPanel.superclass.constructor.call(this,{
			layout : 'form',
			anchor: '100%',
			border : false,
			baseCls: 'x-plain',
			items : [{
				layout:'column',
				baseCls: 'x-plain',
				anchor: '100%',
				defaults:{
					baseCls: 'x-plain',
					columnWidth:0.5,
					layout: 'form',
					labelWidth: 75
				},
				items: [{
					id:'idCustAppCodeItems',
					items:[{
						fieldLabel:'联系人',
						name:'linkman.linkman_name',
						xtype:'textfield'
					},{
						fieldLabel:'固定电话',
						name:'linkman.tel',
						xtype:'textfield',
						regex: /^(\d{7}|\d{8})$/,
						id: 'linkmanTel',
						invalidText : '请输入7位或8位电话号码'
					},{
						fieldLabel:'邮箱',
						name:'linkman.email',
						xtype:'textfield',
						vtype:'email'
					},{
						fieldLabel:'邮编',
						name:'linkman.postcode',
						xtype:'textfield',
						regex: /^[1-9]{1}[0-9]{5}$/,
						invalidText : '请输入6位不以0开头的数字'
					}]
				},{
					items:[{
						fieldLabel:'性别',
						id : 'linkmanSex',
						hiddenName:'linkman.sex',
						xtype:'paramcombo',
						paramName:'SEX'
					},{
						fieldLabel:'手机',
						name:'linkman.mobile',
						xtype:'numberfield',
						regex: /^1[\d]{10}$/,
						id: 'linkmanMobile',
						invalidText : '请输入11位数字'
					},{
						fieldLabel:'出生日期',
						width : 125,
						id : 'linkmanBirthday',
						name:'linkman.birthday',
						xtype:'datefield',
						format:'Y-m-d'
					}]
				},{
					columnWidth:1,
					items:[{
						fieldLabel:'邮寄地址',
						width : 400,
						id : 'linkman.mail_address',
						name:'linkman.mail_address',
						xtype:'textfield'
					}]
					
				}]
			},{
				fieldLabel:'备注',
				name:'cust.remark',
//						grow : true,
				preventScrollbars : true,
				height : 30,
				width : 350,
				xtype:'textarea'
			}]
		})
	}
});
/**
 * 客户的Formg构造,这是一个基类，
 * 为客户开户、修改资料等功能提供的基类
 */
CustBaseForm = Ext.extend( BaseForm , {
	//扩展属性面板
	extAttrForm: null,
	residentForm :null,
	unitForm :null,
	linkPanel : null,
	oldCustType:'RESIDENT',
	custAddress : null,//客户拼接后的地址
	custColony : null,
	navMenu:null,
	constructor: function(config){
		Ext.apply(this, config);
		//居民信息扩展
		this.doInitAttrForm(2);
		this.linkPanel = new LinkPanel(this);
		this.residentForm = new ResidentForm(this);
		this.unitForm = new UnitForm(this);
		CustBaseForm.superclass.constructor.call(this, {
			trackResetOnLoad:true,
			labelWidth: 75,
			bodyStyle: Constant.TAB_STYLE,
			items:[{
				fieldLabel:'客户类型',
				xtype:'paramcombo',
				allowBlank:false,
				width : 125,
				hiddenName:'cust.cust_type',
				paramName:'CUST_TYPE',
				defaultValue:'RESIDENT',
				listeners:{
					scope: this,
					'select': function(combo,rec){
						this.doCustTypeChange(combo.getValue());
					}
				}
			},{
				layout:'column',
				baseCls: 'x-plain',
				anchor: '100%',
				defaults:{
					baseCls: 'x-plain',
					columnWidth:0.5,
					layout: 'form',
					labelWidth: 75
				},
				items: [{
					items:[{
						fieldLabel:'客户名称',
						xtype:'textfield',
						id : 'cust.cust_name',
						name:'cust.cust_name',
						allowBlank:false,
						blankText:'请输入客户名称',
						listeners:{
							scope: this,
							'change': this.doCustNameChange
						}
					}]
				},{
					columnWidth:0.75,
					items:[new AddressTreeCombo({
						id : 'addrTreeCombo',
				    	width:300,
						treeWidth:350,
						treeHeight : 300,
						minChars:0,
						height: 22,
						fieldLabel : '客户地址',
						allowBlank: false,
						emptyText :'选择地址..',
						hideTrigger: false,
						editable: true,
						blankText:'请选择客户地址',
						treeUrl: Constant.ROOT_PATH+"/commons/x/QueryParam!queryAddrTree.action",
						hiddenName:'cust.addr_id',
						listeners:{
							scope: this,
							'select': function(combo){
								Ext.getCmp('tempCustAddress').setValue(combo.getRawValue());
								this.doAddressChange();
							}
						}
					})]
				},{
					columnWidth:0.25,
				    labelWidth: 45,
					items:[{
				    	width : 50,
				    	id : 'cust.note',
				    	name : 'cust.note',
				    	fieldLabel : 'Room',
				    	xtype : 'textfield',
				    	listeners:{
							scope: this,
							'change': this.doAddressChange
						}
				    }]
				}]
			}
			,{
				xtype : 'hidden',
				id : 'tempCustAddress'
			},{
				layout:'column',
				baseCls: 'x-plain',
				anchor: '100%',
				defaults:{
					baseCls: 'x-plain',
					columnWidth:0.5,
					layout: 'form',
					labelWidth: 75
				},
				items: [{
					items:[{
						fieldLabel:'证件类型',
						xtype:'paramcombo',
						allowBlank:false,
						hiddenName:'linkman.cert_type',
						paramName:'CERT_TYPE',
						defaultValue:'SFZ',
						listeners:{
							scope:this,
							'select': function(){
								var field = Ext.getCmp("linkman_cert_num_el");
								var value = field.getValue();
								if(value && this.doCertNumChange(field, value, value) === false){
									field.reset();
								}
							}
						}
					}]
				},{
					items:[{
						fieldLabel:'证件号码',
						xtype:'textfield',
						vtype: 'alphanum',
						width : 130,
						allowBlank:false,
						name:'linkman.cert_num',
						id: 'linkman_cert_num_el',
						listeners:{
							scope:this,
							'change':this.doCertNumChange
						}
					}]
				}]
			},this.residentForm,this.linkPanel,this.extAttrForm]
//            }]
		});
	},
	doInit:function(){
		CustBaseForm.superclass.doInit.call(this);
		this.removeCustColony();
	},
	removeCustColony:function(){
		var store = this.residentForm.findById('cust_colony_id').getStore();
		store.each(function(record){
			var value = record.get('item_value');
			if(value == 'MNDKH' || value == 'XYKH'){
				store.remove(record);
			}
		});
	},
	initComponent : function(){
		if(!this.oldCustType){
			this.oldCustType = 'RESIDENT';
		}
		CustBaseForm.superclass.initComponent.call(this);
	},
	doCustTypeChange:function(custType){//客户类型修改
		if (this.oldCustType == custType)
			return ;
		this.remove(this.residentForm,true);
		this.remove(this.linkPanel,true);
		this.remove(this.extAttrForm,true);
		this.remove(this.unitForm,true);
		
		
		var custToUserBtn = Ext.getCmp('newCustToUserId');
		var custToDeviceBtn = Ext.getCmp('newCustToDeviceId');
		if (custType != 'UNIT') {
			if (custToUserBtn && custToUserBtn.isHidden)
				custToUserBtn.hide();
			if (custToDeviceBtn && custToDeviceBtn.isHidden)
				custToDeviceBtn.hide();
		} else {
			if (custToUserBtn && !custToUserBtn.isHidden)
				custToUserBtn.hide();
			if (custToDeviceBtn && !custToDeviceBtn.isHidden)
				custToDeviceBtn.hide();
		}
		
		this.linkPanel = new LinkPanel();
		if (custType == 'RESIDENT'){
			this.doInitAttrForm(2);
			this.residentForm = new ResidentForm(this);
			this.add(this.residentForm);
			this.add(this.linkPanel);
			this.add(this.extAttrForm);
			App.form.initComboData(this.residentForm.findByType("paramcombo"),this.removeCustColony,this);
		}else{
			this.doInitAttrForm(1);
			var countyId = App.getData().optr.county_id;
			//单位，选择了客户群体，则为模拟大客户(武汉、直属)
			if(custType == 'UNIT' && (countyId == '0101' || countyId == '0102') ){
				this.unitForm = new UnitForm(this);
				this.add(this.unitForm);
			}
			this.add(this.linkPanel);
			this.add(this.extAttrForm);
		}
		
		//潜江开非居民客户，需要审批单，审批单功能在系统管理里面
		if(custType == 'NONRES' && App.getData().optr.county_id == '9005'){
			Ext.getCmp('idCustAppCodeItems').add({
					id:'cust_app_code',
					fieldLabel:'审批单号',
					xtype:'textfield',
					name:'cust.app_code',
					vtype:'invoiceId',
					allowBlank:false
					/*xtype:'combo',
					hiddenName:'cust.app_code',
					store:new Ext.data.JsonStore({
						url:Constant.ROOT_PATH + "/core/x/Cust!queryNonresCustApp.action",
						totalProperty:'totalProperty',
						root:'records',
						params:{start:0,limit:10},
						fields:['app_id','app_code','app_name','status']
					}),displayField:'app_name',valueField:'app_code',
					forceSelection:true,editable:true,listWidth:400,
					typeAhead: true,mode:'remote',minChars:4,pageSize:10*/
				});
		}else{
			var comp = Ext.getCmp('cust_app_code');
			if(comp){
				Ext.getCmp('idCustAppCodeItems').remove(comp,true);
			}
		}
		App.form.initComboData( this.linkPanel.findByType("paramcombo"));
		this.doLayout();
		this.oldCustType = custType;
	},
	/**
	 * 证件号码改变后，判断如果证件类型是身份证，则号码必须为15或者18位
	 */
	doCertNumChange:function(txt,value,oldValue){
		var certType = this.find('hiddenName','linkman.cert_type')[0].getValue();
		if (certType =="SFZ"){
			if (!Ext.form.VTypes.IDNum(value)){
				if(value.length != 18 && value.length != 15){
					txt.setValue(oldValue);
				}
				Alert(Ext.form.VTypes.IDNumText);
				return false
			}else{
				if(value.length == 18){//18位身份证
					//设置生日
					var dateStr = value.substring(6,14);
					var year = dateStr.substring(0,4);
					var month = dateStr.substring(4,6);
					var day = dateStr.substring(6,8);
					var date = Date.parseDate(year+"-"+month+"-"+day,'Y-m-d');
					Ext.getCmp('linkmanBirthday').setValue(date);
					
					//设置性别
					var num = value.substring(value.length -2 ,value.length-1);
					var index = 0;
					var sex = Ext.getCmp('linkmanSex');
					if(num%2 == 0){
						index = sex.getStore().find('item_value','FEMALE');
					}else{
						index = sex.getStore().find('item_value','MALE');
					}
					sex.setValue(sex.getStore().getAt(index).get('item_value'))
				}else{//15位身份证
					//设置生日
					var dateStr = value.substring(6,12);
					var year = '19' + dateStr.substring(0,2);
					var month = dateStr.substring(2,4);
					var day = dateStr.substring(4,6);
					var date = Date.parseDate(year+"-"+month+"-"+day,'Y-m-d');
					Ext.getCmp('linkmanBirthday').setValue(date);
					
					//设置性别
					var num = value.substring(value.length -1 ,value.length);
					var index = 0;
					var sex = Ext.getCmp('linkmanSex');
					if(num%2 == 0){
						index = sex.getStore().find('item_value','FEMALE');
					}else{
						index = sex.getStore().find('item_value','MALE');
					}
					sex.setValue(sex.getStore().getAt(index).get('item_value'))
				}
				
				
				
			}
		}
		
		return true;
	},
	//默认为新增的扩展信息
	doInitAttrForm: function(group){
		var cfg = [{
	   	   columnWidth: .5,
	   	   layout: 'form',
	   	   baseCls: 'x-plain',
	   	   labelWidth: 75
	    },{
		   columnWidth: .5,
		   layout: 'form',
		   baseCls: 'x-plain',
		   labelWidth: 75
	    }];
		this.extAttrForm = ExtAttrFactory.gExtForm({
			tabName: Constant.C_CUST,
			group: group,
			prefixName : 'cust.'
		}, cfg,this);
	},
	/**
	 * 客户名称修改后，如果名称小于5位，设置联系人名称同客户名相同
	 */
	doCustNameChange:function(c,r,i){
		var name = c.getValue();
		var linkManName = this.find('name','linkman.linkman_name')[0];
		if (name.length<=5){
			linkManName.setValue(name);
		}
	},
	doAddressChange : function(){
		if(!Ext.isEmpty(Ext.getCmp('addrTreeCombo').getRawValue())){
			this.custAddress = Ext.getCmp('tempCustAddress').getValue();
			if(!Ext.isEmpty(Ext.getCmp('cust.note').getValue())){
				this.custAddress = "Room "+Ext.getCmp('cust.note').getValue()+ ","+this.custAddress;
			}
			Ext.getCmp('linkman.mail_address').setValue(this.custAddress);
		}
	},
	doValid:function(){
		if(!Ext.getCmp('linkmanTel').getValue() && !Ext.getCmp('linkmanMobile').getValue()){
			var obj = {};
			obj['isValid'] = false;
			obj['msg'] = '电话号码或固定电话必须输入一个！';
			return obj;
		}
		return CustBaseForm.superclass.doValid.call(this);
	}
});