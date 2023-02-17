<!DOCTYPE html>


<html>
<head>
	<title>
		test
	</title>
<body>
    <%@ page contentType="text/html; charset=gb2312" %> 
    <%@ page language="java" %> 
    <%@ page import="com.mysql.jdbc.Driver" %> 
    <%@ page import="java.sql.*" %>
<%   
//驱动程序名 
String driverName="com.mysql.jdbc.Driver"; 
//数据库用户名 
String userName="root"; 
//密码 
String userPasswd="111111"; 
//数据库名 
String dbName="word"; 
//表名 
String tableName="map_enword";
//联结字符串 
String url="jdbc:mysql://localhost:3306/word?serverTimezone=Asia/Shanghai";
Class.forName("com.mysql.jdbc.Driver").newInstance();
Connection connection=DriverManager.getConnection(url,userName,userPasswd);
Statement statement = connection.createStatement(); 
String sql="select * FROM "+tableName; 
ResultSet rs = statement.executeQuery(sql);
ResultSetMetaData rmeta=rs.getMetaData();
String str1="";
while(rs.next()){
    str1=rs.getString(2);
    out.print(str1+"");
}

 rs.close();
 statement.close();
 connection.close();
%>
</body>
</html>
