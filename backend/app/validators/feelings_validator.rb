class FeelingsValidator
  attr_reader :errors, :normalized_feelings

  def initialize(feelings)
    @feelings = feelings
    @errors = []
    @normalized_feelings = []
  end

  def valid?
    validate_array
    validate_strings

    return false if errors.any?

    normalize_feelings

    true
  end

  private

  attr_reader :feelings

  def validate_array
    return if feelings.is_a?(Array)

    errors << 'Feelings must be an array'
  end

  def validate_strings
    return unless feelings.is_a?(Array)

    return if feelings.all? { |feeling| feeling.is_a?(String) }

    errors << 'Each feeling must be a string'
  end

  def normalize_feelings
    @normalized_feelings = feelings.map { |f| f.strip.downcase }
  end
end
