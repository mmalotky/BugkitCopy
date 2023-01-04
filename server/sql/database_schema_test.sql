drop database if exists capstone_project_test;
create database capstone_project_test;

use capstone_project_test;

create table role (
    role_id int primary key auto_increment,
    `name` varchar (50) not null unique
);

create table registered_user (
    user_id int primary key auto_increment,
    username varchar(100) not null unique,
    password_hash varchar(2048) not null,
    enabled bit not null default(1),
    role_id int not null,
    constraint fk_registered_user_role
		foreign key (role_id)
		references role(role_id)
);

create table reports (
    report_id int primary key auto_increment,
    title varchar(100) not null,
    issue_description varchar(1024) not null,
    replication_instructions varchar(1024) not null,
    date_of_reporting date not null,
    completion_status bit not null,
    user_id int not null,
    constraint fk_reports_registered_user
		foreign key (user_id)
		references registered_user(user_id)
);

delimiter //
create procedure set_known_good_state()
begin
	delete from registered_user;
    alter table registered_user auto_increment =1;

    insert into registered_user(username,password_hash, role_id) values
	("admin", "$2a$12$M97L0g/BETfVkdrWu98lWu29w1T232KW8CtJ8Q4XfP/NISiEy71xq", 3);
end //
delimiter ;

insert into role (`name`) values
    ('USER'),
    ('DEV'),
    ('ADMIN');

insert into registered_user(username,password_hash, role_id) values
("admin", "$2a$12$M97L0g/BETfVkdrWu98lWu29w1T232KW8CtJ8Q4XfP/NISiEy71xq", 3);