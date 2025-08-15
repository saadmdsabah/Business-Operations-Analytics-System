<%@ page session="false" %>
<!DOCTYPE html>
<html class="h-100">
<head>
	<style>
		@font-face {
		  font-family: "customBoldFont";
		  src: url("css/googlefonts/Inter/Inter_18pt-Bold.ttf") format("truetype");
		  font-style: normal;
		}
		nav{
			font-family: "customBoldFont", sans-serif;
		}
	</style>
</head>
<body>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark fs-5">
  <div class="container-fluid">
    <a class="navbar-brand fs-4" href="home.jsp">Biznila</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item mx-2">
          <a class="nav-link" aria-current="page" href="home.jsp">Invoice</a>
        </li>
        <li class="nav-item mx-2">
          <a class="nav-link" href="purchased.jsp">Stock Purchases</a>
        </li>
        <li class="nav-item mx-2">
          <a class="nav-link" href="outOfStock.jsp">Out of Stock</a>
        </li>
        <li class="nav-item mx-2">
          <a class="nav-link" href="lessQuantity.jsp">Low Stock</a>
        </li>
        <li class="nav-item mx-2">
          <a class="nav-link" href="findOrderById.jsp">Find Order</a>
        </li>
        <li class="nav-item mx-2">
          <a class="nav-link" href="revenue.jsp">Revenue</a>
        </li>
        <li class="nav-item mx-2">
          <a class="nav-link" href="analysis.jsp">Analysis</a>
        </li>
      </ul>
      <div class="d-flex">
        <a id="logoutButton" class="btn btn-outline-primary">Logout</a>
      </div>
    </div>
  </div>
</nav>
</body>
</html>