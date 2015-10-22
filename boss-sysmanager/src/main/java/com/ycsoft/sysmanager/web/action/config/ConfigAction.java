package com.ycsoft.sysmanager.web.action.config;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.ycsoft.beans.config.TProvince;
import com.ycsoft.beans.system.SAgent;
import com.ycsoft.beans.system.SDataTranslation;
import com.ycsoft.commons.abstracts.BaseAction;
import com.ycsoft.sysmanager.component.config.ConfigComponent;

@Controller
public class ConfigAction extends BaseAction {

	/**
	 * 
	 */
	private static final long serialVersionUID = 4463745557033215523L;
	
	@Autowired
	private ConfigComponent configComponent;
	
	private String query;
	private SAgent agent;
	
	public String queryProvince() throws Exception {
		getRoot().setRecords(configComponent.queryProvince());
		return JSON_RECORDS;
	}
	
	public String saveProvince() throws Exception {
		String str = request.getParameter("provinces");
		List<TProvince> provinceList = new Gson().fromJson(str, new TypeToken<List<TProvince>>(){}.getType());
		configComponent.saveProvince(provinceList);
		return JSON_SUCCESS;
	}
	
	public String queryAllAgent() throws Exception {
		getRoot().setRecords(configComponent.queryAllAgent());
		return JSON_RECORDS;
	}
	
	public String queryAgent() throws Exception {
		getRoot().setPage(configComponent.queryAgent(query, start, limit));
		return JSON_PAGE;
	}
	
	public String saveAgent() throws Exception {
		configComponent.saveAgent(agent);
		return JSON_SUCCESS;
	}
	
	public String queryDataTranslation() throws Exception {
		getRoot().setPage(configComponent.queryDataTranslation(query, start, limit));
		return JSON_PAGE;
	}
	
	public String saveDataTranslation() throws Exception {
		String str = request.getParameter("dataTranslations");
		List<SDataTranslation> dataTransList = new Gson().fromJson(str, new TypeToken<List<SDataTranslation>>(){}.getType());
		configComponent.saveDataTranslation(dataTransList);
		return JSON_SUCCESS;
	}
	
	public String deleteDataTranslation() throws Exception {
		String[] ids = request.getParameterValues("dataIds");
		configComponent.deleteDataTranslation(ids);
		return JSON_SUCCESS;
	}
	
	public SAgent getAgent() {
		return agent;
	}

	public void setAgent(SAgent agent) {
		this.agent = agent;
	}
	
	public void setQuery(String query) {
		this.query = query;
	}
	
}