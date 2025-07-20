class Api::FeelingsController < ApplicationController
  api :GET, '/feelings', 'Get list of all feelings'
  example ApipieExamples.load_example('feelings.yml')
  def index
    feelings = Feeling.all
    render json: feelings, status: :ok
  end
end
