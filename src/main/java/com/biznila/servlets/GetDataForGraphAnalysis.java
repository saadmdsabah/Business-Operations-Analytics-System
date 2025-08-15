package com.biznila.servlets;

import java.io.BufferedReader;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.biznila.dao.DataForRangeGraph;
import com.biznila.dao.Orders;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

@WebServlet(urlPatterns = "/dataforanalysis")
public class GetDataForGraphAnalysis extends HttpServlet {
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
		String from = jsonObject.get("from").getAsString();
		String to = jsonObject.get("to").getAsString();

		List<Object[]> results = Orders.rangeDataProvider(from, to);
		resp.setCharacterEncoding("UTF-8");
		resp.setContentType("application/json");

		if (results.isEmpty()) {
			DataForRangeGraph result = new DataForRangeGraph();
			Gson gson = new Gson();
			String json = gson.toJson(result);
			resp.getWriter().write(json);
		} else {
			List<Double> revenue = new ArrayList<>();
			List<String> dates = new ArrayList<>();
			SimpleDateFormat outFormat = new SimpleDateFormat("yyyy-MM-dd");

			for (Object[] row : results) {
				revenue.add((Double) row[0]);
				Date date = (Date) row[1];
				dates.add(outFormat.format(date));
			}

			DataForRangeGraph result = new DataForRangeGraph(revenue, dates);

			Gson gson = new Gson();

			String json = gson.toJson(result);

			resp.getWriter().write(json);
		}
	}
}
