Rails.application.config.middleware.use OmniAuth::Builder do
  provider :facebook, '176701892517049', '15ede57a2406472d0e32b72d3ec771bb'
end