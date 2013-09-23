class SessionsController < ApplicationController
  def new
  end

  def create
  	auth_hash = request.env['omniauth.auth']

    @token = auth_hash["credentials"]["token"]

  	@user = User.find_by_name_and_email(auth_hash["extra"]["raw_info"]["name"], auth_hash["extra"]["raw_info"]["email"])
  	unless @user
  	  user = User.new :name => auth_hash["extra"]["raw_info"]["name"], :email => auth_hash["extra"]["raw_info"]["email"]
  	  user.save
  	end
  end

  def failure
  	render :text => "You did not autorize the app!"
  end
end
