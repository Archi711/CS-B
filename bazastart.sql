

CREATE TABLE Addresses(
	AddressID int IDENTITY(1,1) NOT NULL,
	StreetName char(32) NOT NULL,
	BuildingNumber smallint NOT NULL,
	FlatNumber smallint,
	PostalCode char (6) NOT NULL CHECK (PostalCode LIKE '__-___'),
) ON [PRIMARY]
GO

CREATE TABLE DeliveryPointsAddresses(
	AddressID int IDENTITY(1,1) NOT NULL,
	StreetName char(32) NOT NULL,
	BuildingNumber smallint NOT NULL,
	FlatNumber smallint,
	PostalCode char (6) NOT NULL CHECK (PostalCode LIKE '__-___'),
) ON [PRIMARY]
GO

CREATE TABLE Credentials(
	CredentialsID int IDENTITY(1,1) NOT NULL,
	Login char(16) NOT NULL,
	Password char(32) NOT NULL,
) ON [PRIMARY]
GO

CREATE TABLE Clients(
	ClientID int IDENTITY (1,1) NOT NULL,
	FirstName char(16) NOT NULL,
	LastName char(16) NOT NULL,
	Email char(32) NOT NULL,
	PhoneNumber char(9) NOT NULL,
	IDAddress int NOT NULL,
) ON [PRIMARY]
GO

CREATE TABLE ClientsCredentials(
	IDClient int NOT NULL,
	IDCredentials int NOT NULL,
) ON [PRIMARY]
GO

CREATE TABLE ClientsCases(
	IDClient int NOT NULL,
	IDCase int NOT NULL,
) ON [PRIMARY]
GO

CREATE TABLE ClientsInvoices(
	IDClient int NOT NULL,
	IDInvoice int NOT NULL,
) ON [PRIMARY]
GO

CREATE TABLE DeliveryPoints(
	DeliveryPointID int IDENTITY(1,1) NOT NULL,
	HotWaterMeterNumber int,
	ColdWaterMeterNumber int,
	IDAddress int NOT NULL,
) ON [PRIMARY]
GO

CREATE TABLE ClientsDeliveryPoints(
	IDClient int NOT NULL,
	IDDeliveryPoint int NOT NULL,
) ON [PRIMARY]
GO

CREATE TABLE MeterReads(
	MeterReadID int IDENTITY(1,1) NOT NULL,
	HotUsage int,
	ColdUsage int,
	ReadDate Date,
	IDDeliveryPoint int NOT NULL,
) ON [PRIMARY]
GO

CREATE TABLE Invoices(
	InvoiceID int IDENTITY(1,1) NOT NULL,
	InvoiceNumber int NOT NULL,
	DateOfIssue Date NOT NULL,
	IDMeterReadFrom int NOT NULL,
	IDMeterReadTo int NOT NULL,
	Amount smallmoney NOT NULL,
	IDDeliveryPoint int NOT NULL,
	IDClient int NOT NULL,
	IDShippingAddress int NOT NULL,
) ON [PRIMARY]
GO

CREATE TABLE Cases(
	CaseID int IDENTITY(1,1) NOT NULL,
	CaseNumber int NOT NULL,
	Description varchar NOT NULL,
	Answer varchar NOT NULL,
	Status varchar NOT NULL,
	SendDate Date NOT NULL,
	ClosingDate Date,
	IDClient int NOT NULL,
) ON [PRIMARY]
GO

---- PK

ALTER TABLE [dbo].[Addresses] WITH NOCHECK ADD 
	CONSTRAINT [PK_Address] PRIMARY KEY  CLUSTERED 
	(
		AddressID
	)  ON [PRIMARY] 
GO

ALTER TABLE [dbo].[DeliveryPointsAddresses] WITH NOCHECK ADD 
	CONSTRAINT [PK_DeliveryPointAddress] PRIMARY KEY  CLUSTERED 
	(
		AddressID
	)  ON [PRIMARY] 
GO

ALTER TABLE [dbo].[Clients] WITH NOCHECK ADD 
	CONSTRAINT [PK_Client] PRIMARY KEY  CLUSTERED 
	(
		ClientID
	)  ON [PRIMARY] 
GO

ALTER TABLE [dbo].[Credentials] WITH NOCHECK ADD 
	CONSTRAINT [PK_Credentials] PRIMARY KEY  CLUSTERED 
	(
		CredentialsID
	)  ON [PRIMARY] 
GO

ALTER TABLE [dbo].[DeliveryPoints] WITH NOCHECK ADD 
	CONSTRAINT [PK_DeliveryPoint] PRIMARY KEY  CLUSTERED 
	(
		DeliveryPointID
	)  ON [PRIMARY] 
GO

ALTER TABLE [dbo].[MeterReads] WITH NOCHECK ADD 
	CONSTRAINT [PK_MeterRead] PRIMARY KEY  CLUSTERED 
	(
		MeterReadID
	)  ON [PRIMARY] 
