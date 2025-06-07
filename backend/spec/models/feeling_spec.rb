require 'rails_helper'

RSpec.describe Feeling do
  it 'is valid with name' do
    feeling = create(:feeling)
    expect(feeling).to be_valid
  end

  it 'is invalid without name' do
    feeling = build(:feeling, name: '')
    expect(feeling).not_to be_valid
  end
end
