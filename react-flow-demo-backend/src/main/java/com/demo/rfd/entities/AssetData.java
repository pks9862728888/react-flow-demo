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
import javax.persistence.OneToMany;
import java.util.List;

@Entity(name = "asset_data")
@Getter
@Setter
@ToString(callSuper = true)
public class AssetData extends Audit {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "asset_id", referencedColumnName = "id", nullable = false)
  private Asset asset;

  private String name;

  private String key;

  @OneToMany(mappedBy = "assetData")
  @ToString.Exclude
  private List<AssetDataTransformation> assetDataTransformations;

  @OneToMany(mappedBy = "sourceAssetData")
  @ToString.Exclude
  private List<AssetDataEdge> assetDataSourceEdges;

}
