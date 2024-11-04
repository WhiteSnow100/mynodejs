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
        author: DataTypes.STRING,
        filename: {  // 2024.1104 마이그레이션으로 테이블에 칼럼추가후 수정내용
            type: DataTypes.STRING,
            allowNull: true
        }
    });
    Post.associate = function(models) {
        Post.hasMany(models.Comment)
    }    
    return Post;
}