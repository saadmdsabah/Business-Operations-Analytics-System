<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page session="false" %>
<%@ page errorPage="error.jsp" %>
<!DOCTYPE html>
<html lang="en" class="h-100"> 
<head>
	<meta charset="UTF-8">
	<title>Bizilla - Login</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" href="css/bootstrap/bootstrap.min.css">
	<link rel="stylesheet" href="css/fontawesome/css/all.min.css">
	<link rel="stylesheet" href="css/custom/fonts.css">
	<link rel="icon" type="image/jpeg" href="img/logo.jpg">
</head>
<body class="d-flex justify-content-center align-items-center h-100 m-0"> <%-- Vertically and horizontally centered --%>

	<div class="container p-4 border border-3 shadow-lg rounded w-100" style="max-width: 400px; background-color: #fff;">
		
		<!-- Logo -->
		<div class="d-flex justify-content-center mb-3">
			<img alt="Bizilla Logo" src="img/logo.jpg" class="h-25 w-75">
		</div>
		
		<!-- Login Form -->
		<form id="loginForm">
			<div class="form-floating mb-3">
				<input type="text" class="form-control" id="floatingInput" name="username" placeholder="Username">
				<label for="floatingInput">Username</label>
			</div>
			<div class="form-floating mb-3">
				<input type="password" class="form-control" id="floatingPassword" name="password" placeholder="Password">
				<label for="floatingPassword">Password</label>
			</div>
			
			<div id="incorrectPassUser" class="d-flex justify-content-center text-danger" style="visibility: hidden;">
				<p>Invalid Username / Password</p>
			</div>
			
			<div class="d-flex justify-content-center">
				<button type="submit" class="btn btn-primary w-100">Login</button>
			</div>
		</form>

	</div>

	<script src="js/bootstrap/bootstrap.bundle.min.js"></script>
	<script src="js/jquery/jquery-3.7.1.min.js"></script>
	<script src="js/custom/login.js"></script>
</body>
</html>
