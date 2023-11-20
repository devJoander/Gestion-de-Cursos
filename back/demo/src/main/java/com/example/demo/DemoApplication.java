package com.example.demo;

import java.io.IOException;
import java.io.InputStream;
import java.util.Scanner;
import javax.annotation.PostConstruct;
import javax.sql.DataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.jdbc.core.JdbcTemplate;

   
@SpringBootApplication
public class DemoApplication {

	@Autowired
    private DataSource dataSource;

    @PostConstruct
    public void init() throws IOException {
        try (InputStream inputStream = getClass().getResourceAsStream("/funciones.sql")) {
            String sql = new Scanner(inputStream).useDelimiter("\\A").next();
            JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
            jdbcTemplate.execute(sql);
        }
    }
	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
		System.out.println("Api Documentation aquí: " + "http://localhost:8080/swagger-ui/index.html");
	}

}
