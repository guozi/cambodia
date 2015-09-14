/**
 * WTaskBaseInfo.java	2010/03/16
 */

package com.ycsoft.beans.task;

import java.io.Serializable;
import java.util.Date;

import com.ycsoft.commons.constants.DictKey;
import com.ycsoft.commons.store.MemoryDict;
import com.ycsoft.daos.config.POJO;

/**
 * WTaskBaseInfo -> W_TASK_BASE_INFO mapping
 */
@POJO(tn = "W_TASK_BASE_INFO", sn = "", pk = "task_id")
public class WTaskBaseInfo implements Serializable{
	private static final long serialVersionUID = -3902988035837840214L;
	private String task_id;
	private String task_title;
	private String task_type_id;
	private String task_detail_type_id;
	private String task_create_type;
	private String task_status;
	private String cancel_result;
	private String team_id;
	private Integer installer_id;
	private Date task_create_time;
	private Date task_invalide_time;
	private Date task_finish_time;
	private String task_finish_type;
	private String cust_id;
	private String cust_name;
	private String new_addr;
	private String old_addr;
	private String tel;
	private String mobile;
	private Integer done_code;
	private String county_id;
	private String area_id;
	private String remark;
	private String visit_result;
	private String zte_status;
	private String bug_type;
	private String buy_detail;
	private String optr_id;

	private String task_type_name;
	private String task_detail_type_name;
	private String task_status_text;
	private String zte_status_text;
	private String task_type_id_text;
	private String optr_name;
	private String bug_type_text;
	private String team_id_text;
	
	public String getTask_id() {
		return task_id;
	}



	public void setTask_id(String task_id) {
		this.task_id = task_id;
	}



	public String getTask_title() {
		return task_title;
	}



	public void setTask_title(String task_title) {
		this.task_title = task_title;
	}



	public String getTask_type_id() {
		return task_type_id;
	}



	public void setTask_type_id(String task_type_id) {
		this.task_type_id = task_type_id;
		task_type_id_text = MemoryDict.getDictName(DictKey.TASK_TYPE, task_type_id);
	}



	public String getTeam_id_text() {
		return team_id_text;
	}



	public void setTeam_id_text(String team_id_text) {
		this.team_id_text = team_id_text;
	}



	public String getTask_detail_type_id() {
		return task_detail_type_id;
	}



	public void setTask_detail_type_id(String task_detail_type_id) {
		this.task_detail_type_id = task_detail_type_id;
	}



	public String getTask_create_type() {
		return task_create_type;
	}



	public void setTask_create_type(String task_create_type) {
		this.task_create_type = task_create_type;
	}



	public String getTask_status() {
		return task_status;
	}



	public void setTask_status(String task_status) {
		this.task_status = task_status;
		task_status_text = MemoryDict.getDictName(DictKey.TASK_STATUS, task_status);
	}



	public String getTeam_id() {
		return team_id;
	}



	public void setTeam_id(String team_id) {
		this.team_id = team_id;
		team_id_text = MemoryDict.getDictName(DictKey.DEPT, team_id);
	}



	public Date getTask_create_time() {
		return task_create_time;
	}



	public void setTask_create_time(Date task_create_time) {
		this.task_create_time = task_create_time;
	}



	public Date getTask_invalide_time() {
		return task_invalide_time;
	}



	public void setTask_invalide_time(Date task_invalide_time) {
		this.task_invalide_time = task_invalide_time;
	}



	public Date getTask_finish_time() {
		return task_finish_time;
	}



	public void setTask_finish_time(Date task_finish_time) {
		this.task_finish_time = task_finish_time;
	}



	public String getTask_finish_type() {
		return task_finish_type;
	}



	public void setTask_finish_type(String task_finish_type) {
		this.task_finish_type = task_finish_type;
	}



	public String getCust_id() {
		return cust_id;
	}



	public void setCust_id(String cust_id) {
		this.cust_id = cust_id;
	}



	public String getCust_name() {
		return cust_name;
	}



	public void setCust_name(String cust_name) {
		this.cust_name = cust_name;
	}



	public String getNew_addr() {
		return new_addr;
	}



	public void setNew_addr(String new_addr) {
		this.new_addr = new_addr;
	}



	public String getOld_addr() {
		return old_addr;
	}



	public void setOld_addr(String old_addr) {
		this.old_addr = old_addr;
	}



	public String getTel() {
		return tel;
	}



	public void setTel(String tel) {
		this.tel = tel;
	}



	public String getMobile() {
		return mobile;
	}



	public void setMobile(String mobile) {
		this.mobile = mobile;
	}







	public Integer getDone_code() {
		return done_code;
	}



	public void setDone_code(Integer done_code) {
		this.done_code = done_code;
	}



	public void setInstaller_id(Integer installer_id) {
		this.installer_id = installer_id;
	}



	public String getCounty_id() {
		return county_id;
	}



	public void setCounty_id(String county_id) {
		this.county_id = county_id;
	}



	public String getArea_id() {
		return area_id;
	}



	public void setArea_id(String area_id) {
		this.area_id = area_id;
	}



	public String getRemark() {
		return remark;
	}



	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getTask_type_name() {
		return task_type_name;
	}



	public void setTask_type_name(String task_type_name) {
		this.task_type_name = task_type_name;
	}



	public String getTask_detail_type_name() {
		return task_detail_type_name;
	}



	public void setTask_detail_type_name(String task_detail_type_name) {
		this.task_detail_type_name = task_detail_type_name;
	}



	public String getTask_status_text() {
		return task_status_text;
	}



	public void setTask_status_text(String task_status_text) {
		this.task_status_text = task_status_text;
	}
	
	public Integer getInstaller_id() {
		return installer_id;
	}



	public String getVisit_result() {
		return visit_result;
	}



	public void setVisit_result(String visit_result) {
		this.visit_result = visit_result;
	}
	

	public String getZte_status() {
		return zte_status;
	}

	public void setZte_status(String zte_status) {
		this.zte_status = zte_status;
		zte_status_text = MemoryDict.getDictName(DictKey.STATUS, zte_status);
	}
	
	



	public String getCancel_result() {
		return cancel_result;
	}



	public void setCancel_result(String cancel_result) {
		this.cancel_result = cancel_result;
	}



	public static long getSerialversionuid() {
		return serialVersionUID;
	}



	public String getBug_type() {
		return bug_type;
	}



	public void setBug_type(String bug_type) {
		this.bug_type = bug_type;
		bug_type_text = MemoryDict.getDictName(DictKey.TASK_BUG_CAUSE, bug_type);
	}



	public String getBuy_detail() {
		return buy_detail;
	}



	public void setBuy_detail(String buy_detail) {
		this.buy_detail = buy_detail;
	}



	public String getZte_status_text() {
		return zte_status_text;
	}



	public void setZte_status_text(String zte_status_text) {
		this.zte_status_text = zte_status_text;
	}



	public String getOptr_id() {
		return optr_id;
	}



	public void setOptr_id(String optr_id) {
		this.optr_id = optr_id;
		optr_name = MemoryDict.getDictName(DictKey.OPTR, optr_id);
	}



	public String getTask_type_id_text() {
		return task_type_id_text;
	}



	public void setTask_type_id_text(String task_type_id_text) {
		this.task_type_id_text = task_type_id_text;
	}



	public String getOptr_name() {
		return optr_name;
	}



	public void setOptr_name(String optr_name) {
		this.optr_name = optr_name;
	}



	public String getBug_type_text() {
		return bug_type_text;
	}



	public void setBug_type_text(String bug_type_text) {
		this.bug_type_text = bug_type_text;
	}
	
	
	
	
}