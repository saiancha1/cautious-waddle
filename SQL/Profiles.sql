CREATE TABLE Profiles (
	ProfileId  int           NOT NULL IDENTITY(1, 1),
	UserId     nvarchar(450) NOT NULL,
	Email      varchar(320)  NOT NULL,
	FirstName  varchar(50)   NOT NULL,
	LastName   varchar(50)   NOT NULL,
	Bio        varchar(3000) NOT NULL,
	PRIMARY KEY (ProfileId)
);