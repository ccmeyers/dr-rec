class AddSpecialtySlugToDoctors < ActiveRecord::Migration
  def change
    add_column :doctors, :specialty_slug, :string
  end
end
