// require no : 첫줄 require 있으면 오류발생

module.exports = (sequelize, DataTypes) => {
    /** sqlite는 text 나 varchar가 동일
     * Create table Posts (
     *  id integer primary key autoincreament,
     *  title TEXT not null,
     *  content text,
     *  author text
     * )
     */
    const Post = sequelize.define("Post", {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: DataTypes.STRING,  // allowNull true가 기본
        author: DataTypes.STRING
    });
    Post.associate = function(models) {
        Post.hasMany(models.Comment)
    }    
    return Post;
}