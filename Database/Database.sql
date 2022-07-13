-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: localhost    Database: database_development_projet77
-- ------------------------------------------------------
-- Server version	8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `UserId` int DEFAULT NULL,
  `PostId` int DEFAULT NULL,
  `comments` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  KEY `PostId` (`PostId`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`PostId`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (1,11,10,'J\'aime bien ton commentaire Aubameyang','2022-04-08 07:43:47','2022-04-08 07:43:47'),(2,11,9,'Diouf on ne te voit plus en ce moment !','2022-04-08 07:44:24','2022-04-08 07:44:24'),(7,10,10,'Merci !!!','2022-07-13 10:28:38','2022-07-13 10:28:38'),(8,10,11,'Trés drole ton commentaire..!!','2022-07-13 10:29:04','2022-07-13 10:29:04'),(9,5,17,'Félicitations Sadio !!!','2022-07-13 10:49:13','2022-07-13 10:49:13');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `UserId` int DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL,
  `picture` varchar(255) DEFAULT NULL,
  `video` varchar(255) DEFAULT NULL,
  `likes` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,1,'Pour qu\'un enfant grandisse, il faut tout un village.  ',NULL,NULL,0,'2022-04-08 07:23:47','2022-04-08 07:23:47'),(2,2,' Il n\'y a pas de plus grand bonheur que la venue d\'un hôte dans la paix et l\'amitié.  ',NULL,NULL,0,'2022-04-08 07:24:23','2022-04-08 07:24:23'),(3,3,' Là où on s\'aime, il ne fait jamais nuit.  ',NULL,NULL,0,'2022-04-08 07:24:54','2022-04-08 07:24:54'),(4,4,' Un homme sans culture ressemble à un zèbre sans rayures. ',NULL,NULL,0,'2022-04-08 07:25:33','2022-04-08 07:25:33'),(5,5,' Qui crache en l\'air reçoit tout à la figure. ',NULL,NULL,0,'2022-04-08 07:26:05','2022-04-08 07:26:05'),(6,6,' On ne peut pas labourer, semer, récolter et manger le même jour. ',NULL,NULL,0,'2022-04-08 07:26:36','2022-04-08 07:26:36'),(7,7,' Ce n\'est pas à un vieux singe qu\'on apprend à faire la grimace. ',NULL,NULL,0,'2022-04-08 07:27:45','2022-04-08 07:27:45'),(8,8,' Que celui qui n\'a pas traversé ne se moque pas de celui qui s\'est noyé. ',NULL,NULL,0,'2022-04-08 07:28:37','2022-04-08 07:28:37'),(9,9,' L\'eau chaude n\'oublie pas qu\'elle a été froide. ',NULL,NULL,0,'2022-04-08 07:28:55','2022-04-08 07:28:55'),(10,10,'Qui gobe une noix de coco fait confiance à son anus ',NULL,NULL,0,'2022-04-08 07:29:18','2022-04-08 07:29:18'),(11,11,'Tout a une fin, sauf la banane qui en a deux.',NULL,NULL,0,'2022-04-08 07:29:39','2022-04-08 07:29:39'),(17,4,'Quelle belle finale avec Salah !!!','','https://www.youtube.com/embed/QRzQaRQVels',0,'2022-07-13 10:48:10','2022-07-13 10:48:10'),(18,11,'Allez Janine !!!','http://localhost:5000/client/public/uploads/1657709459121.png','',0,'2022-07-13 10:50:59','2022-07-13 10:50:59');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sequelizemeta`
--

DROP TABLE IF EXISTS `sequelizemeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sequelizemeta` (
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sequelizemeta`
--

