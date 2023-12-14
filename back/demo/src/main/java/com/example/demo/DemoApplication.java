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

	// @Autowired
    // private DataSource dataSource;

    // @PostConstruct
    // public void init()  {
    //     try {
    //         InputStream inputStream = getClass().getResourceAsStream("/funciones.sql");
    //         if (inputStream != null) {
    //             String sql = new Scanner(inputStream).useDelimiter("\\A").next(); // El useDelimiter("\\A") indica al Scanner que utilice el inicio del contenido como delimitador, lo que significa que se leerá todo el contenido hasta el final del archivo.
    //             JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
    //             jdbcTemplate.execute(sql);
    //         } else {
    //             System.err.println("No se pudo encontrar el recurso funciones.sql");
    //         }
    //     } catch (RuntimeException ex) {
    //         throw new IllegalArgumentException(ex.getMessage().toString(), ex.getCause());
    //     } catch (Exception e) {
    //         throw new IllegalArgumentException(e.getMessage().toString(), e.getCause());
    //     }
    // }
    
	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
		System.out.println("Api Documentation aquí: " + "http://localhost:8080/swagger-ui/index.html");
	}

}
