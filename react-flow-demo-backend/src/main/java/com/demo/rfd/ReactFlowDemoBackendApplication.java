package com.demo.rfd;

import org.modelmapper.ModelMapper;
import org.modelmapper.config.Configuration;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class ReactFlowDemoBackendApplication {

  public static void main(String[] args) {
    SpringApplication.run(ReactFlowDemoBackendApplication.class, args);
  }

  @Bean
  public ModelMapper modelMapper() {
    ModelMapper modelMapper = new ModelMapper();
    Configuration modelMapperConfig = modelMapper.getConfiguration();
    modelMapperConfig.setMatchingStrategy(MatchingStrategies.STRICT);
    modelMapperConfig.setFieldMatchingEnabled(true);
    modelMapperConfig.setFieldAccessLevel(Configuration.AccessLevel.PRIVATE);
    return modelMapper;
  }
}
