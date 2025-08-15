package com.biznila.servlets;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.biznila.dao.PurchasedItems;

@WebServlet(urlPatterns = "/updatePurchasedItem")
@MultipartConfig
public class UpdatePurchasedItem extends HttpServlet {
	private static final long serialVersionUID = 1L;

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		String code = req.getParameter("id");
		String name = req.getParameter("name");
		int quantity = Integer.parseInt(req.getParameter("quantity"));
		double rate = Double.parseDouble(req.getParameter("price"));

		boolean result = PurchasedItems.UpdateItemCode(code, name, quantity, rate);

		resp.getWriter().write(result ? "success" : "fail");
	}

}
