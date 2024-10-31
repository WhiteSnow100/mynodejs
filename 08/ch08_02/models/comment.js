// require no : 첫줄 require 있으면 오류발생

module.exports = (sequelize, DataTypes) => {
    /** sqlite는 text 나 varchar가 동일
     * Create table Comments (
     *  id integer primary key autoincreament,
     *  content TEXT,
     *  postId integer  //자동생성
     *  foreign key (postId) references Posts(id)
     * )
     */
    const Comment = sequelize.define("Comment", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        content: DataTypes.STRING  // allowNull true가 기본
    });
    Comment.associate = function(models) {
        models.Comment.belongsTo(models.Post);
    }
    return Comment;
}