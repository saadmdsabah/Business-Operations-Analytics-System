<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Biznila - Find Order</title>
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


	<div id="searchByIdDiv">
		<div class="container mt-5">
			<form class="row mt-3">
				<div class="col-md-6 offset-md-2 position-relative">
					<input type="text" class="form-control" id="itemID"
						placeholder="Enter Invoice ID">
					<ul class="custom-list w-75" id="listItems" style="z-index: 10"></ul>
				</div>
				<div class="col-md-2">
					<button id="searchRecord" class="btn btn-outline-primary w-100"><i class="fa-solid fa-magnifying-glass"></i></button>
				</div>
			</form>
		</div>
		<div id="contentDiv" style="display: none;">
			<div class="container w-50 mt-5">
				<div class="w-100 d-flex justify-content-center">
					<div class="card w-50">
						<ul class="list-group list-group-flush">
							<li class="list-group-item"><b>Invoice Id:</b> <span
								id="invoiceId"></span></li>
							<li class="list-group-item"><b>Time Stamp:</b> <span
								id="createdAt"></span></li>
							<li class="list-group-item"><b>Total MRP of the
									Purchase:</b> <span id="totalMrp"></span></li>
							<li class="list-group-item"><b>Total Discount:</b> <span
								id="totalDiscount"></span></li>
							<li class="list-group-item"><b>Total Cost After
									Discount:</b> <span id="totalCost"></span></li>
						</ul>
					</div>
				</div>

			</div>
			<div class="container w-50 my-5">
				<table class="table">
					<thead>
						<tr>
							<th scope="col">HSN CODE</th>
							<th scope="col">Product Name</th>
							<th scope="col">Quantity</th>
							<th scope="col">MRP</th>
							<th scope="col">Discount</th>
							<th scope="col">Cost</th>
						</tr>
					</thead>
					<tbody id="tableBody">
					</tbody>
				</table>
			</div>
		</div>
		<div id="submitSpinner" class="d-flex justify-content-center d-none">
			<div class="spinner-border text-primary" role="status">
				<span class="visually-hidden">Loading...</span>
			</div>
		</div>
	</div>

	<script src="js/bootstrap/bootstrap.bundle.min.js"></script>
	<script src="js/jquery/jquery-3.7.1.min.js"></script>
	<script src="js/custom/findOrderById.js"></script>
</body>
</html>