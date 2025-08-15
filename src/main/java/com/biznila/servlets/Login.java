package com.biznila.servlets;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@WebServlet(urlPatterns = "/login")
@MultipartConfig
public class Login extends HttpServlet {
	private static final long serialVersionUID = 1L;

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		String APP_USERNAME = System.getenv("APP_USERNAME");
		String APP_PASSWORD = System.getenv("APP_PASSWORD");

		String username = req.getParameter("username");
		String password = req.getParameter("password");

		resp.setContentType("application/json");
		resp.setCharacterEncoding("UTF-8");

		if (APP_USERNAME.equals(username) && APP_PASSWORD.equals(password)) {
			HttpSession session = req.getSession();
			session.setAttribute("user", username);
			session.setMaxInactiveInterval(90000);

			resp.getWriter().write("{\"status\":\"success\"}");
		} else {
			resp.getWriter().write("{\"status\":\"fail\"}");
		}

	}
}
