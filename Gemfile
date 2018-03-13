source 'https://rubygems.org'

ruby '2.4.1'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end

gem 'rails', '~> 5.0.2'
gem 'puma', '~> 3.0'
gem 'pg', '~> 0.20.0'
gem 'sass-rails', '~> 5.0'
gem 'uglifier', '>= 1.3.0'
gem 'httparty', '~> 0.14.0'
gem 'dotenv-rails', '~> 2.2'
gem 'devise', '~> 4.2'
gem 'omniauth-facebook', '~> 4.0'
gem 'activerecord-typedstore'

gem 'turbolinks', '~> 5'
gem 'webpacker', github: 'rails/webpacker'
gem 'rails-html-sanitizer'
gem 'autoprefixer-rails'
gem 'nokogiri', '~> 1.7'
gem 'pry-rails', '~> 0.3.6'
gem 'pry-byebug', '~> 3.4'
gem 'rack-host-redirect'

group :development, :test do
  gem 'byebug', platform: :mri
  gem 'webmock', '~> 3.0'
  gem 'minitest-rails', '~> 3.0'
  gem 'minitest-reporters', '~> 1.1'
end

group :development do
  # Access an IRB console on exception pages or by using <%= console %> anywhere in the code.
  gem 'web-console', '>= 3.3.0'
  gem 'listen', '~> 3.0.5'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
end

group :production do
  gem 'bugsnag', '~> 5.3'
  gem 'dalli', '~> 2.7'
  gem 'memcachier', '~> 0.0.2'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
