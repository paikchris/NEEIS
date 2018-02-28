function Question(options){
    this.id = (options && options.id ? options.id : generateUniqueID() )
    this.questionID = (options && options.questionID ? options.questionID : '' )
}