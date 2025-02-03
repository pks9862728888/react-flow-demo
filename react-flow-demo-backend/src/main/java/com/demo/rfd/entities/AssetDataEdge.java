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
public class AssetDataEdge extends Audit {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "source", referencedColumnName = "id", nullable = false)
  private Asset source;

  @ManyToOne
  @JoinColumn(name = "target", referencedColumnName = "id", nullable = false)
  private Asset target;

  @ManyToOne
  @JoinColumn(name = "source_id", referencedColumnName = "id", nullable = false)
  private AssetData sourceAssetData;

  @ManyToOne
  @JoinColumn(name = "target_id", referencedColumnName = "id", nullable = false)
  private AssetData targetAssetData;

  public String getSourceHandle() {
    return String.format("%s-source", sourceAssetData.getKey());
  }

  public String getTargetHandle() {
    return String.format("%s-target", targetAssetData.getKey());
  }

}
