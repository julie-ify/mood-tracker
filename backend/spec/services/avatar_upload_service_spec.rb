RSpec.describe AvatarUploadService do
  let(:user) { create(:user) }

  # Mock Cloudinary upload response
  before do
    allow(Cloudinary::Uploader).to receive(:upload).and_return({
                                                                 'secure_url' => 'http://test.com/avatar.jpg',
                                                                 'public_id' => 'user_1_avatar'
                                                               })
  end

  it 'returns error when io is missing' do
    result = described_class.upload(io: nil, user: user)
    expect(result[:error]).to include('Invalid input')
  end

  it 'returns error when size exceed 250kb' do
    large_file = Rack::Test::UploadedFile.new(
      Rails.root.join('spec/fixtures/files/large_image.jpg'),
      'image/jpeg'
    )
    result = described_class.upload(io: large_file, user: user)
    expect(result[:error]).to include('File size exceeds 250KB limit')
  end

  it 'returns error when file type is invalid' do
    invalid_file = Rack::Test::UploadedFile.new(
      Rails.root.join('spec/fixtures/files/invalid_file.txt'),
      'text/plain'
    )
    result = described_class.upload(io: invalid_file, user: user)
    expect(result[:error]).to include('Invalid file type')
  end

  it 'uploads image successfully' do
    file = Rack::Test::UploadedFile.new(
      Rails.root.join('spec/fixtures/files/avatar.png'),
      'image/png'
    )
    result = described_class.upload(io: file, user: user)
    expect(result[:data]).to include('secure_url')
    expect(result[:data]).to include('public_id')
  end
end
