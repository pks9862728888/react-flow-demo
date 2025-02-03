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
public class AssetDataTransformation extends Audit {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE)
  private Long id;
  @ManyToOne
  @JoinColumn(name = "asset_id", referencedColumnName = "id", nullable = false)
  private Asset asset;
  @ManyToOne
  @JoinColumn(name = "asset_data_id", referencedColumnName = "id", nullable = false)
  private AssetData assetData;
  private String ruleId;
  private String rule;
  private String type;

}
