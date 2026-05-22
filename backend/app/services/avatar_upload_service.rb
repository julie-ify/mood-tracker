class AvatarUploadService
  def self.upload(io:, user:)
    return { success: false, error: 'Invalid input' } unless io.present? && user.present?

    return { success: false, error: 'File size exceeds 250KB limit' } if io.size > 250.kilobytes

    allowed_types = ['image/png', 'image/jpeg', 'image/jpg']

    return { success: false, error: 'Invalid file type' } unless allowed_types.include?(io.content_type)

    Cloudinary::Uploader.destroy(user.avatar_public_id, resource_type: :image) if user.avatar_public_id.present?

    upload = Cloudinary::Uploader.upload(
      io,
      folder: 'avatars',
      public_id: "user_#{user.id}_avatar",
      overwrite: true,
      resource_type: :image
    )

    { success: true, data: upload }
  rescue StandardError => e
    Rails.logger.error("Avatar upload failed: #{e.message}")
    { success: false, error: 'Avatar upload failed' }
  end
end
