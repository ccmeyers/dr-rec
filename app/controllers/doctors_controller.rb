class DoctorsController < ApplicationController

  def index
    render json: Doctor.order(last_name: :asc).all
  end

  def create
    doctor = Doctor.create(first_name: params[:first_name], last_name: params[:last_name], practice_name: params[:practice_name], specialty: params[:specialty], phone: params[:phone], website: params[:website], address: params[:address], latitude: params[:latitude], longitude: params[:longitude], notes: params[:notes])
    render json: doctor
  end
end
