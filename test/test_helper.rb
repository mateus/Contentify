ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../../config/environment', __FILE__)
require 'rails/test_help'
require 'minitest'
require 'minitest/reporters'
require 'webmock/minitest'

Minitest::Reporters.use! [Minitest::Reporters::ProgressReporter.new(color: true)]

class ActiveSupport::TestCase
  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
  fixtures :all

  # Add more helper methods to be used by all tests here...
  setup do
    WebMock.disable_net_connect!
  end
end
