DROP DATABASE IF EXISTS stocky;
CREATE DATABASE IF NOT EXISTS stocky;
USE stocky;

CREATE TABLE IF NOT EXISTS `Admin` (

  `AID` int auto_increment PRIMARY KEY,
  `Username` VARCHAR(100) NOT NULL,
  `Aemail` VARCHAR(100) NOT NULL,
  `Password` VARCHAR(100) NOT NULL,
  `AFname` VARCHAR(100) NOT NULL,
  `ALname` VARCHAR(100) NOT NULL,
  `PhoneNo` CHAR(12) NOT NULL,
  CONSTRAINT UQ_Username UNIQUE (Username)
);

CREATE TABLE IF NOT EXISTS `LogInHistory` (
  `AID` int NOT NULL,
  `LogID` CHAR(6) NOT NULL,
  `LogDate` datetime NOT NULL,
  `Username` VARCHAR(100) NOT NULL,
  CONSTRAINT PK_login PRIMARY KEY (LogID,AID,Username),
  CONSTRAINT FK_AID_LogInHistory FOREIGN KEY (AID) REFERENCES Admin(AID) ON DELETE CASCADE on update cascade ,
  CONSTRAINT FK_Username_LogInHistory FOREIGN KEY (Username) REFERENCES Admin(Username) ON DELETE CASCADE on update cascade 
);

ALTER TABLE admin AUTO_INCREMENT=100;

INSERT INTO `Admin` (`Username`, `Aemail`, `Password`, `AFname`, `ALname`, `PhoneNo`) VALUES
('S_Coups', 's_coups@gmail.com', 'password1', 'Choi', 'Seung-cheol', '0921234567'),
('Jeonghan', 'jeonghan@gmail.com', 'password2', 'Yoon', 'Jeong-han', '0922345678'),
('Joshua', 'joshua@gmail.com', 'password3', 'Joshua', 'Hong', '0923456789'),
('Jun', 'jun@gmail.com', 'password4', 'Wen', 'Jun-hui', '0924567890'),
('Hoshi', 'hoshi@gmail.com', 'password5', 'Kwon', 'Soon-young', '0925678901'),
('Wonwoo', 'wonwoo@gmail.com', 'password6', 'Jeon', 'Won-woo', '0926789012'),
('Woozi', 'woozi@gmail.com', 'password7', 'Lee', 'Ji-hoon', '0927890123'),
('DK', 'dk@gmail.com', 'password8', 'Lee', 'Seok-min', '0928901234'),
('Mingyu', 'mingyu@gmail.com', 'password9', 'Kim', 'Min-gyu', '0929012345'),
('The8', 'the8@gmail.com', 'password10', 'Xu', 'Minghao', '0920123456'),
('Seungkwan', 'seungkwan@gmail.com', 'password11', 'Boo', 'Seung-kwan', '0921234567'),
('Vernon', 'vernon@gmail.com', 'password12', 'Hansol', 'Chwe', '0922345678'),
('Dino', 'dino@gmail.com', 'password13', 'Lee', 'Chan', '0923456789'),
('soup', 'ssoup@gmail.com', 'souplnwza007', 'Choi-Lee', 'Chanyeon', '0921244589');


INSERT INTO `LogInHistory` (`AID`, `LogID`, `LogDate`, `Username`) VALUES
(101, 'LOG002', '2024-04-18 08:30:00', 'S_Coups'),
(102, 'LOG003', '2024-04-18 09:15:00', 'Jeonghan'),
(103, 'LOG004', '2024-04-18 10:00:00', 'Joshua'),
(104, 'LOG005', '2024-04-18 10:45:00', 'Jun'),
(105, 'LOG006', '2024-04-18 11:30:00', 'Hoshi'),
(106, 'LOG007', '2024-04-18 12:15:00', 'Wonwoo'),
(107, 'LOG008', '2024-04-18 13:00:00', 'Woozi'),
(108, 'LOG009', '2024-04-18 13:45:00', 'DK'),
(109, 'LOG010', '2024-04-18 14:30:00', 'Mingyu'),
(110, 'LOG011', '2024-04-18 15:15:00', 'The8');


CREATE TABLE IF NOT EXISTS `Product` (
  `PID` int auto_increment PRIMARY KEY,
  `P_name` varchar(100) NOT NULL,
  `Description` text ,
  `quantity` int NOT NULL,
  `Price` double NOT NULL,
  `Pic` text ,
  `Size` double NOT NULL,
  `ReDate` date NOT NULL,
  `Category` varchar(50) NOT NULL,
  `color` varchar(20) NOT NULL,
  CONSTRAINT UQ_Pname UNIQUE (P_name)
);
ALTER TABLE Product AUTO_INCREMENT=300;
insert into `Product` (`P_name`, `Description`,`quantity`, `Price`, `Pic`, `Size`, `ReDate`, `Category`, `color`) values
('Jordan 4 Retro', 'The Air Jordan 4 Retro Military Blue 2024 stands as a beacon of Jordan Brand innovation and style.'
, 9, 265.00, 'https://lh3.googleusercontent.com/drive-viewer/AKGpihbzHezVDrShuxVtLLJ_neFlaeug6Ie_rCsr_u916vHoVZEiYxSuBf8AU9X4cyWbM0-Tev2fzvT7bFdgdJKyTT3vfFXskrYB5g=s2560', 4, '2024-04-05', 'Man', 'white'),
('Nike Dunk Low Retro', 'From the school-spirited College Colors Program to the vibrant Nike CO.JP collection, Nike Dunks have seen many colorways since the design’s inception in 1985.',
 2, 93.00, 'https://lh3.googleusercontent.com/drive-viewer/AKGpihbwHG9RxZrgprX6US3HGqJ0Tzi-qBf5uEXM4n3wemZbUR9RDelLfsobGrgovtZZo1GQGTRF2AKn8fUp6p2Plsu7WG6S0hdCkig=s2560', 4.5, '2021-10-03', 'Kid', 'black'),
