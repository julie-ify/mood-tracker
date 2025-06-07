require 'rails_helper'

RSpec.describe User do
  it 'is valid with name, email, and password' do
    user = build(:user)
    expect(user).to be_valid
  end

  it 'is invalid without name' do
    user = build(:user, name: '')
    expect(user).not_to be_valid
  end

  it 'is invalid without password' do
    user = build(:user, password_digest: :null)
    expect(user).not_to be_valid
  end

  it 'is invalid without email' do
    user = build(:user, email: :null)
    expect(user).not_to be_valid
  end

  it 'requires a valid email' do
    user = build(:user, email: 'test.example.cpm')
    expect(user).not_to be_valid
  end

  it 'requires a unique email' do
    create(:user, email: 'test@example.com')
    user = build(:user, email: 'test@example.com')
    expect(user).not_to be_valid
  end
end