LOCK TABLES `sequelizemeta` WRITE;
/*!40000 ALTER TABLE `sequelizemeta` DISABLE KEYS */;
INSERT INTO `sequelizemeta` VALUES ('20220328150658-create-user.js'),('20220328150918-create-post.js'),('20220328160550-create-comment.js');
/*!40000 ALTER TABLE `sequelizemeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pseudo` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `bio` varchar(255) DEFAULT NULL,
  `picture` varchar(255) DEFAULT NULL,
  `following` varchar(255) DEFAULT NULL,
  `followers` varchar(255) DEFAULT NULL,
  `isAdmin` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Etoo','etoo@gmail.com','$2b$10$7DCkVSVySDnYyrfdsZM12u44JOnd6gB3IvxAhH6wxDRJCOo0Z9hRC','Samuel Eto\'o Fils, plus connu sous le nom Samuel Eto\'o né le 10 mars 1981 à Nkon sis à Yaoundé au Cameroun, est un footballeur international camerounais.','http://localhost:5000/client/public/uploads/1657702195910.png','2',NULL,0,'2022-04-08 07:00:33','2022-07-13 08:49:55'),(2,'Drogba','drogba@gmail.com','$2b$10$evX6caYUym4atXhHBbIiruHI9b37T.z6T/uUiElMIbhWlerAS4RLa','Didier Drogba, né le 11 mars 1978 à Abidjan, en Côte d’Ivoire, est un footballeur international ivoirien qui évoluait au poste d\'avant-centre.','http://localhost:5000/client/public/uploads/1657702548949.png','3',NULL,0,'2022-04-08 07:00:58','2022-07-13 08:55:49'),(3,'Yaya','yaya@gmail.com','$2b$10$yy7tSqP/kjnYWGv9GJeMPusugAZ8KvwQtVhmF/2DSoi3INXBgGrNG','Gnégnéri Yaya Touré, né le 13 mai 1983 à Bouaké en Côte d\'Ivoire, est un footballeur international ivoirien qui évolue au poste de milieu relayeur.','http://localhost:5000/client/public/uploads/1657702490014.png','4',NULL,0,'2022-04-08 07:01:13','2022-07-13 08:54:50'),(4,'Sadio','sadio@gmail.com','$2b$10$2lVCIS0yneWtMmpc7UpZsO9wf7sksnSG.F5YxwV4bGftt9GJ30jZa','Legrand ','http://localhost:5000/client/public/uploads/1657702449338.png','5',NULL,0,'2022-04-08 07:01:29','2022-07-13 08:54:09'),(5,'Salah','salah@gmail.com','$2b$10$.dxuhAtEAgpBMZD5w.A5euhcDpRd35lOTtF8LUePDQLM8CCbgJx8u','Mohamed Salah Ghaly, né le 15 juin 1992 à Nagrig (en), près de Basyoun, est un footballeur international égyptien qui évolue au poste d\'ailier droit au Liverpool FC.','http://localhost:5000/client/public/uploads/1657702152908.png','6',NULL,0,'2022-04-08 07:01:41','2022-07-13 08:49:12'),(6,'Essien','essien@gmail.com','$2b$10$ywNwIgC6khDcjXgmPjLlduW0aEmrzkEp1RKp3MxbFzyTu5Hbc1pxG','Michael Kojo Essien, né le 3 décembre 1982 à Accra (Ghana), est un footballeur international ghanéen qui évolue au poste de milieu de terrain.','http://localhost:5000/client/public/uploads/1657702379281.png','7',NULL,0,'2022-04-08 07:02:04','2022-07-13 08:52:59'),(7,'Mahrez','mahrez@gmail.com','$2b$10$gausnmfsXFQXo7rohLHb1O5RjspfsX0sIPZ6HXGlJ1znMbZXam49u','Riyad Mahrez , né le 21 février 1991 à Sarcelles en France, est un footballeur international algérien évoluant en Premier League au poste d\'ailier droit à Manchester City.','http://localhost:5000/client/public/uploads/1657702418443.png','8',NULL,0,'2022-04-08 07:02:27','2022-07-13 08:53:38'),(8,'Adebayor','adebayor@gmail.com','$2b$10$9DfRucunaAAcT08yXazUOeTJ.5fVVBtLlvQ90n.HppeMrFbGni0le','Sheyi Emmanuel Adebayor, né le 26 février 1984 à Lomé (Togo), est un footballeur international togolais qui évolue au poste d\'attaquant.','http://localhost:5000/client/public/uploads/1657702344109.png','9',NULL,0,'2022-04-08 07:02:49','2022-07-13 08:52:24'),(9,'Diouf','diouf@gmail.com','$2b$10$zGPzzjQbJGGJZGpCkFb92u0DdYXWwQwio3/jdPVJl8EjSoeN.uj1G','El-Hadji Ousseynou Diouf, né le 15 janvier 1981 à Dakar, est un footballeur international sénégalais évoluant au poste d\'attaquant.','http://localhost:5000/client/public/uploads/1657702278709.png','10',NULL,0,'2022-04-08 07:03:08','2022-07-13 08:51:18'),(10,'Aubameyang','aubameyang@gmail.com','$2b$10$8dk8hfXDDzIOsK1r8VOkn.VTRbymiyPuSyhso.nv6wqSoTuizisE2','Pierre-Emerick Aubameyang, né le 18 juin 1989 à Laval, est un footballeur international gabonais évoluant actuellement au poste d\'avant-centre au FC Barcelone.','http://localhost:5000/client/public/uploads/1657702310782.png','11',NULL,0,'2022-04-08 07:03:47','2022-07-13 08:51:50'),(11,'Salima','salima@gmail.com','$2b$10$m2rKjgrQELxJQbHZrNMqtespIoN3Xg2f8e5/lahZg9UsQ.vBfU/Xi',NULL,'http://localhost:5000/client/public/uploads/1657702251712.png','1',NULL,0,'2022-04-08 07:04:25','2022-07-13 08:50:51'),(14,'Aaliyah','aaliyah@gmail.com','$2b$10$zwR3ZNCFLch5Lg6KSbTngeUOAJth/gMDG03TZhVfKea1uBXFP/d/S',NULL,'http://localhost:5000/client/public/uploads/1657702894334.jpg',NULL,NULL,0,'2022-07-13 08:58:18','2022-07-13 09:01:34');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-07-13 13:05:09
