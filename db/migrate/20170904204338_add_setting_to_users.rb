class AddSettingToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :settings, :json
  end
end
