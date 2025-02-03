package com.demo.rfd.entities;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.MappedSuperclass;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import java.time.LocalDateTime;
import java.util.Objects;

@Getter
@Setter
@ToString
@MappedSuperclass
public class Audit {

  private LocalDateTime created;
  private LocalDateTime updated;

  @PrePersist
  public void setTs() {
    if (Objects.isNull(created)) {
      created = LocalDateTime.now();
    }
    if (Objects.isNull(updated)) {
      updated = LocalDateTime.now();
    }
  }

  @PreUpdate
  public void updateTs() {
    updated = LocalDateTime.now();
  }
}
