class AddHealthCoverageToDoctors < ActiveRecord::Migration
  def change
    add_column :doctors, :aetna_oaepo_silver_2000, :string
    add_column :doctors, :eyemed_ppo, :string
    add_column :doctors, :guardian_ppo, :string
    add_column :doctors, :guardian_dhmo, :string
  end
end
