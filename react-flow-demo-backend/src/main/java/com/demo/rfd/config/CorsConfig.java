package com.demo.rfd.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Arrays;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

  public static final String COMMA = ",";

  @Value("${cors.allowed-origins}")
  private String corsAllowedOrigins;

  @Override
  public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/**")
        .allowedOrigins(corsAllowedOrigins.split(COMMA))
        .allowedMethods(Arrays.stream(HttpMethod.values()).map(HttpMethod::name).toArray(String[]::new))
        .allowedHeaders("*")
        .allowCredentials(true);
  }
}