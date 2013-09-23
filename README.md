fbfriends
=========

Login with Facebook and see a list of your Facebook friends


Run instructions
================

Clone the repository and then run:

bundle install

rake db:create

rake db:migrate

rails server

NOTE: rails server must run on port 3000, and the site's URL must be localhost:3000 due to a limitation imposed on apps by Facebook
