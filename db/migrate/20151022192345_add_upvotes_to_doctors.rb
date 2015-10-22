class AddUpvotesToDoctors < ActiveRecord::Migration
  def change
    add_column :doctors, :upvotes, :integer, :default => 0
  end
end
