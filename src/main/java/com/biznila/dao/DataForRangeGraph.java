package com.biznila.dao;

import java.util.List;

public class DataForRangeGraph {
	List<Double> revenue;
	List<String> dates;

	public List<Double> getRevenue() {
		return revenue;
	}

	public void setRevenue(List<Double> revenue) {
		this.revenue = revenue;
	}

	public List<String> getDates() {
		return dates;
	}

	public void setDates(List<String> dates) {
		this.dates = dates;
	}

	public DataForRangeGraph(List<Double> revenue, List<String> dates) {
		this.revenue = revenue;
		this.dates = dates;
	}

	public DataForRangeGraph() {
	}
}
