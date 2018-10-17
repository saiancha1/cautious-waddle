CREATE TABLE Consultants (
	ConsultantId   int           NOT NULL IDENTITY(1, 1),
	UserId         nvarchar(450) NOT NULL,
	IsApproved     int           NOT NULL,
	CreationDate   datetime      NOT NULL,
	LastUpdate     datetime      NOT NULL,
	ReminderDate   date          NOT NULL,

	-- Displayed details
	FirstName      varchar(20)   NOT NULL,
	LastName       varchar(20)   NOT NULL,
	ImageURL       varchar(2500),
	SpecialistArea varchar(100),
	ConsultantDesc varchar(3000),
	Phone          varchar(100),
	Email          varchar(320),
	Website        varchar(1000),
	Address1       varchar(50),
	Address2       varchar(50),
	Suburb         varchar(30),
	PostalCode     varchar(10),
	City           varchar(30),
	Country        varchar(30),

	-- Keys
	PRIMARY KEY (ConsultantId)
);