package com.demo.rfd.entities;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
@Getter
@Setter
@ToString(callSuper = true)
public class AssetEdge extends Audit {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "source", referencedColumnName = "id", nullable = false)
  private Asset source;

  @ManyToOne
  @JoinColumn(name = "target", referencedColumnName = "id", nullable = false)
  private Asset target;

}