GO

ALTER TABLE [dbo].[Invoices] WITH NOCHECK ADD 
	CONSTRAINT [PK_Invoice] PRIMARY KEY  CLUSTERED 
	(
		InvoiceID
	)  ON [PRIMARY] 
GO

ALTER TABLE [dbo].[Cases] WITH NOCHECK ADD 
	CONSTRAINT [PK_Case] PRIMARY KEY  CLUSTERED 
	(
		CaseID
	)  ON [PRIMARY] 
GO

--- FK

ALTER TABLE [dbo].[Clients] ADD 
	CONSTRAINT [FK_Client_Address] FOREIGN KEY 
	(
		[IDAddress]
	) REFERENCES [dbo].[Addresses] (
		[AddressID]
	)
GO

ALTER TABLE [dbo].[ClientsCredentials] ADD 
	CONSTRAINT [FK_ClientCredential_Client] FOREIGN KEY 
	(
		[IDClient]
	) REFERENCES [dbo].[Clients] (
		[ClientID]
	),
	CONSTRAINT [FK_ClientCredential_Credential] FOREIGN KEY 
	(
		[IDCredentials]
	) REFERENCES [dbo].[Credentials] (
		[CredentialsID]
	)
GO

ALTER TABLE [dbo].[ClientsInvoices] ADD 
	CONSTRAINT [FK_ClientInvoice_Client] FOREIGN KEY 
	(
		[IDClient]
	) REFERENCES [dbo].[Clients] (
		[ClientID]
	),
	CONSTRAINT [FK_ClientInvoice_Invoice] FOREIGN KEY 
	(
		[IDInvoice]
	) REFERENCES [dbo].[Invoices] (
		[InvoiceID]
	)
GO
ALTER TABLE [dbo].[ClientsCases] ADD 
	CONSTRAINT [FK_ClientCase_Client] FOREIGN KEY 
	(
		[IDClient]
	) REFERENCES [dbo].[Clients] (
		[ClientID]
	),
	CONSTRAINT [FK_ClientCase_Case] FOREIGN KEY 
	(
		[IDCase]
	) REFERENCES [dbo].[Cases] (
		[CaseID]
	)
GO

ALTER TABLE [dbo].[ClientsDeliveryPoints] ADD 
	CONSTRAINT [FK_ClientDeliveryPoint_Client] FOREIGN KEY 
	(
		[IDClient]
	) REFERENCES [dbo].[Clients] (
		[ClientID]
	),
	CONSTRAINT [FK_ClientDeliveryPoint_DeliveryPoint] FOREIGN KEY 
	(
		[IDDeliveryPoint]
	) REFERENCES [dbo].[DeliveryPoints] (
		[DeliveryPointID]
	)
GO
ALTER TABLE [dbo].[DeliveryPoints] ADD 
	CONSTRAINT [FK_DeliveryPoint_Address] FOREIGN KEY 
	(
		[IDAddress]
	) REFERENCES [dbo].[DeliveryPointsAddresses] (
		[AddressID]
	)
GO

ALTER TABLE [dbo].[MeterReads] ADD 
	CONSTRAINT [FK_MeterRead_DeliveryPoint] FOREIGN KEY 
	(
		[IDDeliveryPoint]
	) REFERENCES [dbo].[DeliveryPoints] (
		[DeliveryPointID]
	)
GO


ALTER TABLE [dbo].[Invoices] ADD 
	CONSTRAINT [FK_Invoice_DeliveryPoint] FOREIGN KEY 
	(
		[IDDeliveryPoint]
	) REFERENCES [dbo].[DeliveryPoints] (
		[DeliveryPointID]
	),
	CONSTRAINT [FK_Invoice_Client] FOREIGN KEY 
	(
		[IDClient]
	) REFERENCES [dbo].[Clients] (
		[ClientID]
	),
	CONSTRAINT [FK_Invoice_ShippingAddress] FOREIGN KEY 
	(
		[IDShippingAddress]
	) REFERENCES [dbo].[Addresses] (
		[AddressID]
	),
	CONSTRAINT [FK_Invoice_MeterReadFrom] FOREIGN KEY 
	(
		[IDMeterReadFrom]
	) REFERENCES [dbo].[MeterReads] (
		[MeterReadID]
	),
	CONSTRAINT [FK_Invoice_MeterReadTo] FOREIGN KEY 
	(
		[IDMeterReadTo]
	) REFERENCES [dbo].[MeterReads] (
		[MeterReadID]
	)
GO

ALTER TABLE [dbo].[Cases] ADD
	CONSTRAINT [FK_Case_Client] FOREIGN KEY 
	(
		[IDClient]
	) REFERENCES [dbo].[Clients] (
		[ClientID]
	)
GO
















