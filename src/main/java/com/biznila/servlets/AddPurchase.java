package com.biznila.servlets;

import java.io.BufferedReader;
import java.io.IOException;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Query;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaUpdate;
import javax.persistence.criteria.Root;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.biznila.dao.InvoiceId;
import com.biznila.dao.OrderedItems;
import com.biznila.dao.Orders;
import com.biznila.dao.PlaceOrderObject;
import com.biznila.dao.PurchasedItems;
import com.biznila.utils.EntitySessionJPA;
import com.google.gson.Gson;

@WebServlet(urlPatterns = "/addPurchase")
public class AddPurchase extends HttpServlet {
	private static final long serialVersionUID = 1L;

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		BufferedReader reader = req.getReader();
		Gson gson = new Gson();

		PlaceOrderObject placeOrderObject = gson.fromJson(reader, PlaceOrderObject.class);
		Orders order = placeOrderObject.getOrder();
		System.out.println(order);
		int val = placeOrderObject.getValue();
		for (OrderedItems item : order.getOrderItems()) {
			item.setOrder(order);
		}

		boolean decrementOperation = PurchasedItems.decrementStock(order.getOrderItems());
		if (!decrementOperation) {
			resp.getWriter().write("fail");
			return;
		}

		EntityManagerFactory emf = EntitySessionJPA.getManagerFactory();
		EntityManager em = emf.createEntityManager();

		try {
			em.getTransaction().begin();

			// First operation: persist order
			em.persist(order);

			// Second operation: CriteriaUpdate
			CriteriaBuilder cb = em.getCriteriaBuilder();
			CriteriaUpdate<InvoiceId> cu = cb.createCriteriaUpdate(InvoiceId.class);
			Root<InvoiceId> root = cu.from(InvoiceId.class);

			cu.set("value", val);
			cu.where(cb.equal(root.get("id"), 1));

			Query query = em.createQuery(cu);
			int result = query.executeUpdate();

			// If update failed, rollback
			if (result == 0) {
				em.getTransaction().rollback();
				resp.getWriter().write("fail");
				return;
			}

			// Commit only if both succeed
			em.getTransaction().commit();
			resp.getWriter().write("success");

		} catch (Exception e) {
			if (em.getTransaction().isActive()) {
				em.getTransaction().rollback();
			}
			resp.getWriter().write("fail");
		} finally {
			em.close();
		}

	}

}
