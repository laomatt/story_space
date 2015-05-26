class PassagesController < ApplicationController
  def create
    newpass = Passage.create(user_id:params[:userid], deck_id:params[:storyid], content:params[:content])
    render :json => newpass
  end

  def approve_passage
    passage = Passage.find(params[:id])
    passage.update_attributes(approved:true)
    render :json => passage
  end

  def disapprove_passage
    passage = Passage.find(params[:id])
    passage.update_attributes(approved:false)
    render :json => passage
  end
end
