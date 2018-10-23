CREATE TABLE Companies (
	CompanyId        int           NOT NULL IDENTITY(1, 1),
	UserId           nvarchar(450) NOT NULL,
	IsApproved       int           NOT NULL,
	CreationDate     datetime      NOT NULL,
	LastUpdate       datetime      NOT NULL,
	ReminderDate     date          NOT NULL,
	ContactEmail     varchar(320)  NOT NULL,

	-- Displayed details
	CompanyName      varchar(100)  NOT NULL,
	Logo             varchar(1000),
	Size             int,
	BusinessType     varchar(100),
	SpecialistArea   varchar(100),
	CompanyDesc      varchar(3000),
	Phone            varchar(100),
	Email            varchar(320),
	Website          varchar(1000),
	Address1         varchar(50),
	Address2         varchar(50),
	Suburb           varchar(30),
	PostalCode       varchar(10),
	City             varchar(30),
	Country          varchar(30),
	SummerJobs       int NOT NULL,
	
	-- Keys
	PRIMARY KEY (CompanyId)
);