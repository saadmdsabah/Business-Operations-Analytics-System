package com.biznila.servlets;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.biznila.dao.InvoiceId;

@WebServlet("/getInvoiceId")
public class GetInvoiceId extends HttpServlet {
	private static final long serialVersionUID = 1L;

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		int id = InvoiceId.readInvoiceId();

		resp.getWriter().write(String.valueOf(id));
	}
}
