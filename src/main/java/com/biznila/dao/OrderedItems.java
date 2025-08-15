package com.biznila.dao;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class OrderedItems {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "item_id")
	private int orderItemId;

	@Column(name = "HSN_CODE")
	private String itemCode;

	@Column(name = "item_quantity")
	private int itemQuantity;

	@Column(name = "item_mrp")
	private double itemMrp;

	@Column(name = "item_discount")
	private double itemDiscount;

	@ManyToOne
	private Orders order;

	public int getOrderItemId() {
		return orderItemId;
	}

	public void setOrderItemId(int orderItemId) {
		this.orderItemId = orderItemId;
	}

	public int getItemQuantity() {
		return itemQuantity;
	}

	public void setItemQuantity(int itemQuantity) {
		this.itemQuantity = itemQuantity;
	}

	public double getItemMrp() {
		return itemMrp;
	}

	public void setItemMrp(double itemMrp) {
		this.itemMrp = itemMrp;
	}

	public double getItemDiscount() {
		return itemDiscount;
	}

	public void setItemDiscount(double itemDiscount) {
		this.itemDiscount = itemDiscount;
	}

	@Override
	public String toString() {
		return "OrderedItems [orderItemId=" + orderItemId + ", itemCode=" + itemCode + ", itemQuantity=" + itemQuantity
				+ ", itemMrp=" + itemMrp + ", itemDiscount=" + itemDiscount + "]";
	}

	public Orders getOrder() {
		return order;
	}

	public void setOrder(Orders orderObject) {
		this.order = orderObject;
	}

	public String getItemCode() {
		return itemCode;
	}

	public OrderedItems() {
	}

	public OrderedItems(String itemCode, int itemQuantity, double itemMrp, double itemDiscount, Orders orderObject) {
		this.itemCode = itemCode;
		this.itemQuantity = itemQuantity;
		this.itemMrp = itemMrp;
		this.itemDiscount = itemDiscount;
		this.order = orderObject;
	}

}
