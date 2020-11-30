export const TABLET_REGEX = (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i)

export const MOBILE_REGEX = /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/

export const regExpUsername = new RegExp(/^[\w.]{4,24}$/);

/**
 * Valid e-mails
 * mkyong@yahoo.com, mkyong-100@yahoo.com, mkyong.100@yahoo.com, mkyong111@mkyong.com, mkyong-100@mkyong.net,
 * mkyong.100@mkyong.com.au, mkyong@1.com, mkyong@gmail.com.com, mkyong+100@gmail.com, mkyong-100@yahoo-test.com
 *
 * Non-valid e-mails that will pass
 * mkyong..2002@gmail.com, mkyong@mkyong@gmail.com, mkyong@gmail.com.1a, .mkyong@mkyong.com
 *
 * @type {RegExp}
 */
export const regExpEmail = new RegExp(/\w+([+.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+/);

/**
 * Allows all numbers, english letters and symbols:
 * (space) ! " # $ % & ' ( ) * + , - . / : ; < = > ? @ [ \ ] ^ _` { | } ~
 *
 * No length check
 */
export const regExpPassword = new RegExp(/^[0-9a-zA-Z !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]+$/);

/**
 * Card check
 *
 * 16 numbers
 */
export const regExpCardNumber = new RegExp(/^[0-9]{16}$/);

/**
 * Card expiration date check
 *
 * MM/YY
 */
export const regExpExpDate = new RegExp(/^[0-1][0-9]\/[0-9]{2}$/);

/**
 * Birthday check
 *
 * DD/MM/YYYY
 */
export const regExpBirthday = new RegExp(/^[0-1][0-9]\.[0-3][0-9]\.[0-9]{2}$/);
