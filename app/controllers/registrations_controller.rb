class RegistrationsController < DeviseController
  protect_from_forgery except: :sign_in
  prepend_before_filter :require_no_authentication, only: [:new, :create, :cancel]
  def new
    User.create(email:params[:email], password:params[:password],name:params[:username],avatar:params[:avatar])
    user = User.find_by(email:params[:email])
      sign_in(user)
      p 'h'*90
      p current_user
      p user_signed_in?
      p 'h'*90

      # redirect_to "/users/#{user.id}"
      redirect_to "/"
  end


  private

  def configure_permited_parameters
    devise_parameter_sanitizer.for(:sign_up) { |u| u.permit(:username, :email, :password, :confirm) }
  end

end
