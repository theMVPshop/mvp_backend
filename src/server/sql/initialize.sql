DROP TABLE IF EXISTS milestones, permissions, devlog, users, projects;

CREATE TABLE usersCredentials (
  id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(50),
  password VARCHAR(200),
  email VARCHAR(50),
  PRIMARY KEY (id, username),
  UNIQUE KEY (username)
);

CREATE TABLE users (        
  id INT NOT NULL AUTO_INCREMENT,
  firstName VARCHAR(50),
  lastName VARCHAR(50),
  isModerator BOOLEAN,
  username VARCHAR(50),
  PRIMARY KEY (username),
  FOREIGN KEY (username) REFERENCES usersCredentials (username)
);

CREATE TABLE projects (
id INT NOT NULL AUTO_INCREMENT,
title VARCHAR(50),
description VARCHAR(150),
PRIMARY KEY (id)
);

CREATE TABLE milestones (
id INT NOT NULL AUTO_INCREMENT,
title VARCHAR(50),
subtitle VARCHAR(50),
project_id INT NOT NULL,
due_date VARCHAR(12),
ms_status VARCHAR(16),
description VARCHAR(50),
PRIMARY KEY (id),
FOREIGN KEY (project_id) REFERENCES projects (id) 
        ON DELETE CASCADE
);

CREATE TABLE devlog (
id INT NOT NULL AUTO_INCREMENT,
title VARCHAR(50),
description VARCHAR(50),
project_id INT NOT NULL,
time_stamp INT NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY (project_id) REFERENCES projects (id) 
        ON DELETE CASCADE
);

CREATE TABLE permissions (
id INT NOT NULL AUTO_INCREMENT,
username VARCHAR(50),
project_id INT NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY (username) REFERENCES users (username) 
        ON DELETE CASCADE,
FOREIGN KEY (project_id) REFERENCES projects (id) 
        ON DELETE CASCADE
);


INSERT INTO users
	(username, isModerator)
VALUES 
  ("johnnyuserboy", true), ("TEST", false), ("clarson08@gmail.com", false);

INSERT INTO projects
	(title, description)
VALUES
	("First Project", "first descript"), ("Another Project", "another descript");
    
INSERT INTO milestones
	(title, subtitle, project_id, due_date, ms_status, description)
VALUES
	("Begin", "Talk about project", 1, "01/01/2021", "TODO", "NA"),
    ("Wireframe", "Show wireframes to client", 1, "01/01/2021", "TODO", "NA"),
    ("Begin", "Talk about project", 2, "01/01/2021", "TODO", "NA"),
    ("Wireframe", "Show to client", 2, "01/01/2021", "TODO", "NA"),
    ("Finish", "Project is completed", 2, "01/01/2021", "TODO", "NA"),
    ("Finish", "Project is completed", 1, "01/01/2021", "TODO", "NA");

INSERT INTO devlog
	(title, description, project_id, time_stamp)
VALUES
	("Start the project", "We will start work now.", 1, 1617067890);
    
INSERT INTO permissions
	(username, project_id)
VALUES
	("johnnyuserboy", 1),
    ("clarson08@gmail.com", 1);