$(document).ready(function() {
	$('.yearpicker').yearpicker()

	function showAlert() {
		$("#messageBox").css("visibility", "visible");
		setTimeout(function() {
			$("#messageBox").css("visibility", "hidden");
		}, 2000);
	}



	$("#findById").click(function() {
		$("#findById").removeClass("btn-dark");
		$("#displayAll").removeClass("btn-dark");
		$("#findByName").removeClass("btn-dark");
		$("#findByRange").removeClass("btn-dark");

		$("#showAllRecords").hide();
		$("#updateSearchByIdDiv").hide();
		$("#searchByNameDiv").hide();
		$("#totalRevenueH1").hide();
		$("#showRecordRange").hide();

		$("#findById").addClass("btn-dark");
		$("#searchByIdDiv").show();
	})

	$("#findByRange").click(function() {
		$("#findById").removeClass("btn-dark");
		$("#displayAll").removeClass("btn-dark");
		$("#findByName").removeClass("btn-dark");
		$("#findByRange").removeClass("btn-dark");

		$("#showAllRecords").hide();
		$("#updateSearchByIdDiv").hide();
		$("#searchByNameDiv").hide();
		$("#totalRevenueH1").hide();
		$("#searchByIdDiv").hide();

		$("#findByRange").addClass("btn-dark");
		$("#showRecordRange").show();
	})

	$("#displayAll").click(function() {
		$("#findById").removeClass("btn-dark");
		$("#displayAll").removeClass("btn-dark");
		$("#findByName").removeClass("btn-dark");
		$("#findByRange").removeClass("btn-dark");

		$("#updateSearchByIdDiv").hide();
		$("#searchByIdDiv").hide();
		$("#searchByNameDiv").hide();
		$("#totalRevenueH1").hide();
		$("#showRecordRange").hide();

		$("#displayAll").addClass("btn-dark");
		$("#showAllRecords").show();
	})

	$("#findByName").click(function() {
		$("#findById").removeClass("btn-dark");
		$("#displayAll").removeClass("btn-dark");
		$("#findByName").removeClass("btn-dark");
		$("#findByRange").removeClass("btn-dark");

		$("#showAllRecords").hide();
		$("#searchByIdDiv").hide();
		$("#updateSearchByIdDiv").hide();
		$("#totalRevenueH1").hide();
		$("#showRecordRange").hide();

		$("#findByName").addClass("btn-dark");
		$("#searchByNameDiv").show();
	})



	$("#dateForm").submit((e) => {
		e.preventDefault();
		const timeline = $("#date").val();
		if (timeline === "") {
			$("#alertBox").removeClass("alert-success alert-danger alert-warning alert-info");
			$("#alertBox").addClass("alert-danger");
			$("#messageBox span").text("Enter valid Date");
			showAlert();
			return;
		}

		const data = {
			timeline
		}
		$.ajax({
			url: "revenue",
			method: "POST",
			contentType: "application/json",
			data: JSON.stringify(data),
			success: (response) => {
				$("#totalCost").text("");
				if (response === "-1") {
					$("#rupeeSymnol").hide();
					$("#textContent").text("No Data Found");
					$("#totalRevenueH1").show();
				} else {
					$("#textContent").text("The Revenue for the date " + timeline + " is ");
					$("#totalCost").text(response);
					$("#rupeeSymnol").show();
					$("#totalRevenueH1").show();
				}
			},
			error: () => {
				$("#alertBox").removeClass("alert-success alert-danger alert-warning alert-info");
				$("#alertBox").addClass("alert-danger");
				$("#messageBox span").text("Error while fetching result!");
				showAlert();
			}
		});
	})

	$("#monthForm").submit((e) => {
		e.preventDefault();
		const timeline = $("#month").val();
		if (timeline === "") {
			$("#alertBox").removeClass("alert-success alert-danger alert-warning alert-info");
			$("#alertBox").addClass("alert-danger");
			$("#messageBox span").text("Enter valid Month");
			showAlert();
			return;
		}

		const data = {
			timeline
		}
		$.ajax({
			url: "revenue",
			method: "POST",
			contentType: "application/json",
			data: JSON.stringify(data),
			success: (response) => {
				$("#totalCost").text("");
				if (response === "-1") {
					$("#rupeeSymnol").hide();
					$("#textContent").text("No Data Found");
					$("#totalRevenueH1").show();
				} else {
					$("#textContent").text("The Revenue for the month " + timeline + " is ");
					$("#totalCost").text(response);
					$("#rupeeSymnol").show();
					$("#totalRevenueH1").show();
				}
			},
			error: () => {
				$("#alertBox").removeClass("alert-success alert-danger alert-warning alert-info");
				$("#alertBox").addClass("alert-danger");
				$("#messageBox span").text("Error while fetching result!");
				showAlert();
			}
		});
	})


	$("#yearForm").submit((e) => {
		e.preventDefault();
		const timeline = $("#year").val();
		if (timeline === "") {
			$("#alertBox").removeClass("alert-success alert-danger alert-warning alert-info");
			$("#alertBox").addClass("alert-danger");
			$("#messageBox span").text("Enter valid Year");
			showAlert();
			return;
		}

		const data = {
			timeline
		}
		$.ajax({
			url: "revenue",
			method: "POST",
			contentType: "application/json",
			data: JSON.stringify(data),
			success: (response) => {
				$("#totalCost").text("");
				if (response === "-1") {
					$("#rupeeSymnol").hide();
					$("#textContent").text("No Data Found");
					$("#totalRevenueH1").show();
				} else {
					$("#textContent").text("The Revenue for the year " + timeline + " is ");
					$("#totalCost").text(response);
					$("#rupeeSymnol").show();
					$("#totalRevenueH1").show();
				}
			},
			error: () => {
				$("#alertBox").removeClass("alert-success alert-danger alert-warning alert-info");
				$("#alertBox").addClass("alert-danger");
				$("#messageBox span").text("Error while fetching result!");
				showAlert();
			}
		});
	})

	$("#rangeForm").submit((e) => {
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
		}
		$.ajax({
			url: "revenueRange",
			method: "POST",
			contentType: "application/json",
			data: JSON.stringify(data),
			success: (response) => {
				$("#totalCost").text("");
				if (response === "-1") {
					$("#rupeeSymnol").hide();
					$("#textContent").text("No Data Found for this Range");
					$("#totalRevenueH1").show();
				} else {
					$("#textContent").text("The Revenue from " + from + " to " + to + " is ");
					$("#totalCost").text(response);
					$("#rupeeSymnol").show();
					$("#totalRevenueH1").show();
				}
			},
			error: () => {
				$("#alertBox").removeClass("alert-success alert-danger alert-warning alert-info");
				$("#alertBox").addClass("alert-danger");
				$("#messageBox span").text("Error while fetching result!");
				showAlert();
			}
		});
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