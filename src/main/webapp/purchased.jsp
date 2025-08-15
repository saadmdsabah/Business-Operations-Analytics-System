<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page session="false"%>


<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Biznila - Stock Purchases</title>
<link rel="stylesheet" href="css/bootstrap/bootstrap.min.css">
<link rel="stylesheet" href="css/fontawesome/css/all.min.css">
<link rel="stylesheet" href="css/custom/fonts.css">
<link rel="stylesheet" href="css/custom/purchased.css">
<link rel="stylesheet" href="css/custom/utils.css">
<link rel="icon" type="image/jpeg" href="img/logo.jpg">
</head>
<body>
	<header>
		<%@ include file="navbar.jsp"%>
		<div class="container" id="messageBox" style="visibility: hidden;">
			<div
				class="alert w-50 mx-auto d-flex justify-content-between align-items-center"
				role="alert" id="alertBox">
				<span id="messageText"></span>
				<button type="button" class="btn-close" aria-label="Close"
					id="messageCloseButton"></button>
			</div>
		</div>
	</header>
	<div class="container">
		<div class="row">
			<div class="col-md-2 offset-md-1">
				<div class="d-flex justify-content-center">
					<button class="btn btn-dark btn-secondary w-75" id="displayAll">Show
						All</button>
				</div>
			</div>
			<div class="col-md-2">
				<div class="d-flex justify-content-center">
					<button class="btn btn-secondary w-75" id="findById">Search
						By Id</button>
				</div>
			</div>
			<!-- changes made here -->
			<div class="col-md-2">
				<div class="d-flex justify-content-center">
					<button class="btn btn-secondary w-75" id="findByName">Search
						By Name</button>
				</div>
			</div>
			<div class="col-md-2">
				<div class="d-flex justify-content-center">
					<button class="btn btn-secondary w-75" id="addRecord">Add
						Record</button>
				</div>
			</div>
			<div class="col-md-2">
				<div class="d-flex justify-content-center">
					<button class="btn btn-secondary w-75" id="updateRecord">Update
						Record</button>
				</div>
			</div>
		</div>
	</div>

	<div id="searchByIdDiv" style="display: none;">
		<div class="container mt-5">
			<form class="row mt-3">
				<div class="col-md-6 offset-md-2 position-relative">
					<input type="text" class="form-control" id="itemID"
						placeholder="Enter HSN Code">
					<ul class="custom-list w-75" id="listItems" style="z-index: 10"></ul>
				</div>
				<div class="col-md-2">
					<button id="searchRecord" class="btn btn-outline-primary w-100"><i class="fa-solid fa-magnifying-glass"></i></button>
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
					</tr>
				</thead>
				<tbody id="tableBody">
				</tbody>
			</table>
		</div>
	</div>

	<!-- changes made here -->
	<div id="searchByNameDiv" style="display: none;">
		<div class="container mt-5">
			<form class="row mt-3">
				<div class="col-md-6 offset-md-2 position-relative">
					<input type="text" class="form-control" id="itemName"
						placeholder="Enter Product Name">
					<ul class="custom-list w-75" id="listItemsNames"
						style="z-index: 10"></ul>
				</div>
				<div class="col-md-2">
					<button id="searchRecordName" class="btn btn-outline-primary w-100"><i class="fa-solid fa-magnifying-glass"></i></button>
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
					</tr>
				</thead>
				<tbody id="tableBodyNames">
				</tbody>
			</table>
		</div>
	</div>

	<div id="addRecordDiv" class="mt-5" style="display: none;">
		<div class="container">
			<form class="row" id="addRecordForm">
				<div class="col-md-2">
					<input type="text" class="form-control" id="newRecordId" name="id"
						placeholder="Enter Unique HSN Code">
				</div>
				<div class="col-md-4">
					<input type="text" class="form-control" id="newRecordName"
						name="name" placeholder="Enter Name">
				</div>
				<div class="col-md-2">
					<input type="number" class="form-control" id="newRecordQuantity"
						name="quantity" placeholder="Enter Quantity">
				</div>
				<div class="col-md-2">
					<input type="number" step="0.001" class="form-control"
						id="newRecordPrice" name="price" placeholder="Enter Price">
				</div>
				<button id="newRecordButton" type="submit" class="btn btn-outline-info col-md-2"><i class="fa-solid fa-plus px-1"></i>Add</button>
			</form>
		</div>
	</div>

	<div id="updateSearchByIdDiv" style="display: none;">
		<div class="container mt-5">
			<form class="row mt-3">
				<div class="col-md-6 offset-md-2 position-relative">
					<input type="text" class="form-control" id="itemIDUpdate"
						placeholder="Enter Product Name">
					<ul class="custom-list w-75" id="listItemsUpdate"
						style="z-index: 10"></ul>
				</div>
				<div class="col-md-2">
					<button id="searchRecordUpdate"
						class="btn btn-outline-primary w-100"><i class="fa-solid fa-check"></i></button>
				</div>
			</form>
		</div>
		<div class="container mt-5" id="updateParameters"
			style="visibility: hidden;">
			<form class="row" id="updateRecordForm">
				<div class="col-md-2">
					<input type="text" class="form-control" id="updateRecordId"
						name="id" placeholder="Enter Unique HSN Code" readonly>
				</div>
				<div class="col-md-4">
					<input type="text" class="form-control" id="updateRecordName"
						name="name" placeholder="Enter Name">
				</div>
				<div class="col-md-2">
					<input type="number" class="form-control" id="updateRecordQuantity"
						name="quantity" placeholder="Enter Quantity">
				</div>
				<div class="col-md-2">
					<input type="number" step="0.001" class="form-control"
						id="updateRecordPrice" name="price" placeholder="Enter Price">
				</div>
				<button id="updateButtonToDb" type="submit" class="btn btn-outline-info col-md-2">Update</button>
			</form>
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

	<div id="submitSpinner" class="d-flex justify-content-center my-5 d-none">
		<div class="spinner-border text-primary" role="status">
			<span class="visually-hidden">Loading...</span>
		</div>
	</div>


	<script src="js/bootstrap/bootstrap.bundle.min.js"></script>
	<script src="js/jquery/jquery-3.7.1.min.js"></script>
	<script src="js/custom/purchased.js"></script>
</body>
</html>