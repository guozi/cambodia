/**
 *
 */
package com.ycsoft.business.dto.config;

import com.ycsoft.beans.task.WTaskUser;

/**
 * @author YC-SOFT
 *
 */
public class TaskUserDto extends WTaskUser{

	/**
	 *
	 */
	private String password;
	private String user_name;
	private String device_code;	
	
	

	public String getDevice_code() {
		return device_code;
	}

	public void setDevice_code(String device_code) {
		this.device_code = device_code;
	}

	public String getUser_name() {
		return user_name;
	}

	public void setUser_name(String user_name) {
		this.user_name = user_name;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
	
	
}