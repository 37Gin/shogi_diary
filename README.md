# README

## usersテーブル

| Column             | Type   | Options                   |
| ------------------ | ------ | ------------------------- |
| name               | string | null: false, unique: true |
| email              | string | null: false, unique: true |
| encrypted_password | string | null: false               |
| introduction       | text   |                           |

### Association

has_many :diaries  
has_many :comments  

## diariesテーブル

| Column  | Type       | Options                        |
| ------- | ---------- | ------------------------------ |
| title   | string     | null: false                    |
| content | text       |                                |
| user    | references | null: false, foreign_key: true |

### Association

belongs_to :user  
has_many :comments  
has_many :tags, through: :diary_tags  
has_many :diary_tags  

## commentsテーブル

| Column   | Type       | Options                        |
| -------- | ---------- | ------------------------------ |
| comment  | string     | null: false                    |
| user     | references | null: false, foreign_key: true |
| diary    | references | null: false, foreign_key: true |

### Association

belongs_to :user  
belongs_to :diary  

## diary_tagsテーブル

| Column | Type       | Options                        |
| ------ | ---------- | ------------------------------ |
| diary  | references | null: false, foreign_key: true |
| tag    | references | null: false, foreign_key: true |

### Association

belongs_to :diary  
belongs_to :tag  

## tagsテーブル

| Column | Type   | Options     |
| ------ | ------ | ----------- |
| name   | string | null: false |

### Association

has_many :diaries, through: :diary_tags  
has_many :diary_tags  