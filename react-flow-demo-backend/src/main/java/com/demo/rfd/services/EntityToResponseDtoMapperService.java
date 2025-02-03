package com.demo.rfd.services;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EntityToResponseDtoMapperService {
  private final ModelMapper modelMapper;

  public <T> T mapEntityToType(Object source, Class<T> targetObjClass) {
    return modelMapper.map(source, targetObjClass);
  }
}
