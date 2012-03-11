task :test do
  test_file = File.expand_path("test/index.html")
  system("phantomjs run-qunit.js file://#{test_file}")
end

task :default => :test
