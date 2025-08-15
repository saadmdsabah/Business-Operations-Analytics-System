package com.biznila.filters;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@WebFilter(urlPatterns = { "/home.jsp", "/findOrderById.jsp", "/outOfStock.jsp", "/purchased.jsp", "/revenue.jsp" })
public class IsLoggedIn implements Filter {

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) {
		HttpServletRequest req = (HttpServletRequest) request;
		HttpServletResponse res = (HttpServletResponse) response;

		HttpSession session = req.getSession(false);

		if (session == null) {
			try {
				res.sendRedirect("login.jsp");
			} catch (IOException e) {
				e.printStackTrace();
			}
		} else {
			try {
				chain.doFilter(request, response);
			} catch (IOException | ServletException e) {
				e.printStackTrace();
			}
		}
	}

}