('3Jordan 4 Retro Bred Reimagined', 'Rediscover a classic with the Jordan 4 Retro Bred Reimagined, dropping on February 17, 2024. This sneaker is a fresh take on the iconic Jordan 4, bringing a contemporary edge to a timeless design. ',
0 , 86.00, 'https://lh3.googleusercontent.com/drive-viewer/AKGpihYnOVLmDTwEx4bmV_EqZT5q5ExA4UXgr_31w5OB6SW4k04s7St3968KWQ7-CE4NFc_qu0OOi2t5wubjMYM8rV4KDxXGA-cx0lA=s1600-v0', 5, '2024-02-17', 'Man', 'red'),
('Nike Air Max 1 Jackie Robinson', 'Step into a legacy of greatness with the Nike Air Max 1 86 Jackie Robinson, an exquisite sneaker that celebrates the trailblazing spirit of the iconic baseball legend. ',
3 , 310.00, 'https://lh3.googleusercontent.com/drive-viewer/AKGpihb6PrHCrOl8pSjAeaITYZjbUc9ggOCzkEU3-242FTXPvSDOp4dlxKX5cf_vt6evORvywySGBL_dHTgD433yPvrN4k5T3gCln9U=s1600-v0', 5.5, '2024-04-15', 'Man', 'blue'),
('Nike Dunk Low Polar Blue', 'The Nike Dunk Low in Polar Blue is a unique and crisp colorway of the Dunk Low shoes traditionally worn on the basketball court since the mid-1980s.',
0 , 99.00, 'https://lh3.googleusercontent.com/drive-viewer/AKGpihbgQOu8vzPSq33yGx-6cT4Wqb8d8jlqIN9U6z3-nSbplo13B-sBry2mxrDnsYpFC7kzAXwo4WMsOBarAkHXU2enGz_YqzMFbHI=s1600-v0', 4.5, '2023-10-14', 'Man', 'blue'),
('Nike Dunk Low Chlorophyll', 'The Nike Dunk Low Chlorophyll features a light green smooth leather upper with darker green overlays and white Swooshes. Woven tongue labels and Nike embroideries on the heel tabs add a retro look. At the base, a white and green foam sole completes the design.',
0 , 164.00, 'https://lh3.googleusercontent.com/drive-viewer/AKGpihbWYTiVEV99HdmYliQ6cvD1jrXZqzHxlNANDDQ82UpZLCMetGf-5jN5DeGrySBEfr6whzKzhmtUMujFbJGWuNBYw1DoelOUsuA=s1600-v0', 6, '2022-08-07', 'Man', 'green'),
('Nike Dunk Low Light Bone Rough Red', null,
2 , 65.00, 'https://lh3.googleusercontent.com/drive-viewer/AKGpihZe7-FOcZvnF6hQ1xRBPNXYnGrVz9KMzc3e8ZdxllrMLc5ouQZEFUCrKgKP9T756wUJOgcSTTioX0vU3fWt6rnCcq4uMu7i4Hg=s1600-v0', 4.5, '2003-01-01', 'Man', 'brown'),
('Nike Dunk Low Rose Whisper', 'The Nike Dunk Low Rose Whisper arrives in a classic two-tone color blocked look similar to the original Nike Dunks of the 1980s. This Dunk offers a warm palette primed for the summer weather, with a white and Rose Whisper leather construction.',
10 , 79.00, 'https://lh3.googleusercontent.com/drive-viewer/AKGpihYt-UNrArsmJroDQ9U-06SXMvYiAXCqL5kjSB7Rds0P-EXxXVby8UdWUAs-mbXPTW3LaWtUugotjOdSMGaty03GvG4ce5D2mQ=s1600-v0', 4, '2024-08-03', 'Woman', 'pink'),
('Nike Dunk Low Give Her Flowers', null,
13 , 218.00, 'https://lh3.googleusercontent.com/drive-viewer/AKGpihYBejEj4yF_VXMUn2BntwxCvLyqZIww4nyscZ0mLBM39PX6iXGIVRGqvBjSKw0qLEx95YJtG_YbVwk-wc0KObpOvIubbns4f5A=s1600-v0', 5, '2024-08-03', 'Woman', 'pink'),
('Nike Dunk Low Cacao Wow', 'Nike did it again on July 28, 2023, when they dropped the Dunk Low in the enticing Cacao Wow colorway. This shoe is a surefire hit for those who crave unique kicks.',
3 , 114.00, 'https://lh3.googleusercontent.com/drive-viewer/AKGpihbpP1lgd7L9sY-VOB1AQqBdUyJHCQSQayl5ewCb6pd6TBDcMTVZKZdEHuqfQ_68-ve5EbbCQIP5j3yqWbEEUpQ2uh-seJXNZXg=s1600-rw-v1', 5, '2023-07-28', 'Woman', 'brown'),
('Nike Dunk Low Valentine', 'The Nike Dunk Low Valentines Day (2024) (Women) reconfigures the colors and fabrics of a classic silhouette. The bold, romantic colors of this sneaker specifically sized for women complement the Nike Dunk dependability.',
5 , 98.00, 'https://lh3.googleusercontent.com/drive-viewer/AKGpihby1cG2FkR7bgE830RPTNqfutsRw6Q2eraQoCIIsc5-85-2SIKu3_wZsLztHHw7dj2YboAabOwkALv5d-QPlxv6wSg8eziCh-0=s2560',4.5,'2023-07-28', 'Woman', 'red'),
('adidas Campus 00s Grey Gum ', 'The adidas Campus 00s Grey Gum (GS) was designed particularly for grade schoolers and comes in a Grey Three and Cloud White colorway.',
13 , 80.00, 'https://lh3.googleusercontent.com/drive-viewer/AKGpihZVQgDnK7YTha1f1o7gtZeXl6YfMa3FDtciJ6mK1Bu9vmvljv6quJz7qGVTZeD_uZti5fTlZ-V_c79niszyDQjLIzknS1fSuLg=s1600-rw-v1', 5, '2024-02-18', 'Kid', 'grey')
;
--  CONSTRAINT FK_PID FOREIGN KEY (PID) REFERENCES Product(PID),

