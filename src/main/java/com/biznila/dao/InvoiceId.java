package com.biznila.dao;

import java.util.Random;

import javax.persistence.Entity;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NoResultException;
import javax.persistence.Table;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import com.biznila.utils.EntitySessionJPA;

@Entity
@Table(name = "invoice_counter")
public class InvoiceId {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private int value;

	public int getValue() {
		return value;
	}

	public void setValue(int value) {
		this.value = value;
	}

	public int getTable_id() {
		return id;
	}

	public InvoiceId() {
	}

	public static int readInvoiceId() {

		EntityManagerFactory emf = EntitySessionJPA.getManagerFactory();
		EntityManager em = emf.createEntityManager();
		int value;

		try {
			CriteriaBuilder cb = em.getCriteriaBuilder();
			CriteriaQuery<InvoiceId> cq = cb.createQuery(InvoiceId.class);
			Root<InvoiceId> root = cq.from(InvoiceId.class);

			cq.select(root).where(cb.equal(root.get("id"), 1));

			TypedQuery<InvoiceId> query = em.createQuery(cq);
			InvoiceId result = query.getSingleResult();

			value = result.getValue();

		} catch (NoResultException e) {
			Random random = new Random();
			return random.nextInt(10000, 30000);
		} finally {
			em.close();
		}

		return value;
	}
}
