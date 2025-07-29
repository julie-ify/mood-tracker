class Api::AuthSerializer < ApplicationSerializer
  attributes :id, :name, :email, :avatar_url, :checkins

  def checkins
    object.checkins.map do |checkin|
      {
        id: checkin.id,
        mood: checkin.mood,
        sleep: checkin.sleep,
        created_at: checkin.created_at,
        feelings: checkin.feelings.map do |feeling|
          {
            id: feeling.id,
            name: feeling.name
          }
        end,
        reflection: checkin.reflection
      }
    end
  end
end
