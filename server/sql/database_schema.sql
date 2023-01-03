drop database if exists capstone_project;
create database capstone_project;



use capstone_project;



create table registered_user (
    registered_user_id int primary key auto_increment,
    username varchar(100) not null unique,
    password_hash varchar(2048) not null,
    enabled bit not null default(1),
    foreign key (role_id)
    references role(role_id)
);



create table role (
    role_id int primary key auto_increment,
    `name` varchar (50) not null unique
);




insert into role (`name`) values
    ('Client'),
    ('Developer'),
    ('Admin');



create table reports (
    report_id int primary key auto_increment,
    title varchar(100) not null,
    issue_description varchar(1024) not null,
    replication_instructions varchar(1024) not null
);