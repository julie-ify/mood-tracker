require 'rails_helper'

RSpec.describe Checkin do
  let(:user) { create(:user) }
  let(:feeling) { create(:feeling) }

  it 'is valid with mood, sleep, reflection and feelings' do
    checkin = build(:checkin, user: user, mood: 'happy', sleep: 'five_six', feelings: [feeling])
    expect(checkin).to be_valid # be_valid calls .valid? internally
  end

  it 'is invalid without feelings' do
    checkin = build(:checkin, feelings: [])
    checkin.save # triggers validations
    expect(checkin.errors[:feelings]).to include('must select at least 1 feeling')
  end

  it 'is invalid with more than three feelings' do
    feelings = create_list(:feeling, 4)
    checkin = build(:checkin, feelings: feelings)
    checkin.valid? # triggers validations
    expect(checkin.errors[:feelings]).to include('cannot have more than 3 selected')
  end

  it 'is invalid without mood' do
    feelings = create_list(:feeling, 3)
    checkin = build(:checkin, mood: '', feelings: feelings)
    expect(checkin).not_to be_valid
  end

  it 'is invalid without sleep' do
    feelings = create_list(:feeling, 3)
    checkin = build(:checkin, sleep: '', feelings: feelings)
    expect(checkin).not_to be_valid
  end

  it 'raises an error when mood is invalid' do
    expect { build(:checkin, mood: 'not_happy') }.to raise_error(ArgumentError, /is not a valid mood/)
  end

  it 'raises an error when sleep is invalid' do
    expect { build(:checkin, sleep: 'one_one') }.to raise_error(ArgumentError, /is not a valid sleep/)
  end
end
