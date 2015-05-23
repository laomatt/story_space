class SessionsController < DeviseController
  skip_before_filter :verify_authenticity_token

  def new
    if User.exists?(email:params[:email])
      user = User.find_by(email:params[:email])
      sign_in(user)
      redirect_to "/users/#{user.id}"
    else
      redirect_to '/'
    end
  end


end
