package com.ycsoft.beans.core.prod;

import java.io.Serializable;
import java.util.Date;

import com.ycsoft.beans.base.BusiBase;
import com.ycsoft.business.dto.core.prod.OrderProd;
import com.ycsoft.daos.config.POJO;

@POJO(tn = "C_PROD_ORDER", sn = "SEQ_ORDER_SN", pk = "ORDER_SN")
public class CProdOrder extends BusiBase implements Serializable {
	private String order_sn;//display(0)
    private String	 package_sn;
    private String package_id;
    private String cust_id;
    private String user_id;
    private String prod_id;
    private String tariff_id;
    private String disct_id;
    private String status;//display(5)
    private Date status_date;
    private Date eff_date;//display(6)
    private Date exp_date;//display(7)
    private Integer active_fee;
    private Integer bill_fee;
    private Integer rent_fee ;
    private Date last_bill_date;
    private Date next_bill_date;
    private Integer order_months;
    private Integer order_fee;
    private Date order_time;//display(8)
    private String order_type;
    private String package_group_id;
    private String remark;
    private String public_acctitem_type;
    
	public String getOrder_sn() {
		return order_sn;
	}
	public void setOrder_sn(String order_sn) {
		this.order_sn = order_sn;
	}
	public String getPackage_sn() {
		return package_sn;
	}
	public void setPackage_sn(String package_sn) {
		this.package_sn = package_sn;
	}
	public String getPackage_id() {
		return package_id;
	}
	public void setPackage_id(String package_id) {
		this.package_id = package_id;
	}
	public String getCust_id() {
		return cust_id;
	}
	public void setCust_id(String cust_id) {
		this.cust_id = cust_id;
	}
	public String getUser_id() {
		return user_id;
	}
	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}
	public String getProd_id() {
		return prod_id;
	}
	public void setProd_id(String prod_id) {
		this.prod_id = prod_id;
	}
	public String getTariff_id() {
		return tariff_id;
	}
	public void setTariff_id(String tariff_id) {
		this.tariff_id = tariff_id;
	}
	public String getDisct_id() {
		return disct_id;
	}
	public void setDisct_id(String disct_id) {
		this.disct_id = disct_id;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public Date getStatus_date() {
		return status_date;
	}
	public void setStatus_date(Date status_date) {
		this.status_date = status_date;
	}
	public Date getEff_date() {
		return eff_date;
	}
	public void setEff_date(Date eff_date) {
		this.eff_date = eff_date;
	}
	public Date getExp_date() {
		return exp_date;
	}
	public void setExp_date(Date exp_date) {
		this.exp_date = exp_date;
	}
	public Integer getActive_fee() {
		return active_fee;
	}
	public void setActive_fee(Integer active_fee) {
		this.active_fee = active_fee;
	}
	public Integer getBill_fee() {
		return bill_fee;
	}
	public void setBill_fee(Integer bill_fee) {
		this.bill_fee = bill_fee;
	}
	public Integer getRent_fee() {
		return rent_fee;
	}
	public void setRent_fee(Integer rent_fee) {
		this.rent_fee = rent_fee;
	}
	public Date getLast_bill_date() {
		return last_bill_date;
	}
	public void setLast_bill_date(Date last_bill_date) {
		this.last_bill_date = last_bill_date;
	}
	public Date getNext_bill_date() {
		return next_bill_date;
	}
	public void setNext_bill_date(Date next_bill_date) {
		this.next_bill_date = next_bill_date;
	}
	public Integer getOrder_months() {
		return order_months;
	}
	public void setOrder_months(Integer order_months) {
		this.order_months = order_months;
	}
	public Integer getOrder_fee() {
		return order_fee;
	}
	public void setOrder_fee(Integer order_fee) {
		this.order_fee = order_fee;
	}
	public Date getOrder_time() {
		return order_time;
	}
	public void setOrder_time(Date order_time) {
		this.order_time = order_time;
	}
	public String getOrder_type() {
		return order_type;
	}
	public void setOrder_type(String order_type) {
		this.order_type = order_type;
	}
	public String getPackage_group_id() {
		return package_group_id;
	}
	public void setPackage_group_id(String package_group_id) {
		this.package_group_id = package_group_id;
	}

	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public String getPublic_acctitem_type() {
		return public_acctitem_type;
	}
	public void setPublic_acctitem_type(String public_acctitem_type) {
		this.public_acctitem_type = public_acctitem_type;
	}
    
}
