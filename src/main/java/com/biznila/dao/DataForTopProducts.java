package com.biznila.dao;

import java.util.List;

public class DataForTopProducts {
	private List<String> topFiveItemsHsnCodes;
	private List<Long> topFiveItemsQuantity;

	private List<String> bottomFiveItemsHsnCodes;
	private List<Long> bottomFiveItemsQuantity;

	public List<String> getTopFiveItemsHsnCodes() {
		return topFiveItemsHsnCodes;
	}

	public void setTopFiveItemsHsnCodes(List<String> topFiveItemsHsnCodes) {
		this.topFiveItemsHsnCodes = topFiveItemsHsnCodes;
	}

	public List<Long> getTopFiveItemsQuantity() {
		return topFiveItemsQuantity;
	}

	public void setTopFiveItemsQuantity(List<Long> topFiveItemsQuantity) {
		this.topFiveItemsQuantity = topFiveItemsQuantity;
	}

	public List<String> getBottomFiveItemsHsnCodes() {
		return bottomFiveItemsHsnCodes;
	}

	public void setBottomFiveItemsHsnCodes(List<String> bottomFiveItemsHsnCodes) {
		this.bottomFiveItemsHsnCodes = bottomFiveItemsHsnCodes;
	}

	public List<Long> getBottomFiveItemsQuantity() {
		return bottomFiveItemsQuantity;
	}

	public void setBottomFiveItemsQuantity(List<Long> bottomFiveItemsQuantity) {
		this.bottomFiveItemsQuantity = bottomFiveItemsQuantity;
	}

	public DataForTopProducts(List<String> topFiveItemsHsnCodes, List<Long> topFiveItemsQuantity,
			List<String> bottomFiveItemsHsnCodes, List<Long> bottomFiveItemsQuantity) {
		this.topFiveItemsHsnCodes = topFiveItemsHsnCodes;
		this.topFiveItemsQuantity = topFiveItemsQuantity;
		this.bottomFiveItemsHsnCodes = bottomFiveItemsHsnCodes;
		this.bottomFiveItemsQuantity = bottomFiveItemsQuantity;
	}

	public DataForTopProducts() {
	}
}
