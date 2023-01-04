drop database if exists capstone_project;
create database capstone_project;


use capstone_project;


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


insert into role (`name`) values
    ('USER'),
    ('DEV'),
    ('ADMIN');


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