# frozen_string_literal: true
class HomepageController < ApplicationController
  def index
    @brand_link = 'https://www.contentify.io'
    @extension_url = 'https://chrome.google.com/webstore/detail/contentify/amfoahkobkpngjhnofkneikkcodeeldb?hl=en-US'
    @project_link = 'https://github.com/mateus/Contentify'
  end
end
