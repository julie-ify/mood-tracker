class Api::CheckinSerializer < ApplicationSerializer
  attributes :id, :user, :mood, :sleep, :feelings, :created_at

  def user
    return unless object.user

    {
      id: object.user.id,
      name: object.user.name,
      email: object.user.email
    }
  end

  def feelings
    ActiveModel::Serializer::CollectionSerializer.new(
      object.feelings,
      serializer: Api::FeelingSerializer
    )
  end
end
