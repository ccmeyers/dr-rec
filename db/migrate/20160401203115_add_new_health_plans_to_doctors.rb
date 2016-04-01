class AddNewHealthPlansToDoctors < ActiveRecord::Migration
  def change
    add_column :doctors, :aetna_a3, :string
    add_column :doctors, :aetna_c1, :string
    add_column :doctors, :aetna_c3, :string
    add_column :doctors, :vision, :string
    add_column :doctors, :vision_plus, :string
    add_column :doctors, :dental_dmo, :string
    add_column :doctors, :dental_plus, :string
  end
end
