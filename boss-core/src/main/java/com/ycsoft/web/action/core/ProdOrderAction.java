package com.ycsoft.web.action.core;

import org.springframework.stereotype.Controller;

import com.ycsoft.business.dto.core.prod.OrderProd;
import com.ycsoft.business.service.IOrderService;
import com.ycsoft.commons.helper.JsonHelper;
import com.ycsoft.web.commons.abstracts.BaseBusiAction;

@Controller
public class ProdOrderAction extends BaseBusiAction {
	private IOrderService orderService;
	
	
	private String user_id;
	private String filter_order_sn;
	private String busi_code;
	private String cust_id;
	private String last_order_sn;
	private String prod_id;
	private String orderProd;
	
	private Integer cancelFee;
	private String[] orderSns;
	private String order_sn;
	/**
	 * 退订界面数据初始化查询
	 * @return
	 * @throws Exception 
	 */
	public String queryCancelOrderAndFee() throws Exception{
		getRoot().setRecords(orderService.queryCancelFeeByCancelOrder(busi_code, cust_id, order_sn));
		return JSON_RECORDS;
	}
	
	/**
	 * 用户销户产品数据初始化
	 * @return
	 * @throws Exception
	 */
	public String queryLogoffUserProd() throws Exception{
		getRoot().setRecords(orderService.queryLogoffUserProd(busi_code,user_id));
		return JSON_RECORDS;
	}
	
	/**
	 * 退订产品(高级和普通退订)
	 * @return
	 * @throws Exception 
	 */
	public String cancelProd() throws Exception{
		orderService.saveCancelProd(orderSns, cancelFee);
		return JSON_SUCCESS;
	}
	/**
	 * 取消当天已支付订单
	 * @return
	 * @throws Exception
	 */
	public String cancelTodayOrder() throws Exception{
		orderService.saveCancelTodayOrder(order_sn, cancelFee);
		return JSON_SUCCESS;
	}
	
	public String loadProdList() throws Exception{
		getRoot().setSimpleObj(orderService.queryOrderableProd(busi_code,cust_id,user_id, filter_order_sn));
		return JSON_SIMPLEOBJ;
	}
	
	
	public String loadPackageUserSelect() throws Exception{
		getRoot().setSimpleObj(orderService.queryPackageGroupPanel(cust_id, prod_id, last_order_sn));
		return JSON_SIMPLEOBJ;
	}
	
	public String loadTransferFee() throws Exception{
		OrderProd order=JsonHelper.toObject(orderProd, OrderProd.class);
		getRoot().setRecords(orderService.queryTransferFee(order, busi_code));
		return JSON_RECORDS;
	}
	
	public String saveOrderProd()throws Exception{
		OrderProd order=JsonHelper.toObject(orderProd, OrderProd.class);
		orderService.saveOrderProdList(busi_code,order);
		return JSON_SUCCESS;
	}
	
	public String queryCustEffOrder() throws Exception{
		getRoot().setSimpleObj(orderService.queryCustEffOrder(cust_id));
		return JSON_SIMPLEOBJ;
	}
	
	public String queryProdOrderInit(){
		
		return JSON_OTHER;
	}

	public String getUser_id() {
		return user_id;
	}

	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}

	

	public String getFilter_order_sn() {
		return filter_order_sn;
	}

	public void setFilter_order_sn(String filter_order_sn) {
		this.filter_order_sn = filter_order_sn;
	}

	public IOrderService getOrderService() {
		return orderService;
	}

	public void setOrderService(IOrderService orderService) {
		this.orderService = orderService;
	}

	public String getBusi_code() {
		return busi_code;
	}

	public void setBusi_code(String busi_code) {
		this.busi_code = busi_code;
	}

	public String getCust_id() {
		return cust_id;
	}

	public void setCust_id(String cust_id) {
		this.cust_id = cust_id;
	}


	public void setLast_order_sn(String last_order_sn) {
		this.last_order_sn = last_order_sn;
	}


	public void setProd_id(String prod_id) {
		this.prod_id = prod_id;
	}


	public void setOrderProd(String orderProd) {
		this.orderProd = orderProd;
	}
	public Integer getCancelFee() {
		return cancelFee;
	}
	public void setCancelFee(Integer cancelFee) {
		this.cancelFee = cancelFee;
	}
	public String[] getOrderSns() {
		return orderSns;
	}
	public void setOrderSns(String[] orderSns) {
		this.orderSns = orderSns;
	}
	public String getOrder_sn() {
		return order_sn;
	}
	public void setOrder_sn(String order_sn) {
		this.order_sn = order_sn;
	}
	
}