CREATE TABLE IF NOT EXISTS `ModifyProduct` (
  `PID` int NOT NULL,
  `AID` int NOT NULL,
  `T_product` datetime NOT NULL,
  `Username` VARCHAR(100) NOT NULL,
  `Action` TEXT NOT NULL,
  CONSTRAINT PKmodi__product PRIMARY KEY (AID, T_product),
  CONSTRAINT FK_Aid_pro FOREIGN KEY (AID) REFERENCES Admin(AID),
  CONSTRAINT FK_user FOREIGN KEY (Username) REFERENCES Admin(Username)
);

INSERT INTO `ModifyProduct` (`PID`, `AID`,`T_product`, `Username`,  `Action`) VALUES
(301, 101, '2024-04-18 09:00:00', 'S_Coups', 'Updated product description'),
(302, 102, '2024-04-18 10:00:00', 'Jeonghan', 'Updated product price'),
(303, 103, '2024-04-18 11:00:00', 'Joshua', 'Updated product quantity'),
(304, 104, '2024-04-18 12:00:00', 'Jun', 'Added new product variant'),
(305, 105, '2024-04-18 13:00:00', 'Hoshi', 'Deleted product'),
(306, 106, '2024-04-18 14:00:00', 'Wonwoo', 'Updated product image'),
(307, 107, '2024-04-18 15:00:00', 'Woozi', 'Updated product category'),
(308, 108, '2024-04-18 16:00:00', 'DK', 'Updated product color'),
(309, 109, '2024-04-18 17:00:00', 'Mingyu', 'Updated product size'),
(310, 110, '2024-04-18 18:00:00', 'The8', 'Added new product category');

CREATE TABLE IF NOT EXISTS `ModifyAdmin` (
  `AID` int NOT NULL,
  `Username` VARCHAR(100) NOT NULL,
   `T_admin` datetime NOT NULL,
  `Action` TEXT NOT NULL,
  CONSTRAINT PKmodi__admin PRIMARY KEY (AID, T_admin),
  CONSTRAINT FK_Aid_ad FOREIGN KEY (AID) REFERENCES Admin(AID) on delete cascade on update cascade ,
  CONSTRAINT FK_user_ad FOREIGN KEY (Username) REFERENCES Admin(Username) on delete cascade on update cascade  
);

INSERT INTO `ModifyAdmin` (`AID`, `Username`,`T_admin`, `Action`) VALUES
(101, 'S_Coups', '2024-04-18', 'Updated email address'),
(102, 'Jeonghan', '2024-04-18', 'Changed phone number'),
(103, 'Joshua', '2024-04-18', 'Reset password'),
(104, 'Jun', '2024-04-18', 'Updated last name'),
(105, 'Hoshi', '2024-04-18', 'Updated first name'),
(106, 'Wonwoo', '2024-04-18', 'Delete user'),
(107, 'Woozi', '2024-04-18', 'Enabled two-factor authentication'),
(108, 'DK', '2024-04-18', 'Granted administrative privileges'),
(109, 'Mingyu', '2024-04-18', 'Revoked administrative privileges'),
(110, 'The8', '2024-04-18', 'Added new admin user');