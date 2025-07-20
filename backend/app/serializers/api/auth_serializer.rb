class Api::AuthSerializer < ApplicationSerializer
  attributes :id, :name, :email, :avatar_url, :checkins
end
