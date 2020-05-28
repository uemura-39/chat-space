class UsersController < ApplicationController
  def index
    return nil if params[:keyword] == ""
    @users = User.where(['name LIKE ?', "%#{params[:keyword]}%"] ).where.not(id: current_user.id).limit(10)
    respond_to do |format|
      format.html
      format.json
    end
  end

  def edit
    
  end

  def update
    if current_user.update(user_params)
      redirect_to root_path
    elde
      render :edit
    end
  end

  private
  def user_params
    params.require(:usr).permit(:name,:edit) 
  end

end
