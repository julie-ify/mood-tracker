require 'rails_helper'

RSpec.describe Checkin do
  let(:user) { create(:user) }
  let(:feeling) { create(:feeling) }

  it 'is valid with mood, sleep, reflection and feelings' do
    checkin = build(:checkin, user: user, mood: 'happy', sleep: 'five_six', feelings: [feeling])
    expect(checkin).to be_valid
  end

  it 'is invalid without feelings' do
    checkin = build(:checkin, feelings: [])
    checkin.save
    expect(checkin.errors[:feelings]).to include('select at least one feeling')
  end

  it 'is invalid with more than three feelings' do
    feelings = create_list(:feeling, 4)
    checkin = build(:checkin, feelings: feelings)
    checkin.valid?
    expect(checkin.errors[:feelings]).to include('cannot have more than three feelings selected')
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

  it 'can only be done one per day' do
    feelings = create_list(:feeling, 3)
    create(:checkin, user: user, created_at: Time.zone.now, feelings: feelings)
    checkin = build(:checkin, user: user, created_at: Time.zone.now, feelings: feelings)
    checkin.valid?
    expect(checkin.errors[:created_at]).to include('can only check in once per day')
  end

  it 'is invalid when feeling is not in the database' do
    checkin = build(:checkin, feelings: [build(:feeling, name: 'Nonexistent Feeling')])
    checkin.valid?
    expect(checkin.errors[:feelings]).to include('contains feelings that do not exist')
  end
end
