class AvatarUploadService
  def self.upload(io:, user:)
    return nil unless io.present? && user.present?

    Cloudinary::Uploader.upload(
      io,
      folder: 'avatars',
      public_id: "user_#{user.id}_avatar",
      overwrite: true,
      resource_type: :image
    )
  rescue StandardError => e
    Rails.logger.error("Avatar upload failed: #{e.message}")
    nil
  end
end
