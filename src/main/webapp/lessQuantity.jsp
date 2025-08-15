<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<%@ page session="false"%>
<html>
<head>
<meta charset="UTF-8">
<title>Biznila - Low Stock</title>
<link rel="stylesheet" href="css/bootstrap/bootstrap.min.css">
<link rel="stylesheet" href="css/fontawesome/css/all.min.css">
<link rel="stylesheet" href="css/custom/fonts.css">
<link rel="stylesheet" href="css/custom/utils.css">
<link rel="icon" type="image/jpeg" href="img/logo.jpg">
</head>
<body>
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

	<div id="showAllRecords">
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
		<nav aria-label="Page navigation example">
			<ul class="pagination justify-content-center my-5">
				<li class="page-item prev" style="cursor: pointer;"><div
						class="page-link" aria-label="Previous">
						<span aria-hidden="true">&laquo;</span>
					</div></li>
				<div class="d-flex" id="pagesDiv"></div>
				<li class="page-item next" style="cursor: pointer;"><div
						class="page-link" aria-label="Next">
						<span aria-hidden="true">&raquo;</span>
					</div></li>
			</ul>
		</nav>
	</div>
	<div id="hOneId"
		class="d-flex justify-content-center align-items-center"
		style="display: none">
		<h1></h1>
	</div>

	<script src="js/bootstrap/bootstrap.bundle.min.js"></script>
	<script src="js/jquery/jquery-3.7.1.min.js"></script>
	<script src="js/custom/lessQuantity.js"></script>
</body>
</html>