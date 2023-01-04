drop database if exists capstone_project;
create database capstone_project;

use capstone_project;

create table app_role (
	role_id int primary key auto_increment,
    `name` varchar (50) not null unique
);


create table registered_user (
	registered_user_id int primary key auto_increment,
    username varchar(100) not null unique,
    password_hash varchar(2048) not null,
    enabled bit not null default(1),
    role_id int not null,
    constraint fk_registered_user_role_id
		foreign key (role_id)
		references app_role(role_id)
);

insert into app_role (`name`) values
	('Client'),
    ('Developer'),
    ('Admin');

create table report (
	report_id int primary key auto_increment,
    title varchar(100) not null,
    issue_description varchar(1024) not null,
    replication_instructions varchar(1024) not null,
    date_of_reporting date null,
    solved bit not null default(0),
    registered_user_id int not null,
    constraint fk_repoter_registered_user_id
		foreign key (registered_user_id)
		references registered_user(registered_user_id)
);

create table vote (
	vote_count int not null,
    registered_user_id int not null,
    report_id int not null,
    constraint vote_registered_user_id
		foreign key (registered_user_id)
		references registered_user(registered_user_id),
	constraint vote_report_id
		foreign key (report_id)
		references report(report_id)

);