package com.ycsoft.business.service;

import java.util.List;
import java.util.Map;

import com.ycsoft.beans.task.TaskFillDevice;
import com.ycsoft.beans.task.WTeam;
import com.ycsoft.business.dto.config.TaskBaseInfoDto;
import com.ycsoft.business.dto.config.TaskUserDto;
import com.ycsoft.business.dto.device.DeviceDto;
import com.ycsoft.daos.core.Pager;

public interface ISnTaskService {
	
	public void createBugTask(String custId,String bugDetail) throws Exception;
	
	/**
	 * 修改施工队
	 * @param taskId
	 * @param deptId
	 * @param bugType 如果工单是故障单
	 * @throws Exception 
	 */
	public void editTaskTeam(String taskId,String deptId,String bugType) throws Exception;
	
	/**
	 * 取消工单
	 * @param taskId
	 */
	public void cancelTask(String taskId) throws Exception;
	
	/**
	 * 回填工单信息
	 * @param taskId
	 * @param otlNo 网络参数
	 * @param ponNo 网络参数
	 * @param deviceList 设备列表
	 */
	public void fillTask(String taskId,List<TaskFillDevice> deviceList)throws Exception;
	
	
	/**
	 * 回填拆机工单的设备回收信息
	 * @param taskId
	 * @param userIds
	 * @throws Exception
	 */
	public void fillWriteOffTerminalTask(String taskId,String[] userIds) throws Exception;
	
	/**
	 * 完工
	 * @param taskId
	 * @param resultType 完工类型
	 */
	public void finishTask(String taskId,String resultType,String remark)throws Exception;
	
	/**
	 * 工单查询
	 * @param taskTypes
	 * @param areaIds
	 * @param beginDate
	 * @param endDate
	 * @param taskId
	 * @param teamId
	 * @param status
	 * @param custNo
	 * @param custName
	 * @param custAddr
	 * @param limit 
	 * @param start 
	 * @throws Exception
	 */
	public Pager<TaskBaseInfoDto> queryTask(String taskTypes,String addrIds,String beginDate,String endDate,
			String taskId,String teamId,String status, 
			String custNo,String custName,String custAddr,String mobile, Integer start, Integer limit) throws Exception;
	

	public Map<String, ?> queryTaskDetail(String task_id) throws Exception;

	public List<WTeam> queryTaskTeam()throws Exception;
	
	public DeviceDto queryDeviceInfoByCodeAndModel(String deviceCode, String deviceModel) throws Exception;

	public List<TaskBaseInfoDto> queryTaskByCustId(String custId) throws Exception;

	public Pager<TaskBaseInfoDto> queryUnProcessTask(Integer start, Integer limit)throws Exception;

	public List<TaskUserDto> queryTaskDevice(String task_id) throws Exception;

	public void withdrawTask(String task_id)throws Exception;
	
	

}
