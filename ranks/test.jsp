<!DOCTYPE html>

<%@ page contentType="text/html; charset=gb2312" %> 
<%@ page language="java" %> 
<%@ page import="com.mysql.jdbc.Driver" %> 
<%@ page import="java.sql.*" %>
<html>
<head>
	<title>
		test
	</title>
<body>

<%   
//驱动程序名 
String driverName="com.mysql.jdbc.Driver"; 
//数据库用户名 
String userName="root"; 
//密码 
String userPasswd="111111"; 
//数据库名 
String dbName="json-mysql"; 
//表名 
String tableName="pingfen";
//联结字符串 
String url="jdbc:mysql://localhost:3306/json-mysql?serverTimezone=Asia/Shanghai";
Class.forName("com.mysql.jdbc.Driver").newInstance();
Connection connection=DriverManager.getConnection(url,userName,userPasswd);
Statement statement = connection.createStatement(); 
String sql="select * FROM "+tableName; 

float[] douban=new float[9];
float[] imdb=new float[9];
float[] rottentomatoes=new float[9];

//获得数据结果集和
ResultSet rs = statement.executeQuery(sql);
int i=0;
while(rs.next()){
douban[i]=rs.getFloat("douban");    
imdb[i]=rs.getFloat("imdb");  
rottentomatoes[i]=rs.getFloat("rottentomatoes");   
out.print(douban[i]+" "); 
out.print(imdb[i]+" "); 
out.print(rottentomatoes[i]+" "+'"/n"'); 
i++; 
 }
 rs.close();
 statement.close();
 connection.close();

%>
</body>
</html>

