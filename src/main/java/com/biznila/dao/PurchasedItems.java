package com.biznila.dao;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.CriteriaUpdate;
import javax.persistence.criteria.Expression;
import javax.persistence.criteria.Path;
import javax.persistence.criteria.Root;

import com.biznila.utils.EntitySessionJPA;
import com.google.gson.Gson;

@Entity
@Table(name = "purchased")
public class PurchasedItems {

	@Id
	@Column(name = "`HSN CODE`")
	private String itemCode;

	@Column(name = "ITEM", nullable = false)
	private String itemName;

	@Column(name = "QTY", nullable = false)
	private int itemQuantity;

	@Column(name = "RATE", nullable = false)
	private double itemRate;

	public int getItemQuantity() {
		return itemQuantity;
	}

	public void setItemQuantity(int itemQuantity) {
		this.itemQuantity = itemQuantity;
	}

	public double getItemRate() {
		return itemRate;
	}

	public void setItemRate(double itemRate) {
		this.itemRate = itemRate;
	}

	public String getItemCode() {
		return itemCode;
	}

	public void setItemCode(String itemCode) {
		this.itemCode = itemCode;
	}

	public String getItemName() {
		return itemName;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	public PurchasedItems() {
	}

	public PurchasedItems(String itemCode, String itemName, int itemQuantity, double itemRate) {
		super();
		this.itemCode = itemCode;
		this.itemName = itemName;
		this.itemQuantity = itemQuantity;
		this.itemRate = itemRate;
	}

	@Override
	public String toString() {
		return "PurchasedItems [itemCode=" + itemCode + ", itemName=" + itemName + ", itemQuantity=" + itemQuantity
				+ ", itemRate=" + itemRate + "]";
	}

	public static String getItemsCode() {
		Gson gson = new Gson();

		EntityManagerFactory emf = EntitySessionJPA.getManagerFactory();
		EntityManager em = emf.createEntityManager();

		CriteriaBuilder cb = em.getCriteriaBuilder();
		CriteriaQuery<PurchasedItems> cq = cb.createQuery(PurchasedItems.class);

		Root<PurchasedItems> root = cq.from(PurchasedItems.class);
		cq.select(root);

		String json = gson.toJson(em.createQuery(cq).getResultList());

		return json;
	}

	public static boolean UpdateItemCode(String code, String name, int quantity, double rate) {
		EntityManagerFactory emf = EntitySessionJPA.getManagerFactory();
		EntityManager em = emf.createEntityManager();

		try {
			CriteriaBuilder cb = em.getCriteriaBuilder();
			CriteriaUpdate<PurchasedItems> cu = cb.createCriteriaUpdate(PurchasedItems.class);
			Root<PurchasedItems> root = cu.from(PurchasedItems.class);

			cu.set("itemName", name);
			cu.set("itemQuantity", quantity);
			cu.set("itemRate", rate);

			cu.where(cb.equal(root.get("itemCode"), code));

			em.getTransaction().begin();
			int result = em.createQuery(cu).executeUpdate();
			em.getTransaction().commit();
			if (result == 0) {
				return false;
			}
		} catch (Exception e) {
			em.getTransaction().rollback();
			e.printStackTrace();
			return false;

		} finally {
			em.close();
		}
		return true;
	}

	public static boolean AddItem(String code, String name, int quantity, double rate) {

		PurchasedItems item = new PurchasedItems(code, name, quantity, rate);

		EntityManager em = EntitySessionJPA.getManagerFactory().createEntityManager();

		try {
			em.getTransaction().begin();
			em.persist(item);
			em.getTransaction().commit();
		} catch (Exception e) {
			em.getTransaction().rollback();
			e.printStackTrace();
			return false;
		} finally {
			em.close();
		}

		return true;
	}

	public static boolean decrementStock(List<OrderedItems> items) {

		EntityManagerFactory emf = EntitySessionJPA.getManagerFactory();
		EntityManager em = emf.createEntityManager();

		try {
			em.getTransaction().begin();

			CriteriaBuilder cb = em.getCriteriaBuilder();

			for (OrderedItems item : items) {
				CriteriaUpdate<PurchasedItems> cu = cb.createCriteriaUpdate(PurchasedItems.class);
				Root<PurchasedItems> root = cu.from(PurchasedItems.class);

				Path<Integer> quantityPath = root.get("itemQuantity");
				Expression<Integer> newValue = cb.diff(quantityPath, item.getItemQuantity());

				cu.set(quantityPath, newValue);
				cu.where(cb.equal(root.get("itemCode"), item.getItemCode()));

				em.createQuery(cu).executeUpdate();
			}

			em.getTransaction().commit();
			return true;

		} catch (Exception e) {
			if (em.getTransaction().isActive()) {
				em.getTransaction().rollback();
			}
			e.printStackTrace();
			return false;

		} finally {
			em.close();
		}

	}

}
