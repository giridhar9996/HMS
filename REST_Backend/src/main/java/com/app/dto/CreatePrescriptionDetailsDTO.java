



package com.app.dto;

import javax.validation.constraints.NotBlank;

public class CreatePrescriptionDetailsDTO {

  private int m_id;
  @NotBlank(message = "dosage required !!!!")
  private String dosage;
  @NotBlank(message = "duration required !!!!")
  private String duration;
  private int quantity;

  
public int getM_id() {
	return m_id;
}
public void setM_id(int m_id) {
	this.m_id = m_id;
}
public String getDosage() {
	return dosage;
}
public void setDosage(String dosage) {
	this.dosage = dosage;
}
public String getDuration() {
	return duration;
}
public void setDuration(String duration) {
	this.duration = duration;
}
public int getQtantiy() {
	return quantity;
}
public void setQtantiy(int qtantiy) {
	this.quantity = qtantiy;
}
@Override
public String toString() {
	return "CreatePrescriptionDetailsDTO [m_id=" + m_id + ", dosage=" + dosage + ", duration=" + duration
			+ ", quantity=" + quantity + "]";
}
  
  
  
  
}
