package com.demo.rfd.entities;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.List;

@Entity
@Getter
@Setter
@ToString(callSuper = true)
public class Asset extends Audit {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String name;

  @OneToMany(mappedBy = "asset")
  @ToString.Exclude
  private List<AssetData> assetData;

  @OneToMany(mappedBy = "source")
  @ToString.Exclude
  private List<AssetEdge> assetSourceEdges;

}
