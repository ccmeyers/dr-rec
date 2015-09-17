class DoctorsController < ApplicationController

  def index
    render json: Doctor.order(last_name: :asc).all
  end

  def create
    doctor = Doctor.create(first_name: params[:first_name], last_name: params[:last_name], practice_name: params[:practice_name], specialty: params[:specialty])
    render json: doctor
  end
end
