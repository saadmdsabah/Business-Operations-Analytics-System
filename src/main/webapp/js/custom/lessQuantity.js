$(document).ready(function() {
	const items = JSON.parse(localStorage.getItem("items"));
	let outOfStock = items.filter(item => item.itemQuantity <= 5);
	if (outOfStock.length === 0) {
		$("#showAllRecords").hide();
		$("#hOneId").show();
		$("#hOneId h1").text("No records found.");
	}

	function addPageLinks() {
		const totalPages = Math.ceil(outOfStock.length / 15);
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

		const pageSize = 15;
		const startingIndex = (val - 1) * pageSize;
		const endingIndex = startingIndex + pageSize;
		const pageinationArray = outOfStock.slice(startingIndex, endingIndex);

		for (const item of pageinationArray) {
			$("#tableBodyPagination").append(
				"<tr><td>" + item.itemCode + "</td>" + "<td>" + item.itemName + "</td>" + "<td>" + item.itemQuantity + "</td>" + "<td>" + item.itemRate + "</td>"
			);
		}
	}
	addPageData(1);

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