package com.biznila.servlets;

import java.io.BufferedReader;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.biznila.dao.DataForTopProducts;
import com.biznila.dao.Orders;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

@WebServlet(urlPatterns = "/getTopProducts")
public class GetDataForTopProducts extends HttpServlet {
	private static final long serialVersionUID = 1L;

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		resp.setCharacterEncoding("UTF-8");
		resp.setContentType("application/json");
		List<Object[]> result = new ArrayList<>();

		try {

			BufferedReader br = req.getReader();
			StringBuffer sb = new StringBuffer();

			String line;
			while ((line = br.readLine()) != null) {
				sb.append(line);
			}

			String sbString = sb.toString();
			JsonObject jsonObject = JsonParser.parseString(sbString).getAsJsonObject();
			String from = jsonObject.get("from").getAsString();
			String to = jsonObject.get("to").getAsString();
			int window = Integer.parseInt(jsonObject.get("window").getAsString());

			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

			Date fromDate = sdf.parse(from);

			Calendar cal = Calendar.getInstance();
			cal.setTime(sdf.parse(to));
			cal.set(Calendar.HOUR_OF_DAY, 23);
			cal.set(Calendar.MINUTE, 59);
			cal.set(Calendar.SECOND, 59);
			Date toDate = cal.getTime();

			result = Orders.getGroupedItemQuantities(fromDate, toDate);
			if (result.isEmpty()) {
				DataForTopProducts data = new DataForTopProducts();
				Gson gson = new Gson();
				String json = gson.toJson(data);
				resp.getWriter().write(json);
			} else {

				List<String> hsnCodes = new ArrayList<>();
				List<Long> quantity = new ArrayList<>();

				for (Object[] list : result) {
					hsnCodes.add((String) list[0]);
					quantity.add((Long) list[1]);
				}
				int size = hsnCodes.size();

				List<String> topFiveItemsHsnCodes = hsnCodes.subList(0, Math.min(window, size));
				List<Long> topFiveItemsQuantity = quantity.subList(0, Math.min(window, size));

				List<String> bottomFiveItemsHsnCodes = hsnCodes.subList(Math.max(size - window, 0), size);
				List<Long> bottomFiveItemsQuantity = quantity.subList(Math.max(size - window, 0), size);

				DataForTopProducts data = new DataForTopProducts(topFiveItemsHsnCodes, topFiveItemsQuantity,
						bottomFiveItemsHsnCodes, bottomFiveItemsQuantity);
				Gson gson = new Gson();
				String json = gson.toJson(data);
				resp.getWriter().write(json);
			}
		} catch (Exception e) {
			DataForTopProducts data = new DataForTopProducts();
			Gson gson = new Gson();
			String json = gson.toJson(data);
			resp.getWriter().write(json);
		}
	}

}
