<%@ page session="false"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<link rel="stylesheet" href="css/bootstrap/bootstrap.min.css">
<link rel="stylesheet" href="css/fontawesome/css/all.min.css">
<link rel="stylesheet" href="css/custom/fonts.css">
<link rel="stylesheet" href="css/custom/home.css">
<link rel="stylesheet" href="css/custom/utils.css">
<link rel="stylesheet" href="css/yearpicker/yearpicker.css">
<link rel="icon" type="image/jpeg" href="img/logo.jpg">
<title>Biznila - Revenue</title>
</head>
<body class="h-100">
	<header>
		<%@include file="navbar.jsp"%>
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

	<main class="h-50">
		<div class="container">
			<div class="row">
				<div class="col-md-2 offset-md-2">
					<div class="d-flex justify-content-center">
						<button class="btn btn-dark btn-secondary w-75" id="findById">Daily</button>
					</div>
				</div>
				<div class="col-md-2">
					<div class="d-flex justify-content-center">
						<button class="btn btn-secondary w-75" id="findByRange">Range</button>
					</div>
				</div>
				<div class="col-md-2">
					<div class="d-flex justify-content-center">
						<button class="btn btn-secondary w-75" id="displayAll">Monthly</button>
					</div>
				</div>
				<div class="col-md-2">
					<div class="d-flex justify-content-center">
						<button class="btn btn-secondary w-75" id="findByName">Yearly</button>
					</div>
				</div>
			</div>
		</div>

		<div id="searchByIdDiv" class="h-50">
			<div class="h-100 d-flex justify-content-center align-items-center">
				<form id="dateForm" class="d-flex align-items-center">
					<label
						for="date" class="mx-1" style="font-size: 22px;">Select Date</label> <input type="date" id="date"
						name="date"  style="font-size: 22px;"> 
					<button type="submit" class="btn btn-primary mx-1">Submit</button>
				</form>
			</div>
		</div>
		
		<div style="display: none;" id="showRecordRange" class="h-50">
			<div class="h-100 d-flex justify-content-center align-items-center">
				<form id="rangeForm" class="d-flex align-items-center">
					<label
						for="from" class="mx-1" style="font-size: 22px;">From Date</label> <input type="date" id="from"
						name="date"  style="font-size: 22px;"> 
					<label
						for="to" class="ms-5" style="font-size: 22px;">To Date</label> <input type="date" id="to"
						name="date"  style="font-size: 22px;"> 
						
					<button type="submit" class="btn btn-primary mx-1">Submit</button>
				</form>
			</div>
		</div>
		
		<div style="display: none;" id="showAllRecords" class="h-50">
			<div class="h-100 d-flex justify-content-center align-items-center">
				<form id="monthForm" class="d-flex align-items-center">
					<label for="month" class="mx-1" style="font-size: 22px;">Select Month</label> <input
						type="month" id="month" name="month" style="font-size: 22px;">
						
					<button type="submit" class="btn btn-primary mx-1">Submit</button>
				</form>
			</div>
		</div>
		
		<div style="display: none;" id="searchByNameDiv" class="h-50">
			<div class="h-100 d-flex justify-content-center align-items-center">
				<form id="yearForm" class="d-flex align-items-center">
					<label for="year" class="mx-1" style="font-size: 22px;">Select Year</label>
						<input id="year" type="text" class="yearpicker"  style="font-size: 22px;">
					<button type="submit" class="btn btn-primary mx-1">Submit</button>
				</form>
			</div>
		</div>
		<h2 id="totalRevenueH1" style="display: none;" class="text-center">
			<span id="textContent"></span>
			<i id="rupeeSymnol" class="fa-solid fa-indian-rupee-sign" style="font-size: 28px; display: none;"></i>
			<span id="totalCost"></span>
		</h2>
	</main>


	<script src="js/bootstrap/bootstrap.bundle.min.js"></script>
	<script src="js/jquery/jquery-3.7.1.min.js"></script>
	<script src="js/yearpicker/yearpicker.js"></script>
	<script src="js/custom/revenue.js"></script>
</body>
</html>