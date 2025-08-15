package com.biznila.servlets;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.biznila.dao.PurchasedItems;

@WebServlet(urlPatterns = "/addPurchasedItem")
@MultipartConfig
public class AddItemServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		try {
			String code = req.getParameter("id");
			String name = req.getParameter("name");
			String quantityStr = req.getParameter("quantity");
			String priceStr = req.getParameter("price");

			if (code == null || name == null || quantityStr == null || priceStr == null) {
				resp.getWriter().write("fail");
				return;
			}

			int quantity = Integer.parseInt(quantityStr.trim());
			double rate = Double.parseDouble(priceStr.trim());

			boolean result = PurchasedItems.AddItem(code, name, quantity, rate);
			resp.getWriter().write(result ? "success" : "fail");

		} catch (Exception e) {
			e.printStackTrace();
			resp.getWriter().write("fail");
		}
	}

}
