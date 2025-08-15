package com.biznila.servlets;

import java.io.BufferedReader;
import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.biznila.dao.Orders;
import com.google.gson.ExclusionStrategy;
import com.google.gson.FieldAttributes;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

@WebServlet(urlPatterns = "/getOrderById")
public class GetOrderById extends HttpServlet {

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
		String id = jsonObject.get("id").getAsString();

		Orders order = Orders.findOrderbyId(id);

		Gson gson = new GsonBuilder().addSerializationExclusionStrategy(new ExclusionStrategy() {
			@Override
			public boolean shouldSkipField(FieldAttributes f) {
				return f.getName().equals("order");
			}

			@Override
			public boolean shouldSkipClass(Class<?> clazz) {
				return false;
			}
		}).create();

		String json = gson.toJson(order);
		resp.setContentType("application/json");
		resp.setCharacterEncoding("UTF-8");
		resp.getWriter().write(json);
	}

}
