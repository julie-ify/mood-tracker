class ApplicationSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  def created_at
    to_unix_timestamp(object.created_at)
  end

  def updated_at
    to_unix_timestamp(object.updated_at)
  end

  private

  def to_unix_timestamp(datetime)
    datetime&.utc&.to_i
  end
end
