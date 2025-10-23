# ---------- Build stage ----------
# Uses Java 21 JDK to compile Spring app. Works on ARM64 (Raspberry Pi).
FROM eclipse-temurin:21-jdk-alpine AS build
WORKDIR /app

# Copy the project files into the build image
COPY . .

# Ensure the Maven wrapper script is executable (some checkouts lose the +x bit)
RUN chmod +x mvnw

# Build a runnable JAR (skip tests for speed)
RUN ./mvnw -q -DskipTests package

# ---------- Run stage ----------
# Smaller runtime image with just the JRE.
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Copy the built jar out of the build stage
COPY --from=build /app/target/*SNAPSHOT.jar app.jar

# If you set server.port in application.properties, leave this as 8080
EXPOSE 8080

# Keep JVM memory reasonable for the Pi
ENV JAVA_TOOL_OPTIONS="-XX:MaxRAMPercentage=60"

# Run the Spring Boot app
ENTRYPOINT ["java","-jar","/app/app.jar"]
