$(document).ready(function() {

	const specialCharacters = [
		' ', '!', '"', '#', '$', '%', '&', "'", '(', ')',
		'*', '+', ',', '-', '.', '/', ':', ';', '<', '=',
		'>', '?', '@', '[', '\\', ']', '^', '_', '`', '{',
		'|', '}', '~'
	];


	$("#loginForm").submit(function(event) {
		event.preventDefault();
		const username = $("#floatingInput").val();
		const password = $("#floatingPassword").val();


		if (username === "" && password === "") {
			$("#incorrectPassUser").css("visibility", "hidden");
			$("#floatingInput").addClass("is-invalid");
			$("#floatingPassword").addClass("is-invalid");
			return;
		} else if (username === "") {
			$("#incorrectPassUser").css("visibility", "hidden");
			$("#floatingPassword").removeClass("is-invalid");
			$("#floatingInput").addClass("is-invalid");
			return;
		} else if (password === "") {
			$("#incorrectPassUser").css("visibility", "hidden");
			$("#floatingInput").removeClass("is-invalid");
			$("#floatingPassword").addClass("is-invalid");
			return;
		}

		for (const c of username) {
			if (specialCharacters.includes(c)) {
				$("#incorrectPassUser").css("visibility", "hidden");
				$("#floatingInput").addClass("is-invalid");
				return;
			}
		}

		for (const c of password) {
			if (c === " ") {
				$("#incorrectPassUser").css("visibility", "hidden");
				$("#floatingPassword").addClass("is-invalid");
				return;
			}
		}

		let form = new FormData(this);
		$("#floatingPassword").removeClass("is-invalid");
		$("#floatingInput").removeClass("is-invalid");


		$.ajax({
			url: "login",
			method: "post",
			data: form,
			xhrFields: { withCredentials: true },
			success: function(response) {
				if (response.status === "success") {
					window.location = "home.jsp";
				} else {
					$("#incorrectPassUser").css("visibility", "visible");
				}
			},
			contentType: false,
			processData: false
		})

	})
})