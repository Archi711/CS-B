CREATE PROC pUpdateUserData
@userLogin nvarchar(16),
@PhoneNumber int = NULL,
@Email nvarchar(32) = NULL,
@StreetName nvarchar(32) = NULL,
@BuildingNumber int = NULL,
@FlatNumber int = NULL,
@PostalCode nvarchar(6) = NULL 
AS
DECLARE @SQLContact nvarchar(1000)
DECLARE @SQLAddress nvarchar(1000)
DECLARE @params nvarchar(1000)
DECLARE @params2 nvarchar(1000)
DECLARE @userID int 
DECLARE @addID int
DECLARE @runClient bit = 0
DECLARE @runAddress bit = 0
SET @SQLContact = 'UPDATE Clients SET '
SET @SQLAddress = 'UPDATE Addresses SET '

IF ISNULL(@PhoneNumber, '') != ''
BEGIN
	SET @SQLContact = @SQLContact + ' PhoneNumber = @xPhoneNumber,'
	SET @runClient = 1
END

IF ISNULL(@Email, '') != ''
BEGIN
	SET @SQLContact = @SQLContact + ' Email = @xEmail,'
	SET @runClient = 1
END

IF ISNULL(@StreetName, '') != ''
BEGIN
	SET @SQLAddress = @SQLAddress + ' StreetName = @xStreetName,'
	SET @runAddress = 1
END

IF ISNULL(@BuildingNumber, '') != ''
BEGIN
	SET @SQLAddress = @SQLAddress + ' BuildingNumber = @xBuildingNumber,'
	SET @runAddress = 1
END

IF ISNULL(@FlatNumber, '') != ''
BEGIN
	SET @SQLAddress = @SQLAddress + ' FlatNumber = @xFlatNumber,'
	SET @runAddress = 1
END

IF ISNULL(@PostalCode, '') != ''
BEGIN
	SET @SQLAddress = @SQLAddress + ' PostalCode = @xPostalCode,'
	SET @runAddress = 1
END

SET @SQLAddress = LEFT(@SQLAddress, LEN(@SQLAddress)-1)
SET @SQLContact = LEFT(@SQLContact, LEN(@SQLContact)-1)

SET @userID = (SELECT CredentialsID FROM [CS-B].[dbo].[Credentials] as t WHERE t.Login = @userLogin)
SET @userID = (SELECT IDClient FROM [CS-B].[dbo].ClientsCredentials as cr WHERE cr.IDCredentials = @userID)
SET @addID = (SELECT IDAddress FROM Clients WHERE ClientID = @userID)

SET @SQLContact = @SQLContact + ' WHERE ClientID = @xuserID'
SET @SQLAddress = @SQLAddress + ' WHERE AddressID = @xAddressID'

SET @params = '@xPhoneNumber int, @xEmail nvarchar(32), @xuserID int'
SET @params2 = '@xStreetName nvarchar(32), @xBuildingNumber int, @xFlatNumber int, @xPostalCode nvarchar(6), @xAddressID int'

IF @runClient = 1 EXEC sp_executesql @SQLContact, @params, @PhoneNumber, @Email, @userID
IF @runAddress = 1 EXEC sp_executesql @SQLAddress, @params2, @StreetName, @BuildingNumber, @FlatNumber, @PostalCode, @addID

GO
DROP PROC pUpdateUserData
EXEC pUpdateUserData 'admin',NULL,'jan.nowak@mail.eu'

SELECT * FROM Addresses