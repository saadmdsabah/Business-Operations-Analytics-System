$(document).ready(function() {
	const items = JSON.parse(localStorage.getItem("items"));


	let outOfStock = items.filter(item => item.itemQuantity === 0);

	if (outOfStock.length === 0) {
		$("#showAllRecords").hide();
		$("#hOneId").show();
		$("#hOneId h1").text("No records found.");
	} else {
		$("#hOneId").hide();
		$("#showAllRecords").show();
		outOfStock.forEach(item => {
			$("#tableBodyPagination").append(
				"<tr><td>" + item.itemCode + "</td>" + "<td>" + item.itemName + "</td>" + "<td>" + item.itemQuantity + "</td>" + "<td>" + item.itemRate + "</td></tr>"
			);
		})
	}

	//changes made here
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