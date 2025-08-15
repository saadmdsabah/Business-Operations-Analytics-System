package com.biznila.dao;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Expression;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import com.biznila.utils.EntitySessionJPA;

@Entity
public class Orders {
	@Id
	@Column(name = "invoice_id")
	private String invoiceId;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_at", updatable = false, insertable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
	private Date createdAt;

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "order")
	private List<OrderedItems> orderItems;

	@Column(name = "order_discount")
	private double totalDiscount;

	@Column(name = "order_mrp")
	private double totalMrp;

	@Column(name = "total_cost")
	private double totalCost;

	public String getInvoiceId() {
		return invoiceId;
	}

	public void setInvoiceId(String invoiceId) {
		this.invoiceId = invoiceId;
	}

	public List<OrderedItems> getOrderItems() {
		return orderItems;
	}

	public void setOrderItems(List<OrderedItems> orderItems) {
		this.orderItems = orderItems;
	}

	public double getTotalDiscount() {
		return totalDiscount;
	}

	public void setTotalDiscount(int totalDiscount) {
		this.totalDiscount = totalDiscount;
	}

	public double getTotalMrp() {
		return totalMrp;
	}

	public void setTotalMrp(int totalMrp) {
		this.totalMrp = totalMrp;
	}

	public double getTotalCost() {
		return totalCost;
	}

	public void setTotalCost(int totalCost) {
		this.totalCost = totalCost;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public Orders() {
	}

	public Orders(String invoiceId, List<OrderedItems> orderItems, int totalDiscount, int totalMrp, int totalCost) {
		this.invoiceId = invoiceId;
		this.orderItems = orderItems;
		this.totalDiscount = totalDiscount;
		this.totalMrp = totalMrp;
		this.totalCost = totalCost;
	}

	@Override
	public String toString() {
		return "Orders [invoiceId=" + invoiceId + ", createdAt=" + createdAt + ", orderItems=" + orderItems
				+ ", totalDiscount=" + totalDiscount + ", totalMrp=" + totalMrp + ", totalCost=" + totalCost + "]";
	}

	public static Orders findOrderbyId(String id) {
		Orders order = null;

		EntityManagerFactory emf = EntitySessionJPA.getManagerFactory();
		EntityManager em = emf.createEntityManager();

		try {

			CriteriaBuilder cb = em.getCriteriaBuilder();
			CriteriaQuery<Orders> cq = cb.createQuery(Orders.class);

			Root<Orders> root = cq.from(Orders.class);
			cq.select(root);
			cq.where(cb.equal(root.get("invoiceId"), id));

			order = em.createQuery(cq).getSingleResult();

			return order;
		} catch (Exception e) {
			if (em.getTransaction().isActive()) {
				em.getTransaction().rollback();
			}
			return null;
		} finally {
			em.close();
		}
	}

	public static Double findRevenue(String timeline) {
		EntityManagerFactory emf = EntitySessionJPA.getManagerFactory();
		EntityManager em = emf.createEntityManager();

		Double revenue = null;

		try {
			em.getTransaction().begin();

			CriteriaBuilder cb = em.getCriteriaBuilder();
			CriteriaQuery<Double> cq = cb.createQuery(Double.class);

			Root<Orders> root = cq.from(Orders.class);
			cq.select(cb.sum(root.get("totalCost")));
			cq.where(cb.like(root.get("createdAt").as(String.class), timeline + "%"));

			revenue = em.createQuery(cq).getSingleResult();

			em.getTransaction().commit();
		} catch (Exception e) {
			if (em.getTransaction().isActive()) {
				em.getTransaction().rollback();
			}
		} finally {
			em.close();
		}

		return revenue;
	}

	public static Double findRevenueRange(String from, String to) {
		EntityManagerFactory emf = EntitySessionJPA.getManagerFactory();
		EntityManager em = emf.createEntityManager();

		try {
			// Convert input strings to Date objects
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			Date fromDate = sdf.parse(from);

			// Make "to" cover entire day
			Calendar cal = Calendar.getInstance();
			cal.setTime(sdf.parse(to));
			cal.set(Calendar.HOUR_OF_DAY, 23);
			cal.set(Calendar.MINUTE, 59);
			cal.set(Calendar.SECOND, 59);
			Date toDate = cal.getTime();

			CriteriaBuilder cb = em.getCriteriaBuilder();
			CriteriaQuery<Double> cq = cb.createQuery(Double.class);

			Root<Orders> root = cq.from(Orders.class);
			cq.select(cb.sum(root.get("totalCost")));

			cq.where(cb.between(root.get("createdAt"), fromDate, toDate));

			return em.createQuery(cq).getSingleResult();
		} catch (Exception e) {
			return null;
		} finally {
			em.close();
		}
	}

	public static List<Object[]> rangeDataProvider(String from, String to) {
		EntityManagerFactory emf = EntitySessionJPA.getManagerFactory();
		EntityManager em = emf.createEntityManager();
		List<Object[]> result = new ArrayList<>();

		try {
			CriteriaBuilder cb = em.getCriteriaBuilder();
			CriteriaQuery<Object[]> cq = cb.createQuery(Object[].class);
			Root<Orders> order = cq.from(Orders.class);

			Expression<java.sql.Date> dateExpr = cb.function("DATE", java.sql.Date.class, order.get("createdAt"));

			cq.multiselect(cb.sum(order.get("totalCost")), dateExpr);

			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			Date startDate = sdf.parse(from);

			// Make "to" cover entire day
			Calendar cal = Calendar.getInstance();
			cal.setTime(sdf.parse(to));
			cal.set(Calendar.HOUR_OF_DAY, 23);
			cal.set(Calendar.MINUTE, 59);
			cal.set(Calendar.SECOND, 59);
			Date endDate = cal.getTime();

			cq.where(cb.between(order.get("createdAt"), startDate, endDate));
			cq.groupBy(dateExpr);
			cq.orderBy(cb.asc(dateExpr));

			result = em.createQuery(cq).getResultList();
		} catch (Exception e) {
		} finally {
			em.close();
		}

		return result;
	}

	public static List<Object[]> getGroupedItemQuantities(Date fromDate, Date toDate) {
		EntityManagerFactory emf = EntitySessionJPA.getManagerFactory();
		EntityManager em = emf.createEntityManager();
		List<Object[]> result = new ArrayList<>();

		try {
			CriteriaBuilder cb = em.getCriteriaBuilder();
			CriteriaQuery<Object[]> cq = cb.createQuery(Object[].class);

			Root<OrderedItems> itemRoot = cq.from(OrderedItems.class);
			Join<OrderedItems, Orders> orderJoin = itemRoot.join("order");

			cq.multiselect(itemRoot.get("itemCode"), cb.sum(itemRoot.get("itemQuantity")));

			Predicate datePredicate = cb.between(orderJoin.get("createdAt"), fromDate, toDate);
			cq.where(datePredicate);

			cq.groupBy(itemRoot.get("itemCode"));
			cq.orderBy(cb.desc(cb.sum(itemRoot.get("itemQuantity"))));

			result = em.createQuery(cq).getResultList();
		} catch (Exception e) {
		} finally {
			em.close();
		}
		return result;
	}

}
