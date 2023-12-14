# Usa una imagen base con Java 11
FROM adoptopenjdk:11-jre-hotspot

# Copia el archivo JAR de tu aplicación al contenedor
COPY "./target/demo-0.0.1-SNAPSHOT.jar" "/app/app.jar"
# COPY "./src/main/resources/funciones.sql" "/app/funciones.sql"
COPY init.sql /docker-entrypoint-initdb.d/

# Establece el directorio de trabajo en /app
WORKDIR /app

# Expone el puerto en el que tu aplicación Spring Boot se ejecutará
EXPOSE 8080

# Comando para ejecutar la aplicación Spring Boot
ENTRYPOINT ["java", "-jar", "app.jar"]
