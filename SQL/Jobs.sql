CREATE TABLE Jobs (
	JobId          int NOT NULL IDENTITY(1, 1),
	UserId         nvarchar(450) NOT NULL,
	IsApproved     int NOT NULL,
	Expired        int NOT NULL,
	CompanyId      int,
	JobTitle       varchar(100) NOT NULL,
	JobDescription varchar(MAX),
	Salary         int,
	ContactFirstName varchar(50),
	ContactLastName varchar(50),
	ContactEmail     varchar(320),
	ContactPhone   varchar(100),
	CompanyName    varchar(100),
	WorkType       varchar(100),
	CreationDate   date NOT NULL,
	LastUpdate     date NOT NULL,
	Expiry         date NOT NULL,

	PRIMARY KEY (JobId),
	FOREIGN KEY (CompanyId) REFERENCES Companies(CompanyId)
);