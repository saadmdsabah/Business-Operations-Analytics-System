package com.biznila.utils;

import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

public class EntitySessionJPA {

	static EntityManagerFactory emf;

	static {
		emf = Persistence.createEntityManagerFactory("bizilla-unit");
	}

	public static EntityManagerFactory getManagerFactory() {
		return emf;
	}
}
