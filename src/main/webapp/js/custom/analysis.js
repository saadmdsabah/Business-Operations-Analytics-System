$(document).ready(function() {

	function showAlert() {
		$("#messageBox").css("visibility", "visible");
		setTimeout(function() {
			$("#messageBox").css("visibility", "hidden");
		}, 2000);
	}
	let chartInstance = null;
	$("#rangeForm").submit(function(e) {
		e.preventDefault();
		const from = $("#from").val();
		const to = $("#to").val();

		if (from === "" || to === "" || (Date.parse(from) > Date.parse(to))) {
			$("#alertBox").removeClass("alert-success alert-danger alert-warning alert-info");
			$("#alertBox").addClass("alert-danger");
			$("#messageBox span").text("Enter valid Range");
			showAlert();
			return;
		}

		const data = {
			from,
			to
		};
		const request = JSON.stringify(data);
		$.ajax({
			url: "dataforanalysis",
			method: "post",
			data: request,
			"contentType": "application/json",
			success: function(response) {
				if (response.dates === undefined) {
					$("#canvasDiv").hide();
					$("#alertBox").removeClass("alert-success alert-danger alert-warning alert-info");
					$("#alertBox").addClass("alert-info");
					$("#messageBox span").text("No Data Found for this range!");
					showAlert();
				} else {
					if (chartInstance) {
						chartInstance.destroy();
					}
					$("#canvasDiv").css("display", "flex");
					const ctx = $("#chart_demo")[0].getContext("2d");

					const labels = response.dates;

					const data = {
						labels: labels,
						datasets: [
							{
								label: "Revenue for the Range " + from + " to " + to,
								data: response.revenue,
								fill: false,
								borderColor: "rgb(75, 192, 192)",
								tension: 0.1,
							},
						],
					};

					const config = {
						type: "line",
						data: data,
						options: {
							plugins: {
								legend: {
									display: false,
								},
								title: {
									display: true,
									text: "Revenue for the Range " + from + " to " + to,
								},
							},
							responsive: false,
							maintainAspectRatio: false,
						},
					};

					chartInstance = new Chart(ctx, config);
				}
			},
			error: function() {
				$("#alertBox").removeClass("alert-success alert-danger alert-warning alert-info");
				$("#alertBox").addClass("alert-danger");
				$("#messageBox span").text("Error while fetching data");
				showAlert();
			}
		})
	})


	$("#getRevenueGraph").click(function() {
		$("#getRevenueGraph").removeClass("btn-dark");
		$("#getTopProducts").removeClass("btn-dark");

		$("#topProductsForm").hide();
		$("#topProductsDiv").hide();

		$("#getRevenueGraph").addClass("btn-dark");
		$("#rangeRevenueForm").show();
	})


	$("#getTopProducts").click(function() {
		$("#getRevenueGraph").removeClass("btn-dark");
		$("#getTopProducts").removeClass("btn-dark");

		$("#rangeRevenueForm").hide();
		$("#canvasDiv").hide();

		$("#getTopProducts").addClass("btn-dark");
		$("#topProductsForm").show();
	})

	let topChart = null;
	let bottomChart = null;

	$("#topProducts").submit(function(e) {
		e.preventDefault();
		const from = $("#fromTop").val();
		const to = $("#toTop").val();
		const window = $("#window").val();

		if (from === "" || parseInt(window) <= 0 || to === "" || (Date.parse(from) > Date.parse(to))) {
			$("#alertBox").removeClass("alert-success alert-danger alert-warning alert-info");
			$("#alertBox").addClass("alert-danger");
			$("#messageBox span").text("Enter valid Range");
			showAlert();
			return;
		}

		const data = {
			from,
			to,
			window
		};
		const request = JSON.stringify(data);
		$.ajax({
			url: "getTopProducts",
			method: "post",
			data: request,
			"contentType": "application/json",
			success: function(response) {
				if (response.topFiveItemsHsnCodes === undefined) {
					$("#topProductsDiv").hide();
					$("#alertBox").removeClass("alert-success alert-danger alert-warning alert-info");
					$("#alertBox").addClass("alert-info");
					$("#messageBox span").text("No Data Found for this range!");
					showAlert();
				} else {
					if (topChart && bottomChart) {
						topChart.destroy();
						bottomChart.destroy();
					}
					$("#topProductsDiv").css("display", "flex");
					const ctxTop = $("#chartTop")[0].getContext("2d");
					const ctxBottom = $("#chartBottom")[0].getContext("2d");

					const labelsTop = response.topFiveItemsHsnCodes;

					const labelsBottom = response.bottomFiveItemsHsnCodes;

					const dataTop = {
						labels: labelsTop,
						datasets: [
							{
								label: "Top Dataset",
								data: response.topFiveItemsQuantity,
								backgroundColor: [
									"rgba(75, 192, 192, 0.2)", // green,
								],
							},
						],
					};

					const dataBottom = {
						labels: labelsBottom,
						datasets: [
							{
								label: "Bottom Dataset",
								data: response.bottomFiveItemsQuantity,
								backgroundColor: [
									"rgba(255, 99, 132, 0.2)" //red,
								],
							},
						],
					};

					const configTop = {
						type: "bar",
						data: dataTop,
						options: {
							plugins: {
								legend: {
									display: false,
								},
								title: {
									display: true,
									text: "Top " + window + " Selling Products",
								},
							},
							scales: {
								y: {
									beginAtZero: true,
								},
							},
							responsive: false,
							maintainAspectRatio: false,
						},
					};

					const configBottom = {
						type: "bar",
						data: dataBottom,
						options: {
							plugins: {
								legend: {
									display: false,
								},
								title: {
									display: true,
									text: "Bottom " + window + " Selling Products",
								},
							},
							scales: {
								y: {
									beginAtZero: true,
								},
							},
							responsive: false,
							maintainAspectRatio: false,
						},
					};

					topChart = new Chart(ctxTop, configTop);
					bottomChart = new Chart(ctxBottom, configBottom);
				}
			},
			error: function() {
				$("#alertBox").removeClass("alert-success alert-danger alert-warning alert-info");
				$("#alertBox").addClass("alert-danger");
				$("#messageBox span").text("Error while fetching data");
				showAlert();
			}
		})
	})

	$("#logoutButton").click(function() {
		$.ajax({
			url: "logout",
			method: "post",
			success: function(response) {
				if (response === "success") {
					localStorage.clear();
					window.location.href = "login.jsp";
				} else {
					$("#alertBox").removeClass("alert-success alert-danger alert-warning alert-info");
					$("#alertBox").addClass("alert-danger");
					$("#messageBox span").text("Error while Logging Out, Please Try Again!");
					showAlert();
				}
			},
			error: function() {
				$("#alertBox").removeClass("alert-success alert-danger alert-warning alert-info");
				$("#alertBox").addClass("alert-danger");
				$("#messageBox span").text("Error while Logging Out, Please Try Again!");
				showAlert();
			}
		})
	})
})