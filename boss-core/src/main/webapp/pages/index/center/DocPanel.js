/**
 * 客户发票信息
 * @class InvoiceGrid
 * @extends Ext.grid.GridPanel
 */
InvoiceGrid = Ext.extend(Ext.ux.Grid,{
	border:false,
	invoiceStore:null,
	region: 'center',
	constructor:function(){
		this.invoiceStore = new Ext.data.JsonStore({
			fields: ["invoice_book_id","invoice_id","invoice_code","invoice_mode","amount","print_date",
					"status_text","optr_name","optr_id","status","finance_status","finance_status_text",
						"print_type","is_invoice","doc_name","template_filename","fee_create_time",
						"doc_sn","doc_type","fee_invoice_id","fee_invoice_code","doc_type_text",
						"fee_invoice_status","fee_invoice_status_text","fee_done_code","invoice_mode_text"]
		}); 
		var lc = langUtils.main("doc.invoice.columns");
		var cm = new Ext.ux.grid.LockingColumnModel({ 
    		columns : [
			{id:'invoice_id',header:lc[0],dataIndex:'invoice_id',width:80},
			{header:lc[1],dataIndex:'invoice_code',	width:80},
			{header:lc[2],dataIndex:'amount',width:60,renderer : Ext.util.Format.formatFee},
			{header:lc[3],dataIndex:'print_date',	width:120},
			{header:lc[4],dataIndex:'invoice_mode_text',	width:70},
			{header:lc[5],dataIndex:'doc_type_text',	width:70},
			{header:lc[6],dataIndex:'status_text',	width:60,renderer:Ext.util.Format.statusShow},
			{header:lc[7],dataIndex:'finance_status_text',	width:60,renderer:Ext.util.Format.statusShow},
			{header:lc[8],dataIndex:'optr_name',	width:60},
			{header:lc[9],dataIndex:'fee_create_time',	width:120}
	        ]
	      });
		
		var pageTbar = new Ext.PagingToolbar({store: this.invoiceStore ,pageSize : App.pageSize});
		pageTbar.refresh.hide();
		InvoiceGrid.superclass.constructor.call(this,{
			id:'D_INVOICE',
			store:this.invoiceStore,
			sm:new Ext.grid.RowSelectionModel(),
			view: new Ext.ux.grid.ColumnLockBufferView(),
			cm:cm,
			bbar: pageTbar
		})
	},
	initEvents: function(){
		this.on("afterrender",function(){
			this.swapViews();
		},this,{delay:10});
		
		InvoiceGrid.superclass.initEvents.call(this);
	},
	remoteRefresh:function(){
		this.refresh();
	},
	refresh:function(){
		Ext.Ajax.request({
			url:Constant.ROOT_PATH + "/commons/x/QueryCust!queryInvoiceByCustId.action",
			scope:this,
			params:{custId:App.getData().custFullInfo.cust.cust_id},
			success:function(res,opt){
				var data = Ext.decode(res.responseText);
				//PagingMemoryProxy() 一次性读取数据
				this.invoiceStore.proxy = new Ext.data.PagingMemoryProxy(data),
				//本地分页
				this.invoiceStore.load({params:{start:0,limit:App.pageSize}});
			}
		});
	}
});

/**
 * 施工单
 * @class TaskGrid
 * @extends Ext.grid.GridPanel
 */
TaskGrid = Ext.extend(Ext.ux.Grid,{
	border:false,
	taskStore:null,
	region: 'center',
	constructor:function(){
		this.taskStore = new Ext.data.JsonStore({
			fields: ["task_type_text","task_type","cust_id","books_time","installer_time","task_status_text","create_time","work_id"]
		}); 
		var lc = langUtils.main("doc.task.columns");
		var cm = [
			{header:lc[0],dataIndex:'task_type_text',	width:120},
			{header:lc[1],dataIndex:'task_status_text',	width:80},
			{header:lc[2],dataIndex:'books_time',	width:120},
			{header:lc[3],dataIndex:'installer_time',width:120},
			{header:lc[4],dataIndex:'create_time',	width:120}
		];
		var pageTbar = new Ext.PagingToolbar({store: this.taskStore ,pageSize : App.pageSize});
		pageTbar.refresh.hide();
		TaskGrid.superclass.constructor.call(this,{
			id:'D_TASK',
			store:this.taskStore,
			sm:new Ext.grid.RowSelectionModel(),
			columns:cm,
			bbar: pageTbar
		})
	},
	remoteRefresh:function(){
		this.refresh();
	},
	refresh:function(){
		Ext.Ajax.request({
			url:Constant.ROOT_PATH + "/commons/x/QueryCust!queryTaskByCustId.action",
			scope:this,
			params:{custId:App.getData().custFullInfo.cust.cust_id},
			success:function(res,opt){
				var data = Ext.decode(res.responseText);
				//PagingMemoryProxy() 一次性读取数据
				this.taskStore.proxy = new Ext.data.PagingMemoryProxy(data),
				//本地分页
				this.taskStore.load({params:{start:0,limit:App.pageSize}});
			}
		});
	}
});

