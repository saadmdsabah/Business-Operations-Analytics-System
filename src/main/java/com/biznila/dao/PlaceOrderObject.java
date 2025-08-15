package com.biznila.dao;

public class PlaceOrderObject {

	private int value;
	private Orders order;

	public int getValue() {
		return value;
	}

	public void setValue(int value) {
		this.value = value;
	}

	public Orders getOrder() {
		return order;
	}

	public void setOrder(Orders order) {
		this.order = order;
	}

	public PlaceOrderObject(int value, Orders order) {
		this.value = value;
		this.order = order;
	}

	public PlaceOrderObject() {
	}

	@Override
	public String toString() {
		return "PlaceOrderObject [value=" + value + ", order=" + order + "]";
	}

}
