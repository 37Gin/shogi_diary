# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

user1 = User.create(
  name: "TEST1", 
  email: "sample1@mail.com", 
  password: "test00", 
  password_confirmation: "test00",
  introduction: "TEST1さんの自己紹介文になります。"
)
user2 = User.create(
  name: "TEST2", 
  email: "sample2@mail.com", 
  password: "test00", 
  password_confirmation: "test00",
  introduction: "TEST2さんの自己紹介文になります。"
)

diary1 = Diary.create(
  title: "日記1の題名",
  content: "日記1の内容が記載されます。",
  user_id: user1.id
)
diary2 = Diary.create(
  title: "日記2の題名",
  content: "日記2の内容が記載されます。",
  user_id: user1.id
)
diary3 = Diary.create(
  title: "日記3の題名",
  content: "日記3の内容が記載されます。",
  user_id: user2.id
)

diary1.image.attach(
  io: File.open(Rails.root.join('app/assets/images/test1.png')),
  filename: 'test1.png'
)
diary2.image.attach(
  io: File.open(Rails.root.join('app/assets/images/test2.png')),
  filename: 'test2.png'
)
diary3.image.attach(
  io: File.open(Rails.root.join('app/assets/images/test3.png')),
  filename: 'test3.png'
)

tag1 = Tag.create(
  tag_name: "タグ1"
)
tag2 = Tag.create(
  tag_name: "タグ2"
)
tag3 = Tag.create(
  tag_name: "タグ3"
)

DiaryTagRelation.create(
  diary_id: diary1.id,
  tag_id: tag1.id
)
DiaryTagRelation.create(
  diary_id: diary1.id,
  tag_id: tag2.id
)
DiaryTagRelation.create(
  diary_id: diary2.id,
  tag_id: tag2.id
)
DiaryTagRelation.create(
  diary_id: diary2.id,
  tag_id: tag3.id
)
DiaryTagRelation.create(
  diary_id: diary3.id,
  tag_id: tag3.id
)
DiaryTagRelation.create(
  diary_id: diary3.id,
  tag_id: tag1.id
)