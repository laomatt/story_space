class SessionsController < DeviseController
  skip_before_filter :verify_authenticity_token

  def new
    # sign_in(params[:email])

    if User.exists?(email:params[:email])
      user = User.find_by(email:params[:email])
      redirect_to "users/#{user.id}"
    else
      redirect_to '/'
    end

  end

  def sign_in_and_redirect #(resource_or_scope, resource=nil)
    sign_in(params[:email])
    # scope = Devise::Mapping.find_scope!(resource_or_scope)
    # resource ||= resource_or_scope
    # sign_in(scope, resource) unless warden.user(scope) == resource
    # return render :json => {:success => true}
  end

  def failure
    return render :json => {:success => false, :errors => ["Login failed."]}
  end


end
