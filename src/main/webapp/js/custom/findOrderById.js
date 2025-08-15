$(document).ready(function() {
	function showAlert() {
		$("#messageBox").css("visibility", "visible");
		setTimeout(function() {
			$("#messageBox").css("visibility", "hidden");
		}, 2000);
	}

	$("#itemID").focus(function() {
		$("#itemID").removeClass("is-invalid");
	})

	$("#searchRecord").click(function(event) {
		event.preventDefault();
		const id = $("#itemID").val();
		if (id === "" || !id.startsWith("BZ00")) {
			$("#itemID").addClass("is-invalid");
			return;
		} else {
			$("#submitSpinner").removeClass("d-none");
			$("#searchRecord").prop("disabled", true);
			$.ajax({
				url: "getOrderById",
				method: "post",
				data: JSON.stringify({ id }),
				contentType: "application/json",
				success: function(response) {
					if (response === null) {
						console.log(response);
						$("#submitSpinner").addClass("d-none");
						$("#searchRecord").prop("disabled", false);
						$("#alertBox").removeClass("alert-success alert-danger alert-warning alert-info");
						$("#alertBox").addClass("alert-danger");
						$("#messageBox span").text("No Order with Order ID: " + id + " found!");
						showAlert();
					} else {
						$("#submitSpinner").addClass("d-none");
						$("#searchRecord").prop("disabled", false);
						$("#contentDiv").show();
						$("#invoiceId").text(response.invoiceId);
						$("#createdAt").text(response.createdAt);
						$("#totalDiscount").text(response.totalDiscount);
						$("#totalMrp").text(response.totalMrp);
						$("#totalCost").text(response.totalCost);
						const items = JSON.parse(localStorage.getItem("items"));
						$("#tableBody").empty();
						response.orderItems.forEach(item => {
							const correspondingItem = items.find(x => x.itemCode === item.itemCode);
							$("#tableBody").append(
								"<tr><td>" + item.itemCode + "</td>" + "<td>" + correspondingItem.itemName + "</td>" + "<td>" + item.itemQuantity + "</td>" + "<td>" + item.itemMrp + "</td>" + "<td>" + item.itemDiscount + "</td>" + "<td>" + ((parseInt(item.itemQuantity) * parseFloat(item.itemMrp)) - parseFloat(item.itemDiscount)) + "</td></tr>"
							);
						})
						$("#itemID").val("");
					}
				},
				error: function() {
					$("#submitSpinner").addClass("d-none");
					$("#searchRecord").prop("disabled", false);
					$("#alertBox").removeClass("alert-success alert-danger alert-warning alert-info");
					$("#alertBox").addClass("alert-danger");
					$("#messageBox span").text("Error while fetching records, Please Try Again Later!");
					showAlert();
				}
			})
		}
	})

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