/**
 * 业务受理单
 * @class BusiDocGrid
 * @extends Ext.grid.GridPanel
 */
BusiDocGrid = Ext.extend(Ext.ux.Grid,{
	border:false,
	docStore:null,
	region: 'center',
	constructor:function(){
		this.docStore = new Ext.data.JsonStore({
			fields: ["done_code","status_text","busi_code","optr_name",'busi_name','optr_id',
				"last_print",'done_date','doc_sn','create_time']
		}); 
		var sm = new Ext.grid.CheckboxSelectionModel();
		var lc = langUtils.main("doc.busi.columns");
		var cm = [
			sm,
			{header:lc[0],dataIndex:'optr_name',	width:80},
			{header:lc[1],dataIndex:'create_time',width:140},
			{header:lc[2],dataIndex:'busi_name',	width:280}
//			{header:'业务信息',dataIndex:'info',width:100}
		];
		var pageTbar = new Ext.PagingToolbar({store: this.docStore ,pageSize : App.pageSize});
		pageTbar.refresh.hide();
		BusiDocGrid.superclass.constructor.call(this,{
			id:'D_BUSI',
			store:this.docStore,
			sm:sm,
			columns:cm,
			bbar: pageTbar
		})
	},
	remoteRefresh:function(){
		this.refresh();
	},
	refresh:function(){
		Ext.Ajax.request({
			url:Constant.ROOT_PATH + "/commons/x/QueryCust!queryBusiConfirmDocByCustId.action",
			scope:this,
			params:{custId:App.getData().custFullInfo.cust.cust_id},
			success:function(res,opt){
				var data = Ext.decode(res.responseText);
				//PagingMemoryProxy() 一次性读取数据
				this.docStore.proxy = new Ext.data.PagingMemoryProxy(data),
				//本地分页
				this.docStore.load({params:{start:0,limit:App.pageSize}});
			}
		});
	}
});

/**
 * 单据信息面板
 */
DocPanel = Ext.extend(BaseInfoPanel,{
		// 面板属性定义
	invoiceGrid: null,
	busiDocGrid: null,
	taskGrid: null,
	mask: null ,
	constructor: function(){
		this.invoiceGrid = new InvoiceGrid();
		this.busiDocGrid = new BusiDocGrid();
		this.taskGrid = new TaskGrid();
		DocPanel.superclass.constructor.call(this, {
			layout:"border",
			border:false,
			items:[{
				region:"center",
				layout:"anchor",
				anchor:"100%",
				border: false,
				bodyStyle: 'border-right-width: 1px',
				items:[{
					anchor:"100% 100%",
					title: langUtils.main("doc.invoice._title"),
					layout:'border',
					border: false,
					defaults: {border: false},
					items:[this.invoiceGrid]
				}]
			},{
				region:"east",
				split:true,
				width:"45%",
				layout:"anchor",
				border: false,
				bodyStyle: 'border-left-width: 1px',
				items:[{
					anchor:"100% 50%",
					layout:'border',
					title:langUtils.main("doc.task._title"),
					border: false,
					defaults: {border: false},
					items:[this.taskGrid]
				},{
					anchor:"100% 50%",
					title: langUtils.main("doc.busi._title"),
					layout:'border',
					border: false,
					defaults: {border: false},
					items:[this.busiDocGrid]
				}]
			}]
		});
	},
	refresh:function(){
		this.invoiceGrid.remoteRefresh();
		this.busiDocGrid.remoteRefresh();
		this.taskGrid.remoteRefresh();
	}
});
Ext.reg( "docPanel" , DocPanel );