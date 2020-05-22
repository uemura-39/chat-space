class UsersController < ApplicationController
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
