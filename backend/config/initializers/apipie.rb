Apipie.configure do |config|
  config.app_name                = "MoodTracker API"
  config.api_base_url            = "/api"
  config.doc_base_url            = "/api-docs"
  config.validate                = false
  config.translate               = false
  config.show_all_examples       = true
  # where is your API defined?
  config.api_controllers_matcher = "#{Rails.root}/app/controllers/**/*.rb"
end
