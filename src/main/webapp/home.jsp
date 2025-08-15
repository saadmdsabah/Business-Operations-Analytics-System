<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page session="false"%>

<%@ page errorPage="error.jsp"%>
<!DOCTYPE html>
<html class="h-100">
<head>
<meta charset="UTF-8">
<title>Biznila - Home</title>
<link rel="stylesheet" href="css/bootstrap/bootstrap.min.css">
<link rel="stylesheet" href="css/fontawesome/css/all.min.css">
<link rel="stylesheet" href="css/custom/fonts.css">
<link rel="stylesheet" href="css/custom/home.css">
<link rel="stylesheet" href="css/custom/utils.css">
<link rel="icon" type="image/jpeg" href="img/logo.jpg">
</head>
<body class="h-100">
	<header class="no-print">
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
	</header>

	<div id="spinnerDiv" class="container">
		<div class="d-flex flex-column align-items-center">
			<div class="spinner-border mb-2" role="status" aria-hidden="true"></div>
			<div>
				<strong>Loading...</strong>
			</div>
		</div>
	</div>

	<main class="d-none">
		<div class="container mt-3">
			<div class="row">
				<h1 class="text-center fs-1">
					<i class="fa-solid fa-receipt px-2"></i>Invoice
				</h1>
			</div>
			<div class="row">
				<div class="col-md-4 offset-md-8">
					<h3 class="text-center" id="idDisplay">
						Id - <span></span>
					</h3>
				</div>
			</div>
			<form class="row mt-3 no-print">
				<div class="col-md-4 offset-md-1 position-relative">
					<input type="text" class="form-control" id="itemID"
						placeholder="Enter Product Name">
					<ul class="custom-list w-75" id="listItems" style="z-index: 10"></ul>
				</div>
				<div class="col-md-2">
					<input type="number" class="form-control" id="quantity"
						placeholder="Enter Quantity">
				</div>
				<div class="col-md-2">
					<input type="number" class="form-control" id="discount"
						placeholder="Discount Per Product">
				</div>
				<div class="col-md-2">
					<button id="addRow" class="btn btn-outline-primary w-100">
						<i class="fa-solid fa-plus"></i> Add Row
					</button>
				</div>
			</form>
		</div>
		<div class="container w-50 mt-5">
			<table class="table">
				<thead>
					<tr>
						<th scope="col">HSN CODE</th>
						<th scope="col">Product Name</th>
						<th scope="col">Quantity</th>
						<th scope="col">MRP</th>
						<th scope="col">Discount</th>
						<th scope="col">Total Cost</th>
					</tr>
				</thead>
				<tbody id="tableBody">
				</tbody>
				<!-- changes made here -->
				<tfoot id="tableFooter" style="font-weight: bold; display: none;">
					<tr>
						<td>Grand Discount</td>
						<td>
							<div class="d-flex align-items-center">
								<input type="text" name="totalDiscount" id="totalDiscount">
								<button class="btn btn-primary btn-sm ms-2" id="discountApplyBtn">Apply</button>
							</div>
						</td>
						<td></td>
						<td></td>
						<td>Grand Total</td>
						<td id="grandTotalTd"></td>
					</tr>
				</tfoot>
			</table>
			<div class="d-flex justify-content-between no-print">
				<button id="removeRow" class="btn btn-secondary mb-5"
					style="visibility: hidden;">Remove Row</button>
				<button id="submitRowsToDb" class="btn btn-outline-primary mb-5"
					style="display: none;">Submit</button>
			</div>
			<div id="submitSpinner" class="d-flex justify-content-center"
				style="visibility: hidden;">
				<div class="spinner-border text-primary" role="status">
					<span class="visually-hidden">Loading...</span>
				</div>
			</div>
		</div>
	</main>

	<script src="js/bootstrap/bootstrap.bundle.min.js"></script>
	<script src="js/jquery/jquery-3.7.1.min.js"></script>
	<script src="js/custom/home.js"></script>
</body>
</html>