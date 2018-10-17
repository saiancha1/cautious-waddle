CREATE TABLE LocalEvents (
	EventId          int           NOT NULL IDENTITY(1, 1),
	UserId           nvarchar(450) NOT NULL,
	IsApproved       int           NOT NULL,
	Expired          int           NOT NULL,
	CreationDate     datetime      NOT NULL,
	LastUpdate       datetime      NOT NULL,

	-- Displayed details
	EventName		 varchar(100)  NOT NULL,
	EventType        varchar(100),
	StartDate        datetime      NOT NULL,
	Duration         int           NOT NULL,
	Recurring        int,
	EventDescription varchar(3000) NOT NULL,
	HostedBy         varchar(200),
	Contact          varchar(100),
	Website          varchar(1000),
	EventLocation    varchar(100)  NOT NULL,
	EventURL         varchar(200),
	ImageURL         varchar(2500),

	-- Keys
	PRIMARY KEY (EventId)
);