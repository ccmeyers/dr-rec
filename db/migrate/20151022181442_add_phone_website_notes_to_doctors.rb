class AddPhoneWebsiteNotesToDoctors < ActiveRecord::Migration
  def change
    add_column :doctors, :phone, :string
    add_column :doctors, :website, :string
    add_column :doctors, :notes, :text
  end
end
