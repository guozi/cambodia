package com.ycsoft.beans.core.common;

import java.util.Date;

import com.ycsoft.daos.config.POJO;
@POJO(tn = "C_DONE_CODE_UNPAY",  pk = "DONE_CODE")
public class CDoneCodeUnpay {
	private Integer done_code;
	private String cust_id;
	private Date done_date;
	public Integer getDone_code() {
		return done_code;
	}
	public void setDone_code(Integer done_code) {
		this.done_code = done_code;
	}
	public String getCust_id() {
		return cust_id;
	}
	public void setCust_id(String cust_id) {
		this.cust_id = cust_id;
	}
	public Date getDone_date() {
		return done_date;
	}
	public void setDone_date(Date done_date) {
		this.done_date = done_date;
	}

}
