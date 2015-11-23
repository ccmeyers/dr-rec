class DoctorsController < ApplicationController

  def index
    render json: Doctor.order(last_name: :asc).all
  end

  def create
    doctor = Doctor.create(first_name: params[:first_name], last_name: params[:last_name], practice_name: params[:practice_name], specialty: params[:specialty], specialty_slug: params[:specialty_slug], phone: params[:phone], website: params[:website], address: params[:address], latitude: params[:latitude], longitude: params[:longitude], notes: params[:notes], aetna_oaepo_silver_2000: params[:aetna_oaepo_silver_2000], eyemed_ppo: params[:eyemed_ppo], guardian_ppo: params[:guardian_ppo], guardian_dhmo: params[:guardian_dhmo], user_id: current_user.id)
    render json: doctor
  end

  def update
    doctor = Doctor.find(params[:id])
    if params[:num]
      doctor.upvotes = params[:num]
      doctor.save
      render json: doctor
    else
      doctor.update_attributes(first_name: params[:first_name], last_name: params[:last_name], practice_name: params[:practice_name], specialty: params[:specialty], specialty_slug: params[:specialty_slug], phone: params[:phone], website: params[:website], address: params[:address], latitude: params[:latitude], longitude: params[:longitude], notes: params[:notes], aetna_oaepo_silver_2000: params[:aetna_oaepo_silver_2000], eyemed_ppo: params[:eyemed_ppo], guardian_ppo: params[:guardian_ppo], guardian_dhmo: params[:guardian_dhmo])
      render json: doctor
    end
  end

  def destroy
    doctor = Doctor.find(params[:id])
    doctor.destroy
    render json: doctor
  end
end
