$(document).ready(function() {

	let items = [];

	function addItemsToLocalStorage() {
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
	}
	addItemsToLocalStorage();

	function addPageLinks() {
		items = JSON.parse(localStorage.getItem("items"));

		const totalPages = Math.ceil(items.length / 15);
		for (let i = 1; i <= totalPages; i++) {
			if (i === 1) {
				$("#pagesDiv").append(
					"<li class='page-item active pageNumber' data-value=" + i + "><div class='page-link' style='cursor: pointer;'>" + i + "</div></li>"
				);
			} else {
				$("#pagesDiv").append(
					"<li class='page-item pageNumber' data-value=" + i + "><div class='page-link' style='cursor: pointer;'>" + i + "</div></li>"
				);
			}
		}
	}
	addPageLinks();

	function addPageData(val) {
		$("#tableBodyPagination").empty();
		items = JSON.parse(localStorage.getItem("items"));
		const pageSize = 15;

		const startingIndex = (val - 1) * pageSize;
		const endingIndex = startingIndex + pageSize;

		const pageinationArray = items.slice(startingIndex, endingIndex);

		for (const item of pageinationArray) {
			$("#tableBodyPagination").append(
				"<tr><td>" + item.itemCode + "</td>" + "<td>" + item.itemName + "</td>" + "<td>" + item.itemQuantity + "</td>" + "<td>" + item.itemRate + "</td>"
			);
		}
	}
	addPageData(1);


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
			if (item.itemCode.toLowerCase().includes(val.toLowerCase())) {
				temp.push(item.itemCode);
			}
		}

		temp.forEach(function(item) {
			const li = $("<li>").text(item);
			$("#listItems").append(li);
		})
		$("#listItems").show();
	});

	$("#messageCloseButton").click(function() {
		$("#messageBox").css("visibility", "hidden");
	})

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

	$("#searchRecord").click(function(event) {
		event.preventDefault();

		let id = $("#itemID").val();
		let item = null;
		if (id === '') {
			$("#itemID").addClass("is-invalid");
			return;
		}

		items = JSON.parse(localStorage.getItem("items"));

		for (const i of items) {
			if (i.itemCode === id) {
				item = i;
				break;
			}
		}

		if (item === null) {
			$("#itemID").addClass("is-invalid");
			return;
		}

		$("#tableBody").children().last().remove();

		$("#tableBody").append(
			"<tr> <td>" + item.itemCode + "</td>" + "<td>" + item.itemName + "</td>" + "<td>" + item.itemQuantity + "</td>" + "<td>" + item.itemRate + "</td>"
		);
		$("#itemID").val("");

	})

	$("#findById").click(function() {
		$("#findById").removeClass("btn-dark");
		$("#addRecord").removeClass("btn-dark");
		$("#updateRecord").removeClass("btn-dark");
		$("#displayAll").removeClass("btn-dark");
		$("#findByName").removeClass("btn-dark");

		$("#showAllRecords").hide();
		$("#addRecordDiv").hide();
		$("#updateSearchByIdDiv").hide();
		$("#searchByNameDiv").hide();

		$("#findById").addClass("btn-dark");
		$("#searchByIdDiv").show();
	})

	$("#addRecord").click(function() {
		$("#findById").removeClass("btn-dark");
		$("#addRecord").removeClass("btn-dark");
		$("#updateRecord").removeClass("btn-dark");
		$("#displayAll").removeClass("btn-dark");
		$("#findByName").removeClass("btn-dark");

		$("#showAllRecords").hide();
		$("#searchByIdDiv").hide();
		$("#updateSearchByIdDiv").hide();
		$("#searchByNameDiv").hide();

		$("#addRecord").addClass("btn-dark");
		$("#addRecordDiv").show();
	})

	$("#updateRecord").click(function() {
		$("#findById").removeClass("btn-dark");
		$("#addRecord").removeClass("btn-dark");
		$("#updateRecord").removeClass("btn-dark");
		$("#displayAll").removeClass("btn-dark");
		$("#findByName").removeClass("btn-dark");

		$("#showAllRecords").hide();
		$("#addRecordDiv").hide();
		$("#searchByIdDiv").hide();
		$("#searchByNameDiv").hide();

		$("#updateRecord").addClass("btn-dark");
		$("#updateSearchByIdDiv").show();
	})

	$("#displayAll").click(function() {
		$("#findById").removeClass("btn-dark");
		$("#addRecord").removeClass("btn-dark");
		$("#updateRecord").removeClass("btn-dark");
		$("#displayAll").removeClass("btn-dark");
		$("#findByName").removeClass("btn-dark");

		$("#updateSearchByIdDiv").hide();
		$("#searchByIdDiv").hide();
		$("#addRecordDiv").hide();
		$("#searchByNameDiv").hide();

		$("#displayAll").addClass("btn-dark");
		$("#showAllRecords").show();
	})

	//changes made here
	$("#findByName").click(function() {
		$("#findById").removeClass("btn-dark");
		$("#addRecord").removeClass("btn-dark");
		$("#updateRecord").removeClass("btn-dark");
		$("#displayAll").removeClass("btn-dark");
		$("#findByName").removeClass("btn-dark");

		$("#showAllRecords").hide();
		$("#searchByIdDiv").hide();
		$("#addRecordDiv").hide();
		$("#updateSearchByIdDiv").hide();

		$("#findByName").addClass("btn-dark");
		$("#searchByNameDiv").show();
	})



	function showAlert() {
		$("#messageBox").css("visibility", "visible");
		setTimeout(function() {
			$("#messageBox").css("visibility", "hidden");
		}, 2000);
	}

	$("#newRecordId").focus(function() {
		$("#newRecordId").removeClass("is-invalid");
	})

	$("#newRecordName").focus(function() {
		$("#newRecordName").removeClass("is-invalid");
	})

	$("#newRecordQuantity").focus(function() {
		$("#newRecordQuantity").removeClass("is-invalid");
	})

	$("#newRecordPrice").focus(function() {
		$("#newRecordPrice").removeClass("is-invalid");
	})


	$("#addRecordForm").submit(function(event) {
		event.preventDefault();
		const id = $("#newRecordId").val();
		const name = $("#newRecordName").val();
		const quantity = $("#newRecordQuantity").val() || 0;
		const price = $("#newRecordPrice").val() || 0;

		if (id === '') {
			$("#newRecordId").addClass("is-invalid");
			return;
		} else if (name === '') {
			$("#newRecordName").addClass("is-invalid");
			return;
		} else if (quantity === '' || quantity <= 0) {
			$("#newRecordQuantity").addClass("is-invalid");
			return;
		} else if (price === '' || price <= 0) {
			$("#newRecordPrice").addClass("is-invalid");
			return;
		}

		items = JSON.parse(localStorage.getItem("items"));

		for (const i of items) {
			if (i.itemCode === id) {
				$("#newRecordId").addClass("is-invalid");
				$("#messageText").text("HSN Code already Exists!");
				$("#alertBox").addClass("alert-danger");
				showAlert();
				return;
			}
		}

		const newItem = {
			itemCode: id,
			itemName: name,
			itemQuantity: quantity,
			itemRate: price
		};

		const form = new FormData(this);
		$("#submitSpinner").removeClass("d-none");
		$("#newRecordButton").prop("disabled", true);
		$.ajax({
			url: "addPurchasedItem",
			method: "post",
			data: form,
			success: function(response) {
				if (response === "success") {
					$("#submitSpinner").addClass("d-none");
					$("#newRecordId").val("");
					$("#newRecordName").val("");
					$("#newRecordQuantity").val("");
					$("#newRecordPrice").val("");
					$("#newRecordButton").prop("disabled", false);

					$("#alertBox").removeClass("alert-success alert-danger alert-warning alert-info");
					$("#messageText").text("Successfully Added record!");
					$("#alertBox").addClass("alert-success");
					showAlert();
					items.push(newItem);
					localStorage.setItem("items", JSON.stringify(items));
				} else {
					$("#submitSpinner").addClass("d-none");
					$("#newRecordButton").prop("disabled", false);

					$("#alertBox").removeClass("alert-success alert-danger alert-warning alert-info");
					$("#messageText").text("Error while adding record, Try again later!");
					$("#alertBox").addClass("alert-danger");
					showAlert();
				}
			},
			error: function() {
				$("#submitSpinner").addClass("d-none");
				$("#newRecordButton").prop("disabled", false);

				$("#alertBox").removeClass("alert-success alert-danger alert-warning alert-info");
				$("#messageText").text("Error while adding record, Try again later!");
				$("#alertBox").addClass("alert-danger");
				showAlert();
			},
			contentType: false,
			processData: false
		})
	})

	$("#itemIDUpdate").on("input", function() {
		$("#itemIDUpdate").removeClass("is-invalid");
		items = JSON.parse(localStorage.getItem("items"));

		let temp = [];
		const val = $("#itemIDUpdate").val();

		if (val === '') {
			$("#listItemsUpdate").hide();
			return;
		}
		$("#listItemsUpdate").empty();

		//changes made here
		for (const item of items) {
			if (item.itemName.toLowerCase().includes(val.toLowerCase())) {
				temp.push(item.itemName);
			}
		}

		temp.forEach(function(item) {
			const li = $("<li>").text(item);
			$("#listItemsUpdate").append(li);
		})
		$("#listItemsUpdate").show();
	});

	$("#itemIDUpdate").blur(function() {
		setTimeout(() => {
			$("#listItemsUpdate").hide();
		}, 100);
	});

	$("#listItemsUpdate").on("mousedown", "li", function() {
		const value = $(this).text();
		$("#itemIDUpdate").val(value);
		$("#listItemsUpdate").hide();
	});

	$("#searchRecordUpdate").click(function(event) {
		event.preventDefault();

		const id = $("#itemIDUpdate").val();

		if (id === '') {
			$("#itemIDUpdate").addClass("is-invalid");
			return;
		}
		let item = null
		items = JSON.parse(localStorage.getItem("items"));

		//changes made here
		for (const i of items) {
			if (i.itemName === id) {
				item = i;
				break;
			}
		}

		if (item === null) {
			$("#itemIDUpdate").addClass("is-invalid");
			return;
		}
		const code = item.itemCode;
		const name = item.itemName;
		const quantity = item.itemQuantity;
		const rate = item.itemRate;

		$("#updateRecordId").val(code);
		$("#updateRecordName").val(name);
		$("#updateRecordQuantity").val(quantity);
		$("#updateRecordPrice").val(rate);

		$("#updateParameters").css("visibility", "visible");
	})

	$("#updateRecordName").focus(function() {
		$("#updateRecordName").removeClass("is-invalid");
	})

	$("#updateRecordQuantity").focus(function() {
		$("#updateRecordQuantity").removeClass("is-invalid");
	})

	$("#updateRecordPrice").focus(function() {
		$("#updateRecordPrice").removeClass("is-invalid");
	})

	$("#updateRecordForm").submit(function(event) {
		event.preventDefault();
		const id = $("#updateRecordId").val();
		const name = $("#updateRecordName").val();
		const quantity = $("#updateRecordQuantity").val();
		const price = $("#updateRecordPrice").val();

		if (name === '') {
			$("#updateRecordName").addClass("is-invalid");
			return;
		} else if (quantity <= 0) {
			$("#updateRecordQuantity").addClass("is-invalid");
			return;
		} else if (price <= 0) {
			$("#updateRecordPrice").addClass("is-invalid");
			return;
		}

		const items = JSON.parse(localStorage.getItem("items"));
		const updatedItem = {
			itemCode: id,
			itemName: name,
			itemQuantity: quantity,
			itemRate: price
		}

		const form = new FormData(this);
		$("#submitSpinner").removeClass("d-none");
		$("#updateButtonToDb").prop("disabled", true);
		$("#searchRecordUpdate").prop("disabled", true);

		$.ajax({
			url: "updatePurchasedItem",
			method: "post",
			data: form,
			success: function(response) {
				if (response === "success") {
					$("#submitSpinner").addClass("d-none");
					$("#updateParameters").css("visibility", "hidden");
					$("#itemIDUpdate").val("");
					$("#updateButtonToDb").prop("disabled", false);
					$("#searchRecordUpdate").prop("disabled", false);

					$("#alertBox").removeClass("alert-success alert-danger alert-warning alert-info");
					$("#messageText").text("Successfully Updated record!");
					$("#alertBox").addClass("alert-success");
					showAlert();
					const newItems = items.filter(x => x.itemCode != id);
					newItems.push(updatedItem);

					localStorage.setItem("items", JSON.stringify(newItems));
				} else {
					$("#submitSpinner").addClass("d-none");
					$("#updateButtonToDb").prop("disabled", false);
					$("#searchRecordUpdate").prop("disabled", false);

					$("#alertBox").removeClass("alert-success alert-danger alert-warning alert-info");
					$("#messageText").text("Error while updating record, Try again later!");
					$("#alertBox").addClass("alert-danger");
					showAlert();
				}
			},
			error: function() {
				$("#submitSpinner").addClass("d-none");
				$("#updateButtonToDb").prop("disabled", false);
				$("#searchRecordUpdate").prop("disabled", false);

				$("#alertBox").removeClass("alert-success alert-danger alert-warning alert-info");
				$("#messageText").text("Error while updating record, Try again later!");
				$("#alertBox").addClass("alert-danger");
				showAlert();
			},
			contentType: false,
			processData: false
		})
	})

	$(document).on("click", ".pageNumber", function() {
		$(".pageNumber").removeClass("active");
		$(this).addClass("active");
		addPageData($(this).data("value"));
	});


	$(document).on("click", ".next", function() {
		const current = $(".pageNumber.active");
		const next = current.next(".pageNumber");
		if (next.length) {
			current.removeClass("active");
			next.addClass("active");
			addPageData(next.data("value"));
		}
	})

	$(document).on("click", ".prev", function() {
		const current = $(".pageNumber.active");
		const prev = current.prev(".pageNumber");
		if (prev.length) {
			current.removeClass("active");
			prev.addClass("active");
			addPageData(prev.data("value"));
		}
	})


	//changes made here
	$("#itemName").on("input", function() {
		$("#itemName").removeClass("is-invalid");
		items = JSON.parse(localStorage.getItem("items"));

		let temp = [];
		const val = $("#itemName").val();

		if (val === '') {
			$("#listItemsNames").hide();
			return;
		}
		$("#listItemsNames").empty();

		for (const item of items) {
			if (item.itemName.toLowerCase().includes(val.toLowerCase())) {
				temp.push(item.itemName);
			}
		}

		temp.forEach(function(item) {
			const li = $("<li>").text(item);
			$("#listItemsNames").append(li);
		})
		$("#listItemsNames").show();
	});

	$("#itemName").blur(function() {
		setTimeout(() => {
			$("#listItemsNames").hide();
		}, 100);
	});

	$("#listItemsNames").on("mousedown", "li", function() {
		const value = $(this).text();
		$("#itemName").val(value);
		$("#listItemsNames").hide();
	});

	$("#searchRecordName").click(function(event) {
		event.preventDefault();

		let id = $("#itemName").val();
		let item = null;
		if (id === '') {
			$("#itemName").addClass("is-invalid");
			return;
		}

		items = JSON.parse(localStorage.getItem("items"));

		for (const i of items) {
			if (i.itemName === id) {
				item = i;
				break;
			}
		}

		if (item === null) {
			$("#itemName").addClass("is-invalid");
			return;
		}

		$("#tableBodyNames").children().last().remove();

		$("#tableBodyNames").append(
			"<tr> <td>" + item.itemCode + "</td>" + "<td>" + item.itemName + "</td>" + "<td>" + item.itemQuantity + "</td>" + "<td>" + item.itemRate + "</td>"
		);
		$("#itemName").val("");

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