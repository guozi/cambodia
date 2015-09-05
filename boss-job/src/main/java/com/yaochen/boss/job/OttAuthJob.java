package com.yaochen.boss.job;

import java.util.List;

import org.quartz.JobExecutionException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.yaochen.boss.job.component.AuthComponent;
import com.yaochen.myquartz.Job2;
import com.yaochen.myquartz.Job2ExecutionContext;
import com.ycsoft.beans.core.job.BusiCmdParam;
import com.ycsoft.beans.core.job.JVodCommand;
import com.ycsoft.boss.remoting.ott.OttClient;
import com.ycsoft.boss.remoting.ott.Result;
import com.ycsoft.commons.constants.BusiCmdConstants;
@Service
public class OttAuthJob implements Job2 {
	private static final long serialVersionUID = 1L;
	private final Logger logger = LoggerFactory.getLogger(getClass());
	@Autowired
	private AuthComponent authComponent;
	
	@Override
	public void execute(Job2ExecutionContext arg0) throws JobExecutionException {
		//读取要发送的指令
		List<JVodCommand> cmdList = null;
		try{
			cmdList = authComponent.queryOttCmd();
		} catch(Exception e){
			logger.error("读取指令失败"+e.getMessage());
			return;
		}
		OttClient client = new OttClient();
		for (JVodCommand cmd:cmdList){
			Result result = null;
			try{
				JsonObject params =new JsonParser().parse(cmd.getDetail_param()).getAsJsonObject();
				if ((cmd.getCmd_type().equals(BusiCmdConstants.CHANGE_USER))){
					
					result = client.editUser(cmd.getLogin_name(), 
							getJsonValue(params,BusiCmdParam.login_name.name()), 
							getJsonValue(params,BusiCmdParam.login_password.name()),
							null, null,null,
							getJsonValue(params,BusiCmdParam.stb_id.name()),
							getJsonValue(params,BusiCmdParam.stb_mac.name()),
							getJsonValue(params,BusiCmdParam.user_status.name()));
				} else if ((cmd.getCmd_type().equals(BusiCmdConstants.DEL_USER))){
					
					result = client.deleteUser(getJsonValue(params,BusiCmdParam.login_name.name()));
				} else if ((cmd.getCmd_type().equals(BusiCmdConstants.PASSVATE_PROD))){
					result = client.stopUserProduct(getJsonValue(params,BusiCmdParam.login_name.name()), cmd.getRes_id());
				} else if  ((cmd.getCmd_type().equals(BusiCmdConstants.ACCTIVATE_PROD))){
					result = client.openUserProduct(getJsonValue(params,BusiCmdParam.login_name.name()), cmd.getRes_id(),
							getJsonValue(params,BusiCmdParam.prod_exp_date.name()));
				}else{
					result=client.getBossErrorResult("未定义的指令类型");
				}
			}catch(Exception e){
				result = new Result();
				result.setErr("1");
				result.setStatus(Result.UNDEFINED_ERROR_STATUS);
				result.setReason(e.getMessage());
				logger.error("OTT指令发送失败",e);
			}
			
			if (!result.isSuccess()&&(result.isUndefinedError()||result.isConnectionError())){
				try {
					Thread.sleep(1000*5);
				} catch (Exception e) {
					logger.error("OTT发送线程休眠失败",e);
				}
			} 
			//保存发送结果
			try{
				authComponent.saveOttSendResult(cmd, result);
			} catch(Exception e){
				e.printStackTrace();
				logger.error("保存指令发送结果失败",e);
				return;
			}
		}
	}
	
	private String getJsonValue(JsonObject jo,String key){
		return jo.get(key).isJsonNull()?null:jo.get(key).getAsString();
	}
	

}
