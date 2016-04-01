class DoctorsController < ApplicationController

  def index
    render json: Doctor.order(last_name: :asc).all
  end

  def create
    doctor = Doctor.create(first_name: params[:first_name], last_name: params[:last_name], practice_name: params[:practice_name], specialty: params[:specialty], specialty_slug: params[:specialty_slug], phone: params[:phone], website: params[:website], address: params[:address], latitude: params[:latitude], longitude: params[:longitude], notes: params[:notes], aetna_a3: params[:aetna_a3], aetna_c1: params[:aetna_c1], aetna_c3: params[:aetna_c3], vision: params[:vision], vision_plus: params[:vision_plus], dental_plus: params[:dental_plus], dental_dmo: params[:dental_dmo], user_id: current_user.id)
    render json: doctor
  end

  def update
    doctor = Doctor.find(params[:id])
    if params[:num]
      upvote = Upvote.create(doctor_id: doctor.id, user_id: current_user.id)
      doctor.upvotes = params[:num]
      doctor.save
      render json: doctor
    else
      doctor.update_attributes(first_name: params[:first_name], last_name: params[:last_name], practice_name: params[:practice_name], specialty: params[:specialty], specialty_slug: params[:specialty_slug], phone: params[:phone], website: params[:website], address: params[:address], latitude: params[:latitude], longitude: params[:longitude], notes: params[:notes], aetna_a3: params[:aetna_a3], aetna_c1: params[:aetna_c1], aetna_c3: params[:aetna_c3], vision: params[:vision], vision_plus: params[:vision_plus], dental_plus: params[:dental_plus], dental_dmo: params[:dental_dmo])
      render json: doctor
    end
  end

  def destroy
    doctor = Doctor.find(params[:id])
    doctor.destroy
    render json: doctor
  end
end
