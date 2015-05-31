class RegistrationsController < DeviseController
  protect_from_forgery except: :sign_in
  prepend_before_filter :require_no_authentication, only: [:new, :create, :cancel]
  def new
      @user = User.create(email:params[:email], password:params[:password],name:params[:username],avatar:params[:avatar])
      # @user.save
      sign_in(@user)
      redirect_to "/users/#{@user.id}"
  end


  private

  def configure_permited_parameters
    devise_parameter_sanitizer.for(:sign_up) { |u| u.permit(:username, :email, :password, :confirm) }
  end

end
