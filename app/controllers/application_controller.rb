class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception


  def authenticate_user!
    if current_user != nil
      redirect_to '/error' if current_user.id != params[:id].to_i
    else
      redirect_to '/'
    end
  end
end
