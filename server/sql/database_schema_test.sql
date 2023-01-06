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

delimiter //
create procedure set_known_good_state()
begin
	delete from votes;
    delete from reports;
    alter table reports auto_increment = 1;

    delete from registered_user;
    alter table registered_user auto_increment = 1;

    insert into registered_user(username,password_hash, role_id) values
		("admin", "$2a$12$M97L0g/BETfVkdrWu98lWu29w1T232KW8CtJ8Q4XfP/NISiEy71xq", 3),
        ('test', "$2a$10$7JquBL6mi2OO85djCq4jUecR/aKurpmW8Niv1ohxNtoJdoNZPrcKK", 1);

    insert into reports(title, issue_description, replication_instructions, date_of_reporting, completion_status, user_id) values
		("Bad Error", "It broke my computer", "Throw the computer into the lake", "2022-10-12", 0, 2),
        ("Won't turn on", "My laptop won't turn on", "Watch all of Game of Thrones while unplugged", "2022-02-06", 0, 1),
        ("Ate my homework", "The program deleted my file", "Save a Word Document at any time", "2022-03-13", 1, 1);

	insert into votes (user_id, report_id) values
		(1, 1),
        (1, 2),
        (2, 2);

end //
delimiter ;

insert into role (`name`) values
    ('USER'),
    ('DEV'),
    ('ADMIN');

insert into registered_user(username,password_hash, role_id) values
    ("admin", "$2a$12$M97L0g/BETfVkdrWu98lWu29w1T232KW8CtJ8Q4XfP/NISiEy71xq", 3),
    ('test', "$2a$10$7JquBL6mi2OO85djCq4jUecR/aKurpmW8Niv1ohxNtoJdoNZPrcKK", 1);

insert into reports(title, issue_description, replication_instructions, date_of_reporting, completion_status, user_id) values
		("Bad Error", "It broke my computer", "Throw the computer into the lake", "2022-10-12", 0, 2),
        ("Won't turn on", "My laptop won't turn on", "Watch all of Game of Thrones while unplugged", "2022-02-06", 0, 1),
        ("Ate my homework", "The program deleted my file", "Save a Word Document at any time", "2022-03-13", 1, 1);

insert into votes (user_id, report_id) values
		(1, 1),
        (1, 2),
        (2, 2);