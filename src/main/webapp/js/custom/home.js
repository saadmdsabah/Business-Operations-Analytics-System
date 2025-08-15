$(document).ready(function() {

	let items = [];
	let id = null;

	if (localStorage.getItem("items") === null) {
		$.ajax({
			url: "getInvoiceItems",
			method: "post",
			success: function(response) {
				localStorage.setItem("items", JSON.stringify(response));
				items = response;
			},
			error: function() {
				$("#alertBox").removeClass("alert-success alert-danger alert-warning alert-info");
				$("#alertBox").addClass("alert-danger");
				$("#messageBox span").text("Error while Loading Page, Please Refresh This Page!");
				showAlert();
			},
			contentType: false,
			processData: false
		})
	} else {
		items = JSON.parse(localStorage.getItem("items"));
	}

	if (localStorage.getItem("id") === null) {
		$.ajax({
			url: "getInvoiceId",
			method: "get",
			success: function(response) {
				localStorage.setItem("id", response);
				id = response;
				$("#idDisplay span").text("BZ00" + id);
				$("main").removeClass("d-none");
				$("#spinnerDiv").addClass("d-none");
			},
			error: function() {
				$("#alertBox").removeClass("alert-success alert-danger alert-warning alert-info");
				$("#alertBox").addClass("alert-danger");
				$("#messageBox span").text("Error while Loading Page, Please Refresh This Page!");
				showAlert();
			}
		})
	} else {
		id = localStorage.getItem("id");
		$("main").removeClass("d-none");
		$("#spinnerDiv").addClass("d-none");
		$("#idDisplay span").text("BZ00" + id);
	}


	$("#itemID").on("input", function() {
		$("#itemID").removeClass("is-invalid");
		items = JSON.parse(localStorage.getItem("items"));

		let temp = [];
		const val = $("#itemID").val();

		if (val === '') {
			$("#listItems").hide();
			return;
		}
		$("#listItems").empty();

		for (const item of items) {
			//changes made here
			if (item.itemName.toLowerCase().includes(val.toLowerCase())) {
				//changes made here
				temp.push(item.itemName);
			}
		}

		temp.forEach(function(item) {
			const li = $("<li>").text(item);
			$("#listItems").append(li);
		})
		$("#listItems").show();
	});

	$("#itemID").blur(function() {
		setTimeout(() => {
			$("#listItems").hide();
		}, 100);
	});

	$("#listItems").on("mousedown", "li", function() {
		const value = $(this).text();
		$("#itemID").val(value);
		$("#listItems").hide();
	});

	$("#discount").focus(function() {
		$("#discount").removeClass("is-invalid");
	})

	$("#quantity").focus(function() {
		$("#quantity").removeClass("is-invalid");
	})

	$("#addRow").click(function(event) {
		event.preventDefault();
		const id = $("#itemID").val();
		const discount = $("#discount").val() || 0;
		const quantity = $("#quantity").val() || 0;

		if (id === '') {
			$("#itemID").addClass("is-invalid");
			return;
		} else if (discount < 0 && quantity <= 0) {
			$("#discount").addClass("is-invalid");
			$("#quantity").addClass("is-invalid");
			return;
		} else if (discount < 0) {
			$("#discount").addClass("is-invalid");
			return;
		} else if (quantity <= 0) {
			$("#quantity").addClass("is-invalid");
			return;
		}

		items = JSON.parse(localStorage.getItem("items"));

		let item = null;

		for (const realItem of items) {
			//changes made here
			if (realItem.itemName === id) {
				item = realItem;
				break;
			}
		}

		if (item === null) {
			$("#itemID").addClass("is-invalid");
			return;
		}
		if (discount > item.itemRate * quantity) {
			$("#alertBox").removeClass("alert-success alert-danger alert-warning alert-info");
			$("#alertBox").addClass("alert-danger");
			$("#messageBox span").text("The discount cannot exceed the sale price.");

			showAlert();
			return;
		}

		let totalQuantity = parseFloat(quantity) || 0;
		$("#tableBody tr").each(function() {
			let count = 0;
			let currentId = null;
			$(this).find("td").each(function() {
				if (count === 0) {
					currentId = $(this).text();
				} else if (count === 2) {
					const quantityText = $(this).text();
					const quantityValue = parseFloat(quantityText) || 0;
					//changes made here
					if (currentId === item.itemCode) {
						totalQuantity += quantityValue;
					}
				}
				count++;
			})
		})

		if (totalQuantity > item.itemQuantity) {
			$("#alertBox").removeClass("alert-success alert-danger alert-warning alert-info");
			$("#alertBox").addClass("alert-danger");
			$("#messageBox span").text("Cannot add row — stock is insufficient.");
			showAlert();
			return;
		}

		//changes made here
		$("#itemID").val("");
		$("#quantity").val("");
		$("#discount").val("");

		$("#tableBody").append(
			"<tr> <td>" + item.itemCode + "</td>" + "<td>" + item.itemName + "</td>" + "<td>" + quantity + "</td>" + "<td>" + item.itemRate + "</td>" + "<td>" + discount + "</td>" + "<td>" + (quantity * item.itemRate - discount) + "</td> </tr>"
		);

		//changes made here
		const currentTotalVal = parseInt($("#grandTotalTd").text()) || 0;
		$("#grandTotalTd").text(currentTotalVal + (quantity * item.itemRate) - discount);

		toggleRemoveButton();
		toggleSubmitButton();
		toggleTableFooter();
	})

	$("#messageCloseButton").click(function() {
		$("#messageBox").css("visibility", "hidden");
	})

	function showAlert() {
		$("#messageBox").css("visibility", "visible");
		setTimeout(function() {
			$("#messageBox").css("visibility", "hidden");
		}, 2000);
	}

	function toggleRemoveButton() {
		if ($("#tableBody tr").length > 0) {
			$("#removeRow").css("visibility", "visible");
		} else {
			$("#removeRow").css("visibility", "hidden");
		}
	}

	//changes made here
	function toggleTableFooter() {
		if ($("#tableBody tr").length > 0) {
			$("#tableFooter").show();
		} else {
			$("#tableFooter").hide();
		}
	}

	function toggleSubmitButton() {
		if ($("#tableBody tr").length > 0) {
			$("#submitRowsToDb").show();
		} else {
			$("#submitRowsToDb").hide();
		}
	}

	$("#removeRow").click(function() {
		//changes made here
		const lastCost = parseFloat($("#tableBody").children().last().children().last().text()) || 0;
		const currentTotal = parseFloat($("#grandTotalTd").text()) || 0;
		$("#grandTotalTd").text(currentTotal - lastCost);
		$("#tableBody").children().last().remove();
		toggleRemoveButton();
		toggleSubmitButton();
		//changes made here
		toggleTableFooter();
	})

	$("#submitRowsToDb").click(function() {
		const itemsObject = [];
		let totalDiscount = 0;
		let totalMrp = 0;
		let totalCost = 0;
		const invoiceId = "BZ00" + localStorage.getItem("id");
		const currentCount = parseInt(localStorage.getItem("id"));

		$("#tableBody tr").each(function() {
			const product = {};
			let count = 0;

			$(this).find("td").each(function() {
				if (count === 0) {
					product["itemCode"] = $(this).text();
				} else if (count === 1) {
					product["name"] = $(this).text();
				} else if (count === 2) {
					const text = $(this).text();
					const value = parseFloat(text) || 0;
					product["itemQuantity"] = value;
				} else if (count === 3) {
					const text = $(this).text();
					const value = parseFloat(text) || 0;
					product["itemMrp"] = value;
					totalMrp += value * product["itemQuantity"];
				} else if (count === 4) {
					const text = $(this).text();
					const value = parseFloat(text) || 0;
					product["itemDiscount"] = value;
					totalDiscount += value;
				} else if (count === 5) {
					const text = $(this).text();
					const value = parseFloat(text) || 0;
					totalCost += value;
				}
				count++;
			});

			itemsObject.push(product);
		});

		const discountedValue = getDiscount();
		const totalCostBeforeDiscount = calTotalCost();

		if (discountedValue !== -1 && discountedValue <= totalCostBeforeDiscount) {
			totalDiscount += discountedValue;
			totalCost -= discountedValue;

			const newValueOfId = currentCount + 1;
			const submitObject = {
				value: newValueOfId,
				order: {
					invoiceId: invoiceId,
					totalDiscount: totalDiscount,
					totalMrp: totalMrp,
					totalCost: totalCost,
					orderItems: itemsObject
				}
			}
			$("#submitSpinner").css("visibility", "visible");
			$("#removeRow").prop("disabled", true);
			$("#submitRowsToDb").prop("disabled", true);
			$("#addRow").prop("disabled", true);

			$.ajax({
				url: "addPurchase",
				method: "post",
				data: JSON.stringify(submitObject),
				contentType: "application/json",
				success: function(response) {
					if (response === "success") {
						localStorage.setItem("id", currentCount + 1);
						$("#idDisplay span").text("BZ00" + (currentCount + 1));
						$("#alertBox").removeClass("alert-success alert-danger alert-warning alert-info");
						$("#alertBox").addClass("alert-success");
						$("#messageBox span").text("Order added Successfully!");
						showAlert();

						//changes made here
						$("#tableBody").empty();
						toggleRemoveButton();
						toggleSubmitButton();
						toggleTableFooter();
						$("#submitSpinner").css("visibility", "hidden");
						$("#removeRow").prop("disabled", false);
						$("#submitRowsToDb").prop("disabled", false);
						$("#addRow").prop("disabled", false);

						let items = JSON.parse(localStorage.getItem("items"));

						itemsObject.forEach((i) => {
							const match = items.find(obj => obj.itemCode === i.itemCode);
							if (match) {
								match.itemQuantity -= i.itemQuantity;
							}
						});

						localStorage.setItem("items", JSON.stringify(items));
						$("#grandTotalTd").text("");
					} else {
						$("#alertBox").removeClass("alert-success alert-danger alert-warning alert-info");
						$("#alertBox").addClass("alert-danger");
						$("#messageBox span").text("Error while Placing Order, Please Try Again Later!");
						showAlert();

						//changes made here
						$("#submitSpinner").css("visibility", "hidden");
						$("#removeRow").prop("disabled", false);
						$("#submitRowsToDb").prop("disabled", false);
						$("#addRow").prop("disabled", false);
					}
				},
				error: function() {
					$("#alertBox").removeClass("alert-success alert-danger alert-warning alert-info");
					$("#alertBox").addClass("alert-danger");
					$("#messageBox span").text("Error while Placing Order, Please Try Again Later!");
					showAlert();

					//changes made here
					$("#submitSpinner").css("visibility", "hidden");
					$("#removeRow").prop("disabled", false);
					$("#submitRowsToDb").prop("disabled", false);
					$("#addRow").prop("disabled", false);
				}
			});
		} else {
			$("#alertBox").removeClass("alert-success alert-danger alert-warning alert-info");
			$("#alertBox").addClass("alert-danger");
			$("#messageBox span").text("Invalid Grand Discount");
			showAlert();
		}
	});

	function calTotalCost() {
		let totalCost = 0;
		$("#tableBody tr").each(function() {
			let count = 0;

			$(this).find("td").each(function() {
				if (count === 5) {
					const text = $(this).text();
					const value = parseFloat(text) || 0;
					totalCost += value;
				}
				count++;
			});
		});
		return totalCost;
	}

	function getDiscount() {
		let totalDiscountOnPurchase = new String($("#totalDiscount").val() || 0);
		const regex = /^\d+%?$/;
		let discountedValue = 0;
		if (regex.test(totalDiscountOnPurchase)) {
			const totalCost = calTotalCost();
			if (totalDiscountOnPurchase.includes("%")) {
				const discountPercent = parseFloat(totalDiscountOnPurchase.replace("%", ""));
				discountedValue = (totalCost / 100) * discountPercent;
			} else {
				discountedValue = parseFloat(totalDiscountOnPurchase);
			}
		} else {
			return -1;
		}
		return discountedValue;
	}

	$("#discountApplyBtn").click(function() {
		const discountedValue = getDiscount();
		const totalCost = calTotalCost();

		if (discountedValue !== -1 && discountedValue <= totalCost) {
			$("#grandTotalTd").text(totalCost - discountedValue);
		}
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
});
