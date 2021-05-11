USE [master]
GO
/****** Object:  Database [CS-B]    Script Date: 07.05.2021 16:47:00 ******/
CREATE DATABASE [CS-B]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'CS-B', FILENAME = N'E:\programmingi\MSSQL\MSSQL15.SQLEXPRESS\MSSQL\DATA\CS-B.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'CS-B_log', FILENAME = N'E:\programmingi\MSSQL\MSSQL15.SQLEXPRESS\MSSQL\DATA\CS-B_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [CS-B] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [CS-B].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [CS-B] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [CS-B] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [CS-B] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [CS-B] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [CS-B] SET ARITHABORT OFF 
GO
ALTER DATABASE [CS-B] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [CS-B] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [CS-B] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [CS-B] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [CS-B] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [CS-B] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [CS-B] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [CS-B] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [CS-B] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [CS-B] SET  DISABLE_BROKER 
GO
ALTER DATABASE [CS-B] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [CS-B] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [CS-B] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [CS-B] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [CS-B] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [CS-B] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [CS-B] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [CS-B] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [CS-B] SET  MULTI_USER 
GO
ALTER DATABASE [CS-B] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [CS-B] SET DB_CHAINING OFF 
GO
ALTER DATABASE [CS-B] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [CS-B] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [CS-B] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [CS-B] SET QUERY_STORE = OFF
GO
USE [CS-B]
GO
/****** Object:  Table [dbo].[Addresses]    Script Date: 07.05.2021 16:47:00 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Addresses](
	[AddressID] [int] IDENTITY(1,1) NOT NULL,
	[StreetName] [char](32) NOT NULL,
	[BuildingNumber] [smallint] NOT NULL,
	[FlatNumber] [smallint] NULL,
	[PostalCode] [char](6) NOT NULL,
 CONSTRAINT [PK_Address] PRIMARY KEY CLUSTERED 
(
	[AddressID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Cases]    Script Date: 07.05.2021 16:47:00 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Cases](
	[CaseID] [int] IDENTITY(1,1) NOT NULL,
	[CaseNumber] [int] NOT NULL,
	[Description] [varchar](1) NOT NULL,
	[Answer] [varchar](1) NOT NULL,
	[Status] [varchar](1) NOT NULL,
	[SendDate] [date] NOT NULL,
	[ClosingDate] [date] NULL,
	[IDClient] [int] NOT NULL,
 CONSTRAINT [PK_Case] PRIMARY KEY CLUSTERED 
(
	[CaseID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Clients]    Script Date: 07.05.2021 16:47:00 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Clients](
	[ClientID] [int] IDENTITY(1,1) NOT NULL,
	[FirstName] [char](16) NOT NULL,
	[LastName] [char](16) NOT NULL,
	[Email] [char](32) NOT NULL,
	[PhoneNumber] [char](9) NOT NULL,
	[IDAddress] [int] NOT NULL,
 CONSTRAINT [PK_Client] PRIMARY KEY CLUSTERED 
(
	[ClientID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ClientsCases]    Script Date: 07.05.2021 16:47:00 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ClientsCases](
	[IDClient] [int] NOT NULL,
	[IDCase] [int] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ClientsCredentials]    Script Date: 07.05.2021 16:47:00 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ClientsCredentials](
	[IDClient] [int] NOT NULL,
	[IDCredentials] [int] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ClientsDeliveryPoints]    Script Date: 07.05.2021 16:47:00 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ClientsDeliveryPoints](
	[IDClient] [int] NOT NULL,
	[IDDeliveryPoint] [int] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ClientsInvoices]    Script Date: 07.05.2021 16:47:00 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ClientsInvoices](
	[IDClient] [int] NOT NULL,
	[IDInvoice] [int] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Credentials]    Script Date: 07.05.2021 16:47:00 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Credentials](
	[CredentialsID] [int] IDENTITY(1,1) NOT NULL,
	[Login] [char](16) NOT NULL,
	[Password] [char](32) NOT NULL,
 CONSTRAINT [PK_Credentials] PRIMARY KEY CLUSTERED 
(
	[CredentialsID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [LOG_Credentials] UNIQUE NONCLUSTERED 
(
	[Login] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DeliveryPoints]    Script Date: 07.05.2021 16:47:00 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DeliveryPoints](
	[DeliveryPointID] [int] IDENTITY(1,1) NOT NULL,
	[HotWaterMeterNumber] [int] NULL,
	[ColdWaterMeterNumber] [int] NULL,
	[IDAddress] [int] NOT NULL,
 CONSTRAINT [PK_DeliveryPoint] PRIMARY KEY CLUSTERED 
(
	[DeliveryPointID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DeliveryPointsAddresses]    Script Date: 07.05.2021 16:47:00 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DeliveryPointsAddresses](
	[AddressID] [int] IDENTITY(1,1) NOT NULL,
	[StreetName] [char](32) NOT NULL,
	[BuildingNumber] [smallint] NOT NULL,
	[FlatNumber] [smallint] NULL,
	[PostalCode] [char](6) NOT NULL,
 CONSTRAINT [PK_DeliveryPointAddress] PRIMARY KEY CLUSTERED 
(
	[AddressID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Invoices]    Script Date: 07.05.2021 16:47:00 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Invoices](
	[InvoiceID] [int] IDENTITY(1,1) NOT NULL,
	[InvoiceNumber] [int] NOT NULL,
	[DateOfIssue] [date] NOT NULL,
	[IDMeterReadFrom] [int] NOT NULL,
	[IDMeterReadTo] [int] NOT NULL,
	[Amount] [smallmoney] NOT NULL,
	[IDDeliveryPoint] [int] NOT NULL,
	[IDClient] [int] NOT NULL,
	[IDShippingAddress] [int] NOT NULL,
 CONSTRAINT [PK_Invoice] PRIMARY KEY CLUSTERED 
(
	[InvoiceID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MeterReads]    Script Date: 07.05.2021 16:47:00 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MeterReads](
	[MeterReadID] [int] IDENTITY(1,1) NOT NULL,
	[HotUsage] [int] NULL,
	[ColdUsage] [int] NULL,
	[ReadDate] [date] NULL,
	[IDDeliveryPoint] [int] NOT NULL,
 CONSTRAINT [PK_MeterRead] PRIMARY KEY CLUSTERED 
(
	[MeterReadID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Cases]  WITH CHECK ADD  CONSTRAINT [FK_Case_Client] FOREIGN KEY([IDClient])
REFERENCES [dbo].[Clients] ([ClientID])
GO
ALTER TABLE [dbo].[Cases] CHECK CONSTRAINT [FK_Case_Client]
GO
ALTER TABLE [dbo].[Clients]  WITH CHECK ADD  CONSTRAINT [FK_Client_Address] FOREIGN KEY([IDAddress])
REFERENCES [dbo].[Addresses] ([AddressID])
GO
ALTER TABLE [dbo].[Clients] CHECK CONSTRAINT [FK_Client_Address]
GO
ALTER TABLE [dbo].[ClientsCases]  WITH CHECK ADD  CONSTRAINT [FK_ClientCase_Case] FOREIGN KEY([IDCase])
REFERENCES [dbo].[Cases] ([CaseID])
GO
ALTER TABLE [dbo].[ClientsCases] CHECK CONSTRAINT [FK_ClientCase_Case]
GO
ALTER TABLE [dbo].[ClientsCases]  WITH CHECK ADD  CONSTRAINT [FK_ClientCase_Client] FOREIGN KEY([IDClient])
REFERENCES [dbo].[Clients] ([ClientID])
GO
ALTER TABLE [dbo].[ClientsCases] CHECK CONSTRAINT [FK_ClientCase_Client]
GO
ALTER TABLE [dbo].[ClientsCredentials]  WITH CHECK ADD  CONSTRAINT [FK_ClientCredential_Client] FOREIGN KEY([IDClient])
REFERENCES [dbo].[Clients] ([ClientID])
GO
ALTER TABLE [dbo].[ClientsCredentials] CHECK CONSTRAINT [FK_ClientCredential_Client]
GO
ALTER TABLE [dbo].[ClientsCredentials]  WITH CHECK ADD  CONSTRAINT [FK_ClientCredential_Credential] FOREIGN KEY([IDCredentials])
REFERENCES [dbo].[Credentials] ([CredentialsID])
GO
ALTER TABLE [dbo].[ClientsCredentials] CHECK CONSTRAINT [FK_ClientCredential_Credential]
GO
ALTER TABLE [dbo].[ClientsDeliveryPoints]  WITH CHECK ADD  CONSTRAINT [FK_ClientDeliveryPoint_Client] FOREIGN KEY([IDClient])
REFERENCES [dbo].[Clients] ([ClientID])
GO
ALTER TABLE [dbo].[ClientsDeliveryPoints] CHECK CONSTRAINT [FK_ClientDeliveryPoint_Client]
GO
ALTER TABLE [dbo].[ClientsDeliveryPoints]  WITH CHECK ADD  CONSTRAINT [FK_ClientDeliveryPoint_DeliveryPoint] FOREIGN KEY([IDDeliveryPoint])
REFERENCES [dbo].[DeliveryPoints] ([DeliveryPointID])
GO
ALTER TABLE [dbo].[ClientsDeliveryPoints] CHECK CONSTRAINT [FK_ClientDeliveryPoint_DeliveryPoint]
GO
ALTER TABLE [dbo].[ClientsInvoices]  WITH CHECK ADD  CONSTRAINT [FK_ClientInvoice_Client] FOREIGN KEY([IDClient])
REFERENCES [dbo].[Clients] ([ClientID])
GO
ALTER TABLE [dbo].[ClientsInvoices] CHECK CONSTRAINT [FK_ClientInvoice_Client]
GO
ALTER TABLE [dbo].[ClientsInvoices]  WITH CHECK ADD  CONSTRAINT [FK_ClientInvoice_Invoice] FOREIGN KEY([IDInvoice])
REFERENCES [dbo].[Invoices] ([InvoiceID])
GO
ALTER TABLE [dbo].[ClientsInvoices] CHECK CONSTRAINT [FK_ClientInvoice_Invoice]
GO
ALTER TABLE [dbo].[DeliveryPoints]  WITH CHECK ADD  CONSTRAINT [FK_DeliveryPoint_Address] FOREIGN KEY([IDAddress])
REFERENCES [dbo].[DeliveryPointsAddresses] ([AddressID])
GO
ALTER TABLE [dbo].[DeliveryPoints] CHECK CONSTRAINT [FK_DeliveryPoint_Address]
GO
ALTER TABLE [dbo].[Invoices]  WITH CHECK ADD  CONSTRAINT [FK_Invoice_Client] FOREIGN KEY([IDClient])
REFERENCES [dbo].[Clients] ([ClientID])
GO
ALTER TABLE [dbo].[Invoices] CHECK CONSTRAINT [FK_Invoice_Client]
GO
ALTER TABLE [dbo].[Invoices]  WITH CHECK ADD  CONSTRAINT [FK_Invoice_DeliveryPoint] FOREIGN KEY([IDDeliveryPoint])
REFERENCES [dbo].[DeliveryPoints] ([DeliveryPointID])
GO
ALTER TABLE [dbo].[Invoices] CHECK CONSTRAINT [FK_Invoice_DeliveryPoint]
GO
ALTER TABLE [dbo].[Invoices]  WITH CHECK ADD  CONSTRAINT [FK_Invoice_MeterReadFrom] FOREIGN KEY([IDMeterReadFrom])
REFERENCES [dbo].[MeterReads] ([MeterReadID])
GO
ALTER TABLE [dbo].[Invoices] CHECK CONSTRAINT [FK_Invoice_MeterReadFrom]
GO
ALTER TABLE [dbo].[Invoices]  WITH CHECK ADD  CONSTRAINT [FK_Invoice_MeterReadTo] FOREIGN KEY([IDMeterReadTo])
REFERENCES [dbo].[MeterReads] ([MeterReadID])
GO
ALTER TABLE [dbo].[Invoices] CHECK CONSTRAINT [FK_Invoice_MeterReadTo]
GO
ALTER TABLE [dbo].[Invoices]  WITH CHECK ADD  CONSTRAINT [FK_Invoice_ShippingAddress] FOREIGN KEY([IDShippingAddress])
REFERENCES [dbo].[Addresses] ([AddressID])
GO
ALTER TABLE [dbo].[Invoices] CHECK CONSTRAINT [FK_Invoice_ShippingAddress]
GO
ALTER TABLE [dbo].[MeterReads]  WITH CHECK ADD  CONSTRAINT [FK_MeterRead_DeliveryPoint] FOREIGN KEY([IDDeliveryPoint])
REFERENCES [dbo].[DeliveryPoints] ([DeliveryPointID])
GO
ALTER TABLE [dbo].[MeterReads] CHECK CONSTRAINT [FK_MeterRead_DeliveryPoint]
GO
ALTER TABLE [dbo].[Addresses]  WITH CHECK ADD CHECK  (([PostalCode] like '__-___'))
GO
ALTER TABLE [dbo].[DeliveryPointsAddresses]  WITH CHECK ADD CHECK  (([PostalCode] like '__-___'))
GO
/****** Object:  StoredProcedure [dbo].[pGetUser]    Script Date: 07.05.2021 16:47:00 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[pGetUser]
@credentialsID int
AS
DECLARE @clientID int
SET @clientID = (SELECT IDClient FROM [CS-B].[dbo].ClientsCredentials as cr WHERE cr.IDCredentials = @credentialsID)
SELECT 
	[CS-B].[dbo].Clients.FirstName,
	[CS-B].[dbo].Clients.LastName,
	[CS-B].[dbo].Clients.PhoneNumber,
	[CS-B].[dbo].Clients.Email,
	[CS-B].[dbo].Addresses.StreetName,
	[CS-B].[dbo].Addresses.BuildingNumber,
	[CS-B].[dbo].Addresses.FlatNumber,
	[CS-B].[dbo].Addresses.PostalCode
FROM 
	[CS-B].[dbo].Clients
JOIN [CS-B].[dbo].Addresses ON Clients.IDAddress = AddressID
WHERE ClientID = @clientID
GO
/****** Object:  StoredProcedure [dbo].[pUserLogin]    Script Date: 07.05.2021 16:47:00 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[pUserLogin]
@username char(16),
@password char(32)
AS
SELECT CredentialsID FROM [CS-B].[dbo].[Credentials] as t WHERE t.Login = @username AND t.Password = @password
GO
USE [master]
GO
ALTER DATABASE [CS-B] SET  READ_WRITE 
GO
