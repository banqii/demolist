/*
Navicat MySQL Data Transfer

Source Server         : baidunews
Source Server Version : 50045
Source Host           : localhost:3306
Source Database       : baidunews

Target Server Type    : MYSQL
Target Server Version : 50045
File Encoding         : 65001

Date: 2016-09-21 13:31:50
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for news
-- ----------------------------
DROP TABLE IF EXISTS `news`;
CREATE TABLE `news` (
  `newsid` int(11) NOT NULL auto_increment,
  `newstype` varchar(50) default NULL,
  `newstitle` varchar(100) default NULL,
  `newscontent` varchar(500) default NULL,
  `newsimage` varchar(200) default NULL,
  `addtime` datetime default NULL,
  PRIMARY KEY  (`newsid`)
) ENGINE=InnoDB AUTO_INCREMENT=92 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of news
-- ----------------------------
INSERT INTO `news` VALUES ('45', '百家', '百家新闻标题', '百家新闻内容', 'image10.jpg', '2016-09-13 11:08:15');
INSERT INTO `news` VALUES ('57', '百家', '百家新闻标题', '百家新闻内容', 'image1.jpg', '2016-09-16 06:47:24');
INSERT INTO `news` VALUES ('58', '百家', '百家新闻标题', '百家新闻内容', 'image2.jpg', '2016-09-16 06:48:15');
INSERT INTO `news` VALUES ('59', '百家', '百家新闻标题', '百家新闻内容', 'image3.jpg', '2016-09-16 06:48:19');
INSERT INTO `news` VALUES ('60', '百家', '百家新闻标题', '百家新闻内容', 'image4.jpg', '2016-09-16 06:48:26');
INSERT INTO `news` VALUES ('61', '百家', '百家新闻标题', '百家新闻内容', 'image5.jpg', '2016-09-16 06:48:33');
INSERT INTO `news` VALUES ('62', '百家', '百家新闻标题', '百家新闻内容', 'image6.jpg', '2016-09-16 06:48:39');
INSERT INTO `news` VALUES ('63', '百家', '百家新闻标题', '百家新闻内容', 'image7.jpg', '2016-09-16 06:48:43');
INSERT INTO `news` VALUES ('64', '百家', '百家新闻标题', '百家新闻内容', 'image8.jpg', '2016-09-16 06:48:47');
INSERT INTO `news` VALUES ('65', '百家', '百家新闻标题', '百家新闻内容', 'image9.jpg', '2016-09-16 06:48:52');
INSERT INTO `news` VALUES ('66', '百家', '百家新闻标题', '百家新闻内容', 'image10.jpg', '2016-09-16 06:48:56');
INSERT INTO `news` VALUES ('67', '本地', '本地新闻标题', '本地新闻内容', 'image10.jpg', '2016-09-16 06:49:32');
INSERT INTO `news` VALUES ('68', '本地', '本地新闻标题', '本地新闻内容', 'image9.jpg', '2016-09-16 06:49:39');
INSERT INTO `news` VALUES ('69', '本地', '本地新闻标题', '本地新闻内容', 'image8.jpg', '2016-09-16 06:49:41');
INSERT INTO `news` VALUES ('70', '本地', '本地新闻标题', '本地新闻内容', 'image7.jpg', '2016-09-16 06:49:45');
INSERT INTO `news` VALUES ('71', '本地', '本地新闻标题', '本地新闻内容', 'image6.jpg', '2016-09-16 06:49:49');
INSERT INTO `news` VALUES ('72', '本地', '本地新闻标题', '本地新闻内容', 'image5.jpg', '2016-09-16 06:49:52');
INSERT INTO `news` VALUES ('73', '本地', '本地新闻标题', '本地新闻内容', 'image4.jpg', '2016-09-16 06:49:55');
INSERT INTO `news` VALUES ('74', '本地', '本地新闻标题', '本地新闻内容', 'image3.jpg', '2016-09-16 06:49:58');
INSERT INTO `news` VALUES ('75', '本地', '本地新闻标题', '本地新闻内容', 'image2.jpg', '2016-09-16 06:50:02');
INSERT INTO `news` VALUES ('76', '本地', '本地新闻标题', '本地新闻内容', 'image1.jpg', '2016-09-16 06:50:06');
INSERT INTO `news` VALUES ('77', '百家', '百家新闻标题', '百家新闻内容', 'image10.jpg', '2016-09-20 11:39:32');
INSERT INTO `news` VALUES ('78', '百家', '百家新闻标题', '百家新闻内容', 'image10.jpg', '2016-09-20 11:39:34');
INSERT INTO `news` VALUES ('79', '百家', '百家新闻标题', '百家新闻内容', 'image10.jpg', '2016-09-20 11:39:36');
INSERT INTO `news` VALUES ('80', '百家', '百家新闻标题', '百家新闻内容', 'image10.jpg', '2016-09-20 11:39:37');
INSERT INTO `news` VALUES ('81', '百家', '百家新闻标题', '百家新闻内容', 'image10.jpg', '2016-09-20 11:39:38');
INSERT INTO `news` VALUES ('82', '百家', '百家新闻标题', '百家新闻内容', 'image10.jpg', '2016-09-20 11:39:40');
INSERT INTO `news` VALUES ('83', '百家', '百家新闻标题', '百家新闻内容', 'image10.jpg', '2016-09-20 11:39:42');
INSERT INTO `news` VALUES ('86', '本地', '本地新闻标题', '本地新闻内容', 'image1.jpg', '2016-09-20 04:52:50');
INSERT INTO `news` VALUES ('87', '百家', '本地新闻标题', '本地新闻内容', 'image1.jpg', '2016-09-20 04:54:24');
INSERT INTO `news` VALUES ('88', '百家', '百家新闻标题', '百家先问内容', 'image1.jpg', '2016-09-21 11:31:53');
INSERT INTO `news` VALUES ('89', '军事', '军事新闻标题', '军事新闻内容', 'image1.jpg', '2016-09-21 01:02:15');
SET FOREIGN_KEY_CHECKS=1;
