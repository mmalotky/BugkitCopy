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

create table votes (
	user_id int not null,
    report_id int not null,
    constraint uc_votes unique (user_id, report_id),
    constraint fk_votes_registered_user
		foreign key (user_id)
        references registered_user(user_id),
	constraint fk_votes_reports
		foreign key (report_id)
        references reports(report_id)
);

create table messages (
	message_id int primary key auto_increment,
    message varchar(1024) not null,
    post_date date not null,
    user_id int not null,
    report_id int not null,
    constraint fk_messages_registered_user
		foreign key(user_id)
        references registered_user(user_id),
	constraint fk_messages_reports
		foreign key (report_id)
        references reports(report_id)
);

insert into role (`name`) values
    ('USER'),
    ('DEV'),
    ('ADMIN');

insert into registered_user(username,password_hash, role_id) values
    ("admin", "$2a$12$M97L0g/BETfVkdrWu98lWu29w1T232KW8CtJ8Q4XfP/NISiEy71xq", 3);

