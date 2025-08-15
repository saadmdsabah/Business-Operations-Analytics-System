<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Biznila - Out of Stock</title>
<link rel="stylesheet" href="css/bootstrap/bootstrap.min.css">
<link rel="stylesheet" href="css/fontawesome/css/all.min.css">
<link rel="stylesheet" href="css/custom/fonts.css">
<link rel="stylesheet" href="css/custom/utils.css">
<link rel="icon" type="image/jpeg" href="img/logo.jpg">
</head>
<body class="h-100">

	<%@ include file="navbar.jsp"%>
	<div class="container" id="messageBox" style="visibility: hidden;">
		<div
			class="alert  w-50 mx-auto d-flex justify-content-between align-items-center"
			role="alert" id="alertBox">
			<span id="messageText"></span>
			<button type="button" class="btn-close" aria-label="Close"
				id="messageCloseButton"></button>
		</div>
	</div>

	<div id="showAllRecords" style="display: none;">
		<div class="container w-50 mt-5">
			<table class="table table-hover">
				<thead>
					<tr>
						<th scope="col">HSN CODE</th>
						<th scope="col">Product Name</th>
						<th scope="col">Quantity</th>
						<th scope="col">MRP</th>
					</tr>
				</thead>
				<tbody id="tableBodyPagination">
				</tbody>
			</table>
		</div>
	</div>
	<div id="hOneId"
		class="d-flex justify-content-center align-items-center"
		style="display: none;">
		<h1></h1>
	</div>

	<script src="js/bootstrap/bootstrap.bundle.min.js"></script>
	<script src="js/jquery/jquery-3.7.1.min.js"></script>
	<script src="js/custom/outOfStock.js"></script>
</body>
</html>