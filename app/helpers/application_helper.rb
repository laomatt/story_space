module ApplicationHelper

  def resource_name
    :user
  end

  def resource
    @resource ||= User.new
  end

  def devise_mapping
    @devise_mapping ||= Devise.mappings[:user]
  end

  # def after_sign_in_path_for(user)
  #  "/url_you_want_to_redirect_to/"
  # end
end
