class ApplicationController < ActionController::Base
  skip_before_filter  :verify_authenticity_token
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception


  def authenticate_user!
    p 'auth '*20
    p current_user
      redirect_to '/error' if current_user.id != params[:id].to_i
  end
end
