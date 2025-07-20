module ApipieExamples
  def self.load_example(file)
    YAML.load_file(Rails.root.join('doc/apipie_examples', file)).to_json
  end
end
