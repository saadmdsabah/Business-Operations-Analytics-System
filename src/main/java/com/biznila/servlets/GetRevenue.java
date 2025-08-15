package com.biznila.servlets;

import java.io.BufferedReader;
import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.biznila.dao.Orders;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

@WebServlet(urlPatterns = "/revenue")
public class GetRevenue extends HttpServlet {
	private static final long serialVersionUID = 1L;

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

		BufferedReader br = req.getReader();
		StringBuffer sb = new StringBuffer();

		String line;
		while ((line = br.readLine()) != null) {
			sb.append(line);
		}

		String sbString = sb.toString();

		JsonObject jsonObject = JsonParser.parseString(sbString).getAsJsonObject();
		String timeline = jsonObject.get("timeline").getAsString();

		Double result = Orders.findRevenue(timeline);
		if (result == null) {
			resp.getWriter().write("-1");
		} else {
			resp.getWriter().write(String.valueOf(result));
		}
	}

}
