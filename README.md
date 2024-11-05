# mynodejs
nodejs
https://github.com/mhb8436

# create database and user
create database ch10;  // database ch10생성
create user admin with encrypted password 'admin1234';  // user/admin1234로 계정생성
grant all privileges on database ch10 to admin;  // user 계정에 admin 권한 지정
