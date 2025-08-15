<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page session="false"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Biznila - Analysis</title>
<link rel="stylesheet" href="css/bootstrap/bootstrap.min.css">
<link rel="stylesheet" href="css/fontawesome/css/all.min.css">
<link rel="stylesheet" href="css/custom/fonts.css">
<link rel="stylesheet" href="css/custom/utils.css">
<link rel="icon" type="image/jpeg" href="img/logo.jpg">
<script src="js/chart/chart.min.js"></script>
</head>
<body>


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

	<main>
		<div class="container mb-4">
			<div class="row">
				<div class="col-md-2 offset-md-4">
					<div class="d-flex justify-content-center">
						<button class="btn btn-dark btn-secondary w-75"
							id="getRevenueGraph">Revenue Graph</button>
					</div>
				</div>
				<div class="col-md-2">
					<div class="d-flex justify-content-center">
						<button class="btn btn-secondary w-75" id="getTopProducts">Top
							Products</button>
					</div>
				</div>
			</div>
		</div>

		<div id="rangeRevenueForm" class="h-50">
			<div class="h-100 d-flex justify-content-center align-items-center">
				<form id="rangeForm" class="d-flex align-items-center">
					<label for="from" class="mx-1" style="font-size: 22px;">From
						Date</label> <input type="date" id="from" name="date"
						style="font-size: 22px;"> <label for="to" class="ms-5"
						style="font-size: 22px;">To Date</label> <input type="date"
						id="to" name="date" style="font-size: 22px;">

					<button type="submit" class="btn btn-primary mx-1">Submit</button>
				</form>
			</div>
		</div>

		<div id="topProductsForm" style="display: none;" class="h-50">
			<div class="h-100 d-flex justify-content-center align-items-center">
				<form id="topProducts" class="d-flex align-items-center">
					<label for="fromTop" class="mx-1" style="font-size: 22px;">From
						Date</label> <input type="date" id="fromTop" name="date"
						style="font-size: 22px;"> <label for="toTop" class="ms-5"
						style="font-size: 22px;">To To Date</label> <input type="date"
						id="toTop" name="date" style="font-size: 22px;"><label
						for="window" class="ms-5" style="font-size: 22px;">Count
						of Products</label> <input type="number" id="window" name="window"
						style="font-size: 22px;">

					<button type="submit" class="btn btn-primary mx-1">Submit</button>
				</form>
			</div>
		</div>

		<div>
			<div id="canvasDiv"
				style="display: none; justify-content: center; align-items: center">
				<canvas id="chart_demo" width="600" height="400"></canvas>
			</div>

			<div id="topProductsDiv"
				style="display: none; justify-content: center; align-items: center">
				<canvas id="chartTop" width="600" height="400"></canvas>
				<canvas id="chartBottom" width="600" height="400"></canvas>
			</div>
		</div>
	</main>


	<script src="js/bootstrap/bootstrap.bundle.min.js"></script>
	<script src="js/jquery/jquery-3.7.1.min.js"></script>
	<script src="js/custom/analysis.js"></script>
</body>
</html>