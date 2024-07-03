export const createUsersTable = `
CREATE TABLE [dbo].[Users](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](255) NOT NULL,
	[Email] [nvarchar](255) NOT NULL,
	[PhoneNumber] [nvarchar](255) NOT NULL,
	[Password] [nvarchar](255) NOT NULL,
	[UserType] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[Email] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]

`;

export const createListingsTable = `
CREATE TABLE [dbo].[Listings](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[Title] [nvarchar](255) NOT NULL,
	[Condition] [nvarchar](255) NOT NULL,
	[Price] [money] NULL,
	[Description] [nvarchar](255) NOT NULL,
	[UserID] [int] NULL,
	[MainImage] [nvarchar](255) NULL,
	[CreationDate] [datetime2](7) NULL  DEFAULT (CONVERT([datetime2](0),sysdatetime())) ,
	[Status] [nvarchar](255) NULL DEFAULT ('Available'),
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
`;
